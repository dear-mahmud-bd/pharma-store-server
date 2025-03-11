import { z } from 'zod';

const medicineValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Medicine name is required' })
      .trim()
      .min(3, 'Name must be at least 3 characters long.')
      .max(100, 'Name cannot exceed 100 characters.'),
    medi_image: z
      .string({ required_error: 'Medicine image URL is required' })
      .trim()
      .url('Invalid image URL format'),
    description: z
      .string({ required_error: 'Description is required' })
      .trim()
      .min(10, 'Description must be at least 10 characters long.'),
    price: z
      .number({ required_error: 'Price is required' })
      .min(0, 'Price cannot be negative'),
    stock: z
      .number({ required_error: 'Stock is required' })
      .min(0, 'Stock cannot be negative'),
    requiresPrescription: z.boolean({
      required_error: 'Prescription requirement must be specified',
    }),
    manufacturer: z.object({
      name: z
        .string({ required_error: 'Manufacturer name is required' })
        .trim()
        .min(2, 'Manufacturer name must be at least 2 characters long.'),
      address: z
        .string({ required_error: 'Manufacturer address is required' })
        .trim()
        .min(5, 'Address must be at least 5 characters long.'),
      contact: z
        .string({ required_error: 'Manufacturer contact is required' })
        .trim()
        .min(5, 'Contact must be at least 5 characters long.'),
    }),
    expiryDate: z
      .string({ required_error: 'Expiry date is required' })
      .refine((date) => !isNaN(Date.parse(date)), 'Invalid expiry date format'),
  }),
});

const medicineStockValidationSchema = z.object({
  body: z.object({
    stock: z
      .number({ required_error: 'Stock is required' })
      .min(0, 'Stock cannot be negative'),
  }),
});

export const MedicineValidation = {
  medicineValidationSchema,
  medicineStockValidationSchema,
};
