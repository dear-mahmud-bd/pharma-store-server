import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../utils/validateRequest';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/',
  AuthGuard(USER_ROLE.customer, USER_ROLE.admin),
  validateRequest(OrderValidation.orderValidationSchema),
  OrderController.createOrder,
);
router.patch(
  '/:id/status',
  AuthGuard(USER_ROLE.admin, USER_ROLE.customer),
  OrderController.updateOrderStatus,
);
router.get(
  '/:id',
  AuthGuard(USER_ROLE.customer, USER_ROLE.admin),
  OrderController.getOrderById,
);
router.get(
  '/',
  AuthGuard(USER_ROLE.customer, USER_ROLE.admin),
  OrderController.getUsersAllOrders,
);

export const OrderRoutes = router;
