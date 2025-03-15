import express from 'express';
import { PaymentController } from './payment.controlle';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../utils/validateRequest';
import { OrderValidation } from '../order/order.validation';

const router = express.Router();

router.post(
  '/initiate',
  AuthGuard(USER_ROLE.customer, USER_ROLE.admin),
  validateRequest(OrderValidation.orderValidationSchema),
  PaymentController.initiatePayment,
);

router.post('/success/:tranId/:orderId', PaymentController.verifyPayment);
router.post('/fail', PaymentController.paymentFail);

export const PaymentRoutes = router;
