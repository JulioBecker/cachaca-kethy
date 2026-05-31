import { create } from "zustand";
import { getProducts, saveProducts } from "../data/database";

export const useProductStore = create((set, get) => {
  return {
    products: [],

    loadProducts: () => {
      const products = getProducts();
      set({ products });
    },

    addProduct: (productData) => {
      get().loadProducts();
      const products = get().products;
      
      const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        salesCount: 0,
        rating: 5.0,
        reviews: [],
        images: ["/placeholder_bottle.jpg"],
        features: productData.features || [],
        details: productData.details || {
          color: "Não informada",
          aroma: "Não informado",
          taste: "Não informado",
          pairing: "Não informada"
        },
        ...productData
      };

      const updated = [newProduct, ...products];
      saveProducts(updated);
      set({ products: updated });
      return { success: true, product: newProduct };
    },

    updateProduct: (id, updatedData) => {
      get().loadProducts();
      const products = get().products;

      const updated = products.map(p => {
        if (p.id === id) {
          return {
            ...p,
            ...updatedData,
            // Keep critical nested objects if not provided in updatedData
            details: {
              ...p.details,
              ...(updatedData.details || {})
            }
          };
        }
        return p;
      });

      saveProducts(updated);
      set({ products: updated });
      return { success: true };
    },

    deleteProduct: (id) => {
      get().loadProducts();
      const products = get().products;
      
      const updated = products.filter(p => p.id !== id);
      saveProducts(updated);
      set({ products: updated });
      return { success: true };
    },

    addProductReview: (productId, reviewData) => {
      get().loadProducts();
      const products = get().products;

      const updated = products.map(p => {
        if (p.id === productId) {
          const newReview = {
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            ...reviewData
          };
          const reviews = [...p.reviews, newReview];
          
          // Re-calculate average rating
          const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
          const rating = parseFloat((totalRating / reviews.length).toFixed(1));

          return { ...p, reviews, rating };
        }
        return p;
      });

      saveProducts(updated);
      set({ products: updated });
      return { success: true };
    },

    decreaseStock: (productId, quantity) => {
      get().loadProducts();
      const products = get().products;

      const updated = products.map(p => {
        if (p.id === productId) {
          const newStock = Math.max(0, p.stock - quantity);
          const salesCount = p.salesCount + quantity;
          return { ...p, stock: newStock, salesCount };
        }
        return p;
      });

      saveProducts(updated);
      set({ products: updated });
    },

    increaseStock: (productId, quantity) => {
      get().loadProducts();
      const products = get().products;

      const updated = products.map(p => {
        if (p.id === productId) {
          return { ...p, stock: p.stock + quantity };
        }
        return p;
      });

      saveProducts(updated);
      set({ products: updated });
    }
  };
});
