import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';
import { IOrder } from '../order/order.interface';

const storeId = config.sslcommerz_store_id;
const storePass = config.sslcommerz_store_password;
const isLive = false;

const initiatePayment = async (order: IOrder, orderId: string) => {
  const transactionId = `txn_${Date.now()}`;
  const data = {
    total_amount: order.sub_total,
    currency: 'BDT',
    tran_id: transactionId, // Unique transaction ID
    success_url: `http://localhost:5000/api/payment/success/${transactionId}/${orderId}`,
    fail_url: `http://localhost:5000/api/payment/fail`,
    cancel_url: `http://localhost:3000/client.vercel.app/cancel`,
    ipn_url: `http://localhost:3000/client.vercel.app/ipn`,

    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: order.user.name,
    cus_email: order.user.email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(storeId, storePass, isLive);
  return sslcz.init(data);
};

export const PaymentServices = {
  initiatePayment,
};
