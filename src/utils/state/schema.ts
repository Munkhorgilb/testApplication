import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const productSchema = z.object({
  id: z.string(),
  code: z.union([z.string(), z.number()]),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price cannot be negative'),
});

const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().min(1),
});

const userSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  isAdmin: z.boolean().default(false),
  cart: z.array(cartItemSchema).default([]),
  wishlist: z.array(productSchema).default([]),
});

const orderSchema = z.object({
  id: z.string(),
  items: z.array(cartItemSchema).default([]),
  user: userSchema,
  createdAt: z.string(),
});

export const schema = z.object({
  currentUser: userSchema.optional(),
  users: z.array(userSchema),
  products: z.array(productSchema),
  orders: z.array(orderSchema),
});

export type Schema = z.infer<typeof schema>;

// Default admin user
const defaultAdminUser: z.infer<typeof userSchema> = {
  id: uuidv4(),
  name: 'Admin',
  email: 'admin@example.com',
  password: 'Admin@123',
  isAdmin: true,
  cart: [],
  wishlist: [],
};

export const defaults: Schema = {
  currentUser: undefined,
  users: [defaultAdminUser],
  products: [],
  orders: [],
};

// Helper types for better type safety
export type IUser = z.infer<typeof userSchema>;
export type IAdminUser = Extract<IUser, { isAdmin: true }>;
export type IRegularUser = Extract<IUser, { isAdmin: false }>;
export type ICartItem = z.infer<typeof cartItemSchema>;
export type IProduct = z.infer<typeof productSchema>;
export type IOrder = z.infer<typeof orderSchema>;
