import { create } from "zustand";
import { getCustomers, saveCustomers } from "../data/database";

const SESSION_KEY = "kethy_user_session";

export const useAuthStore = create((set, get) => {
  // Read initial session
  const storedSession = localStorage.getItem(SESSION_KEY);
  const initialUser = storedSession ? JSON.parse(storedSession) : null;

  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    customers: [],

    loadCustomers: () => {
      const customers = getCustomers();
      set({ customers });
      
      // Keep session in sync if customer data changes
      const currentUser = get().user;
      if (currentUser) {
        const freshUser = customers.find(c => c.id === currentUser.id);
        if (freshUser) {
          set({ user: freshUser });
          localStorage.setItem(SESSION_KEY, JSON.stringify(freshUser));
        }
      }
    },

    login: (email, password) => {
      get().loadCustomers();
      const customers = get().customers;
      const found = customers.find(
        c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
      );

      if (found) {
        set({ user: found, isAuthenticated: true });
        localStorage.setItem(SESSION_KEY, JSON.stringify(found));
        return { success: true, user: found };
      }
      return { success: false, message: "E-mail ou senha incorretos." };
    },

    logout: () => {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem(SESSION_KEY);
    },

    register: (name, email, password, phone) => {
      get().loadCustomers();
      const customers = get().customers;
      
      const emailExists = customers.some(
        c => c.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        return { success: false, message: "Este e-mail já está cadastrado." };
      }

      const newCustomer = {
        id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
        name,
        email,
        password,
        phone,
        isAdmin: false,
        favorites: [],
        addresses: []
      };

      const updatedCustomers = [...customers, newCustomer];
      saveCustomers(updatedCustomers);
      set({ customers: updatedCustomers, user: newCustomer, isAuthenticated: true });
      localStorage.setItem(SESSION_KEY, JSON.stringify(newCustomer));

      return { success: true, user: newCustomer };
    },

    updateProfile: (name, email, phone, password = "") => {
      const currentUser = get().user;
      if (!currentUser) return { success: false, message: "Usuário não autenticado." };

      get().loadCustomers();
      const customers = get().customers;

      // Check if email taken by another customer
      const emailExists = customers.some(
        c => c.email.toLowerCase() === email.toLowerCase() && c.id !== currentUser.id
      );

      if (emailExists) {
        return { success: false, message: "Este e-mail já está em uso por outro usuário." };
      }

      const updatedCustomers = customers.map(c => {
        if (c.id === currentUser.id) {
          const updated = { ...c, name, email, phone };
          if (password) updated.password = password;
          return updated;
        }
        return c;
      });

      saveCustomers(updatedCustomers);
      
      const freshUser = updatedCustomers.find(c => c.id === currentUser.id);
      set({ customers: updatedCustomers, user: freshUser });
      localStorage.setItem(SESSION_KEY, JSON.stringify(freshUser));

      return { success: true, message: "Perfil atualizado com sucesso." };
    },

    addAddress: (addressData) => {
      const currentUser = get().user;
      if (!currentUser) return;

      get().loadCustomers();
      const customers = get().customers;

      const newAddress = {
        id: Date.now(),
        ...addressData,
        isDefault: currentUser.addresses.length === 0 ? true : addressData.isDefault
      };

      const updatedCustomers = customers.map(c => {
        if (c.id === currentUser.id) {
          let addresses = [...c.addresses];
          if (newAddress.isDefault) {
            // Set all others to false
            addresses = addresses.map(addr => ({ ...addr, isDefault: false }));
          }
          addresses.push(newAddress);
          return { ...c, addresses };
        }
        return c;
      });

      saveCustomers(updatedCustomers);
      const freshUser = updatedCustomers.find(c => c.id === currentUser.id);
      set({ customers: updatedCustomers, user: freshUser });
      localStorage.setItem(SESSION_KEY, JSON.stringify(freshUser));
    },

    removeAddress: (addressId) => {
      const currentUser = get().user;
      if (!currentUser) return;

      get().loadCustomers();
      const customers = get().customers;

      const updatedCustomers = customers.map(c => {
        if (c.id === currentUser.id) {
          let addresses = c.addresses.filter(addr => addr.id !== addressId);
          // If we deleted the default, set first remaining as default
          if (addresses.length > 0 && !addresses.some(addr => addr.isDefault)) {
            addresses[0].isDefault = true;
          }
          return { ...c, addresses };
        }
        return c;
      });

      saveCustomers(updatedCustomers);
      const freshUser = updatedCustomers.find(c => c.id === currentUser.id);
      set({ customers: updatedCustomers, user: freshUser });
      localStorage.setItem(SESSION_KEY, JSON.stringify(freshUser));
    },

    toggleFavorite: (productId) => {
      const currentUser = get().user;
      if (!currentUser) return { success: false, message: "É necessário estar logado para favoritar produtos." };

      get().loadCustomers();
      const customers = get().customers;

      const updatedCustomers = customers.map(c => {
        if (c.id === currentUser.id) {
          const isFav = c.favorites.includes(productId);
          const favorites = isFav 
            ? c.favorites.filter(id => id !== productId)
            : [...c.favorites, productId];
          return { ...c, favorites };
        }
        return c;
      });

      saveCustomers(updatedCustomers);
      const freshUser = updatedCustomers.find(c => c.id === currentUser.id);
      set({ customers: updatedCustomers, user: freshUser });
      localStorage.setItem(SESSION_KEY, JSON.stringify(freshUser));
      return { success: true };
    }
  };
});
