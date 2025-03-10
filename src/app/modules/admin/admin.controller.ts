import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AdminServices } from './admin.service';
import { AuthenticatedUser } from '../auth/auth.interface';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await AdminServices.getAllUsers();
  sendResponse(res, {
    success: true,
    message: 'Users retrieved successfully',
    statusCode: httpStatus.OK,
    data: users,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { role } = req.body;
  const updatedUser = await AdminServices.updateUserRole(userId, role);
  sendResponse(res, {
    success: true,
    message: 'User role updated successfully',
    statusCode: httpStatus.OK,
    data: updatedUser,
  });
});

const updateUserBlockStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { isBlocked } = req.body;
    const adminData = req.user;
    const updatedUser = await AdminServices.updateUserBlockStatus(
      userId,
      adminData as AuthenticatedUser,
      isBlocked,
    );
    sendResponse(res, {
      success: true,
      message: `User has been ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
      statusCode: httpStatus.OK,
      data: updatedUser,
    });
  },
);

export const AdminControllers = {
  getAllUsers,
  updateUserRole,
  updateUserBlockStatus,
};
