import { create } from "zustand";
import { getOrders, saveOrders } from "../data/database";
import { useProductStore } from "./useProductStore";

export const useOrderStore = create((set, get) => {
  return {
    orders: [],

    loadOrders: () => {
      const orders = getOrders();
      set({ orders });
    },

    createOrder: (orderData) => {
      get().loadOrders();
      const orders = get().orders;
      
      const nextId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1001;
      
      const newOrder = {
        id: nextId,
        date: new Date().toISOString(),
        status: "Pendente",
        trackingCode: "",
        ...orderData
      };

      const updated = [newOrder, ...orders];
      saveOrders(updated);
      set({ orders: updated });

      // Decrease stock for each purchased item
      const productStore = useProductStore.getState();
      orderData.products.forEach(p => {
        productStore.decreaseStock(p.productId, p.quantity);
      });

      return { success: true, order: newOrder };
    },

    updateOrderStatus: (orderId, status) => {
      get().loadOrders();
      const orders = get().orders;

      const updated = orders.map(o => {
        if (o.id === orderId) {
          let trackingCode = o.trackingCode;
          // Generate mock tracking code when shipped
          if (status === "Enviado" && !trackingCode) {
            trackingCode = `KR89248${String(orderId).padStart(3, "0")}BR`;
          }
          return { ...o, status, trackingCode };
        }
        return o;
      });

      saveOrders(updated);
      set({ orders: updated });
      return { success: true };
    },

    cancelOrder: (orderId) => {
      get().loadOrders();
      const orders = get().orders;

      const updated = orders.map(o => {
        if (o.id === orderId) {
          // If already cancelled, do nothing
          if (o.status === "Cancelado") return o;

          // Restore stock
          const productStore = useProductStore.getState();
          o.products.forEach(p => {
            productStore.increaseStock(p.productId, p.quantity);
          });

          return { ...o, status: "Cancelado" };
        }
        return o;
      });

      saveOrders(updated);
      set({ orders: updated });
      return { success: true };
    }
  };
});
