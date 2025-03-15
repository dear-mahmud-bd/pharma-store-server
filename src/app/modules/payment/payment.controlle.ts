import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { PaymentServices } from './payment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { OrderService } from '../order/order.service';

// my structure
const initiatePayment = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;
  const finalOrder = await OrderService.createOrderIntoDB(order);
  if (!finalOrder || !finalOrder._id) {
    return sendResponse(res, {
      success: false,
      message: 'Failed to place order.',
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
  const paymentUrl = await PaymentServices.initiatePayment(
    order,
    finalOrder._id.toString(),
  );
  if (!paymentUrl?.GatewayPageURL) {
    return sendResponse(res, {
      success: false,
      message: 'Failed to initiate payment.',
      statusCode: httpStatus.BAD_REQUEST,
    });
  }
  res.json({ success: true, url: paymentUrl.GatewayPageURL });
});

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.params.tranId);
  // console.log(req.params.orderId);
  const orderId = req.params.orderId;
  const status = 'processing';
  const updatedOrder = await OrderService.updateOrderStatusFromDB(
    orderId,
    status,
  );
  if (updatedOrder.status === 'processing') {
    res.redirect(`http://localhost:3000/user/dashboard`);
  } else {
    sendResponse(res, {
      success: false,
      message: 'payment fail',
      statusCode: httpStatus.BAD_REQUEST,
    });
  }
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  res.redirect(`http://localhost:3000/user/dashboard`);
});

export const PaymentController = {
  initiatePayment,
  verifyPayment,
  paymentFail,
};
