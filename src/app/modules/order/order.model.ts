import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
      },
    },
    items: [
      {
        medicine: {
          type: Schema.Types.ObjectId,
          ref: 'Medicine',
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    prescription_img_url: { type: String, required: false },
    sub_total: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        'pending',
        'approved',
        'processing',
        'shipped',
        'delivered',
        'canceled',
      ],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Order = model<IOrder>('Order', OrderSchema);
