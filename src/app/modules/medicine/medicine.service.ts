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

const getAllMedicineFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  // Search functionality
  const medicineSearchableFields = [
    'name',
    'manufacturer.name',
    'description',
    'category',
  ];
  let search = '';
  if (query?.search) {
    search = query.search as string;
  }
  const searchQuery = Medicine.find({
    $or: medicineSearchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });

  // Filtering functionality
  const excludeFields = [
    'search',
    'category',
    'sortOrder',
    'minPrice',
    'maxPrice',
    'prescription', // Exclude prescription field
  ];
  excludeFields.forEach((el) => delete queryObj[el]);

  // Construct filter object
  const filter: Record<string, unknown> = {};

  // Filtering by price range
  if (query?.minPrice || query?.maxPrice) {
    filter.price = {};
    if (query?.minPrice) {
      (filter.price as Record<string, number>)['$gte'] = Number(query.minPrice);
    }
    if (query?.maxPrice) {
      (filter.price as Record<string, number>)['$lte'] = Number(query.maxPrice);
    }
  }

  // Filtering by category
  if (query?.category) {
    filter.category = query.category as string;
  }

  // Filtering by prescription (required or not-required)
  if (query?.prescription) {
    if (query.prescription === 'required') {
      filter.requiresPrescription = true;
    } else if (query.prescription === 'not-required') {
      filter.requiresPrescription = false;
    }
  }

  const filterQuery = searchQuery.find(filter);

  // Sorting functionality
  let sortBy = 'price';
  if (query?.sortBy) {
    sortBy = query.sortBy as string;
  }
  if (query?.sortOrder) {
    const sortOrder = query.sortOrder === 'desc' ? '-' : '';
    sortBy = `${sortOrder}${sortBy}`;
  }

  const result = await filterQuery.sort(sortBy);
  return result;
};

export const MedicineServices = {
  createMedicineIntoDB,
  updateMedicineDetailsFromDB,
  updateMedicineStock,
  deleteMedicine,
  getSingleMedicineFromDB,
  getAllMedicineFromDB,
};
