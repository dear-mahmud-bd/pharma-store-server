import { Model, Types } from 'mongoose';
export enum MedicineCategory {
  PAIN_RELIEF = 'Pain Relief',
  ANTIBIOTICS = 'Antibiotics',
  SUPPLEMENTS = 'Supplements',
  GASTROINTESTINAL = 'Gastrointestinal',
  CARDIOVASCULAR = 'Cardiovascular',
  DIABETES_MANAGEMENT = 'Diabetes Management',
  RESPIRATORY = 'Respiratory',
  NEUROLOGICAL = 'Neurological',
  DERMATOLOGY = 'Dermatology',
  ALLERGY_IMMUNOLOGY = 'Allergy & Immunology',
}

export interface TMedicine {
  _id: Types.ObjectId;
  name: string;
  medi_image: string;
  description: string;
  category: MedicineCategory;
  price: number;
  stock: number;
  requiresPrescription: boolean;
  manufacturer: {
    name: string;
    address: string;
    contact: string;
  };
  expiryDate: Date;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MedicineModel extends Model<TMedicine> {
  isNameWithThisMedicineExist(name: string): Promise<TMedicine>;
}
