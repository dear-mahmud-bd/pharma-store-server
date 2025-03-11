import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { MedicineRoutes } from '../modules/medicine/medicine.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/medicine',
    route: MedicineRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
