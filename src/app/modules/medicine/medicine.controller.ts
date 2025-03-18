import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { MedicineServices } from './medicine.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createMedicine = catchAsync(async (req: Request, res: Response) => {
  const medicineData = req.body;
  const result = await MedicineServices.createMedicineIntoDB(medicineData);
  sendResponse(res, {
    success: true,
    message: 'Medicine created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  if (!id || Object.keys(updates).length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid request. Medicine ID and update fields are required.',
    );
  }
  const result = await MedicineServices.updateMedicineDetailsFromDB(
    id,
    updates,
  );
  sendResponse(res, {
    success: true,
    message: 'Medicine updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateStock = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { stock } = req.body;
  if (!id || stock === undefined) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Medicine ID and stock value are required.',
    );
  }
  const result = await MedicineServices.updateMedicineStock(id, stock);
  sendResponse(res, {
    success: true,
    message: 'Stock updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Medicine ID is required.');
  }
  const result = await MedicineServices.deleteMedicine(id);
  sendResponse(res, {
    success: true,
    message: 'Medicine deleted successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleMedicine = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MedicineServices.getSingleMedicineFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Medicine is retrieved succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllMedicine = catchAsync(async (req, res) => {
  const result = await MedicineServices.getAllMedicineFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'All Medicine is retrieved succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const MedicineControllers = {
  createMedicine,
  updateMedicine,
  updateStock,
  deleteMedicine,
  getSingleMedicine,
  getAllMedicine,
};
