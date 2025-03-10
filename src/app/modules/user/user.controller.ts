import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;
  const userData = req.user;
  const userEmail = userData.email;
  if (!email || !oldPassword || !newPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'All fields are required.');
  }
  const result = await UserServices.changeUserPassword(
    email,
    userEmail,
    oldPassword,
    newPassword,
  );
  sendResponse(res, {
    success: true,
    message: 'Password changed successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateProfileImage = catchAsync(async (req: Request, res: Response) => {
  const { email, image_url } = req.body;
  const userData = req.user;
  const userEmail = userData.email;
  if (!email || !image_url) {
    throw new AppError(httpStatus.BAD_REQUEST, 'All fields are required.');
  }
  const result = await UserServices.updateProfileImageFromDB(
    email,
    userEmail,
    image_url,
  );
  sendResponse(res, {
    success: true,
    message: 'Image changed successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { email, name, phone, address } = req.body;
  const profileData = { name, phone, address };
  const userData = req.user;
  const userEmail = userData.email;
  const result = await UserServices.updateProfileFromDB(
    email,
    userEmail,
    profileData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: {
      _id: result._id,
      name: result.name,
      phone: result.phone,
      address: result.address,
    },
  });
});

export const UserControllers = {
  changePassword,
  updateProfileImage,
  updateProfile,
};
