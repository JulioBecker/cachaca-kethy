// Base seed orders to guarantee specific scenarios
export const baseOrders = [
  {
    id: 1001,
    customerId: 1,
    customerName: "Arthur Pendragon",
    products: [
      { productId: 1, name: "Cachaça Kethy Rios Ouro Premium", price: 189.90, quantity: 1, volume: "750ml" },
      { productId: 3, name: "Cachaça Kethy Rios Amburana Reserva", price: 159.90, quantity: 1, volume: "750ml" }
    ],
    subtotal: 349.80,
    discount: 34.98, // 10% coupon
    shippingCost: 18.50,
    total: 333.32,
    status: "Entregue",
    paymentMethod: "Cartão de Crédito",
    shippingAddress: {
      street: "Avenida Paulista",
      number: "1000",
      complement: "Apto 152",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zip: "01310-100"
    },
    trackingCode: "KR89248001BR",
    date: "2026-05-10T14:32:00.000Z"
  },
  {
    id: 1002,
    customerId: 3,
    customerName: "Mariana Alvarenga",
    products: [
      { productId: 6, name: "Reserva Especial Kethy Rios 10 Anos", price: 850.00, quantity: 1, volume: "750ml" }
    ],
    subtotal: 850.00,
    discount: 0.00,
    shippingCost: 25.00,
    total: 875.00,
    status: "Pago",
    paymentMethod: "Pix",
    shippingAddress: {
      street: "Avenida Atlântica",
      number: "2500",
      complement: "Bloco B, Cobertura",
      neighborhood: "Copacabana",
      city: "Rio de Janeiro",
      state: "RJ",
      zip: "22040-010"
    },
    trackingCode: "KR89248002BR",
    date: "2026-05-28T09:15:00.000Z"
  },
  {
    id: 1003,
    customerId: 4,
    customerName: "Roberto Silva Santos",
    products: [
      { productId: 10, name: "Licor Creme de Café com Cachaça", price: 84.90, quantity: 2, volume: "500ml" },
      { productId: 2, name: "Cachaça Kethy Rios Prata Cristal", price: 89.90, quantity: 1, volume: "750ml" }
    ],
    subtotal: 259.70,
    discount: 0.00,
    shippingCost: 15.00,
    total: 274.70,
    status: "Enviado",
    paymentMethod: "Boleto",
    shippingAddress: {
      street: "Rua da Bahia",
      number: "120",
      complement: "Sala 302",
      neighborhood: "Centro",
      city: "Belo Horizonte",
      state: "MG",
      zip: "30160-010"
    },
    trackingCode: "KR89248003BR",
    date: "2026-05-26T18:45:00.000Z"
  },
  {
    id: 1004,
    customerId: 5,
    customerName: "Juliana Kuster Rios",
    products: [
      { productId: 20, name: "Cachaça Kethy Rios Miniatura Ouro & Prata (Kit)", price: 69.90, quantity: 3, volume: "2x 50ml" }
    ],
    subtotal: 209.70,
    discount: 20.97,
    shippingCost: 0.00, // SC local free shipping
    total: 188.73,
    status: "Entregue",
    paymentMethod: "Pix",
    shippingAddress: {
      street: "Avenida Rolf Wiest",
      number: "277",
      complement: "Apto 804",
      neighborhood: "Bom Retiro",
      city: "Joinville",
      state: "SC",
      zip: "89223-005"
    },
    trackingCode: "KR89248004BR",
    date: "2026-05-24T11:20:00.000Z"
  },
  {
    id: 1005,
    customerId: 6,
    customerName: "Carlos Alberto de Souza",
    products: [
      { productId: 8, name: "Cachaça Kethy Rios Blend Três Madeiras", price: 199.90, quantity: 2, volume: "750ml" },
      { productId: 9, name: "Licor de Cachaça Kethy Rios Mel & Limão", price: 79.90, quantity: 1, volume: "500ml" }
    ],
    subtotal: 479.70,
    discount: 0.00,
    shippingCost: 22.00,
    total: 501.70,
    status: "Pendente",
    paymentMethod: "Boleto",
    shippingAddress: {
      street: "Rua dos Andradas",
      number: "820",
      complement: "Apto 401",
      neighborhood: "Centro Histórico",
      city: "Porto Alegre",
      state: "RS",
      zip: "90020-004"
    },
    trackingCode: "",
    date: "2026-05-29T16:00:00.000Z"
  }
];

// Helper to generate 45 additional historical orders programmatically
export function generateMockOrders(products, customers) {
  const orders = [...baseOrders];
  const statuses = ["Entregue", "Entregue", "Entregue", "Pago", "Pago", "Enviado", "Cancelado", "Pendente"];
  const paymentMethods = ["Pix", "Cartão de Crédito", "Cartão de Crédito", "Boleto"];
  const shippings = [0, 12.90, 19.90, 24.90, 32.00];

  let currentId = 1006;
  const now = new Date();

  // Create 45 orders to reach a total of 50
  for (let i = 0; i < 45; i++) {
    // Pick random customer (exclude admin ID 2)
    const activeCustomers = customers.filter(c => !c.isAdmin);
    const customer = activeCustomers[Math.floor(Math.random() * activeCustomers.length)];
    
    // Pick 1 to 3 random products
    const numberOfItems = Math.floor(Math.random() * 3) + 1;
    const selectedProducts = [];
    let subtotal = 0;
    
    for (let j = 0; j < numberOfItems; j++) {
      const prod = products[Math.floor(Math.random() * products.length)];
      // Prevent duplicates in same order
      if (selectedProducts.find(p => p.productId === prod.id)) continue;
      
      const quantity = Math.floor(Math.random() * 2) + 1;
      selectedProducts.push({
        productId: prod.id,
        name: prod.name,
        price: prod.price,
        quantity: quantity,
        volume: prod.volume
      });
      subtotal += prod.price * quantity;
    }
    
    const address = customer.addresses[0] || {
      street: "Avenida Central",
      number: "100",
      complement: "",
      neighborhood: "Centro",
      city: "Garuva",
      state: "SC",
      zip: "89248-000"
    };

    // Calculate shipping (0 if SC, random otherwise)
    const shippingCost = address.state === "SC" ? 0 : shippings[Math.floor(Math.random() * shippings.length)];
    
    // Random discount
    const hasDiscount = Math.random() > 0.7;
    const discount = hasDiscount ? parseFloat((subtotal * 0.1).toFixed(2)) : 0;
    
    const total = parseFloat((subtotal - discount + shippingCost).toFixed(2));
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    
    // Generate dates spread across the last 120 days
    const orderDate = new Date();
    orderDate.setDate(now.getDate() - Math.floor(Math.random() * 120) - 1);
    orderDate.setHours(Math.floor(Math.random() * 12) + 8, Math.floor(Math.random() * 60));

    const trackingCode = ["Entregue", "Enviado"].includes(status) 
      ? `KR89248${String(currentId).padStart(3, "0")}BR` 
      : "";

    orders.push({
      id: currentId,
      customerId: customer.id,
      customerName: customer.name,
      products: selectedProducts,
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: discount,
      shippingCost: shippingCost,
      total: total,
      status: status,
      paymentMethod: paymentMethod,
      shippingAddress: address,
      trackingCode: trackingCode,
      date: orderDate.toISOString()
    });

    currentId++;
  }

  // Sort orders by date descending
  return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
}
