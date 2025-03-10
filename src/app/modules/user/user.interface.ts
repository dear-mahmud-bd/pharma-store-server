import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export enum UserType {
  customer = 'customer',
  admin = 'admin',
}

export interface TUser {
  _id: string;
  name: string;
  email: string;
  image_url: string;
  password: string;
  role: UserType;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  isVerified: boolean;
  isBlocked: boolean;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isEmailExist(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
