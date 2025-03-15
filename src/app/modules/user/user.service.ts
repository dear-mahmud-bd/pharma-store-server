import config from '../../config';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

const changeUserPassword = async (
  email: string,
  userEmail: string,
  oldPassword: string,
  newPassword: string,
) => {
  if (email !== userEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  const isMatched = await User.isPasswordMatched(oldPassword, user.password);
  if (!isMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Old password is incorrect.');
  }

  const saltRounds = Number(config.bcrypt_salt_rounds);
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        password: hashedPassword,
        passwordChangedAt: new Date(),
      },
    },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Password update failed.',
    );
  }

  return { message: 'Password changed successfully.' };
};

const getProfileDataFromDB = async (email: string) => {
  return await User.findOne({ email });
};

const updateProfileImageFromDB = async (
  email: string,
  userEmail: string,
  imageUrl: string,
) => {
  if (email !== userEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
  }
  const user = await User.findOneAndUpdate(
    { email },
    { image_url: imageUrl },
    { new: true },
  );
  return user;
};

const updateProfileFromDB = async (
  email: string,
  userEmail: string,
  updates: Partial<{ name: string; phone: string; address: object }>,
) => {
  if (email !== userEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
  }
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: updates },
    { new: true, runValidators: true },
  ).select('name phone address');

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return updatedUser;
};

export const UserServices = {
  changeUserPassword,
  getProfileDataFromDB,
  updateProfileImageFromDB,
  updateProfileFromDB,
};
