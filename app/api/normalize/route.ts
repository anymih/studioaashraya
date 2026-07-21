import { NextRequest, NextResponse } from "next/server";
import {
  saveNormalizedRuleDraft,
  listNormalizedRuleDraftsByRecord,
  getNormalizedRuleDraftByRecordAndOccupancy,
  listAllNormalizedRuleDrafts,
} from "@/lib/site-feasibility/normalization-store";
import type {
  NormalizedRuleDraft,
  NormalizedRulesJson,
  MappingApprovalStatus,
  ProvenanceLink,
} from "@/lib/site-feasibility/normalization-types";

// ---------------------------------------------------------------------------
// Validation Helper
// ---------------------------------------------------------------------------

interface ValidationError {
  field: string;
  message: string;
}

function validateNormalizedRules(
  rules: NormalizedRulesJson,
  status: MappingApprovalStatus
): { isValid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  const validateLink = (
    link: ProvenanceLink | null,
    expectedCategory: "far" | "setback" | "height",
    fieldName: string
  ) => {
    if (!link) return;
    if (link.clauseCategory !== expectedCategory) {
      if (!link.justification || link.justification.trim() === "") {
        errors.push({
          field: fieldName,
          message: `Cross-category mapping in '${fieldName}' to a ${link.clauseCategory} clause requires a justification.`,
        });
      }
    }
  };

  // 1. Validate FAR rules
  if (rules.farRules) {
    rules.farRules.forEach((row, idx) => {
      validateLink(row.provenance, "far", `FAR Rule #${idx + 1}`);
    });
  }

  // 2. Validate Setback rules
  if (rules.setbackRules) {
    rules.setbackRules.forEach((row, idx) => {
      if (row.provenance) {
        validateLink(row.provenance.front, "setback", `Setback Rule #${idx + 1} (Front)`);
        validateLink(row.provenance.rear, "setback", `Setback Rule #${idx + 1} (Rear)`);
        validateLink(row.provenance.side, "setback", `Setback Rule #${idx + 1} (Side)`);
      }
    });
  }

  // 3. Validate Height rules
  if (rules.heightRules) {
    rules.heightRules.forEach((row, idx) => {
      validateLink(row.provenance, "height", `Height Rule #${idx + 1}`);
    });
  }

  // For approval, also verify that all basic required fields are not empty
  if (status === "approved") {
    const farCount = rules.farRules?.length ?? 0;
    const setbackCount = rules.setbackRules?.length ?? 0;
    const heightCount = rules.heightRules?.length ?? 0;

    if (farCount === 0 && setbackCount === 0 && heightCount === 0) {
      errors.push({
        field: "rules",
        message: "An approved ruleset must contain at least one FAR, setback, or height rule.",
      });
    }

    if (rules.farRules) {
      rules.farRules.forEach((row, idx) => {
        if (row.farValue === undefined || row.farValue === null || Number.isNaN(row.farValue) || row.farValue <= 0) {
          errors.push({
            field: `FAR Rule #${idx + 1}`,
            message: "FAR value must be greater than 0.",
          });
        }
      });
    }

    if (rules.setbackRules) {
      rules.setbackRules.forEach((row, idx) => {
        if (
          row.frontSetbackM === undefined || row.frontSetbackM === null || Number.isNaN(row.frontSetbackM) || row.frontSetbackM < 0 ||
          row.rearSetbackM === undefined || row.rearSetbackM === null || Number.isNaN(row.rearSetbackM) || row.rearSetbackM < 0 ||
          row.sideSetbackM === undefined || row.sideSetbackM === null || Number.isNaN(row.sideSetbackM) || row.sideSetbackM < 0
        ) {
          errors.push({
            field: `Setback Rule #${idx + 1}`,
            message: "Setback values cannot be empty or negative.",
          });
        }
      });
    }

    if (rules.heightRules) {
      rules.heightRules.forEach((row, idx) => {
        if (row.maxHeightM === undefined || row.maxHeightM === null || Number.isNaN(row.maxHeightM) || row.maxHeightM <= 0) {
          errors.push({
            field: `Height Rule #${idx + 1}`,
            message: "Max height must be greater than 0.",
          });
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// GET — Retrieve normalized rules drafts
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const recordId = searchParams.get("recordId");
    const occupancy = searchParams.get("occupancy");

    if (recordId && occupancy) {
      const draft = await getNormalizedRuleDraftByRecordAndOccupancy(recordId, occupancy);
      return NextResponse.json({ draft });
    }

    if (recordId) {
      const drafts = await listNormalizedRuleDraftsByRecord(recordId);
      return NextResponse.json({ drafts });
    }

    const drafts = await listAllNormalizedRuleDrafts();
    return NextResponse.json({ drafts });
  } catch (err) {
    console.error("[normalize] GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch normalized rule drafts" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST — Create or save normalized rules draft
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const {
      id,
      ingestionRecordId,
      jurisdiction,
      occupancyType,
      rules,
      status,
    } = body as {
      id?: string;
      ingestionRecordId: string;
      jurisdiction: string;
      occupancyType: string;
      rules: NormalizedRulesJson;
      status: MappingApprovalStatus;
    };

    if (!ingestionRecordId || !jurisdiction || !occupancyType || !rules) {
      return NextResponse.json(
        { error: "Missing required fields (ingestionRecordId, jurisdiction, occupancyType, rules)" },
        { status: 400 }
      );
    }

    // 1. Run validation checks
    const targetStatus = status || "draft";
    const validationResult = validateNormalizedRules(rules, targetStatus);
    
    let finalStatus = targetStatus;
    let validationWarnings: ValidationError[] = [];

    if (!validationResult.isValid) {
      validationWarnings = validationResult.errors;
      // If client requested 'approved' but validation failed, force status to 'needs_review'
      if (targetStatus === "approved") {
        finalStatus = "needs_review";
      }
    }

    // 2. Build record ID if not provided
    const draftId = id || `norm_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // 3. Save the normalized rule draft
    const draft: NormalizedRuleDraft = {
      id: draftId,
      ingestionRecordId,
      jurisdiction,
      occupancyType,
      rules,
      status: finalStatus,
      createdAt: new Date().toISOString(), // store will update updatedAt
      updatedAt: new Date().toISOString(),
    };

    await saveNormalizedRuleDraft(draft);

    return NextResponse.json({
      draft,
      success: finalStatus === targetStatus,
      validationWarnings,
      message: finalStatus !== targetStatus 
        ? "Mapping saved as 'Needs Review' due to validation errors."
        : "Mapping saved successfully."
    });
  } catch (err) {
    console.error("[normalize] POST error:", err);
    return NextResponse.json(
      { error: "Failed to save normalized rule draft" },
      { status: 500 }
    );
  }
}
