"use client";

import React, { useState, useRef, useEffect } from "react";
import { Point2D, PlotEdge } from "@/lib/site-feasibility/types";
import { calculateDistance, calculateOutwardNormalOffset } from "@/lib/site-feasibility/geometry";
import { 
  DrawingUnit, 
  formatLength, 
  formatLengthShort, 
  applyOrthoConstraint, 
  applyGridSnap 
} from "@/lib/site-feasibility/units";
import { 
  Trash2, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle2, 
  Route, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Move, 
  Grid, 
  Lock, 
  Ruler 
} from "lucide-react";

interface PolygonEditorProps {
  vertices: Point2D[];
  setVertices: (vertices: Point2D[]) => void;
  isClosed: boolean;
  setIsClosed: (closed: boolean) => void;
  roadConfig: Record<string, { is_road_edge: boolean; road_width_m: number }>;
  setRoadConfig: React.Dispatch<React.SetStateAction<Record<string, { is_road_edge: boolean; road_width_m: number }>>>;
  buildableVertices: Point2D[];
  isBuildableValid: boolean;
}

const SCALE = 4; // 1 meter = 4 pixels
const SVG_WIDTH = 600;
const SVG_HEIGHT = 450;

export default function PolygonEditor({
  vertices,
  setVertices,
  isClosed,
  setIsClosed,
  roadConfig,
  setRoadConfig,
  buildableVertices,
  isBuildableValid,
}: PolygonEditorProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Interactive Tools State
  const [unit, setUnit] = useState<DrawingUnit>("m");
  const [isOrthoMode, setIsOrthoMode] = useState<boolean>(false);
  const [isSnapEnabled, setIsSnapEnabled] = useState<boolean>(false);
  
  // Zoom & Pan State
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: SVG_WIDTH, h: SVG_HEIGHT });
  const [isPanMode, setIsPanMode] = useState<boolean>(false);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ screenX: number; screenY: number; viewBoxX: number; viewBoxY: number } | null>(null);

  const [hoverCoords, setHoverCoords] = useState<Point2D | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveringFirstVertex, setHoveringFirstVertex] = useState<boolean>(false);
  
  // Track which road-width bubble popover is currently open
  const [activeBubbleKey, setActiveBubbleKey] = useState<string | null>(null);

  // Helper to generate edge keys
  const getEdgeKey = (v1Id: string, v2Id: string): string => {
    const sorted = [v1Id, v2Id].sort();
    return `${sorted[0]}_${sorted[1]}`;
  };

  // Convert screen coordinates to local meter coordinates using inverse CTM
  const screenToMeters = (clientX: number, clientY: number): Point2D => {
    if (!svgRef.current) return { id: "", x: 0, y: 0 };
    
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    
    // Matrix transform screen coordinate directly to SVG coordinate system
    const svgPoint = pt.matrixTransform(svg.getScreenCTM()!.inverse());

    return {
      id: "", // Will be assigned on point placement
      x: svgPoint.x / SCALE,
      y: (SVG_HEIGHT - svgPoint.y) / SCALE,
    };
  };

  // Convert local meter coordinates to screen viewBox coordinates
  const metersToScreen = (p: Point2D) => {
    return {
      x: p.x * SCALE,
      y: SVG_HEIGHT - p.y * SCALE,
    };
  };

  // Setup Wheel Zoom Event Listener to allow Zooming
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      
      setViewBox(prev => {
        const rect = svg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Find position under cursor in current SVG user coordinate space
        const svgX = prev.x + (mouseX / rect.width) * prev.w;
        const svgY = prev.y + (mouseY / rect.height) * prev.h;
        
        // Zoom factor: zoom in (scroll up, deltaY < 0) or out (scroll down, deltaY > 0)
        const zoomFactor = e.deltaY > 0 ? 1.15 : 0.87;
        const newW = Math.max(60, Math.min(3000, prev.w * zoomFactor));
        const newH = newW * (SVG_HEIGHT / SVG_WIDTH);
        
        const newX = svgX - (mouseX / rect.width) * newW;
        const newY = svgY - (mouseY / rect.height) * newH;
        
        return {
          x: newX,
          y: newY,
          w: newW,
          h: newH,
        };
      });
    };

    svg.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => {
      svg.removeEventListener("wheel", handleWheelNative);
    };
  }, []);

  const handleZoom = (factor: number) => {
    setViewBox(prev => {
      const newW = Math.max(60, Math.min(3000, prev.w * factor));
      const newH = newW * (SVG_HEIGHT / SVG_WIDTH);
      
      // Zoom relative to center
      const centerX = prev.x + prev.w / 2;
      const centerY = prev.y + prev.h / 2;
      
      return {
        x: centerX - newW / 2,
        y: centerY - newH / 2,
        w: newW,
        h: newH,
      };
    });
  };

  const handleResetView = () => {
    setViewBox({ x: 0, y: 0, w: SVG_WIDTH, h: SVG_HEIGHT });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    // 1. Pan Drag Processing
    if (isPanMode && isPanning && panStart && svgRef.current) {
      const dx = e.clientX - panStart.screenX;
      const dy = e.clientY - panStart.screenY;
      
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = viewBox.w / rect.width;
      const scaleY = viewBox.h / rect.height;
      
      setViewBox({
        ...viewBox,
        x: panStart.viewBoxX - dx * scaleX,
        y: panStart.viewBoxY - dy * scaleY,
      });
      return;
    }

    let coords = screenToMeters(e.clientX, e.clientY);

    // 2. Snap & Ortho processing for drawing context
    if (vertices.length > 0 && !isClosed && !isPanMode) {
      const lastVertex = vertices[vertices.length - 1];

      if (isSnapEnabled) {
        let snapped = applyGridSnap(coords);
        
        // Check vertex snap proximity
        const rect = svgRef.current?.getBoundingClientRect();
        const screenPixelToMeters = rect ? (viewBox.w / rect.width) / SCALE : 0.25;
        const thresholdMeters = 12 * screenPixelToMeters; // 12 pixels window
        
        for (const v of vertices) {
          const dist = calculateDistance(coords, v);
          if (dist < thresholdMeters) {
            snapped = { x: v.x, y: v.y };
            break;
          }
        }
        coords = { ...coords, x: snapped.x, y: snapped.y };
      }

      if (isOrthoMode) {
        const orthoCoords = applyOrthoConstraint(lastVertex, coords);
        coords = { ...coords, x: orthoCoords.x, y: orthoCoords.y };
      }
    }

    setHoverCoords(coords);

    // 3. Close Snapping ring logic
    if (vertices.length >= 3 && !isClosed) {
      const firstScr = metersToScreen(vertices[0]);
      const currentScr = metersToScreen(coords);
      const dist = Math.sqrt(
        Math.pow(currentScr.x - firstScr.x, 2) + Math.pow(currentScr.y - firstScr.y, 2)
      );
      setHoveringFirstVertex(dist < 15);
    } else {
      setHoveringFirstVertex(false);
    }

    // 4. Vertex dragging logic
    if (draggedIndex !== null) {
      let updatedCoords = screenToMeters(e.clientX, e.clientY);
      if (isSnapEnabled) {
        const snapped = applyGridSnap(updatedCoords);
        updatedCoords = { ...updatedCoords, x: snapped.x, y: snapped.y };
      }
      const updated = [...vertices];
      updated[draggedIndex] = {
        ...updated[draggedIndex],
        x: updatedCoords.x,
        y: updatedCoords.y,
      };
      setVertices(updated);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isPanMode) {
      setIsPanning(true);
      setPanStart({
        screenX: e.clientX,
        screenY: e.clientY,
        viewBoxX: viewBox.x,
        viewBoxY: viewBox.y,
      });
      return;
    }

    if (isClosed) return;

    if (hoveringFirstVertex && vertices.length >= 3) {
      setIsClosed(true);
      setHoveringFirstVertex(false);
      return;
    }

    if (hoverCoords) {
      const coords = { ...hoverCoords };
      coords.id = `v_${Math.random().toString(36).substring(2, 9)}`;
      setVertices([...vertices, coords]);
    }
  };

  const handleVertexMouseDown = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPanMode) return;
    setDraggedIndex(index);
    setActiveBubbleKey(null); // Close popovers while dragging
  };

  const handleEdgeClick = (e: React.MouseEvent, v1: Point2D, v2: Point2D) => {
    e.stopPropagation();
    if (!isClosed || isPanMode) return;
    
    const key = getEdgeKey(v1.id, v2.id);
    const current = roadConfig[key] || { is_road_edge: false, road_width_m: 6.0 };
    
    const newRoadStatus = !current.is_road_edge;
    
    setRoadConfig(prev => ({
      ...prev,
      [key]: {
        is_road_edge: newRoadStatus,
        road_width_m: current.road_width_m || 6.0
      }
    }));

    if (!newRoadStatus && activeBubbleKey === key) {
      setActiveBubbleKey(null); // Close popover if edge disabled
    }
  };

  const handleBubbleClick = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    if (isPanMode) return;
    setActiveBubbleKey(activeBubbleKey === key ? null : key);
  };

  const updateRoadWidth = (key: string, width: number) => {
    setRoadConfig(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        road_width_m: width
      }
    }));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDraggedIndex(null);
      setIsPanning(false);
      setPanStart(null);
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const resetCanvas = () => {
    setVertices([]);
    setIsClosed(false);
    setDraggedIndex(null);
    setHoveringFirstVertex(false);
    setRoadConfig({});
    setActiveBubbleKey(null);
    handleResetView();
  };

  const removeVertex = (index: number) => {
    const vertexToRemove = vertices[index];
    const updated = vertices.filter((_, i) => i !== index);
    
    // Clean up road configurations associated with deleted vertex
    const newRoadConfig = { ...roadConfig };
    Object.keys(newRoadConfig).forEach(key => {
      if (key.includes(vertexToRemove.id)) {
        delete newRoadConfig[key];
      }
    });

    setVertices(updated);
    setRoadConfig(newRoadConfig);
    setActiveBubbleKey(null);

    if (updated.length < 3) {
      setIsClosed(false);
    }
  };

  // Build points strings for SVG shapes
  const getPointsString = (pts: Point2D[]) => {
    return pts
      .map((p) => {
        const scr = metersToScreen(p);
        return `${scr.x},${scr.y}`;
      })
      .join(" ");
  };

  const outerPointsStr = getPointsString(vertices);
  const innerPointsStr = getPointsString(buildableVertices);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm relative"
    >
      {/* Editor Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-2 gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-neutral-800 text-sm">Site Boundary Editor</span>
          {isClosed ? (
            <span className="flex items-center text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-medium space-x-1">
              <CheckCircle2 size={11} />
              <span>Closed Plot</span>
            </span>
          ) : (
            <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-medium">
              Drawing Mode
            </span>
          )}
        </div>
        
        {/* Sketch CAD Controls */}
        <div className="flex flex-wrap items-center gap-1.5 font-sans">
          {/* Zoom Section */}
          <div className="flex items-center border border-neutral-200 bg-white rounded overflow-hidden">
            <button
              onClick={() => handleZoom(0.85)}
              className="p-1 hover:bg-neutral-50 text-neutral-600 transition"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => handleZoom(1.15)}
              className="p-1 hover:bg-neutral-50 border-l border-neutral-100 text-neutral-600 transition"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={handleResetView}
              className="px-1.5 py-1 text-[10px] hover:bg-neutral-50 border-l border-neutral-100 text-neutral-500 font-semibold transition"
              title="Reset View"
            >
              Reset view
            </button>
          </div>

          <div className="h-4 w-px bg-neutral-300 mx-0.5" />

          {/* Interactions */}
          <div className="flex items-center bg-white border border-neutral-200 rounded overflow-hidden">
            {/* Pan Toggle */}
            <button
              onClick={() => setIsPanMode(!isPanMode)}
              className={`p-1.5 transition flex items-center justify-center ${
                isPanMode 
                  ? "bg-violet-100 text-violet-700 font-bold" 
                  : "hover:bg-neutral-50 text-neutral-600"
              }`}
              title="Pan Tool (Drag Canvas)"
            >
              <Move size={14} className={isPanMode ? "animate-pulse" : ""} />
            </button>
            
            {/* Ortho Lock Toggle */}
            <button
              onClick={() => setIsOrthoMode(!isOrthoMode)}
              disabled={isClosed}
              className={`p-1.5 border-l border-neutral-100 transition flex items-center justify-center disabled:opacity-40 ${
                isOrthoMode 
                  ? "bg-violet-100 text-violet-700 font-bold" 
                  : "hover:bg-neutral-50 text-neutral-600"
              }`}
              title="Orthogonal Mode (Axis-Lock 90°)"
            >
              <Lock size={14} />
            </button>

            {/* Grid Snap Toggle */}
            <button
              onClick={() => setIsSnapEnabled(!isSnapEnabled)}
              disabled={isClosed}
              className={`p-1.5 border-l border-neutral-100 transition flex items-center justify-center disabled:opacity-40 ${
                isSnapEnabled 
                  ? "bg-violet-100 text-violet-700 font-bold" 
                  : "hover:bg-neutral-50 text-neutral-600"
              }`}
              title="Grid/Vertex Snap (1m intervals)"
            >
              <Grid size={14} />
            </button>
          </div>

          {/* Units Selection */}
          <button
            onClick={() => setUnit(unit === "m" ? "ft" : "m")}
            className="flex items-center space-x-1 px-2.5 py-1 bg-white border border-neutral-200 rounded hover:bg-neutral-50 text-xs font-semibold text-neutral-600 transition"
            title="Toggle Display Unit"
          >
            <Ruler size={13} />
            <span className="uppercase">{unit}</span>
          </button>

          <div className="h-4 w-px bg-neutral-300 mx-0.5" />

          {/* Reset Workspace */}
          <button
            onClick={resetCanvas}
            className="flex items-center space-x-1 text-[11px] px-2.5 py-1 bg-white border border-neutral-200 rounded hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition text-neutral-600 font-medium"
          >
            <RefreshCw size={11} />
            <span>Reset Plot</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Workspace */}
      <div className="relative overflow-hidden bg-neutral-100 touch-none" style={{ height: SVG_HEIGHT, touchAction: "none" }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          className={`absolute inset-0 select-none ${isPanMode ? (isPanning ? "cursor-grabbing" : "cursor-grab") : "cursor-crosshair"}`}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
        >
          <defs>
            {/* Defined Grid Pattern */}
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="1"
              />
            </pattern>
            {/* Diagonal Red Hatching Pattern for setbacks */}
            <pattern
              id="setback-hatch"
              width="8"
              height="8"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="rgba(239, 68, 68, 0.4)"
                strokeWidth="1.5"
              />
            </pattern>
            {/* Setback Mask: Subtracts inner buildable polygon from outer plot polygon */}
            {isClosed && isBuildableValid && buildableVertices.length >= 3 && (
              <mask id="setback-mask">
                <polygon points={outerPointsStr} fill="white" />
                <polygon points={innerPointsStr} fill="black" />
              </mask>
            )}
          </defs>
          <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#grid)" />

          {/* Render Red Hatch Setback Overlay using Masking */}
          {isClosed && isBuildableValid && buildableVertices.length >= 3 && (
            <rect
              x="-1000"
              y="-1000"
              width="3000"
              height="3000"
              fill="url(#setback-hatch)"
              mask="url(#setback-mask)"
            />
          )}

          {/* Draw Polygon Fill when closed (translucent background inside outer plot) */}
          {vertices.length >= 3 && !isClosed && (
            <polygon
              points={outerPointsStr}
              className="fill-transparent stroke-blue-400 stroke-2"
              strokeDasharray="5,5"
            />
          )}
          {vertices.length >= 3 && isClosed && (
            <polygon
              points={outerPointsStr}
              className="fill-transparent stroke-neutral-300 stroke-1"
            />
          )}

          {/* Render Green Buildable footprint polygon */}
          {isClosed && isBuildableValid && buildableVertices.length >= 3 && (
            <polygon
              points={innerPointsStr}
              fill="rgba(34, 197, 94, 0.12)"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              strokeDasharray="4,2"
              className="transition-all duration-300"
            />
          )}

          {/* Draw Boundary Edges */}
          {vertices.length >= 2 &&
            vertices.map((v, i) => {
              if (i === vertices.length - 1 && !isClosed) return null;
              
              const nextIndex = (i + 1) % vertices.length;
              const nextV = vertices[nextIndex];
              const key = getEdgeKey(v.id, nextV.id);
              const isRoad = isClosed && roadConfig[key]?.is_road_edge;
              
              const scr1 = metersToScreen(v);
              const scr2 = metersToScreen(nextV);
              
              return (
                <g key={`edge-render-${i}`}>
                  {/* Road Edge Highlighter overlay */}
                  {isRoad && (
                    <line
                      x1={scr1.x}
                      y1={scr1.y}
                      x2={scr2.x}
                      y2={scr2.y}
                      className="stroke-orange-500 stroke-[5px] opacity-70"
                      strokeDasharray="6,4"
                    />
                  )}

                  {/* Standard structural edge line */}
                  <line
                    x1={scr1.x}
                    y1={scr1.y}
                    x2={scr2.x}
                    y2={scr2.y}
                    className={`stroke-2 transition-all ${
                      isRoad 
                        ? "stroke-orange-600" 
                        : isClosed 
                          ? "stroke-neutral-700 hover:stroke-blue-400" 
                          : "stroke-blue-400"
                    }`}
                  />

                  {/* Thick Invisible Click Target Overlay for selecting roads */}
                  {isClosed && (
                    <line
                      x1={scr1.x}
                      y1={scr1.y}
                      x2={scr2.x}
                      y2={scr2.y}
                      stroke="transparent"
                      strokeWidth="14"
                      className="cursor-pointer hover:stroke-blue-500/20"
                      onClick={(e) => handleEdgeClick(e, v, nextV)}
                    />
                  )}
                </g>
              );
            })}

          {/* Draw Lines when not closed */}
          {vertices.length > 0 && !isClosed && (
            <polyline
              points={outerPointsStr}
              fill="none"
              className="stroke-blue-400 stroke-2"
            />
          )}

          {/* Line to current pointer + live distance label on rubber-band line */}
          {vertices.length > 0 && !isClosed && hoverCoords && !isPanMode && (
            (() => {
              const lastV = vertices[vertices.length - 1];
              const scr1 = metersToScreen(lastV);
              const nextScr = hoveringFirstVertex ? metersToScreen(vertices[0]) : metersToScreen(hoverCoords);
              
              const distance = calculateDistance(lastV, hoverCoords);
              const midX = (scr1.x + nextScr.x) / 2;
              const midY = (scr1.y + nextScr.y) / 2;
              
              // Angle for text
              const dx = nextScr.x - scr1.x;
              const dy = nextScr.y - scr1.y;
              let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
              if (angle > 90 || angle < -90) {
                angle += 180;
              }

              return (
                <g>
                  {/* Rubber-band preview line */}
                  <line
                    x1={scr1.x}
                    y1={scr1.y}
                    x2={nextScr.x}
                    y2={nextScr.y}
                    className="stroke-blue-300 stroke-2"
                    strokeDasharray="4,4"
                  />
                  
                  {/* Rubber-band distance label */}
                  {distance > 0.1 && (
                    <g transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
                      <rect
                        x="-20"
                        y="-16"
                        width="40"
                        height="12"
                        rx="2"
                        className="fill-blue-600 stroke-none"
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[8px] font-bold fill-white font-sans"
                        y="-10"
                      >
                        {formatLengthShort(distance, unit)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })()
          )}

          {/* Display Edge Lengths along paths */}
          {vertices.length >= 2 &&
            vertices.map((p, i) => {
              if (i === vertices.length - 1 && !isClosed) return null;
              const nextIndex = (i + 1) % vertices.length;
              const nextP = vertices[nextIndex];
              const dist = calculateDistance(p, nextP);
              
              const pScr = metersToScreen(p);
              const nextScr = metersToScreen(nextP);
              
              const midX = (pScr.x + nextScr.x) / 2;
              const midY = (pScr.y + nextScr.y) / 2;

              const dx = nextScr.x - pScr.x;
              const dy = nextScr.y - pScr.y;
              let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
              if (angle > 90 || angle < -90) {
                angle += 180;
              }

              return (
                <g key={`edge-len-${i}`} transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
                  <rect
                    x="-20"
                    y="-8"
                    width="40"
                    height="14"
                    rx="3"
                    className="fill-white/90 stroke-neutral-200 stroke-0.5 shadow-sm"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[9px] font-bold fill-neutral-700 font-sans"
                    y="-1"
                  >
                    {formatLengthShort(dist, unit)}
                  </text>
                </g>
              );
            })}

          {/* Highlight Snapping Ring on First Vertex if hovering near it */}
          {hoveringFirstVertex && vertices.length >= 3 && !isPanMode && (
            <circle
              cx={metersToScreen(vertices[0]).x}
              cy={metersToScreen(vertices[0]).y}
              r="12"
              className="fill-green-500/20 stroke-green-500 stroke-2 animate-ping"
            />
          )}

          {/* Render draggable Vertex circles */}
          {vertices.map((p, i) => {
            const scr = metersToScreen(p);
            const isFirst = i === 0;

            return (
              <g key={`vertex-group-${i}`}>
                <circle
                  cx={scr.x}
                  cy={scr.y}
                  r="6"
                  onMouseDown={(e) => handleVertexMouseDown(i, e)}
                  className={`transition-all ${isPanMode ? "cursor-grab pointer-events-none" : "cursor-move"} ${
                    isFirst && !isClosed
                      ? hoveringFirstVertex
                        ? "fill-green-600 stroke-green-800 stroke-2 scale-125"
                        : "fill-blue-600 stroke-white stroke-2 scale-110"
                      : "fill-white stroke-blue-500 stroke-2 hover:fill-blue-500"
                  }`}
                />
                <text
                  x={scr.x}
                  y={scr.y - 10}
                  textAnchor="middle"
                  className="text-[9px] font-medium fill-neutral-500 font-sans pointer-events-none"
                >
                  P{i + 1}
                </text>
              </g>
            );
          })}

          {/* Render Road Width Bubble Anchors outside the polygon */}
          {isClosed &&
            vertices.map((v, i) => {
              const nextIndex = (i + 1) % vertices.length;
              const nextV = vertices[nextIndex];
              const key = getEdgeKey(v.id, nextV.id);
              const config = roadConfig[key];

              if (!config || !config.is_road_edge) return null;

              const outwardM = calculateOutwardNormalOffset(v, nextV, vertices, 6.0);
              const bubbleScr = metersToScreen(outwardM);

              return (
                <g 
                  key={`road-bubble-${key}`} 
                  className={isPanMode ? "pointer-events-none" : "cursor-pointer"}
                  onClick={(e) => handleBubbleClick(e, key)}
                >
                  {/* Pulsing indicator ring */}
                  <circle
                    cx={bubbleScr.x}
                    cy={bubbleScr.y}
                    r="15"
                    className="fill-orange-500/10 stroke-orange-500/40 stroke-1 hover:stroke-orange-500/70"
                  />
                  {/* Main Bubble */}
                  <circle
                    cx={bubbleScr.x}
                    cy={bubbleScr.y}
                    r="12"
                    className={`stroke-1.5 transition-colors ${
                      activeBubbleKey === key
                        ? "fill-orange-600 stroke-orange-800"
                        : "fill-orange-500 stroke-orange-600 hover:fill-orange-600"
                    }`}
                  />
                  {/* Bubble Text (road width is strictly in meters) */}
                  <text
                    x={bubbleScr.x}
                    y={bubbleScr.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[9px] font-bold fill-white font-sans"
                  >
                    {config.road_width_m}m
                  </text>
                </g>
              );
            })}
        </svg>

        {/* Live Coordinate Overlay HUD */}
        <div className="absolute bottom-2 left-2 bg-white/95 px-2 py-1 border border-neutral-200 rounded shadow-sm pointer-events-none">
          <span className="text-[10px] font-mono text-neutral-600">
            Cursor: {hoverCoords ? `${formatLength(hoverCoords.x, unit)}, ${formatLength(hoverCoords.y, unit)}` : "Outside Canvas"}
          </span>
        </div>

        {/* HTML Popover Dialog absolute-positioned relative to active viewBox */}
        {isClosed && activeBubbleKey && (
          (() => {
            const activeEdge = vertices.map((v, i) => {
              const nextV = vertices[(i + 1) % vertices.length];
              return { v, nextV, key: getEdgeKey(v.id, nextV.id) };
            }).find(e => e.key === activeBubbleKey);

            if (!activeEdge) return null;

            const outwardPt = calculateOutwardNormalOffset(
              activeEdge.v,
              activeEdge.nextV,
              vertices,
              8.5
            );
            
            // Translate SVG coordinates to viewport percentages based on viewBox zoom/pan
            const scr = metersToScreen(outwardPt);
            const xPct = ((scr.x - viewBox.x) / viewBox.w) * 100;
            const yPct = ((scr.y - viewBox.y) / viewBox.h) * 100;

            const config = roadConfig[activeBubbleKey] || { road_width_m: 6.0 };

            return (
              <div
                className="absolute z-10 bg-white border border-neutral-200 rounded-lg p-3 shadow-md w-48 -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
                style={{ left: `${xPct}%`, top: `${yPct}%` }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-neutral-700 flex items-center space-x-1 font-sans">
                    <Route size={12} className="text-orange-500" />
                    <span>Set Road Width</span>
                  </span>
                  <button
                    onClick={() => setActiveBubbleKey(null)}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <X size={12} />
                  </button>
                </div>
                
                {/* Presets */}
                <div className="grid grid-cols-4 gap-1 mb-2 font-sans">
                  {[3, 6, 9, 12].map((w) => (
                    <button
                      key={`preset-${w}`}
                      onClick={() => updateRoadWidth(activeBubbleKey, w)}
                      className={`text-[10px] font-bold py-1 px-0.5 rounded border transition ${
                        config.road_width_m === w
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {w}m
                    </button>
                  ))}
                </div>

                {/* Slider Control */}
                <div className="space-y-1 font-sans">
                  <div className="flex justify-between text-[9px] text-neutral-500">
                    <span>Manual Range</span>
                    <span className="font-bold text-neutral-700">{config.road_width_m} m</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    step="0.5"
                    value={config.road_width_m}
                    onChange={(e) => updateRoadWidth(activeBubbleKey, parseFloat(e.target.value))}
                    className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Instructions / Help */}
      <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500 flex items-center space-x-2 font-sans">
        <HelpCircle size={14} className="text-neutral-400" />
        <span>
          {!isClosed
            ? isPanMode 
              ? "Pan Tool Active. Drag the canvas to pan, use scroll wheel to zoom."
              : "Click inside workspace to draw. Lock axes with Ortho, snap to grid. Snap to first point (P1) to close."
            : isPanMode
              ? "Pan Tool Active. Drag to pan. Toggle off to select abutting roads."
              : "Click any segment to toggle road status. Click orange bubbles to edit width. Drag points to adjust shape."}
        </span>
      </div>

      {/* Vertices List */}
      {vertices.length > 0 && (
        <div className="px-4 py-2 border-t border-neutral-200 max-h-32 overflow-y-auto">
          <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1 font-sans">
            Plot Nodes (Stored in Metric)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {vertices.map((p, i) => (
              <div
                key={`vertex-list-${i}`}
                className="flex items-center justify-between px-2 py-1 bg-neutral-50 border border-neutral-200 rounded text-xs"
              >
                <span className="font-mono text-neutral-600">
                  P{i + 1}: ({formatLengthShort(p.x, unit)}, {formatLengthShort(p.y, unit)})
                </span>
                <button
                  onClick={() => removeVertex(i)}
                  className="text-neutral-400 hover:text-red-500 transition"
                  title="Delete Vertex"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
