import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User, ShoppingBag, Heart, MapPin, Key, LogOut, Plus, Trash2, CheckCircle, Truck, Package, Clock, Eye } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useOrderStore } from "../../store/useOrderStore";
import { useProductStore } from "../../store/useProductStore";
import { useToastStore } from "../../store/useToastStore";
import { useCartStore } from "../../store/useCartStore";
import SEO from "../../components/SEO";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  const { user, isAuthenticated, updateProfile, addAddress, removeAddress, toggleFavorite } = useAuthStore();
  const { orders, loadOrders } = useOrderStore();
  const { products, loadProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);

  // States
  const [profileForm, setProfileForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [addressForm, setAddressForm] = useState({ street: "", number: "", complement: "", neighborhood: "", city: "", state: "", zip: "", isDefault: false });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadOrders();
    loadProducts();
    if (user) {
      setProfileForm({ name: user.name, email: user.email, phone: user.phone || "", password: "", confirmPassword: "" });
    }
  }, [isAuthenticated, user]);

  if (!user) return null;

  // Filter orders matching logged-in customer ID
  const customerOrders = orders.filter(o => o.customerId === user.id);

  // Get favorites products details
  const favoriteProducts = products.filter(p => user.favorites?.includes(p.id));

  // Profile update
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (profileForm.password !== profileForm.confirmPassword) {
      showToast("As senhas não coincidem.", "error");
      return;
    }
    const res = updateProfile(profileForm.name, profileForm.email, profileForm.phone, profileForm.password);
    if (res.success) {
      showToast(res.message, "success");
      setProfileForm({ ...profileForm, password: "", confirmPassword: "" });
    } else {
      showToast(res.message, "error");
    }
  };

  // Add shipping address
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    addAddress(addressForm);
    showToast("Endereço adicionado com sucesso!", "success");
    setAddressForm({ street: "", number: "", complement: "", neighborhood: "", city: "", state: "", zip: "", isDefault: false });
    setShowAddressForm(false);
  };

  const handleRemoveAddress = (addrId) => {
    removeAddress(addrId);
    showToast("Endereço removido.", "success");
  };

  const handleToggleFavorite = (prodId) => {
    toggleFavorite(prodId);
    showToast("Favorito atualizado.", "success");
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(`${product.name} adicionado à sacola!`, "success");
  };

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
    setSelectedOrder(null);
  };

  const getStatusIcon = (status) => {
    if (status === "Pendente") return <Clock className="text-yellow-600" size={16} />;
    if (status === "Pago") return <CheckCircle className="text-blue-600" size={16} />;
    if (status === "Enviado") return <Truck className="text-indigo-600" size={16} />;
    if (status === "Entregue") return <Package className="text-green-600" size={16} />;
    return <Clock className="text-red-500" size={16} />; // Cancelled
  };

  const getStatusColor = (status) => {
    if (status === "Pendente") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (status === "Pago") return "bg-blue-100 text-blue-800 border-blue-200";
    if (status === "Enviado") return "bg-indigo-100 text-indigo-800 border-indigo-200";
    if (status === "Entregue") return "bg-green-100 text-green-800 border-green-200";
    return "bg-red-100 text-red-800 border-red-200"; // Cancelled
  };

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen py-10 font-sans text-left">
      <SEO title="Minha Conta" description="Gerencie seu perfil, acompanhe seus pedidos e favoritos na Cachaça Kethy Rios." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side tabs navigation (Left) */}
          <div className="lg:col-span-3 bg-white border border-brand-chocolate/10 shadow-sm p-4 space-y-2">
            <div className="p-4 border-b border-brand-chocolate/10 mb-4 text-center">
              <div className="w-16 h-16 bg-brand-chocolate text-brand-beige flex items-center justify-center rounded-full mx-auto mb-2 text-xl font-bold uppercase">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-brand-dark truncate">{user.name}</h2>
              <span className="text-[10px] text-brand-dark/50 uppercase tracking-widest block mt-0.5">{user.email}</span>
            </div>

            <button
              onClick={() => handleTabChange("profile")}
              className={`w-full flex items-center space-x-3 text-xs uppercase tracking-widest font-semibold px-4 py-3 rounded-md transition-all ${
                activeTab === "profile" ? "bg-brand-chocolate text-brand-beige" : "text-brand-dark/75 hover:bg-brand-chocolate/5"
              }`}
            >
              <User size={16} />
              <span>Meu Perfil</span>
            </button>

            <button
              onClick={() => handleTabChange("orders")}
              className={`w-full flex items-center space-x-3 text-xs uppercase tracking-widest font-semibold px-4 py-3 rounded-md transition-all ${
                activeTab === "orders" ? "bg-brand-chocolate text-brand-beige" : "text-brand-dark/75 hover:bg-brand-chocolate/5"
              }`}
            >
              <ShoppingBag size={16} />
              <span>Meus Pedidos</span>
            </button>

            <button
              onClick={() => handleTabChange("favorites")}
              className={`w-full flex items-center space-x-3 text-xs uppercase tracking-widest font-semibold px-4 py-3 rounded-md transition-all ${
                activeTab === "favorites" ? "bg-brand-chocolate text-brand-beige" : "text-brand-dark/75 hover:bg-brand-chocolate/5"
              }`}
            >
              <Heart size={16} />
              <span>Favoritos</span>
            </button>

            <button
              onClick={() => handleTabChange("addresses")}
              className={`w-full flex items-center space-x-3 text-xs uppercase tracking-widest font-semibold px-4 py-3 rounded-md transition-all ${
                activeTab === "addresses" ? "bg-brand-chocolate text-brand-beige" : "text-brand-dark/75 hover:bg-brand-chocolate/5"
              }`}
            >
              <MapPin size={16} />
              <span>Endereços</span>
            </button>
          </div>

          {/* Details Content Panel (Right) */}
          <div className="lg:col-span-9 bg-white border border-brand-chocolate/10 shadow-md p-6 sm:p-8 min-h-[500px]">
            
            {/* Tab: Profile */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold border-b border-brand-chocolate/15 pb-2">Meu Perfil / Configurações da Conta</h3>
                
                <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">E-mail</label>
                      <input
                        type="email"
                        required
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">Telefone</label>
                      <input
                        type="tel"
                        required
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                      />
                    </div>
                  </div>

                  <div className="border-t border-brand-chocolate/10 pt-4 space-y-4">
                    <h4 className="font-bold text-brand-chocolate uppercase tracking-widest text-[10px]">Alteração de Senha (opcional)</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">Nova Senha</label>
                        <input
                          type="password"
                          value={profileForm.password}
                          onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                          className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">Confirmar Nova Senha</label>
                        <input
                          type="password"
                          value={profileForm.confirmPassword}
                          onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                          className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-brand-chocolate hover:bg-brand-dark text-white text-xs uppercase tracking-widest font-bold px-8 py-3.5 transition-colors duration-300"
                  >
                    Salvar Alterações
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Orders */}
            {activeTab === "orders" && !selectedOrder && (
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold border-b border-brand-chocolate/15 pb-2">Meus Pedidos / Rastreamento</h3>
                
                {customerOrders.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <ShoppingBag size={32} className="mx-auto text-brand-dark/30" />
                    <p className="text-xs italic text-brand-dark/60 uppercase">Você ainda não realizou compras em nossa loja.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-brand-chocolate/20 uppercase tracking-widest font-bold text-brand-dark/60 text-[10px]">
                          <th className="py-3">Pedido</th>
                          <th className="py-3">Data</th>
                          <th className="py-3">Status</th>
                          <th className="py-3">Total</th>
                          <th className="py-3 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-chocolate/5">
                        {customerOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-brand-light/40 transition-colors">
                            <td className="py-3.5 font-bold">#{ord.id}</td>
                            <td className="py-3.5 text-brand-dark/70">{new Date(ord.date).toLocaleDateString("pt-BR")}</td>
                            <td className="py-3.5">
                              <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded border text-[10px] uppercase font-semibold ${getStatusColor(ord.status)}`}>
                                {getStatusIcon(ord.status)}
                                <span>{ord.status}</span>
                              </span>
                            </td>
                            <td className="py-3.5 font-semibold text-brand-chocolate">R$ {ord.total.toFixed(2)}</td>
                            <td className="py-3.5 text-right">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="inline-flex items-center space-x-1 bg-brand-light border border-brand-chocolate/20 text-brand-dark text-[10px] uppercase font-bold px-2.5 py-1.5 hover:bg-brand-chocolate hover:text-brand-beige transition-colors"
                              >
                                <Eye size={12} />
                                <span>Acompanhar</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Orders (Detailed Acompanhar/Rastreamento view) */}
            {activeTab === "orders" && selectedOrder && (
              <div className="space-y-6 text-xs text-brand-dark">
                <div className="flex justify-between items-center border-b border-brand-chocolate/15 pb-2">
                  <h3 className="text-sm uppercase tracking-widest font-bold">Acompanhamento do Pedido #{selectedOrder.id}</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-[10px] uppercase font-bold text-brand-chocolate hover:text-brand-beige"
                  >
                    Voltar à Lista
                  </button>
                </div>

                {/* Progress Tracking Timeline */}
                <div className="p-6 bg-brand-light border border-brand-chocolate/10">
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-brand-chocolate mb-6 text-center">Status de Envio (Origem: Garuva/SC)</h4>
                  
                  <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 uppercase tracking-widest text-[9px] font-bold">
                    
                    {/* Background Bar */}
                    <div className="absolute left-[38px] sm:left-10 right-[38px] sm:right-10 top-5 bottom-5 sm:top-3 sm:bottom-auto h-full sm:h-0.5 bg-brand-chocolate/10 -z-0"></div>
                    
                    {/* Step Elements */}
                    {[
                      { key: "Pendente", label: "Recebido" },
                      { key: "Pago", label: "Faturamento" },
                      { key: "Enviado", label: "Em Trânsito" },
                      { key: "Entregue", label: "Entregue" }
                    ].map((stepItem, idx) => {
                      const statusMap = { Pendente: 1, Pago: 2, Enviado: 3, Entregue: 4, Cancelado: 0 };
                      const currentVal = statusMap[selectedOrder.status];
                      const targetVal = idx + 1;
                      const isCompleted = currentVal >= targetVal && selectedOrder.status !== "Cancelado";
                      
                      return (
                        <div key={stepItem.key} className="flex sm:flex-col items-center text-center space-x-3 sm:space-x-0 relative z-10 w-full sm:w-auto">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-[10px] shrink-0 ${
                            isCompleted 
                              ? "bg-brand-chocolate text-brand-beige border-brand-chocolate" 
                              : "bg-white text-brand-dark/30 border-brand-chocolate/20"
                          }`}>
                            {isCompleted ? <CheckCircle size={14} /> : idx + 1}
                          </div>
                          <span className={`mt-2 font-bold tracking-widest uppercase ${isCompleted ? "text-brand-dark" : "text-brand-dark/40"}`}>
                            {stepItem.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {selectedOrder.status === "Cancelado" && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded text-center font-semibold mt-6">
                      ESTE PEDIDO FOI CANCELADO.
                    </div>
                  )}
                </div>

                {/* Shipping code & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-light/30 border border-brand-chocolate/10 p-5 rounded">
                  <div className="space-y-2">
                    <h4 className="font-bold uppercase tracking-widest text-[10px] text-brand-chocolate">Código de Rastreio</h4>
                    <p className="font-mono text-sm font-semibold select-all">
                      {selectedOrder.trackingCode || "Aguardando envio dos Correios"}
                    </p>
                    {selectedOrder.trackingCode && (
                      <p className="text-[9px] uppercase text-brand-dark/50 font-medium">Consulte no portal oficial dos Correios.</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-bold uppercase tracking-widest text-[10px] text-brand-chocolate">Endereço de Entrega</h4>
                    <p className="text-[11px] leading-relaxed uppercase">
                      {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.number} {selectedOrder.shippingAddress.complement && `(${selectedOrder.shippingAddress.complement})`}<br />
                      {selectedOrder.shippingAddress.neighborhood} - {selectedOrder.shippingAddress.city}/{selectedOrder.shippingAddress.state}<br />
                      CEP {selectedOrder.shippingAddress.zip}
                    </p>
                  </div>
                </div>

                {/* Items details */}
                <div className="space-y-4">
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-brand-chocolate border-b border-brand-chocolate/10 pb-1">Items do Pedido</h4>
                  <div className="space-y-3">
                    {selectedOrder.products.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-brand-chocolate/5 last:border-0">
                        <div>
                          <p className="font-bold uppercase">{item.name}</p>
                          <p className="text-[10px] text-brand-dark/50 uppercase">{item.quantity}x {item.volume}</p>
                        </div>
                        <span className="font-bold text-brand-chocolate">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total box */}
                <div className="border-t border-brand-chocolate/20 pt-4 flex justify-between items-center text-xs">
                  <span className="uppercase font-bold tracking-widest text-brand-dark/60">Total Pago</span>
                  <span className="text-lg font-bold text-brand-chocolate">R$ {selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Tab: Favorites */}
            {activeTab === "favorites" && (
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold border-b border-brand-chocolate/15 pb-2">Meus Favoritos</h3>
                
                {favoriteProducts.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <Heart size={32} className="mx-auto text-brand-dark/30" />
                    <p className="text-xs italic text-brand-dark/60 uppercase">Nenhum produto em seus favoritos.</p>
                    <Link to="/catalogo" className="bg-brand-chocolate text-white text-xs uppercase tracking-widest font-semibold px-4 py-2 inline-block">
                      Ver Catálogo
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteProducts.map((p) => (
                      <div key={p.id} className="border border-brand-chocolate/10 p-4 flex justify-between items-center bg-brand-light/35 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-14 bg-brand-light border border-brand-chocolate/5 flex items-center justify-center p-1 shrink-0">
                            <img
                              src={p.images?.[0] || "img/produto.jpg"}
                              alt={p.name}
                              className="max-h-[50px] object-contain rounded"
                            />
                          </div>
                          <div>
                            <Link to={`/produto/${p.id}`} className="block">
                              <h4 className="text-xs uppercase font-bold hover:text-brand-chocolate truncate max-w-[150px]">{p.name}</h4>
                            </Link>
                            <span className="text-[10px] font-bold text-brand-chocolate">R$ {p.price.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 shrink-0">
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="bg-brand-chocolate text-white text-[9px] uppercase tracking-widest font-bold px-2 py-1.5 hover:bg-brand-dark"
                          >
                            Sacola
                          </button>
                          <button
                            onClick={() => handleToggleFavorite(p.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Remover dos Favoritos"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Addresses */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-brand-chocolate/15 pb-2">
                  <h3 className="text-sm uppercase tracking-widest font-bold">Endereços Cadastrados</h3>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="bg-brand-chocolate text-brand-beige text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 flex items-center space-x-1"
                  >
                    <Plus size={12} />
                    <span>Novo Endereço</span>
                  </button>
                </div>

                {/* Add Address Form */}
                {showAddressForm && (
                  <form onSubmit={handleAddressSubmit} className="bg-brand-light/50 border border-brand-chocolate/15 p-5 space-y-4 text-xs">
                    <h4 className="font-bold text-brand-chocolate uppercase tracking-widest text-[10px]">Cadastrar Novo Endereço</h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-1">
                        <label className="uppercase font-semibold tracking-wider text-brand-dark/65">CEP</label>
                        <input
                          type="text"
                          required
                          placeholder="89248-000"
                          value={addressForm.zip}
                          onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                          className="w-full bg-white border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige"
                        />
                      </div>
                      <div className="col-span-1 space-y-1">
                        <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Estado (UF)</label>
                        <input
                          type="text"
                          required
                          placeholder="SC"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                          className="w-full bg-white border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-1">
                        <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Logradouro / Rua</label>
                        <input
                          type="text"
                          required
                          value={addressForm.street}
                          onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                          className="w-full bg-white border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige"
                        />
                      </div>
                      <div className="col-span-1 space-y-1">
                        <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Número</label>
                        <input
                          type="text"
                          required
                          value={addressForm.number}
                          onChange={(e) => setAddressForm({ ...addressForm, number: e.target.value })}
                          className="w-full bg-white border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Complemento</label>
                        <input
                          type="text"
                          value={addressForm.complement}
                          onChange={(e) => setAddressForm({ ...addressForm, complement: e.target.value })}
                          className="w-full bg-white border border-brand-chocolate/20 px-3 py-2"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Bairro</label>
                        <input
                          type="text"
                          required
                          value={addressForm.neighborhood}
                          onChange={(e) => setAddressForm({ ...addressForm, neighborhood: e.target.value })}
                          className="w-full bg-white border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="uppercase font-semibold tracking-wider text-brand-dark/65">Cidade</label>
                      <input
                        type="text"
                        required
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full bg-white border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isDefault"
                        checked={addressForm.isDefault}
                        onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                        className="accent-brand-chocolate"
                      />
                      <label htmlFor="isDefault" className="uppercase font-bold tracking-widest text-[9px] text-brand-dark/70 cursor-pointer">
                        Definir como endereço padrão
                      </label>
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <button
                        type="submit"
                        className="bg-brand-chocolate text-white text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 hover:bg-brand-dark"
                      >
                        Salvar Endereço
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="border border-brand-chocolate/20 text-brand-dark/70 text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 hover:bg-brand-light"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}

                {/* Address Cards List */}
                {user.addresses?.length === 0 ? (
                  <p className="text-xs italic text-brand-dark/65 text-center py-6">Você não possui endereços cadastrados.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`border p-4 rounded shadow-sm relative flex flex-col justify-between ${
                          addr.isDefault ? "border-brand-beige bg-brand-light/30" : "border-brand-chocolate/10 bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold uppercase text-[9px] tracking-widest text-brand-chocolate">
                              {addr.isDefault ? "Endereço Padrão" : "Endereço Adicional"}
                            </span>
                          </div>
                          
                          <p className="text-brand-dark/80 leading-relaxed uppercase tracking-wider text-[11px]">
                            {addr.street}, {addr.number} {addr.complement && `(${addr.complement})`}<br />
                            {addr.neighborhood} - {addr.city}/{addr.state}<br />
                            CEP: {addr.zip}
                          </p>
                        </div>
                        
                        <div className="text-right mt-4 pt-3 border-t border-brand-chocolate/5">
                          <button
                            onClick={() => handleRemoveAddress(addr.id)}
                            className="text-red-500 hover:text-red-700 font-bold uppercase tracking-widest text-[9px] inline-flex items-center space-x-1.5"
                          >
                            <Trash2 size={12} />
                            <span>Remover</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
