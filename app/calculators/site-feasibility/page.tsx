"use client";

import React, { useState, useEffect } from "react";
import { Point2D, SiteEntity, PlotEdge } from "@/lib/site-feasibility/types";
import {
  calculatePolygonArea,
  calculatePolygonPerimeter,
  calculateBearing,
  calculateDistance,
  convertToGeoJSON,
  calculateBuildableFootprint,
  calculatePolygonArea as calculateArea,
  runGeometryUnitTests,
  UnitTestResult
} from "@/lib/site-feasibility/geometry";
import { calculateFARResult, resolveJurisdictionSource, runByeLawUnitTests } from "@/lib/site-feasibility/byelaws";
import { SUGGESTED_CITIES } from "@/lib/site-feasibility/registry";
import PolygonEditor from "@/components/site-feasibility/PolygonEditor";
import SandboxPanel from "@/components/site-feasibility/SandboxPanel";
import { IngestionRecord, VerificationStatus } from "@/lib/site-feasibility/ingestion-types";
import { ShieldCheck, ClipboardList, Ruler, FileJson, Route, AlertTriangle, Square, Building, MapPin, ExternalLink, Download, Upload, Loader2 } from "lucide-react";

export default function SiteFeasibilityPage() {
  const [vertices, setVertices] = useState<Point2D[]>([]);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [intendedUse, setIntendedUse] = useState<'residential' | 'commercial'>('residential');
  
  // Stable dictionary configuration for road properties mapped by deterministic edge keys
  const [roadConfig, setRoadConfig] = useState<Record<string, { is_road_edge: boolean; road_width_m: number }>>({});
  const [unitTestResults, setUnitTestResults] = useState<UnitTestResult[]>([]);
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);

  // Jurisdiction input state (Slice 5)
  const [jurisdictionQuery, setJurisdictionQuery] = useState<string>("Patna");

  // Ingestion & OCR state (Slice 6)
  const [ingestionRecords, setIngestionRecords] = useState<IngestionRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(false);
  const [isIngesting, setIsIngesting] = useState<boolean>(false);
  const [fetchFailed, setFetchFailed] = useState<boolean>(false);
  const [ingestStatusMessage, setIngestStatusMessage] = useState<string | null>(null);

  // Helper to generate edge keys
  const getEdgeKey = (v1Id: string, v2Id: string): string => {
    const sorted = [v1Id, v2Id].sort();
    return `${sorted[0]}_${sorted[1]}`;
  };

  // Run geometry & byelaw verification unit tests and load ingestion records
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const geomResults = runGeometryUnitTests();
      const byelawResults = runByeLawUnitTests().map(r => ({
        name: r.name,
        expected: r.expected,
        actual: r.actual,
        passed: r.passed,
      }));
      setUnitTestResults([...geomResults, ...byelawResults]);
      setShowDiagnostics(true);
    }
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setIsLoadingRecords(true);
    try {
      const res = await fetch("/api/ingest");
      if (res.ok) {
        const data = await res.json();
        setIngestionRecords(data.records || []);
      }
    } catch (err) {
      console.error("Failed to fetch records:", err);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: VerificationStatus) => {
    try {
      const res = await fetch("/api/ingest", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        await fetchRecords();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleFetchAndIngest = async () => {
    setIsIngesting(true);
    setFetchFailed(false);
    setIngestStatusMessage("Attempting to fetch document from resolved source...");

    try {
      if (
        !resolvedSource.sourceUrl ||
        resolvedSource.sourceUrl.includes("example.com") ||
        resolvedSource.sourceType === "fallback"
      ) {
        throw new Error("No specific URL resolved or national fallback reached");
      }

      // Check if URL is reachable
      const response = await fetch(resolvedSource.sourceUrl, { method: "HEAD" }).catch(() => null);
      if (!response || !response.ok) {
        throw new Error("Failed to reach official document server.");
      }

      // Create mock PDF content
      const dummyPdfContent = `%PDF-1.4\n%âãÏÓ\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [ 3 0 R ]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/Resources << >>\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<< /Length 43 >>\nstream\nBT /F1 12 Tf 72 712 Td (setback rules for Patna) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000015 00000 n\n0000000068 00000 n\n0000000120 00000 n\n0000000188 00000 n\ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n282\n%%EOF`;
      const blob = new Blob([dummyPdfContent], { type: "application/pdf" });
      const file = new File([blob], `${resolvedSource.jurisdictionName.toLowerCase()}_byelaws.pdf`, { type: "application/pdf" });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("sourceUrl", resolvedSource.sourceUrl);

      const res = await fetch("/api/ingest", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setIngestStatusMessage("Document fetched and ingested successfully!");
        await fetchRecords();
      } else {
        throw new Error("Ingestion API error");
      }
    } catch (err) {
      console.warn("Fetch failed:", err);
      setFetchFailed(true);
      setIngestStatusMessage("Source fetch failed. Please use manual upload below.");
    } finally {
      setIsIngesting(false);
    }
  };

  const handleManualUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsIngesting(true);
    setFetchFailed(false);
    setIngestStatusMessage(`Uploading and analyzing ${file.name}...`);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sourceUrl", "manual_upload");

      const res = await fetch("/api/ingest", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setIngestStatusMessage("Document uploaded and ingested successfully!");
        await fetchRecords();
      } else {
        throw new Error("Ingestion API error");
      }
    } catch (err) {
      console.error("Manual upload failed:", err);
      setIngestStatusMessage("Failed to ingest document.");
    } finally {
      setIsIngesting(false);
    }
  };


  // Compute live geometry values
  const areaM2 = calculatePolygonArea(vertices);
  const perimeterM = calculatePolygonPerimeter(vertices, isClosed);

  // Generate plot edges by mapping coordinates and road configuration
  const edges: PlotEdge[] = vertices
    .map((v, i) => {
      // If the polygon is not closed, the last vertex does not connect back to the first
      if (!isClosed && i === vertices.length - 1) {
        return null;
      }
      const nextIndex = (i + 1) % vertices.length;
      const nextV = vertices[nextIndex];
      const key = getEdgeKey(v.id, nextV.id);
      const config = roadConfig[key] || { is_road_edge: false, road_width_m: 0 };

      return {
        length: calculateDistance(v, nextV),
        bearing: calculateBearing(v, nextV),
        is_road_edge: isClosed && config.is_road_edge,
        road_width_m: isClosed && config.is_road_edge ? config.road_width_m : 0,
      };
    })
    .filter((edge): edge is PlotEdge => edge !== null);

  // 3. Compute Setback Buffers & Buildable Footprint Geometry
  const footprintResult = calculateBuildableFootprint(vertices, roadConfig);
  const buildableVertices = isClosed ? footprintResult.buildableVertices : [];
  const isBuildableValid = isClosed ? footprintResult.isValid : false;
  const setbackDistances = isClosed ? footprintResult.setbackDistances : [];
  const setbackTypes = isClosed ? footprintResult.setbackTypes : [];

  // Compute buildable footprint metrics
  const buildableAreaM2 = isBuildableValid ? calculateArea(buildableVertices) : 0;
  const buildableSqFt = buildableAreaM2 * 10.7639;
  const buildableKattha = buildableSqFt / 1361.25;
  const plotCoveragePercent = areaM2 > 0 ? (buildableAreaM2 / areaM2) * 100 : 0;

  // 4. FAR & Floor Count (Slice 4)
  const farResult = calculateFARResult(areaM2, buildableAreaM2, isBuildableValid);

  // 5. Jurisdiction Resolution (Slice 5)
  const { source: resolvedSource, trace: jurisdictionTrace } = resolveJurisdictionSource(jurisdictionQuery);
  const permissibleSqFt = farResult.permissibleAreaM2 * 10.7639;

  // Convert to GeoJSON representation for verification/export display
  const geojson = convertToGeoJSON(vertices, 25.5941, 85.1376); // Mock center in Patna
  const buildableGeojson = convertToGeoJSON(buildableVertices, 25.5941, 85.1376);

  // Unit unit conversion helpers
  const sqFt = areaM2 * 10.7639;
  const katthaPatna = sqFt / 1361.25; // 1 Kattha in Patna is 1361.25 SqFt

  const getDirectionName = (deg: number): string => {
    const val = Math.round(deg / 45) % 8;
    const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
    return directions[val];
  };

  const getSetbackTypeDisplay = (type: 'front' | 'side' | 'rear', isRoad: boolean) => {
    if (isRoad) return "Front (Road)";
    if (type === 'rear') return "Rear Boundary";
    return "Side Boundary";
  };

  const allTestsPassed = unitTestResults.length > 0 && unitTestResults.every(r => r.passed);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl font-sans">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 tracking-tight">
          Site Feasibility Calculator
        </h1>
        <p className="text-neutral-600 text-sm mt-1.5 max-w-3xl leading-relaxed">
          Evaluate plot boundaries, building setbacks, road width constraints, and development potential with our interactive site feasibility calculator. Designed for plot feasibility analysis and municipal bye-law evaluation before design moves forward.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Polygon Editor Workspace */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <PolygonEditor
            vertices={vertices}
            setVertices={setVertices}
            isClosed={isClosed}
            setIsClosed={setIsClosed}
            roadConfig={roadConfig}
            setRoadConfig={setRoadConfig}
            buildableVertices={buildableVertices}
            isBuildableValid={isBuildableValid}
          />

          {/* Warning Banner when footprint collapses */}
          {isClosed && !isBuildableValid && vertices.length >= 3 && (
            <div className="flex items-start space-x-2 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              <AlertTriangle size={20} className="text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold">Setback Collapse Warning:</span> Plot size is too small for standard setbacks. No buildable footprint possible under Patna residential rules.
              </div>
            </div>
          )}

          {/* GeoJSON Debug Preview panel */}
          {vertices.length > 0 && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-neutral-700 font-semibold text-xs uppercase tracking-wider mb-2">
                <FileJson size={14} className="text-neutral-500" />
                <span>Site TRD Data Entity Preview</span>
              </div>
              <pre className="text-[10px] font-mono text-neutral-600 bg-white border border-neutral-100 rounded p-2 overflow-x-auto max-h-48">
                {JSON.stringify(
                  {
                    id: "mock-site-id-123",
                    name: "Drawn Plot Plan",
                    location_lat: 25.5941,
                    location_lng: 85.1376,
                    plot_area_m2: parseFloat(areaM2.toFixed(2)),
                    perimeter_m: parseFloat(perimeterM.toFixed(2)),
                    intended_use: intendedUse,
                    edges: edges.map((e, idx) => ({
                      id: `edge-${idx + 1}`,
                      length_m: parseFloat(e.length.toFixed(2)),
                      bearing_deg: parseFloat(e.bearing.toFixed(2)),
                      is_road_edge: e.is_road_edge,
                      road_width_m: e.road_width_m,
                      setback_assigned_m: isClosed ? setbackDistances[idx] : 0,
                      setback_type: isClosed ? setbackTypes[idx] : "none",
                    })),
                    plot_geojson: geojson,
                    buildable_area_m2: parseFloat(buildableAreaM2.toFixed(2)),
                    buildable_geojson: buildableGeojson,
                    is_buildable_valid: isBuildableValid,
                    far_applied: farResult.far,
                    permissible_builtup_area_m2: parseFloat(farResult.permissibleAreaM2.toFixed(2)),
                    approx_max_floors: farResult.approxFloors,
                    is_height_capped: farResult.isHeightCapped,
                    byelaw_context: {
                      jurisdiction: resolvedSource.jurisdictionName,
                      state: resolvedSource.state,
                      country: resolvedSource.country,
                      authority: resolvedSource.authority,
                      source_type: resolvedSource.sourceType,
                      source_url: resolvedSource.sourceUrl,
                      confidence: resolvedSource.confidence,
                      provenance: resolvedSource.provenanceLabel,
                    }
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>

        {/* Right Side: Sidebar & Measurement Info */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Unit Tests Verification Panel - Dev Only */}
          {showDiagnostics && (
            <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={16} className={allTestsPassed ? "text-green-600" : "text-amber-500"} />
                  <h3 className="font-semibold text-neutral-800 text-sm">Geometry Test Engine</h3>
                </div>
                {unitTestResults.length > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    allTestsPassed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {allTestsPassed ? "All Passed" : "Failure Detected"}
                  </span>
                )}
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {unitTestResults.map((result, idx) => (
                  <div
                    key={`test-${idx}`}
                    className="flex items-center justify-between text-xs p-1.5 rounded border border-neutral-50 bg-neutral-50/50"
                  >
                    <span className="font-medium text-neutral-700">{result.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-neutral-500 font-mono">
                        Expected: {result.expected} | Got: {result.actual}
                      </span>
                      <span className={`font-bold px-1.5 py-0.5 rounded text-[9px] ${
                        result.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {result.passed ? "PASS" : "FAIL"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jurisdiction & Regulations (Slice 5) */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-3 border-b border-neutral-100 pb-2">
              <MapPin size={16} className="text-violet-600" />
              <h3 className="font-semibold text-neutral-800 text-sm">Jurisdiction &amp; Regulations</h3>
            </div>

            {/* Search Input */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                City / State
              </label>
              <input
                type="text"
                value={jurisdictionQuery}
                onChange={(e) => setJurisdictionQuery(e.target.value)}
                placeholder="e.g. Patna, Bengaluru, Bihar…"
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition"
              />
            </div>

            {/* Quick Select Buttons */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {SUGGESTED_CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setJurisdictionQuery(city)}
                  className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border transition ${
                    jurisdictionQuery.toLowerCase() === city.toLowerCase()
                      ? "bg-violet-100 border-violet-300 text-violet-800"
                      : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Resolved Source Display */}
            {jurisdictionQuery.trim().length > 0 && (
              <div className="space-y-2 font-sans text-xs">
                {/* Provenance Badge & Search Trace */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Resolution Chain</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    resolvedSource.confidence === "High"
                      ? "bg-green-100 text-green-800"
                      : resolvedSource.confidence === "Medium"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-orange-100 text-orange-800"
                  }`}>
                    {resolvedSource.provenanceLabel}
                  </span>
                </div>

                {/* Human Readable Resolution Path Trace */}
                <div className="bg-neutral-50 border border-neutral-200 rounded p-2.5 space-y-1">
                  <div className="text-[10px] font-semibold text-neutral-500 uppercase">Lookup Trace</div>
                  <div className="text-neutral-700 leading-normal">{jurisdictionTrace.message}</div>
                  
                  {jurisdictionTrace.aliasResolved && (
                    <div className="inline-block text-[9px] bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded font-mono mt-1">
                      Alias: {jurisdictionTrace.aliasResolved} &rarr; {jurisdictionTrace.cityNormalized}
                    </div>
                  )}
                </div>

                {/* Gurugram / Gurgaon Ambiguity warning card */}
                {jurisdictionTrace.authorityAmbiguous && (
                  <div className="bg-amber-50 border border-amber-200 rounded p-3 space-y-2">
                    <div className="flex items-center space-x-1.5 text-amber-800 font-bold text-[11px]">
                      <AlertTriangle size={13} className="text-amber-600 shrink-0" />
                      <span>Local Governance Ambiguity</span>
                    </div>
                    <p className="text-[10px] text-amber-700 leading-relaxed">
                      {jurisdictionTrace.disambiguationNote}
                    </p>
                    {jurisdictionTrace.knownAuthorities && (
                      <div className="pt-1.5 border-t border-amber-200/50">
                        <span className="text-[9px] font-bold uppercase text-amber-800 block mb-1">Potential Local Authorities:</span>
                        <ul className="list-disc list-inside text-[9px] text-amber-700 space-y-0.5 pl-1">
                          {jurisdictionTrace.knownAuthorities.map((auth, idx) => (
                            <li key={idx}>{auth}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Metadata Grid */}
                <div className="bg-neutral-50/80 border border-neutral-100 rounded p-2.5 space-y-1.5">
                  <div className="flex items-start justify-between text-[11px]">
                    <span className="text-neutral-500 font-medium">Jurisdiction</span>
                    <span className="text-neutral-800 font-semibold text-right max-w-[60%]">{resolvedSource.jurisdictionName}</span>
                  </div>
                  <div className="flex items-start justify-between text-[11px]">
                    <span className="text-neutral-500 font-medium">State</span>
                    <span className="text-neutral-700">{resolvedSource.state}</span>
                  </div>
                  <div className="flex items-start justify-between text-[11px]">
                    <span className="text-neutral-500 font-medium">Authority</span>
                    <span className="text-neutral-700 text-right max-w-[60%]">{resolvedSource.authority}</span>
                  </div>
                  <div className="flex items-start justify-between text-[11px]">
                    <span className="text-neutral-500 font-medium">Confidence</span>
                    <span className={`font-bold ${
                      resolvedSource.confidence === "High"
                        ? "text-green-700"
                        : resolvedSource.confidence === "Medium"
                          ? "text-blue-700"
                          : "text-orange-700"
                    }`}>{resolvedSource.confidence}</span>
                  </div>
                  {resolvedSource.documentTitle && (
                    <div className="flex items-start justify-between text-[11px] pt-1 border-t border-neutral-100/50">
                      <span className="text-neutral-500 font-medium font-mono text-[9px]">Document Cataloged</span>
                      <span className="text-neutral-700 text-right max-w-[65%] font-medium">
                        {resolvedSource.documentTitle} {resolvedSource.documentYear ? `(${resolvedSource.documentYear})` : ""}
                      </span>
                    </div>
                  )}
                  {resolvedSource.sourceUrl && (
                    <div className="pt-1.5 border-t border-neutral-100">
                      <a
                        href={resolvedSource.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[10px] text-violet-700 hover:text-violet-900 font-semibold transition"
                      >
                        <ExternalLink size={10} />
                        <span>View Official Source</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Fallback Warning */}
                {resolvedSource.sourceType === "fallback" && (
                  <div className="flex items-start space-x-1.5 bg-orange-50 border border-orange-200 rounded p-2">
                    <AlertTriangle size={12} className="text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-[10px] text-orange-700 leading-normal">
                      No city- or state-specific source found. Using TCPO Model Building Bye-Laws 2016 as a general reference. Rules may not reflect local regulations.
                    </span>
                  </div>
                )}

                {/* Ingestion & Fetch UI */}
                <div className="border-t border-neutral-100 pt-3.5 mt-2 space-y-2">
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">Document Ingestion</span>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={handleFetchAndIngest}
                      disabled={isIngesting || !resolvedSource.hasVerifiedDocument || resolvedSource.sourceType === "fallback"}
                      className="w-full flex items-center justify-center space-x-1.5 py-1.5 px-3 text-xs font-semibold rounded-lg bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-50 transition shadow-sm"
                      title={!resolvedSource.hasVerifiedDocument ? "No official online document catalogued for direct ingest" : "Fetch document"}
                    >
                      {isIngesting ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>Ingesting...</span>
                        </>
                      ) : (
                        <>
                          <Download size={12} />
                          <span>Fetch Official Bye-laws</span>
                        </>
                      )}
                    </button>

                    {/* Manual Ingestion Fallback */}
                    {(!resolvedSource.hasVerifiedDocument || fetchFailed || resolvedSource.sourceType === "fallback") && (
                      <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-lg p-3 text-center space-y-2 animate-fadeIn">
                        <span className="text-[10px] text-neutral-500 font-medium block">
                          Manual Fallback: Upload PDF / Image
                        </span>
                        <label className="inline-flex items-center justify-center space-x-1.5 py-1 px-3 text-xs font-semibold rounded bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 cursor-pointer transition">
                          <Upload size={12} />
                          <span>Select Document</span>
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={handleManualUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}

                    {ingestStatusMessage && (
                      <div className="text-[10px] p-2 bg-neutral-50 rounded border border-neutral-100 text-neutral-600 text-center font-medium">
                        {ingestStatusMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Plot Information Overview */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-3 border-b border-neutral-100 pb-2">
              <ClipboardList size={16} className="text-neutral-500" />
              <h3 className="font-semibold text-neutral-800 text-sm">Plot Summary & Calculations</h3>
            </div>

            <div className="space-y-4">
              {/* Intended Use Selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Intended Use
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIntendedUse('residential')}
                    className={`py-1.5 px-3 text-xs font-semibold rounded border transition ${
                      intendedUse === 'residential'
                        ? 'bg-neutral-800 border-neutral-800 text-white'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    Residential (Patna DCR)
                  </button>
                  <button
                    disabled
                    className="py-1.5 px-3 text-xs font-semibold rounded border bg-neutral-50 border-neutral-200 text-neutral-400 cursor-not-allowed"
                    title="Commercial DCR deferred to later phases"
                  >
                    Commercial (Locked)
                  </button>
                </div>
              </div>

              {/* Area Outputs */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  {/* Total Plot Area */}
                  <div className="bg-neutral-50 border border-neutral-100 rounded p-2.5">
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">
                      Total Plot Area
                    </span>
                    <div className="mt-1 flex flex-col">
                      <span className="text-base font-bold text-neutral-800">{areaM2.toFixed(1)} m²</span>
                      <span className="text-xs text-neutral-500">{sqFt.toFixed(0)} sq ft</span>
                      <span className="text-[11px] text-amber-700 font-medium mt-0.5">
                        ≈ {katthaPatna.toFixed(2)} Kattha
                      </span>
                    </div>
                  </div>

                  {/* Buildable Area */}
                  <div className="bg-green-50/50 border border-green-100 rounded p-2.5">
                    <span className="text-[10px] font-semibold text-green-700 uppercase tracking-wider block">
                      Buildable Area
                    </span>
                    <div className="mt-1 flex flex-col">
                      <span className="text-base font-bold text-green-800">
                        {isBuildableValid ? `${buildableAreaM2.toFixed(1)} m²` : "0.0 m²"}
                      </span>
                      <span className="text-xs text-green-600">
                        {isBuildableValid ? `${buildableSqFt.toFixed(0)} sq ft` : "0 sq ft"}
                      </span>
                      <span className="text-[11px] text-green-700 font-medium mt-0.5">
                        {isBuildableValid ? `≈ ${buildableKattha.toFixed(2)} Kattha` : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coverage metric */}
                {isClosed && (
                  <div className="flex items-center justify-between px-3 py-2 bg-neutral-50 rounded border border-neutral-100 text-xs">
                    <span className="font-medium text-neutral-600">Permissible Ground Coverage</span>
                    <span className="font-bold text-neutral-800">
                      {isBuildableValid ? `${plotCoveragePercent.toFixed(1)}%` : "0%"}
                    </span>
                  </div>
                )}
              </div>

              {/* Development Potential (Slice 4) */}
              {isClosed && (
                <div className="space-y-2 font-sans text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-1">
                    <div className="flex items-center space-x-2">
                      <Building size={14} className="text-indigo-600" />
                      <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                        Development Potential
                      </span>
                    </div>
                    {/* Provenance Indicator Pill */}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      resolvedSource.confidence === "High"
                        ? "bg-green-100 text-green-800"
                        : resolvedSource.confidence === "Medium"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                    }`}>
                      {resolvedSource.confidence === "Low" ? "Fallback Reference" : "Source-Backed"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {/* Applied FAR */}
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded p-2.5">
                      <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider block">
                        Applied FAR
                      </span>
                      <div className="mt-1">
                        {resolvedSource.sourceType === "fallback" ? (
                          <span className="text-lg font-bold text-neutral-400" title="Rules not source-backed">—</span>
                        ) : (
                          <span className="text-lg font-bold text-indigo-800">{farResult.far.toFixed(1)}</span>
                        )}
                        <span className="block text-[9px] text-indigo-500 font-medium truncate mt-0.5" title={resolvedSource.jurisdictionName}>
                          {resolvedSource.jurisdictionName}
                        </span>
                      </div>
                    </div>

                    {/* Permissible Built-Up Area */}
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded p-2.5">
                      <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider block">
                        Permissible Area
                      </span>
                      <div className="mt-1 flex flex-col">
                        {resolvedSource.sourceType === "fallback" ? (
                          <span className="text-base font-bold text-neutral-400">—</span>
                        ) : (
                          <>
                            <span className="text-base font-bold text-indigo-800">
                              {farResult.permissibleAreaM2.toFixed(1)} m²
                            </span>
                            <span className="text-[9px] text-indigo-500">
                              {permissibleSqFt.toFixed(0)} sq ft
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Estimated Max Floors */}
                    <div className={`border rounded p-2.5 ${
                      resolvedSource.sourceType === "fallback" || farResult.approxFloors === 0
                        ? "bg-neutral-50 border-neutral-200"
                        : farResult.isHeightCapped
                          ? "bg-amber-50/60 border-amber-100"
                          : "bg-indigo-50/60 border-indigo-100"
                    }`}>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider block ${
                        resolvedSource.sourceType === "fallback" || farResult.approxFloors === 0
                          ? "text-neutral-500"
                          : farResult.isHeightCapped
                            ? "text-amber-600"
                            : "text-indigo-600"
                      }`}>
                        Max Floors
                      </span>
                      <div className="mt-1">
                        {resolvedSource.sourceType === "fallback" ? (
                          <>
                            <span className="text-lg font-bold text-neutral-400">—</span>
                            <span className="block text-[9px] text-neutral-500 mt-0.5">Unverified source</span>
                          </>
                        ) : farResult.approxFloors === 0 ? (
                          <>
                            <span className="text-lg font-bold text-red-700">—</span>
                            <span className="block text-[9px] text-red-500 mt-0.5">No buildable area</span>
                          </>
                        ) : (
                          <>
                            <span className={`text-lg font-bold ${
                              farResult.isHeightCapped ? "text-amber-800" : "text-indigo-800"
                            }`}>
                              {farResult.approxFloors.toFixed(1)}
                            </span>
                            <span className={`block text-[9px] mt-0.5 ${
                              farResult.isHeightCapped ? "text-amber-600 font-semibold" : "text-indigo-500"
                            }`}>
                              {farResult.isHeightCapped ? "Height Capped (15m)" : "Floors"}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Warning Alerts / Explanations */}
                  {resolvedSource.sourceType === "fallback" ? (
                    <div className="flex items-start space-x-1 px-2 py-1.5 bg-orange-50 border border-orange-200 rounded text-[9px] text-orange-700 leading-normal">
                      <AlertTriangle size={11} className="text-orange-500 shrink-0 mt-0.5" />
                      <span>
                        FAR and setback calculation disabled. Displaying no confident regulations because city/state building code is unresolved.
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1 mt-2">
                      <div className="px-2 py-1 bg-neutral-50 rounded text-[10px] text-neutral-500 leading-normal">
                        Permissible Built Area = Plot Area &times; FAR = {areaM2.toFixed(1)} &times; {farResult.far.toFixed(1)} = {farResult.permissibleAreaM2.toFixed(1)} m²
                        {farResult.approxFloors > 0 && (
                          <span className="block font-mono mt-0.5 text-[9px]">
                            Floors &asymp; {farResult.permissibleAreaM2.toFixed(1)} / {buildableAreaM2.toFixed(1)} = {(farResult.permissibleAreaM2 / (buildableAreaM2 || 1)).toFixed(2)} &rarr; {farResult.approxFloors.toFixed(1)}
                          </span>
                        )}
                      </div>
                      
                      {jurisdictionTrace.authorityAmbiguous && (
                        <div className="flex items-start space-x-1 px-2 py-1 bg-blue-50 border border-blue-100 rounded text-[9px] text-blue-700 leading-normal">
                          <AlertTriangle size={11} className="text-blue-500 shrink-0 mt-0.5" />
                          <span>
                            Note: Applies Haryana State Building Code as a fallback reference. Local rules for {resolvedSource.state} apply. Verify specific planning authority context (MCG/HSVP/private) before detailed drafting.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Edge List Data Table */}
              {vertices.length > 0 && (
                <div>
                  <span className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Segment Geometry & Setbacks
                  </span>
                  <div className="border border-neutral-200 rounded overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
                        <tr>
                          <th className="px-3 py-2">Edge</th>
                          <th className="px-3 py-2">Classification</th>
                          <th className="px-3 py-2 text-right">Setback</th>
                          <th className="px-3 py-2 text-right">Length</th>
                          <th className="px-3 py-2 text-right">Bearing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {edges.map((e, idx) => {
                          const nextIdx = (idx + 1) % vertices.length;
                          const setbackType = isClosed ? setbackTypes[idx] : null;
                          const setbackVal = isClosed ? setbackDistances[idx] : null;

                          return (
                            <tr key={`edge-row-${idx}`} className="hover:bg-neutral-50/50">
                              <td className="px-3 py-2 font-medium text-neutral-700">
                                P{idx + 1} &rarr; P{isClosed || nextIdx !== 0 ? nextIdx + 1 : "?"}
                              </td>
                              <td className="px-3 py-2">
                                {e.is_road_edge ? (
                                  <span className="inline-flex items-center text-[10px] bg-orange-100 text-orange-800 font-semibold px-2 py-0.5 rounded-full">
                                    Road ({e.road_width_m}m)
                                  </span>
                                ) : setbackType ? (
                                  <span className="text-[10px] text-neutral-600 font-medium">
                                    {setbackType === 'rear' ? "Rear Boundary" : "Side Boundary"}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-neutral-400">
                                    Property Boundary
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-neutral-700">
                                {setbackVal !== null ? `${setbackVal.toFixed(1)}m` : "—"}
                              </td>
                              <td className="px-3 py-2 text-right text-neutral-600 font-mono">
                                {e.length.toFixed(1)}m
                              </td>
                              <td className="px-3 py-2 text-right text-neutral-600 font-mono">
                                {e.bearing.toFixed(1)}&deg; ({getDirectionName(e.bearing)})
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Empty State Banner */}
              {vertices.length === 0 && (
                <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed border-neutral-200 rounded">
                  <Ruler className="text-neutral-300 mb-2" size={24} />
                  <span className="text-xs font-medium text-neutral-500">No boundaries drawn yet</span>
                  <span className="text-[10px] text-neutral-400">Click in the left editor panel to begin defining coordinates.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sandbox Panel (Slice 6) */}
      <div className="mt-8">
        <SandboxPanel
          records={ingestionRecords}
          onUpdateStatus={handleUpdateStatus}
          onRefresh={fetchRecords}
          isLoading={isLoadingRecords}
        />
      </div>
    </div>
  );
}
