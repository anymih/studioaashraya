export interface Point2D {
  id: string; // Persistent vertex ID (e.g. v_1, v_2)
  x: number;  // local coordinate in meters
  y: number;  // local coordinate in meters
}

export interface PlotEdge {
  length: number;       // in meters
  bearing: number;      // in degrees (0-360, where 0 is North/Y-up, clockwise)
  is_road_edge: boolean;
  road_width_m: number;
}

export interface SiteEntity {
  id: string;
  name: string;
  location_lat: number;
  location_lng: number;
  plot_geojson: {
    type: "Polygon";
    coordinates: number[][][]; // GeoJSON standard format: [[ [lng, lat], [lng, lat], ... ]]
  };
  plot_area_m2: number;
  perimeter_m: number;
  edges: PlotEdge[];
  intended_use: 'residential' | 'commercial';
  createdAt: string;
}
