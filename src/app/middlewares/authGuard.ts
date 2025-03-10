import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { verifyToken } from '../modules/auth/auth.utils';

export const AuthGuard = (...userRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = verifyToken(token, config.jwt_access_token as string);
    // const { email, role } = decoded;
    const user = await User.isEmailExist(decoded.email);
    if (!user || user == null) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are blocked !');
    }

    if (userRole && !userRole.includes(decoded.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!');
    }

    const { _id, name, email, role } = user;
    req.user = { _id, name, email, role, ...decoded } as JwtPayload;
    next();
  });
};
