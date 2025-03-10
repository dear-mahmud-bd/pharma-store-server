import { Types } from 'mongoose';
import { User } from '../user/user.model';
import { AuthenticatedUser } from '../auth/auth.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { USER_ROLE } from '../user/user.constant';

const getAllUsers = async () => {
  const users = await User.find({}, { password: 0 });
  return users;
};

const updateUserRole = async (userId: string, newRole: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true, runValidators: true },
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return { message: 'User role updated successfully', user };
};

const updateUserBlockStatus = async (
  userId: string,
  admin: AuthenticatedUser,
  blockedValue: boolean,
) => {
  if (admin.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
  }
  const user = await User.findById({
    _id: userId,
  });
  if (!user || user == null) {
    throw new AppError(httpStatus.NOT_FOUND, 'User can not found');
  }
  if (user.role === USER_ROLE.admin) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not block another ADMIN',
    );
  }
  const result = await User.updateOne(
    { _id: new Types.ObjectId(userId) },
    { $set: { isBlocked: blockedValue } },
  );

  if (result.modifiedCount === 0) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'User is not blocked');
  }

  return {};
};

export const AdminServices = {
  getAllUsers,
  updateUserRole,
  updateUserBlockStatus,
};
