import { Router } from 'express';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';
import { OrderController } from '../order/order.controller';

const router = Router();

router.get('/users', AuthGuard(USER_ROLE.admin), AdminControllers.getAllUsers);
router.patch(
  '/users/:userId/update-role',
  AuthGuard(USER_ROLE.admin),
  AdminControllers.updateUserRole,
);
router.patch(
  '/users/:userId/block-status',
  AuthGuard(USER_ROLE.admin),
  AdminControllers.updateUserBlockStatus,
);
router.get('/order', AuthGuard(USER_ROLE.admin), OrderController.getAllOrders);

export const AdminRoutes = router;
