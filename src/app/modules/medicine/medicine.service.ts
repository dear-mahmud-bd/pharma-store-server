import { Types } from 'mongoose';
import { Medicine } from './medicine.model';
import { TMedicine } from './medicine.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createMedicineIntoDB = async (medicineData: TMedicine) => {
  if (await Medicine.isNameWithThisMedicineExist(medicineData.name)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Medicine with this name already exists.',
    );
  }
  const newMedicine = await Medicine.create(medicineData);
  return newMedicine;
};

const updateMedicineDetailsFromDB = async (
  medicineId: string,
  updates: Partial<{
    name: string;
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
  }>,
) => {
  const updatedMedicine = await Medicine.findByIdAndUpdate(
    new Types.ObjectId(medicineId),
    { $set: updates },
    { new: true, runValidators: true },
  );

  if (!updatedMedicine) {
    throw new AppError(httpStatus.NOT_FOUND, 'Medicine not found.');
  }
  return updatedMedicine;
};

const updateMedicineStock = async (medicineId: string, newStock: number) => {
  if (newStock < 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Stock cannot be negative.');
  }
  const updatedMedicine = await Medicine.findByIdAndUpdate(
    new Types.ObjectId(medicineId),
    { stock: newStock },
    { new: true, runValidators: true },
  );
  if (!updatedMedicine) {
    throw new AppError(httpStatus.NOT_FOUND, 'Medicine not found.');
  }
  return updatedMedicine;
};

const deleteMedicine = async (medicineId: string) => {
  const medicineData = await Medicine.findById({
    _id: new Types.ObjectId(medicineId),
  });
  if (!medicineData || medicineData == null) {
    throw new AppError(httpStatus.NOT_FOUND, 'Medicine not found');
  }
  const result = await Medicine.updateOne(
    { _id: new Types.ObjectId(medicineId) },
    { $set: { isDeleted: true } },
  );
  if (result.modifiedCount === 0) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Medicine is not deleted',
    );
  }
  return {};
};

const getSingleMedicineFromDB = async (id: string) => {
  const result = await Medicine.findOne({ _id: new Types.ObjectId(id) });
  if (!result || result === null) {
    throw new Error('Medicine not found');
  }
  return result;
};

const getAllMedicineFromDB = async () => {
  return await Medicine.find();
};

export const MedicineServices = {
  createMedicineIntoDB,
  updateMedicineDetailsFromDB,
  updateMedicineStock,
  deleteMedicine,
  getSingleMedicineFromDB,
  getAllMedicineFromDB,
};
