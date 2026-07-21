import React, { useState } from "react";
import { IngestionRecord, VerificationStatus } from "@/lib/site-feasibility/ingestion-types";
import { FileText, Eye, RefreshCw, AlertCircle, Calendar, Shield, ListTodo } from "lucide-react";
import RuleNormalizationEditor from "./RuleNormalizationEditor";

interface SandboxPanelProps {
  records: IngestionRecord[];
  onUpdateStatus: (id: string, status: VerificationStatus) => Promise<void>;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function SandboxPanel({
  records,
  onUpdateStatus,
  onRefresh,
  isLoading,
}: SandboxPanelProps) {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"evidence" | "normalization">("evidence");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const selectedRecord = records.find((r) => r.id === selectedRecordId);

  const handleStatusChange = async (status: VerificationStatus) => {
    if (!selectedRecord) return;
    setIsSaving(true);
    try {
      await onUpdateStatus(selectedRecord.id, status);
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadgeClass = (status: VerificationStatus) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200";
      case "reviewed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending_review":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center space-x-2">
          <Shield className="text-violet-600" size={18} />
          <h3 className="font-semibold text-neutral-800 text-sm">
            Bye-Law Extraction Sandbox
          </h3>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1 rounded text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition"
          title="Refresh Records"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Info notice about strict review-only behavior */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 text-xs text-blue-800 flex items-start space-x-2">
        <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Strict Review-Only Sandbox:</span> Extracted evidence and verified statuses are saved for provenance tracking and comparison only. They are **not** applied to the live calculator, which continues to use Patna Residential DCR defaults.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Side: Document List */}
        <div className="md:col-span-4 border border-neutral-200 rounded-lg overflow-hidden flex flex-col h-[580px]">
          <div className="bg-neutral-50 border-b border-neutral-200 px-3 py-2.5 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            Ingested Documents ({records.length})
          </div>
          <div className="divide-y divide-neutral-100 overflow-y-auto flex-1 bg-white">
            {records.map((record) => (
              <button
                key={record.id}
                onClick={() => {
                  setSelectedRecordId(record.id);
                  setActiveTab("evidence");
                }}
                className={`w-full text-left p-3 text-xs transition flex flex-col space-y-1 hover:bg-neutral-50 ${
                  selectedRecordId === record.id ? "bg-violet-50/50" : ""
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-neutral-800 truncate max-w-[65%]">
                    {record.evidence.documentMetadata.title}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border ${getStatusBadgeClass(
                      record.verificationStatus
                    )}`}
                  >
                    {record.verificationStatus.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-500 w-full">
                  <span className="truncate max-w-[60%]">
                    Source: {record.sourceUrl === "manual_upload" ? "Manual Upload" : record.sourceUrl}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar size={10} />
                    <span>{new Date(record.extractedAt).toLocaleDateString()}</span>
                  </span>
                </div>
              </button>
            ))}

            {records.length === 0 && (
              <div className="flex flex-col items-center justify-center p-6 text-center h-full text-neutral-400">
                <FileText size={24} className="text-neutral-300 mb-2" />
                <span className="text-xs">No documents ingested yet</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Selected Document Details / Review Sandbox */}
        <div className="md:col-span-8 border border-neutral-200 rounded-lg overflow-hidden flex flex-col h-[580px]">
          {selectedRecord ? (
            <div className="flex flex-col h-full bg-white">
              {/* Sandbox Top Bar & Actions */}
              <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0">
                <span className="text-xs font-bold text-neutral-700">
                  Document Details &amp; Evidence
                </span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleStatusChange("reviewed")}
                    disabled={isSaving}
                    className="text-[10px] px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold border border-neutral-300 disabled:opacity-50 transition"
                  >
                    Mark as Reviewed
                  </button>
                  <button
                    onClick={() => handleStatusChange("verified")}
                    disabled={isSaving}
                    className="text-[10px] px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50 transition"
                  >
                    Mark as Verified
                  </button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-neutral-200 bg-neutral-50 px-4 shrink-0">
                <button
                  onClick={() => setActiveTab("evidence")}
                  className={`text-xs px-4 py-2 border-b-2 font-bold transition flex items-center space-x-1.5 ${
                    activeTab === "evidence"
                      ? "border-violet-600 text-violet-700 bg-white"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <FileText size={14} />
                  <span>Raw Evidence</span>
                </button>
                <button
                  onClick={() => setActiveTab("normalization")}
                  className={`text-xs px-4 py-2 border-b-2 font-bold transition flex items-center space-x-1.5 ${
                    activeTab === "normalization"
                      ? "border-violet-600 text-violet-700 bg-white"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <ListTodo size={14} />
                  <span>Rule Normalization</span>
                </button>
              </div>

              {/* Tab Panel Body */}
              <div className="p-4 overflow-y-auto flex-1 text-xs">
                {activeTab === "evidence" ? (
                  <div className="space-y-4">
                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-3 bg-neutral-50 rounded border border-neutral-100 p-2.5">
                      <div>
                        <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">
                          Title
                        </span>
                        <span className="font-bold text-neutral-700">
                          {selectedRecord.evidence.documentMetadata.title}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">
                          Year / Jurisdiction
                        </span>
                        <span className="font-bold text-neutral-700">
                          {selectedRecord.evidence.documentMetadata.year} ({selectedRecord.evidence.documentMetadata.jurisdiction})
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">
                          Confidence Score
                        </span>
                        <span className={`font-bold ${
                          selectedRecord.confidenceScore >= 0.8
                            ? "text-green-700"
                            : "text-amber-700"
                        }`}>
                          {(selectedRecord.confidenceScore * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">
                          Extraction Method
                        </span>
                        <span className="font-semibold text-neutral-700 uppercase">
                          {selectedRecord.extractionMethod.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    {/* Status Summary */}
                    <div>
                      <span className="font-semibold text-neutral-600 block mb-1">Status Summary:</span>
                      <div className="p-2.5 bg-neutral-50 rounded border border-neutral-100 font-mono text-[10px] text-neutral-600">
                        {selectedRecord.evidence.statusSummary}
                      </div>
                    </div>

                    {/* Occupancy Labels */}
                    <div>
                      <span className="font-semibold text-neutral-600 block mb-1">Occupancy Labels Found:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedRecord.evidence.occupancyLabelsFound.map((label, idx) => (
                          <span
                            key={idx}
                            className="bg-neutral-100 text-neutral-800 text-[10px] px-2 py-0.5 rounded font-semibold border border-neutral-200"
                          >
                            {label}
                          </span>
                        ))}
                        {selectedRecord.evidence.occupancyLabelsFound.length === 0 && (
                          <span className="text-neutral-400 italic">None detected</span>
                        )}
                      </div>
                    </div>

                    {/* Clause Excerpts Accordions */}
                    <div className="space-y-3">
                      <div className="border border-neutral-100 rounded">
                        <div className="bg-neutral-50 px-3 py-1.5 font-bold text-neutral-700 border-b border-neutral-100">
                          Setback Clauses ({selectedRecord.evidence.setbackClauses.length})
                        </div>
                        <div className="p-2 space-y-2">
                          {selectedRecord.evidence.setbackClauses.map((c, i) => (
                            <div key={i} className="p-2 bg-neutral-50/50 rounded border border-neutral-100">
                              <span className="font-semibold text-neutral-600 block text-[10px] mb-0.5">
                                {c.referenceSection} (Page {c.pageNumber})
                              </span>
                              <p className="text-neutral-700 italic font-mono text-[10px]">"{c.excerpt}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border border-neutral-100 rounded">
                        <div className="bg-neutral-50 px-3 py-1.5 font-bold text-neutral-700 border-b border-neutral-100">
                          FAR/FSI Clauses ({selectedRecord.evidence.farClauses.length})
                        </div>
                        <div className="p-2 space-y-2">
                          {selectedRecord.evidence.farClauses.map((c, i) => (
                            <div key={i} className="p-2 bg-neutral-50/50 rounded border border-neutral-100">
                              <span className="font-semibold text-neutral-600 block text-[10px] mb-0.5">
                                {c.referenceSection} (Page {c.pageNumber})
                              </span>
                              <p className="text-neutral-700 italic font-mono text-[10px]">"{c.excerpt}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border border-neutral-100 rounded">
                        <div className="bg-neutral-50 px-3 py-1.5 font-bold text-neutral-700 border-b border-neutral-100">
                          Height Clauses ({selectedRecord.evidence.heightClauses.length})
                        </div>
                        <div className="p-2 space-y-2">
                          {selectedRecord.evidence.heightClauses.map((c, i) => (
                            <div key={i} className="p-2 bg-neutral-50/50 rounded border border-neutral-100">
                              <span className="font-semibold text-neutral-600 block text-[10px] mb-0.5">
                                {c.referenceSection} (Page {c.pageNumber})
                              </span>
                              <p className="text-neutral-700 italic font-mono text-[10px]">"{c.excerpt}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <RuleNormalizationEditor
                    selectedRecord={selectedRecord}
                    onRefreshRecords={onRefresh}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center h-full text-neutral-400 bg-neutral-50">
              <Eye size={24} className="text-neutral-300 mb-2" />
              <span className="text-xs">Select a document from the list to review evidence</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
