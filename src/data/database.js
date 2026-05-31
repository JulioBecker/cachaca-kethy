import { initialProducts } from "./products";
import { initialCustomers } from "./customers";
import { generateMockOrders } from "./orders";

const PRODUCTS_KEY = "kethy_products";
const CUSTOMERS_KEY = "kethy_customers";
const ORDERS_KEY = "kethy_orders";
const INITIALIZED_KEY = "kethy_initialized";

export function initializeDatabase() {
  const isInitialized = localStorage.getItem(INITIALIZED_KEY);

  if (!isInitialized) {
    // 1. Store products
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
    
    // 2. Store customers
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(initialCustomers));
    
    // 3. Generate and store 50 orders based on products and customers
    const generatedOrders = generateMockOrders(initialProducts, initialCustomers);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(generatedOrders));
    
    // Mark as initialized
    localStorage.setItem(INITIALIZED_KEY, "true");
    console.log("Cachaça Kethy Rios: Banco de dados mock inicializado no LocalStorage com sucesso!");
  } else {
    try {
      const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
      if (stored && stored.length > 0 && (stored[0].name !== initialProducts[0].name || !stored[0].images || !stored[0].images[0].includes("produto.jpg") || stored[0].images[0].startsWith("/"))) {
        const updated = stored.map(p => {
          const match = initialProducts.find(ip => ip.id === p.id);
          return match ? { 
            ...p, 
            name: match.name, 
            tagline: match.tagline, 
            description: match.description, 
            wood: match.wood, 
            images: match.images 
          } : p;
        });
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
        console.log("Cachaça Kethy Rios: Detalhes dos produtos sincronizados com o banco inicial no LocalStorage");
      }
    } catch (e) {
      console.error(e);
    }
  }
}

// Products helpers
export function getProducts() {
  initializeDatabase();
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// Customers helpers
export function getCustomers() {
  initializeDatabase();
  return JSON.parse(localStorage.getItem(CUSTOMERS_KEY)) || [];
}

export function saveCustomers(customers) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

// Orders helpers
export function getOrders() {
  initializeDatabase();
  return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// Utility to clear database and restart (useful for testing)
export function resetDatabase() {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(CUSTOMERS_KEY);
  localStorage.removeItem(ORDERS_KEY);
  localStorage.removeItem(INITIALIZED_KEY);
  initializeDatabase();
}
