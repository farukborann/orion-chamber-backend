
export enum GarmentType {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface VtonInput {
  mannequin: string; // String ID for predefined mannequins or string path for uploaded
  garment: string; // path to garment image
  garmentType: GarmentType;
  nSteps: number;
  manuelMask?: string; // optional manual mask path
  [key: string]: any; // Allow additional properties for Prisma JSON compatibility
}