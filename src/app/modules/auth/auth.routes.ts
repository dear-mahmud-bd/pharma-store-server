import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../utils/validateRequest';
import { AuthValidation } from './auth.validation';
import { UserControllers } from '../user/user.controller';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.register,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

router.patch(
  '/change-password',
  // provide email
  AuthGuard(USER_ROLE.admin, USER_ROLE.customer),
  UserControllers.changePassword,
);
router.patch(
  '/change-image',
  // provide a valid url and email
  AuthGuard(USER_ROLE.admin, USER_ROLE.customer),
  UserControllers.updateProfileImage,
);
router.patch(
  '/update-profile',
  // provide email, name, phone, address...
  AuthGuard(USER_ROLE.admin, USER_ROLE.customer),
  UserControllers.updateProfile,
);

export const AuthRoutes = router;
