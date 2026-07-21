"use client";

import React, { useState, useEffect } from "react";
import type { IngestionRecord, ClauseEvidence } from "@/lib/site-feasibility/ingestion-types";
import type {
  NormalizedRuleDraft,
  NormalizedRulesJson,
  MappingApprovalStatus,
  ProvenanceLink,
  FarRuleRow,
  SetbackRuleRow,
  HeightRuleRow,
} from "@/lib/site-feasibility/normalization-types";
import {
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  Plus,
  Trash2,
  Link,
  Unlink,
  Save,
  Send,
  Check,
  RotateCcw,
  AlertTriangle,
  Info,
  ChevronDown,
  X,
} from "lucide-react";

interface RuleNormalizationEditorProps {
  selectedRecord: IngestionRecord;
  onRefreshRecords: () => void;
}

export default function RuleNormalizationEditor({
  selectedRecord,
  onRefreshRecords,
}: RuleNormalizationEditorProps) {
  // 1. Core States
  const [occupancyList, setOccupancyList] = useState<string[]>([]);
  const [selectedOccupancy, setSelectedOccupancy] = useState<string>("");
  const [draftId, setDraftId] = useState<string | null>(null);
  const [status, setStatus] = useState<MappingApprovalStatus>("draft");
  const [createdAt, setCreatedAt] = useState<string>("");

  // Rule rows state
  const [farRules, setFarRules] = useState<FarRuleRow[]>([]);
  const [setbackRules, setSetbackRules] = useState<SetbackRuleRow[]>([]);
  const [heightRules, setHeightRules] = useState<HeightRuleRow[]>([]);
  const [generalNotes, setGeneralNotes] = useState<string>("");

  // UI state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationWarnings, setValidationWarnings] = useState<{ field: string; message: string }[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Provenance Linker Modal State
  const [linkerOpen, setLinkerOpen] = useState<boolean>(false);
  const [linkingTarget, setLinkingTarget] = useState<{
    type: "far" | "height" | "setback-front" | "setback-rear" | "setback-side";
    rowIndex: number;
  } | null>(null);
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<"far" | "setback" | "height">("far");
  const [selectedClauseIndex, setSelectedClauseIndex] = useState<number | null>(null);
  const [justificationText, setJustificationText] = useState<string>("");

  // 2. Derive occupancy list from record
  useEffect(() => {
    if (selectedRecord) {
      const labels = selectedRecord.evidence.occupancyLabelsFound;
      // Default fallback occupancy types if none found
      const finalLabels = labels.length > 0 ? labels : ["Residential", "Commercial"];
      setOccupancyList(finalLabels);
      setSelectedOccupancy(finalLabels[0]);
    }
  }, [selectedRecord]);

  // 3. Load existing draft from API whenever record or occupancy changes
  useEffect(() => {
    if (selectedRecord && selectedOccupancy) {
      loadDraft();
    }
  }, [selectedRecord, selectedOccupancy]);

  const loadDraft = async () => {
    setValidationWarnings([]);
    setSuccessMessage(null);
    try {
      const res = await fetch(
        `/api/normalize?recordId=${selectedRecord.id}&occupancy=${encodeURIComponent(
          selectedOccupancy
        )}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.draft) {
          const draft: NormalizedRuleDraft = data.draft;
          setDraftId(draft.id);
          setStatus(draft.status);
          setCreatedAt(draft.createdAt);
          setFarRules(draft.rules.farRules || []);
          setSetbackRules(draft.rules.setbackRules || []);
          setHeightRules(draft.rules.heightRules || []);
          setGeneralNotes(draft.rules.generalNotes || "");
        } else {
          // Initialize fresh default rows
          setDraftId(null);
          setStatus("draft");
          setCreatedAt("");
          initializeDefaults();
        }
      }
    } catch (err) {
      console.error("Failed to load draft:", err);
      initializeDefaults();
    }
  };

  const initializeDefaults = () => {
    // Populate with 1 empty row in each table to start
    setFarRules([{ farValue: 0, provenance: null }]);
    setSetbackRules([
      {
        frontSetbackM: 0,
        rearSetbackM: 0,
        sideSetbackM: 0,
        provenance: { front: null, rear: null, side: null },
      },
    ]);
    setHeightRules([{ maxHeightM: 0, provenance: null }]);
    setGeneralNotes("");
  };

  // 4. Save Logic
  const handleSave = async (targetStatus: MappingApprovalStatus) => {
    setIsSaving(true);
    setValidationWarnings([]);
    setSuccessMessage(null);

    const rulesPayload: NormalizedRulesJson = {
      farRules: farRules.map((r) => ({
        ...r,
        farValue: Number(r.farValue),
        plotAreaMinM2: r.plotAreaMinM2 ? Number(r.plotAreaMinM2) : undefined,
        plotAreaMaxM2: r.plotAreaMaxM2 ? Number(r.plotAreaMaxM2) : undefined,
        roadWidthMinM: r.roadWidthMinM ? Number(r.roadWidthMinM) : undefined,
        roadWidthMaxM: r.roadWidthMaxM ? Number(r.roadWidthMaxM) : undefined,
      })),
      setbackRules: setbackRules.map((r) => ({
        ...r,
        frontSetbackM: Number(r.frontSetbackM),
        rearSetbackM: Number(r.rearSetbackM),
        sideSetbackM: Number(r.sideSetbackM),
        plotAreaMinM2: r.plotAreaMinM2 ? Number(r.plotAreaMinM2) : undefined,
        plotAreaMaxM2: r.plotAreaMaxM2 ? Number(r.plotAreaMaxM2) : undefined,
        roadWidthMinM: r.roadWidthMinM ? Number(r.roadWidthMinM) : undefined,
        roadWidthMaxM: r.roadWidthMaxM ? Number(r.roadWidthMaxM) : undefined,
      })),
      heightRules: heightRules.map((r) => ({
        ...r,
        maxHeightM: Number(r.maxHeightM),
        maxStoreys: r.maxStoreys ? Number(r.maxStoreys) : undefined,
        roadWidthMinM: r.roadWidthMinM ? Number(r.roadWidthMinM) : undefined,
      })),
      generalNotes,
    };

    try {
      const payload: Partial<NormalizedRuleDraft> = {
        ingestionRecordId: selectedRecord.id,
        jurisdiction: selectedRecord.evidence.documentMetadata.jurisdiction,
        occupancyType: selectedOccupancy,
        rules: rulesPayload,
        status: targetStatus,
      };

      if (draftId) {
        payload.id = draftId;
      }

      const res = await fetch("/api/normalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const saved: NormalizedRuleDraft = data.draft;
        setDraftId(saved.id);
        setStatus(saved.status);
        setCreatedAt(saved.createdAt);
        
        if (data.validationWarnings && data.validationWarnings.length > 0) {
          setValidationWarnings(data.validationWarnings);
          if (targetStatus === "approved") {
            setSuccessMessage("Saved draft as 'Needs Review' due to validation warnings.");
          } else {
            setSuccessMessage("Draft updated with warnings.");
          }
        } else {
          setSuccessMessage(
            targetStatus === "approved"
              ? "Rules approved and locked successfully!"
              : targetStatus === "needs_review"
              ? "Submitted for review."
              : "Draft saved successfully!"
          );
        }
        onRefreshRecords();
      } else {
        const errData = await res.json();
        setValidationWarnings([{ field: "General", message: errData.error || "Save failed." }]);
      }
    } catch (err) {
      console.error("Save failed:", err);
      setValidationWarnings([{ field: "General", message: "Failed to connect to normalization service." }]);
    } finally {
      setIsSaving(false);
    }
  };

  // 5. Rule Table Modifiers
  const addFarRow = () => {
    setFarRules([...farRules, { farValue: 0, provenance: null }]);
  };

  const removeFarRow = (index: number) => {
    setFarRules(farRules.filter((_, i) => i !== index));
  };

  const updateFarField = (index: number, field: keyof FarRuleRow, value: string) => {
    const updated = [...farRules];
    updated[index] = {
      ...updated[index],
      [field]: value === "" ? undefined : value,
    };
    setFarRules(updated);
  };

  const addSetbackRow = () => {
    setSetbackRules([
      ...setbackRules,
      {
        frontSetbackM: 0,
        rearSetbackM: 0,
        sideSetbackM: 0,
        provenance: { front: null, rear: null, side: null },
      },
    ]);
  };

  const removeSetbackRow = (index: number) => {
    setSetbackRules(setbackRules.filter((_, i) => i !== index));
  };

  const updateSetbackField = (index: number, field: keyof SetbackRuleRow, value: string) => {
    const updated = [...setbackRules];
    updated[index] = {
      ...updated[index],
      [field]: value === "" ? undefined : value,
    };
    setSetbackRules(updated);
  };

  const addHeightRow = () => {
    setHeightRules([...heightRules, { maxHeightM: 0, provenance: null }]);
  };

  const removeHeightRow = (index: number) => {
    setHeightRules(heightRules.filter((_, i) => i !== index));
  };

  const updateHeightField = (index: number, field: keyof HeightRuleRow, value: string) => {
    const updated = [...heightRules];
    updated[index] = {
      ...updated[index],
      [field]: value === "" ? undefined : value,
    };
    setHeightRules(updated);
  };

  // 6. Provenance Linker Logic
  const openLinker = (
    type: "far" | "height" | "setback-front" | "setback-rear" | "setback-side",
    rowIndex: number
  ) => {
    setLinkingTarget({ type, rowIndex });
    setSelectedClauseIndex(null);
    setJustificationText("");

    // Set default tab matching the target category
    if (type === "far") {
      setActiveEvidenceTab("far");
    } else if (type === "height") {
      setActiveEvidenceTab("height");
    } else {
      setActiveEvidenceTab("setback");
    }

    setLinkerOpen(true);
  };

  const getClausesForActiveTab = (): ClauseEvidence[] => {
    switch (activeEvidenceTab) {
      case "far":
        return selectedRecord.evidence.farClauses || [];
      case "setback":
        return selectedRecord.evidence.setbackClauses || [];
      case "height":
        return selectedRecord.evidence.heightClauses || [];
    }
  };

  const isCrossCategoryMapping = (): boolean => {
    if (!linkingTarget) return false;
    const targetCategory = activeEvidenceTab;
    let fieldCategory: "far" | "setback" | "height" = "far";
    if (linkingTarget.type === "height") {
      fieldCategory = "height";
    } else if (linkingTarget.type.startsWith("setback")) {
      fieldCategory = "setback";
    }
    return targetCategory !== fieldCategory;
  };

  const handleApplyLink = () => {
    if (selectedClauseIndex === null || !linkingTarget) return;

    const clauses = getClausesForActiveTab();
    const clause = clauses[selectedClauseIndex];
    if (!clause) return;

    // Cross category verification
    const crossCategory = isCrossCategoryMapping();
    if (crossCategory && (!justificationText || justificationText.trim() === "")) {
      alert("Please provide a justification for this cross-category mapping.");
      return;
    }

    const provenanceLink: ProvenanceLink = {
      clauseIndex: selectedClauseIndex,
      clauseCategory: activeEvidenceTab,
      referenceSection: clause.referenceSection,
      pageNumber: clause.pageNumber,
      excerpt: clause.excerpt,
      justification: crossCategory ? justificationText.trim() : undefined,
    };

    const { type, rowIndex } = linkingTarget;

    if (type === "far") {
      const updated = [...farRules];
      updated[rowIndex].provenance = provenanceLink;
      setFarRules(updated);
    } else if (type === "height") {
      const updated = [...heightRules];
      updated[rowIndex].provenance = provenanceLink;
      setHeightRules(updated);
    } else if (type === "setback-front") {
      const updated = [...setbackRules];
      updated[rowIndex].provenance = {
        ...updated[rowIndex].provenance,
        front: provenanceLink,
      };
      setSetbackRules(updated);
    } else if (type === "setback-rear") {
      const updated = [...setbackRules];
      updated[rowIndex].provenance = {
        ...updated[rowIndex].provenance,
        rear: provenanceLink,
      };
      setSetbackRules(updated);
    } else if (type === "setback-side") {
      const updated = [...setbackRules];
      updated[rowIndex].provenance = {
        ...updated[rowIndex].provenance,
        side: provenanceLink,
      };
      setSetbackRules(updated);
    }

    setLinkerOpen(false);
    setLinkingTarget(null);
  };

  const handleUnlink = (
    type: "far" | "height" | "setback-front" | "setback-rear" | "setback-side",
    rowIndex: number
  ) => {
    if (type === "far") {
      const updated = [...farRules];
      updated[rowIndex].provenance = null;
      setFarRules(updated);
    } else if (type === "height") {
      const updated = [...heightRules];
      updated[rowIndex].provenance = null;
      setHeightRules(updated);
    } else if (type === "setback-front") {
      const updated = [...setbackRules];
      updated[rowIndex].provenance = {
        ...updated[rowIndex].provenance,
        front: null,
      };
      setSetbackRules(updated);
    } else if (type === "setback-rear") {
      const updated = [...setbackRules];
      updated[rowIndex].provenance = {
        ...updated[rowIndex].provenance,
        rear: null,
      };
      setSetbackRules(updated);
    } else if (type === "setback-side") {
      const updated = [...setbackRules];
      updated[rowIndex].provenance = {
        ...updated[rowIndex].provenance,
        side: null,
      };
      setSetbackRules(updated);
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "approved":
        return <span className="bg-green-100 text-green-800 border-green-200 border text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Approved &amp; Locked</span>;
      case "needs_review":
        return <span className="bg-amber-100 text-amber-800 border-amber-200 border text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Needs Review</span>;
      case "superseded":
        return <span className="bg-neutral-200 text-neutral-800 border-neutral-300 border text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Superseded</span>;
      default:
        return <span className="bg-blue-100 text-blue-800 border-blue-200 border text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Draft</span>;
    }
  };

  const renderProvenanceButton = (
    prov: ProvenanceLink | null | undefined,
    type: "far" | "height" | "setback-front" | "setback-rear" | "setback-side",
    rowIndex: number
  ) => {
    if (prov) {
      const isCross = prov.clauseCategory !== (type === "far" ? "far" : type === "height" ? "height" : "setback");
      return (
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => handleUnlink(type, rowIndex)}
            title="Remove Link"
            className="p-1 rounded text-red-500 hover:bg-red-50 transition"
          >
            <Unlink size={12} />
          </button>
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded border max-w-[80px] truncate cursor-pointer font-semibold ${
              isCross 
                ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100" 
                : "bg-green-50 text-green-800 border-green-200 hover:bg-green-100"
            }`}
            title={`${prov.referenceSection} (Page ${prov.pageNumber}): "${prov.excerpt}"${
              prov.justification ? ` [Justification: ${prov.justification}]` : ""
            }`}
          >
            {isCross ? `⚠️ ` : ``}{prov.referenceSection}
          </span>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => openLinker(type, rowIndex)}
        className="flex items-center space-x-1 text-[10px] text-violet-600 hover:text-violet-800 border border-violet-200 hover:bg-violet-50 px-1.5 py-0.5 rounded font-semibold transition"
      >
        <Link size={10} />
        <span>Link</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Header / Meta Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
        <div className="flex items-center space-x-3">
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
              Occupancy Use Type
            </label>
            <select
              value={selectedOccupancy}
              onChange={(e) => setSelectedOccupancy(e.target.value)}
              className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-1 focus:ring-violet-500"
            >
              {occupancyList.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-2">{getStatusBadge()}</div>
        </div>

        {/* Global Save Actions */}
        <div className="flex items-center space-x-1.5 pt-2 md:pt-0">
          <button
            type="button"
            onClick={initializeDefaults}
            className="text-xs px-2.5 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-700 font-semibold border border-neutral-300 flex items-center space-x-1 transition"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
            className="text-xs px-2.5 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-700 font-semibold border border-neutral-300 flex items-center space-x-1 disabled:opacity-50 transition"
          >
            <Save size={12} />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave("needs_review")}
            disabled={isSaving}
            className="text-xs px-2.5 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-700 font-semibold border border-neutral-300 flex items-center space-x-1 disabled:opacity-50 transition"
          >
            <Send size={12} />
            <span>Needs Review</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave("approved")}
            disabled={isSaving}
            className="text-xs px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center space-x-1 disabled:opacity-50 transition"
          >
            <Check size={12} />
            <span>Approve Ruleset</span>
          </button>
        </div>
      </div>

      {/* Validation Message Banners */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-xs rounded-lg p-3 flex items-start space-x-2">
          <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {validationWarnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg p-3.5 space-y-1">
          <div className="flex items-center space-x-1.5 text-amber-700 font-bold mb-1">
            <AlertTriangle size={15} />
            <span>Rule Validation Warnings ({validationWarnings.length})</span>
          </div>
          <ul className="list-disc pl-5 font-mono text-[10px] space-y-0.5 text-amber-900">
            {validationWarnings.map((w, idx) => (
              <li key={idx}>
                <strong>{w.field}:</strong> {w.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Editor Body */}
      <div className="space-y-5 overflow-y-auto pr-1 max-h-[500px]">
        {/* Table 1: FAR Rules */}
        <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
          <div className="bg-neutral-50 px-4 py-2.5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-neutral-800 text-xs">1. Floor Area Ratio (FAR / FSI) Rules</span>
              <span title="Configure FAR rules based on plot size brackets (m²) and road width brackets (m)." className="cursor-help">
                <Info size={12} className="text-neutral-400" />
              </span>
            </div>
            <button
              type="button"
              onClick={addFarRow}
              className="text-[10px] font-bold text-violet-600 hover:text-violet-800 flex items-center space-x-0.5"
            >
              <Plus size={10} />
              <span>Add Row</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-neutral-50/50 text-neutral-600 border-b border-neutral-200 font-semibold uppercase tracking-wider text-[9px]">
                  <th className="px-3 py-2">Plot Min (m²)</th>
                  <th className="px-3 py-2">Plot Max (m²)</th>
                  <th className="px-3 py-2">Road Min (m)</th>
                  <th className="px-3 py-2">Road Max (m)</th>
                  <th className="px-3 py-2">FAR Value</th>
                  <th className="px-3 py-2">Provenance</th>
                  <th className="px-3 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {farRules.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/30">
                    <td className="px-3 py-1.5">
                      <input
                        type="number"
                        placeholder="0"
                        value={row.plotAreaMinM2 ?? ""}
                        onChange={(e) => updateFarField(idx, "plotAreaMinM2", e.target.value)}
                        className="w-16 bg-white border border-neutral-200 rounded px-1.5 py-0.5 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      <input
                        type="number"
                        placeholder="Any"
                        value={row.plotAreaMaxM2 ?? ""}
                        onChange={(e) => updateFarField(idx, "plotAreaMaxM2", e.target.value)}
                        className="w-16 bg-white border border-neutral-200 rounded px-1.5 py-0.5 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      <input
                        type="number"
                        placeholder="0"
                        value={row.roadWidthMinM ?? ""}
                        onChange={(e) => updateFarField(idx, "roadWidthMinM", e.target.value)}
                        className="w-16 bg-white border border-neutral-200 rounded px-1.5 py-0.5 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      <input
                        type="number"
                        placeholder="Any"
                        value={row.roadWidthMaxM ?? ""}
                        onChange={(e) => updateFarField(idx, "roadWidthMaxM", e.target.value)}
                        className="w-16 bg-white border border-neutral-200 rounded px-1.5 py-0.5 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="2.0"
                        value={row.farValue}
                        onChange={(e) => updateFarField(idx, "farValue", e.target.value)}
                        className="w-16 bg-white border border-neutral-300 rounded px-1.5 py-0.5 focus:outline-none font-bold"
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      {renderProvenanceButton(row.provenance, "far", idx)}
                    </td>
                    <td className="px-3 py-1.5 text-center">
                      {farRules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFarRow(idx)}
                          className="text-neutral-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Setback Rules */}
        <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
          <div className="bg-neutral-50 px-4 py-2.5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-neutral-800 text-xs">2. Setback Rules</span>
              <span title="Configure setbacks (Front, Rear, Side) in meters." className="cursor-help">
                <Info size={12} className="text-neutral-400" />
              </span>
            </div>
            <button
              type="button"
              onClick={addSetbackRow}
              className="text-[10px] font-bold text-violet-600 hover:text-violet-800 flex items-center space-x-0.5"
            >
              <Plus size={10} />
              <span>Add Row</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-neutral-50/50 text-neutral-600 border-b border-neutral-200 font-semibold uppercase tracking-wider text-[9px]">
                  <th className="px-2 py-2">Plot range (m²)</th>
                  <th className="px-2 py-2">Road range (m)</th>
                  <th className="px-2 py-2">Front (m)</th>
                  <th className="px-2 py-2">Rear (m)</th>
                  <th className="px-2 py-2">Side (m)</th>
                  <th className="px-2 py-2">Provenance (Front / Rear / Side)</th>
                  <th className="px-2 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {setbackRules.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/30">
                    <td className="px-2 py-1.5 whitespace-nowrap">
                      <input
                        type="number"
                        placeholder="Min"
                        value={row.plotAreaMinM2 ?? ""}
                        onChange={(e) => updateSetbackField(idx, "plotAreaMinM2", e.target.value)}
                        className="w-12 bg-white border border-neutral-200 rounded px-1 py-0.5 focus:outline-none"
                      />
                      <span className="mx-0.5 text-neutral-400">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={row.plotAreaMaxM2 ?? ""}
                        onChange={(e) => updateSetbackField(idx, "plotAreaMaxM2", e.target.value)}
                        className="w-12 bg-white border border-neutral-200 rounded px-1 py-0.5 focus:outline-none"
                      />
                    </td>
                    <td className="px-2 py-1.5 whitespace-nowrap">
                      <input
                        type="number"
                        placeholder="Min"
                        value={row.roadWidthMinM ?? ""}
                        onChange={(e) => updateSetbackField(idx, "roadWidthMinM", e.target.value)}
                        className="w-12 bg-white border border-neutral-200 rounded px-1 py-0.5 focus:outline-none"
                      />
                      <span className="mx-0.5 text-neutral-400">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={row.roadWidthMaxM ?? ""}
                        onChange={(e) => updateSetbackField(idx, "roadWidthMaxM", e.target.value)}
                        className="w-12 bg-white border border-neutral-200 rounded px-1 py-0.5 focus:outline-none"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="1.5"
                        value={row.frontSetbackM}
                        onChange={(e) => updateSetbackField(idx, "frontSetbackM", e.target.value)}
                        className="w-12 bg-white border border-neutral-200 rounded px-1 py-0.5 focus:outline-none font-semibold text-red-600"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="1.5"
                        value={row.rearSetbackM}
                        onChange={(e) => updateSetbackField(idx, "rearSetbackM", e.target.value)}
                        className="w-12 bg-white border border-neutral-200 rounded px-1 py-0.5 focus:outline-none font-semibold text-red-600"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="1.2"
                        value={row.sideSetbackM}
                        onChange={(e) => updateSetbackField(idx, "sideSetbackM", e.target.value)}
                        className="w-12 bg-white border border-neutral-200 rounded px-1 py-0.5 focus:outline-none font-semibold text-red-600"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[9px] text-neutral-400 w-8">Front:</span>
                          {renderProvenanceButton(row.provenance.front, "setback-front", idx)}
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[9px] text-neutral-400 w-8">Rear:</span>
                          {renderProvenanceButton(row.provenance.rear, "setback-rear", idx)}
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[9px] text-neutral-400 w-8">Side:</span>
                          {renderProvenanceButton(row.provenance.side, "setback-side", idx)}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      {setbackRules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSetbackRow(idx)}
                          className="text-neutral-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3: Height Limits */}
        <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
          <div className="bg-neutral-50 px-4 py-2.5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-neutral-800 text-xs">3. Height Limits</span>
              <span title="Configure max building height (meters) and storeys cap." className="cursor-help">
                <Info size={12} className="text-neutral-400" />
              </span>
            </div>
            <button
              type="button"
              onClick={addHeightRow}
              className="text-[10px] font-bold text-violet-600 hover:text-violet-800 flex items-center space-x-0.5"
            >
              <Plus size={10} />
              <span>Add Row</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-neutral-50/50 text-neutral-600 border-b border-neutral-200 font-semibold uppercase tracking-wider text-[9px]">
                  <th className="px-3 py-2">Road Min Width (m)</th>
                  <th className="px-3 py-2">Max Height (m)</th>
                  <th className="px-3 py-2">Max Storeys (Storeys)</th>
                  <th className="px-3 py-2">Provenance</th>
                  <th className="px-3 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {heightRules.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/30">
                    <td className="px-3 py-1.5">
                      <input
                        type="number"
                        placeholder="0"
                        value={row.roadWidthMinM ?? ""}
                        onChange={(e) => updateHeightField(idx, "roadWidthMinM", e.target.value)}
                        className="w-24 bg-white border border-neutral-200 rounded px-1.5 py-0.5 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="15.0"
                        value={row.maxHeightM}
                        onChange={(e) => updateHeightField(idx, "maxHeightM", e.target.value)}
                        className="w-24 bg-white border border-neutral-200 rounded px-1.5 py-0.5 focus:outline-none font-semibold text-blue-600"
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      <input
                        type="number"
                        placeholder="e.g. 4"
                        value={row.maxStoreys ?? ""}
                        onChange={(e) => updateHeightField(idx, "maxStoreys", e.target.value)}
                        className="w-24 bg-white border border-neutral-200 rounded px-1.5 py-0.5 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      {renderProvenanceButton(row.provenance, "height", idx)}
                    </td>
                    <td className="px-3 py-1.5 text-center">
                      {heightRules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHeightRow(idx)}
                          className="text-neutral-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* General Notes Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
            General Mapping Notes
          </label>
          <textarea
            rows={3}
            placeholder="Add clarifications, manual override details, or general notes regarding the mapping process..."
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            className="w-full text-xs bg-white border border-neutral-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* 7. Provenance Linker Dialog (Modal) */}
      {linkerOpen && linkingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-neutral-200 rounded-xl max-w-xl w-full flex flex-col shadow-2xl h-[500px]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 bg-neutral-50 rounded-t-xl">
              <div>
                <span className="font-bold text-neutral-800 text-sm">Link Clause to Field</span>
                <p className="text-[10px] text-neutral-500">
                  Select evidence from document to verify value for:{" "}
                  <strong className="text-violet-700 uppercase">
                    {linkingTarget.type.replace("-", " ")} (Row #{linkingTarget.rowIndex + 1})
                  </strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLinkerOpen(false)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Evidence Category Tabs */}
            <div className="flex border-b border-neutral-200 bg-neutral-50 px-3">
              {(["far", "setback", "height"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveEvidenceTab(tab);
                    setSelectedClauseIndex(null);
                  }}
                  className={`text-xs px-4 py-2 border-b-2 font-bold transition ${
                    activeEvidenceTab === tab
                      ? "border-violet-600 text-violet-700 bg-white"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {tab === "far" ? "FAR Clauses" : tab === "setback" ? "Setback Clauses" : "Height Clauses"}
                </button>
              ))}
            </div>

            {/* Modal Body: Clause list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {getClausesForActiveTab().map((clause, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedClauseIndex(idx)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition flex flex-col space-y-1.5 ${
                    selectedClauseIndex === idx
                      ? "border-violet-600 bg-violet-50/30"
                      : "border-neutral-200 hover:bg-neutral-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between w-full font-bold text-[10px]">
                    <span className="text-neutral-700">{clause.referenceSection}</span>
                    <span className="text-neutral-500">Page {clause.pageNumber}</span>
                  </div>
                  <p className="text-neutral-600 italic font-mono text-[10px] leading-relaxed">
                    "{clause.excerpt}"
                  </p>
                </button>
              ))}

              {getClausesForActiveTab().length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 text-neutral-400 text-center h-full">
                  <Info size={20} className="text-neutral-300 mb-1" />
                  <p className="text-xs">No extracted clauses found for this category</p>
                </div>
              )}
            </div>

            {/* Cross-Category Justification Input */}
            {selectedClauseIndex !== null && isCrossCategoryMapping() && (
              <div className="border-t border-neutral-200 p-3 bg-amber-50/50 space-y-1">
                <div className="flex items-center space-x-1 text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                  <AlertTriangle size={12} />
                  <span>Mandatory Cross-Category Justification</span>
                </div>
                <p className="text-[9px] text-neutral-600 leading-normal">
                  You are mapping a <strong>{activeEvidenceTab} clause</strong> to a{" "}
                  <strong>{linkingTarget.type.split("-")[0]} field</strong>. Please describe why this derivation is valid:
                </p>
                <textarea
                  rows={2}
                  value={justificationText}
                  onChange={(e) => setJustificationText(e.target.value)}
                  placeholder="e.g. Setback is derived from building height per Clause 12.1 formula..."
                  className="w-full text-xs bg-white border border-neutral-300 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            )}

            {/* Modal Footer */}
            <div className="border-t border-neutral-200 px-4 py-3 bg-neutral-50 rounded-b-xl flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setLinkerOpen(false)}
                className="text-xs px-3 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-700 font-semibold border border-neutral-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={selectedClauseIndex === null || (isCrossCategoryMapping() && !justificationText.trim())}
                onClick={handleApplyLink}
                className="text-xs px-4 py-1.5 rounded bg-violet-600 hover:bg-violet-700 text-white font-semibold disabled:opacity-40 transition"
              >
                Link Clause
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
