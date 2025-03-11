import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrderIntoDB(orderData);
  sendResponse(res, {
    success: true,
    message: 'Order placed successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await OrderService.updateOrderStatusFromDB(id, status);
  sendResponse(res, {
    success: true,
    message: 'Order status updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getSingleOrderFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Order details retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getUsersAllOrders = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user;
  const result = await OrderService.getUsersAllOrderFromDB(userData.email);
  sendResponse(res, {
    success: true,
    message: 'Orders retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const OrderController = {
  createOrder,
  updateOrderStatus,
  getOrderById,
  getUsersAllOrders,
};
