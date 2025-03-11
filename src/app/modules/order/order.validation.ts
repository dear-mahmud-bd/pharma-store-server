import { z } from 'zod';

const orderValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name is required'),
      email: z
        .string({ required_error: 'Invalid email format' })
        .email('Invalid email format'),
      phone: z
        .string({ required_error: 'Phone number is required' })
        .min(10, 'Phone number is required'),
      address: z.object({
        street: z
          .string({ required_error: 'Street is required' })
          .min(1, 'Street is required'),
        city: z
          .string({ required_error: 'City is required' })
          .min(1, 'City is required'),
        state: z
          .string({ required_error: 'State is required' })
          .min(1, 'State is required'),
        zip: z
          .string({ required_error: 'ZIP code is required' })
          .min(1, 'ZIP code is required'),
        country: z
          .string({ required_error: 'Country is required' })
          .min(1, 'Country is required'),
      }),
    }),
    items: z.array(
      z.object({
        medicine: z
          .string({ required_error: 'Medicine ID is required' })
          .min(1, 'Medicine ID is required'),
        quantity: z
          .number({ required_error: 'Quantity must be at least 1' })
          .min(1, 'Quantity must be at least 1'),
      }),
    ),
    prescription_img_url: z
      .string({ required_error: 'Invalid URL' })
      .url('Invalid URL')
      .optional(),
  }),
});

export const OrderValidation = {
  orderValidationSchema,
};
