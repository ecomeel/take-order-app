import { storage } from "@/shared/lib/storage";
import { type Order } from "../model/types";

const KEY = 'orders';

export const orderStorage = {
  getAll: () => storage.get<Order[]>(KEY, []),

  save: (order: Order) => {
    const orders = storage.get<Order[]>(KEY, []);
    storage.set('orders', [order, ...orders]);
  },

  remove: (id: string) => {
    const orders = storage.get<Order[]>(KEY, []);
    const updated = orders.filter(o => o.id !== id);
    storage.set(KEY, updated);
    return updated;
  }
};