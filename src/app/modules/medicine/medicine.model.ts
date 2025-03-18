import { model, Schema } from 'mongoose';
import {
  TMedicine,
  MedicineModel,
  MedicineCategory,
} from './medicine.interface';

export const MedicineSchema = new Schema<TMedicine, MedicineModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    medi_image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(MedicineCategory),
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    requiresPrescription: {
      type: Boolean,
      required: true,
    },
    manufacturer: {
      name: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      contact: { type: String, required: true, trim: true },
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// query middlewire...
MedicineSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});
MedicineSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});

MedicineSchema.statics.isNameWithThisMedicineExist = async function (name) {
  return await this.findOne({ name });
};

export const Medicine = model<TMedicine, MedicineModel>(
  'Medicine',
  MedicineSchema,
);
