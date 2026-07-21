/**
 * Normalization Types (Slice 7 — Rule Normalization & Human Approval Mapping)
 *
 * Types for structured jurisdiction rules mapping back to ingestion evidence.
 */

export interface ProvenanceLink {
  /** References the unique ID or index of the clause in the parent ingestion record's evidence lists */
  clauseIndex: number;
  /** Category of the clause as stored in the source evidence record */
  clauseCategory: "setback" | "far" | "height";
  /** Reference section from the bye-law (e.g., "Section 4.2.1") */
  referenceSection: string;
  /** Page number in the PDF */
  pageNumber: number;
  /** Verbatim excerpt extracted */
  excerpt: string;
  /** Mandatory explanation if mapping a clause to a different parameter category */
  justification?: string;
}

export interface FarRuleRow {
  plotAreaMinM2?: number;
  plotAreaMaxM2?: number;
  roadWidthMinM?: number;
  roadWidthMaxM?: number;
  farValue: number;
  provenance: ProvenanceLink | null;
}

export interface SetbackRuleRow {
  plotAreaMinM2?: number;
  plotAreaMaxM2?: number;
  roadWidthMinM?: number;
  roadWidthMaxM?: number;
  frontSetbackM: number;
  rearSetbackM: number;
  sideSetbackM: number;
  provenance: {
    front: ProvenanceLink | null;
    rear: ProvenanceLink | null;
    side: ProvenanceLink | null;
  };
}

export interface HeightRuleRow {
  roadWidthMinM?: number;
  maxHeightM: number;
  maxStoreys?: number;
  provenance: ProvenanceLink | null;
}

export interface NormalizedRulesJson {
  farRules: FarRuleRow[];
  setbackRules: SetbackRuleRow[];
  heightRules: HeightRuleRow[];
  generalNotes?: string;
}

export type MappingApprovalStatus =
  | "draft"          // In active modification
  | "needs_review"   // Flagged for peer review or has validation anomalies
  | "approved"       // Verified, locked, and active
  | "superseded";    // Replaced by a newer approved ruleset version

export interface NormalizedRuleDraft {
  id: string;
  ingestionRecordId: string;
  jurisdiction: string;
  occupancyType: string; // e.g. "Residential", "Commercial"
  rules: NormalizedRulesJson;
  status: MappingApprovalStatus;
  createdAt: string;
  updatedAt: string;
}
