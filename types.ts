export enum ShapeType {
  RECTANGULAR = 'RECTANGULAR',
  CUBE = 'CUBE',
  TRI_PRISM = 'TRI_PRISM',
  QUAD_PRISM = 'QUAD_PRISM'
}

export interface FormData {
  name: string;
  preset: string;
  occasion: string;
  shape: ShapeType;
  length: number;
  width: number;
  height: number;
  side: number;
  baseEdge1: number;
  baseEdge2: number;
  baseEdge3: number;
  baseEdge4: number;
}

export interface Criterion {
  id: string;
  label: string;
  searchKeyword: string;
}

export type IconName = 
  | 'gift' 
  | 'package' 
  | 'check' 
  | 'sliders' 
  | 'ruler' 
  | 'clipboard' 
  | 'image' 
  | 'youtube' 
  | 'palette' 
  | 'search' 
  | 'download' 
  | 'shutterstock' 
  | 'google' 
  | 'pinterest' 
  | 'behance' 
  | 'freepik';