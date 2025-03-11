import express from 'express';
import { MedicineControllers } from './medicine.controller';
import validateRequest from '../../utils/validateRequest';
import { MedicineValidation } from './medicine.validation';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  AuthGuard(USER_ROLE.admin),
  validateRequest(MedicineValidation.medicineValidationSchema),
  MedicineControllers.createMedicine,
);
router.patch(
  '/:id',
  AuthGuard(USER_ROLE.admin),
  validateRequest(MedicineValidation.medicineValidationSchema),
  MedicineControllers.updateMedicine,
);
router.patch(
  '/update-stock/:id',
  AuthGuard(USER_ROLE.admin),
  validateRequest(MedicineValidation.medicineStockValidationSchema),
  MedicineControllers.updateStock,
);
router.delete(
  '/:id',
  AuthGuard(USER_ROLE.admin),
  MedicineControllers.deleteMedicine,
);
router.get('/:id', MedicineControllers.getSingleMedicine);
router.get('/', MedicineControllers.getAllMedicine);

export const MedicineRoutes = router;
