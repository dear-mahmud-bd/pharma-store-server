import { Model, Types } from 'mongoose';

export interface TMedicine {
  _id: Types.ObjectId;
  name: string;
  medi_image: string;
  description: string;
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
