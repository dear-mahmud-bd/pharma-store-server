import { Order } from './order.model';
import { IOrder } from './order.interface';
import { Medicine } from '../medicine/medicine.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createOrderIntoDB = async (payload: IOrder) => {
  let subTotal = 0;
  let requiresPrescription = false;
  for (const item of payload.items) {
    const medicine = await Medicine.findById(item.medicine);
    if (!medicine) {
      throw new AppError(httpStatus.NOT_FOUND, 'Medicine not found');
    }
    if (medicine.stock < item.quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Not enough stock for ${medicine.name}. Available: ${medicine.stock}`,
      );
    }
    subTotal += medicine.price * item.quantity;
    if (medicine.requiresPrescription) {
      requiresPrescription = true;
    }
  }
  // if prescription is needed but not provided, throw an error
  if (requiresPrescription && !payload.prescription_img_url) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'A prescription is required for the medication you ordered.',
    );
  }
  payload.sub_total = subTotal + 100;

  // decrease stock after successful validation
  for (const item of payload.items) {
    await Medicine.findByIdAndUpdate(item.medicine, {
      $inc: { stock: -item.quantity }, // decrease stock
    });
  }
  payload.status = 'pending';

  const order = await Order.create(payload);
  return order;
};

const updateOrderStatusFromDB = async (id: string, status: string) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
  if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  return order;
};

const getSingleOrderFromDB = async (id: string) => {
  const order = await Order.findById(id).populate('items.medicine');
  if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  return order;
};

const getUsersAllOrderFromDB = async (email: string) => {
  return await Order.find({ 'user.email': email }).populate('items.medicine');
};

const getAllOrderFromDB = async () => {
  return await Order.find().populate('items.medicine');
};

export const OrderService = {
  createOrderIntoDB,
  updateOrderStatusFromDB,
  getSingleOrderFromDB,
  getUsersAllOrderFromDB,
  getAllOrderFromDB,
};
