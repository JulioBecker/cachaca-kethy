import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { ShieldCheck, Package, ShoppingBag, Users, DollarSign, Plus, Edit, Trash2, CheckCircle, RefreshCw, XCircle, Search, FileText } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useProductStore } from "../../store/useProductStore";
import { useOrderStore } from "../../store/useOrderStore";
import { useToastStore } from "../../store/useToastStore";
import SEO from "../../components/SEO";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, customers, loadCustomers } = useAuthStore();
  const { products, loadProducts, addProduct, updateProduct, deleteProduct } = useProductStore();
  const { orders, loadOrders, updateOrderStatus, cancelOrder } = useOrderStore();
  const showToast = useToastStore((state) => state.showToast);

  // Active sub-sections: reports, products, orders, customers
  const [adminTab, setAdminTab] = useState("reports");

  // Search states
  const [productSearch, setProductSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");

  // Product CRUD states
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productFormData, setProductFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    price: "",
    volume: "750ml",
    abv: "40%",
    wood: "Carvalho Americano",
    category: "Envelhecida",
    stock: "10"
  });

  useEffect(() => {
    // Guards
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user && !user.isAdmin) {
      showToast("Acesso restrito para administradores.", "error");
      navigate("/minha-conta");
      return;
    }
    loadProducts();
    loadOrders();
    loadCustomers();
  }, [isAuthenticated, user]);

  if (!user || !user.isAdmin) return null;

  // ----------------------------------------------------
  // REPORT CALCULATIONS
  // ----------------------------------------------------
  const totalRevenue = orders
    .filter(o => o.status !== "Cancelado")
    .reduce((acc, o) => acc + o.total, 0);

  const completedOrdersCount = orders.filter(o => o.status !== "Cancelado").length;
  
  const ticketMedio = completedOrdersCount > 0 ? (totalRevenue / completedOrdersCount) : 0;
  
  const totalCustomers = customers.filter(c => !c.isAdmin).length;

  // Chart data: Faturamento por mês (últimos 4 meses: Fev, Mar, Abr, Mai)
  const billingChartData = [
    { name: "Fevereiro", vendas: 4500, faturamento: 8900 },
    { name: "Março", vendas: 5120, faturamento: 11200 },
    { name: "Abril", vendas: 6200, faturamento: 13900 },
    { name: "Maio", vendas: 7400, faturamento: 17200 }
  ];

  // Chart data: Vendas por Categoria
  const categoryChartData = [
    { name: "Envelhecida", quantidade: products.filter(p => p.category === "Envelhecida").reduce((acc, p) => acc + p.salesCount, 0) },
    { name: "Prata", quantidade: products.filter(p => p.category === "Prata").reduce((acc, p) => acc + p.salesCount, 0) },
    { name: "Licor", quantidade: products.filter(p => p.category === "Licor").reduce((acc, p) => acc + p.salesCount, 0) },
    { name: "Reserva", quantidade: products.filter(p => p.category === "Reserva Especial").reduce((acc, p) => acc + p.salesCount, 0) }
  ];

  // Top products
  const topProducts = [...products]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 5)
    .map(p => ({ name: p.name.split("Kethy Rios ")[1] || p.name, vendas: p.salesCount }));

  // ----------------------------------------------------
  // PRODUCT ACTIONS (CRUD)
  // ----------------------------------------------------
  const handleProductSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...productFormData,
      price: Number(productFormData.price),
      stock: Number(productFormData.stock)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, formattedData);
      showToast("Produto atualizado com sucesso!", "success");
    } else {
      addProduct(formattedData);
      showToast("Produto cadastrado com sucesso!", "success");
    }

    setEditingProduct(null);
    setShowProductForm(false);
    setProductFormData({ name: "", tagline: "", description: "", price: "", volume: "750ml", abv: "40%", wood: "Carvalho Americano", category: "Envelhecida", stock: "10" });
  };

  const handleEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductFormData({
      name: prod.name,
      tagline: prod.tagline,
      description: prod.description,
      price: String(prod.price),
      volume: prod.volume,
      abv: prod.abv,
      wood: prod.wood,
      category: prod.category,
      stock: String(prod.stock)
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      deleteProduct(id);
      showToast("Produto excluído.", "success");
    }
  };

  // ----------------------------------------------------
  // MAPPING & FILTERS
  // ----------------------------------------------------
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.wood.toLowerCase().includes(productSearch.toLowerCase()));
  const filteredOrders = orders.filter(o => String(o.id).includes(orderSearch) || o.customerName.toLowerCase().includes(orderSearch.toLowerCase()));
  const filteredCustomers = customers.filter(c => !c.isAdmin && (c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.email.toLowerCase().includes(customerSearch.toLowerCase())));

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen py-10 font-sans text-left">
      <SEO title="Painel Administrativo" description="Administração e relatórios do e-commerce Cachaça Kethy Rios." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Title */}
        <div className="border-b border-brand-chocolate/10 pb-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl uppercase tracking-widest font-light text-brand-dark flex items-center space-x-2">
              <ShieldCheck size={26} className="text-brand-beige" />
              <span>Painel Administrativo</span>
            </h1>
            <p className="text-[10px] text-brand-dark/50 uppercase tracking-widest mt-0.5">Gestão Geral • Cachaça Kethy Rios</p>
          </div>

          {/* Quick links header */}
          <div className="flex border border-brand-chocolate/20 rounded uppercase text-[10px] tracking-widest font-bold bg-white">
            <button
              onClick={() => setAdminTab("reports")}
              className={`px-4 py-2.5 transition-all ${adminTab === "reports" ? "bg-brand-chocolate text-brand-beige" : "text-brand-dark/70 hover:bg-brand-light"}`}
            >
              Relatórios
            </button>
            <button
              onClick={() => setAdminTab("products")}
              className={`px-4 py-2.5 transition-all ${adminTab === "products" ? "bg-brand-chocolate text-brand-beige" : "text-brand-dark/70 hover:bg-brand-light"}`}
            >
              Produtos
            </button>
            <button
              onClick={() => setAdminTab("orders")}
              className={`px-4 py-2.5 transition-all ${adminTab === "orders" ? "bg-brand-chocolate text-brand-beige" : "text-brand-dark/70 hover:bg-brand-light"}`}
            >
              Pedidos
            </button>
            <button
              onClick={() => setAdminTab("customers")}
              className={`px-4 py-2.5 transition-all ${adminTab === "customers" ? "bg-brand-chocolate text-brand-beige" : "text-brand-dark/70 hover:bg-brand-light"}`}
            >
              Clientes
            </button>
          </div>
        </div>

        {/* Tab CONTENT Relatórios (Analytics Overview) */}
        {adminTab === "reports" && (
          <div className="space-y-8">
            
            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs uppercase font-bold tracking-widest text-brand-dark">
              
              <div className="bg-white border border-brand-chocolate/10 p-5 shadow-sm flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <DollarSign size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-brand-dark/50 font-semibold block">Faturamento</span>
                  <span className="text-base font-bold">R$ {totalRevenue.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-white border border-brand-chocolate/10 p-5 shadow-sm flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-brand-dark/50 font-semibold block">Vendas Concluídas</span>
                  <span className="text-base font-bold">{completedOrdersCount} Pedidos</span>
                </div>
              </div>

              <div className="bg-white border border-brand-chocolate/10 p-5 shadow-sm flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-brand-dark/50 font-semibold block">Ticket Médio</span>
                  <span className="text-base font-bold">R$ {ticketMedio.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-white border border-brand-chocolate/10 p-5 shadow-sm flex items-center space-x-4">
                <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-brand-dark/50 font-semibold block">Clientes Ativos</span>
                  <span className="text-base font-bold">{totalCustomers} Cadastrados</span>
                </div>
              </div>
            </div>

            {/* Graphs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs font-bold uppercase tracking-widest text-brand-dark">
              
              {/* Area Chart: Faturamento */}
              <div className="bg-white border border-brand-chocolate/10 p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-brand-chocolate border-b border-brand-chocolate/5 pb-2 uppercase">Faturamento Mensal (R$)</h3>
                <div className="h-64 text-[10px] font-sans">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={billingChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E7CFA5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#E7CFA5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="faturamento" stroke="#BD7C31" fillOpacity={1} fill="url(#colorFaturamento)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart: top products */}
              <div className="bg-white border border-brand-chocolate/10 p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-brand-chocolate border-b border-brand-chocolate/5 pb-2 uppercase">Top 5 Produtos Mais Vendidos (Qtd)</h3>
                <div className="h-64 text-[10px] font-sans">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProducts} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="vendas" fill="#32221A" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Bottom Category Graph */}
            <div className="bg-white border border-brand-chocolate/10 p-6 shadow-sm text-xs font-bold uppercase tracking-widest text-brand-dark">
              <h3 className="text-xs font-bold text-brand-chocolate border-b border-brand-chocolate/5 pb-2 mb-4 uppercase">Volume de Vendas por Madeira/Categoria</h3>
              <div className="h-64 text-[10px] font-sans">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantidade" fill="#BD7C31" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

        {/* Tab CONTENT: Produtos (CRUD) */}
        {adminTab === "products" && (
          <div className="space-y-6">
            
            {/* Header controls products */}
            <div className="bg-white border border-brand-chocolate/10 p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              
              {/* Search product */}
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Buscar produto por nome..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 text-xs px-3 py-2 pl-8 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                />
                <Search size={14} className="absolute left-2.5 top-3 text-brand-dark/45" />
              </div>

              {/* Add product trigger */}
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductFormData({ name: "", tagline: "", description: "", price: "", volume: "750ml", abv: "40%", wood: "Carvalho Americano", category: "Envelhecida", stock: "10" });
                  setShowProductForm(true);
                }}
                className="bg-brand-chocolate text-brand-beige text-xs uppercase tracking-widest font-bold px-4 py-2 flex items-center space-x-1.5 w-full sm:w-auto justify-center"
              >
                <Plus size={14} />
                <span>Cadastrar Produto</span>
              </button>
            </div>

            {/* Product registration form modal */}
            {showProductForm && (
              <form onSubmit={handleProductSubmit} className="bg-white border border-brand-chocolate/15 p-6 shadow-lg space-y-4 text-xs">
                <h3 className="text-xs uppercase tracking-widest font-bold border-b border-brand-chocolate/10 pb-2 text-brand-chocolate">
                  {editingProduct ? `Editar Rótulo: ${editingProduct.name}` : "Cadastrar Nova Cachaça"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Nome do Rótulo</label>
                    <input
                      type="text"
                      required
                      value={productFormData.name}
                      onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Slogan / Chamada rápida</label>
                    <input
                      type="text"
                      required
                      value={productFormData.tagline}
                      onChange={(e) => setProductFormData({ ...productFormData, tagline: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Descrição Detalhada</label>
                  <textarea
                    required
                    rows="3"
                    value={productFormData.description}
                    onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                    className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Preço (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={productFormData.price}
                      onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Estoque Inicial</label>
                    <input
                      type="number"
                      required
                      value={productFormData.stock}
                      onChange={(e) => setProductFormData({ ...productFormData, stock: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Madeira</label>
                    <input
                      type="text"
                      required
                      value={productFormData.wood}
                      onChange={(e) => setProductFormData({ ...productFormData, wood: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Categoria</label>
                    <select
                      value={productFormData.category}
                      onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none uppercase tracking-wider"
                    >
                      <option value="Envelhecida">Envelhecida</option>
                      <option value="Prata">Prata</option>
                      <option value="Licor">Licor</option>
                      <option value="Reserva Especial">Reserva Especial</option>
                      <option value="Kit Presente">Kit Presente</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    className="bg-brand-chocolate text-white text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 hover:bg-brand-dark"
                  >
                    {editingProduct ? "Salvar Rótulo" : "Cadastrar Rótulo"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProductForm(false)}
                    className="border border-brand-chocolate/20 text-brand-dark/75 text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 hover:bg-brand-light"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {/* Products CRUD Table List */}
            <div className="bg-white border border-brand-chocolate/10 shadow-sm overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-chocolate/20 uppercase tracking-widest font-bold text-brand-dark/60 text-[10px] bg-brand-light/50">
                    <th className="py-3 px-4">Código</th>
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Estoque</th>
                    <th className="py-3 px-4">Preço</th>
                    <th className="py-3 px-4">Vendas</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-chocolate/5">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-brand-light/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold">#{prod.id}</td>
                      <td className="py-3 px-4 font-bold uppercase">{prod.name}</td>
                      <td className="py-3 px-4 text-brand-dark/70 uppercase">{prod.category}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${prod.stock <= 5 ? "text-red-600 font-bold" : "text-brand-dark/80"}`}>
                          {prod.stock} un.
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-brand-chocolate">R$ {prod.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-brand-dark/70">{prod.salesCount} vendas</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEditProduct(prod)}
                          className="text-brand-chocolate hover:text-brand-dark inline-block p-1"
                          title="Editar"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="text-red-500 hover:text-red-700 inline-block p-1"
                          title="Excluir"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab CONTENT: Pedidos (Gestão de Pedidos) */}
        {adminTab === "orders" && (
          <div className="space-y-6">
            
            {/* Search orders */}
            <div className="bg-white border border-brand-chocolate/10 p-4 shadow-sm">
              <div className="relative max-w-xs">
                <input
                  type="text"
                  placeholder="Buscar por ID ou nome..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 text-xs px-3 py-2 pl-8 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                />
                <Search size={14} className="absolute left-2.5 top-3 text-brand-dark/45" />
              </div>
            </div>

            {/* Orders List Table */}
            <div className="bg-white border border-brand-chocolate/10 shadow-sm overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-chocolate/20 uppercase tracking-widest font-bold text-brand-dark/60 text-[10px] bg-brand-light/50">
                    <th className="py-3 px-4">Pedido</th>
                    <th className="py-3 px-4">Cliente</th>
                    <th className="py-3 px-4">Data</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Pagamento</th>
                    <th className="py-3 px-4 text-right">Mudar Status / Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-chocolate/5">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-brand-light/30 transition-colors">
                      <td className="py-4 px-4 font-bold">#{ord.id}</td>
                      <td className="py-4 px-4 font-semibold uppercase">{ord.customerName}</td>
                      <td className="py-4 px-4 text-brand-dark/70">{new Date(ord.date).toLocaleDateString("pt-BR")}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-0.5 rounded border text-[10px] uppercase font-semibold ${
                          ord.status === "Pendente" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                          ord.status === "Pago" ? "bg-blue-100 text-blue-800 border-blue-200" :
                          ord.status === "Enviado" ? "bg-indigo-100 text-indigo-800 border-indigo-200" :
                          ord.status === "Entregue" ? "bg-green-100 text-green-800 border-green-200" :
                          "bg-red-100 text-red-800 border-red-200"
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-brand-chocolate">R$ {ord.total.toFixed(2)}</td>
                      <td className="py-4 px-4 text-brand-dark/70 uppercase">{ord.paymentMethod}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        {ord.status !== "Cancelado" && ord.status !== "Entregue" && (
                          <select
                            value={ord.status}
                            onChange={(e) => {
                              updateOrderStatus(ord.id, e.target.value);
                              showToast(`Status do Pedido #${ord.id} alterado para ${e.target.value}!`, "success");
                            }}
                            className="bg-brand-light border border-brand-chocolate/20 text-[10px] px-2 py-1 focus:outline-none uppercase tracking-widest font-bold"
                          >
                            <option value="Pendente">Pendente</option>
                            <option value="Pago">Pago</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Entregue">Entregue</option>
                          </select>
                        )}
                        
                        {ord.status !== "Cancelado" && (
                          <button
                            onClick={() => {
                              if (confirm(`Deseja cancelar o pedido #${ord.id}? O estoque dos produtos será devolvido.`)) {
                                cancelOrder(ord.id);
                                showToast(`Pedido #${ord.id} cancelado com sucesso.`, "info");
                              }
                            }}
                            className="text-red-500 hover:text-red-700 inline-block p-1"
                            title="Cancelar Pedido"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab CONTENT: Clientes (Gestão de Clientes) */}
        {adminTab === "customers" && (
          <div className="space-y-6">
            
            {/* Search customers */}
            <div className="bg-white border border-brand-chocolate/10 p-4 shadow-sm">
              <div className="relative max-w-xs">
                <input
                  type="text"
                  placeholder="Buscar cliente por nome..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 text-xs px-3 py-2 pl-8 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                />
                <Search size={14} className="absolute left-2.5 top-3 text-brand-dark/45" />
              </div>
            </div>

            {/* Customers table list */}
            <div className="bg-white border border-brand-chocolate/10 shadow-sm overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-chocolate/20 uppercase tracking-widest font-bold text-brand-dark/60 text-[10px] bg-brand-light/50">
                    <th className="py-3 px-4">Código</th>
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">E-mail</th>
                    <th className="py-3 px-4">Telefone</th>
                    <th className="py-3 px-4">Compras</th>
                    <th className="py-3 px-4">Total Gasto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-chocolate/5">
                  {filteredCustomers.map((cust) => {
                    const clientOrders = orders.filter(o => o.customerId === cust.id && o.status !== "Cancelado");
                    const totalSpent = clientOrders.reduce((sum, o) => sum + o.total, 0);

                    return (
                      <tr key={cust.id} className="hover:bg-brand-light/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold">#{cust.id}</td>
                        <td className="py-3.5 px-4 font-bold uppercase">{cust.name}</td>
                        <td className="py-3.5 px-4 text-brand-dark/70 font-semibold">{cust.email}</td>
                        <td className="py-3.5 px-4 text-brand-dark/70">{cust.phone || "Não informado"}</td>
                        <td className="py-3.5 px-4 font-semibold">{clientOrders.length} pedidos</td>
                        <td className="py-3.5 px-4 font-bold text-brand-chocolate">R$ {totalSpent.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
