import type { Order } from "./types";
import { v4 } from "uuid";

export const createOrder = (data: Partial<Order>): Order => ({
  ...data,
  id: v4(),
  createdAt: new Date().toISOString(),
  status: 'new',
} as Order);