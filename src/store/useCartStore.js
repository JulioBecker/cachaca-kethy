import { create } from "zustand";

const CART_STORAGE_KEY = "kethy_cart_session";

export const useCartStore = create((set, get) => {
  // Read initial cart
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  const initialCart = storedCart ? JSON.parse(storedCart) : [];

  return {
    cart: initialCart,
    coupon: null,
    shippingCode: "",
    shippingInfo: null,

    saveCartToStorage: (cart) => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    },

    addToCart: (product, quantity = 1) => {
      const currentCart = get().cart;
      const existingItem = currentCart.find((item) => item.id === product.id);
      
      let updatedCart;
      if (existingItem) {
        updatedCart = currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [
          ...currentCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            volume: product.volume,
            image: product.images[0] || "/default_bottle.jpg"
          }
        ];
      }

      set({ cart: updatedCart });
      get().saveCartToStorage(updatedCart);
    },

    removeFromCart: (productId) => {
      const updatedCart = get().cart.filter((item) => item.id !== productId);
      set({ cart: updatedCart });
      get().saveCartToStorage(updatedCart);
    },

    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        get().removeFromCart(productId);
        return;
      }
      
      const updatedCart = get().cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      
      set({ cart: updatedCart });
      get().saveCartToStorage(updatedCart);
    },

    clearCart: () => {
      set({ cart: [], coupon: null, shippingCode: "", shippingInfo: null });
      localStorage.removeItem(CART_STORAGE_KEY);
    },

    applyCoupon: (code) => {
      const sanitized = code.trim().toUpperCase();
      const validCoupons = {
        "KETHY10": { code: "KETHY10", value: 10, type: "percent" },
        "KETHY20": { code: "KETHY20", value: 20, type: "percent" },
        "SABORBRASIL": { code: "SABORBRASIL", value: 15, type: "percent" },
        "FRETEGRATIS": { code: "FRETEGRATIS", value: 100, type: "shipping" }, // 100% off shipping
        "BOASVINDAS": { code: "BOASVINDAS", value: 30.00, type: "fixed" } // R$ 30 off
      };

      const matched = validCoupons[sanitized];
      if (matched) {
        set({ coupon: matched });
        return { success: true, message: `Cupom ${matched.code} aplicado com sucesso!` };
      }
      return { success: false, message: "Cupom inválido ou expirado." };
    },

    removeCoupon: () => {
      set({ coupon: null });
    },

    calculateShipping: (cep) => {
      const sanitizedCep = cep.replace(/\D/g, "");
      if (sanitizedCep.length !== 8) {
        return { success: false, message: "CEP inválido. Digite 8 números." };
      }

      // Mock calculation based on Brazilian regions (by first digit of CEP)
      // SC CEPs start with '88', '89' (Garuva is 89248-000)
      // 0-1: SP
      // 2: RJ, ES
      // 3: MG
      // 4: BA, SE
      // 5: PE, AL, PB, RN
      // 6: CE, PI, MA, PA, AM, AP, RR
      // 7: DF, GO, TO, MT, MS, RO, AC
      // 8: PR, SC
      // 9: RS

      let cost = 22.90;
      let days = 5;
      const firstDigit = sanitizedCep[0];
      const statePrefix = sanitizedCep.substring(0, 2);

      // Local State SC (Zip 89... or 88...) -> Free or Super Cheap
      if (statePrefix === "89" || statePrefix === "88") {
        if (sanitizedCep.startsWith("89248")) {
          // Garuva local
          cost = 0;
          days = 1;
        } else {
          // Rest of SC
          cost = 9.90;
          days = 2;
        }
      } else if (["0", "1", "8"].includes(firstDigit)) {
        // SP, PR
        cost = 14.90;
        days = 3;
      } else if (["2", "3", "9"].includes(firstDigit)) {
        // RJ, MG, RS, ES
        cost = 19.90;
        days = 4;
      } else if (["4", "7"].includes(firstDigit)) {
        // BA, DF, GO, Centro-Oeste
        cost = 26.90;
        days = 6;
      } else {
        // Norte and Nordeste
        cost = 35.90;
        days = 8;
      }

      const shippingInfo = {
        cep,
        cost,
        days,
        carrier: "Correios Sedex"
      };

      set({ shippingCode: cep, shippingInfo });
      return { success: true, shippingInfo };
    },

    getTotals: () => {
      const cart = get().cart;
      const coupon = get().coupon;
      const shippingInfo = get().shippingInfo;

      const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      
      let discountAmount = 0;
      if (coupon) {
        if (coupon.type === "percent") {
          discountAmount = (subtotal * coupon.value) / 100;
        } else if (coupon.type === "fixed") {
          discountAmount = Math.min(coupon.value, subtotal);
        }
      }

      let shippingCost = shippingInfo ? shippingInfo.cost : 0;
      if (coupon && coupon.type === "shipping") {
        shippingCost = 0;
      }

      const total = Math.max(0, subtotal - discountAmount + shippingCost);

      return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        discountAmount: parseFloat(discountAmount.toFixed(2)),
        shippingCost: parseFloat(shippingCost.toFixed(2)),
        total: parseFloat(total.toFixed(2))
      };
    }
  };
});
