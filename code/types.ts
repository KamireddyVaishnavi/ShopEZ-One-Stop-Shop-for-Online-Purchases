import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface User {
  id: number;
  username: string;
  email: string;
  usertype: 'customer' | 'admin';
}

export interface Product {
  id: number;
  title: string;
  description: string;
  mainImg: string;
  price: number;
  discount: number;
  category: string;
  gender: string;
  sizes: string; // JSON string
  carousel: string; // JSON string
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  size: string;
  title: string;
  price: number;
  discount: number;
  mainImg: string;
}

export interface Order {
  id: number;
  userId: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
  pincode: string;
  paymentMethod: string;
  orderDate: string;
  deliveryDate: string;
  status: string;
  totalPrice: number;
  items: string; // JSON string
}
