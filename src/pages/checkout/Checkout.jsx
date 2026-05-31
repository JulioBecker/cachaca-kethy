import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, CreditCard, QrCode, Barcode, ShieldCheck, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useOrderStore } from "../../store/useOrderStore";
import { useToastStore } from "../../store/useToastStore";
import SEO from "../../components/SEO";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const totals = useCartStore((state) => state.getTotals());
  const shippingInfo = useCartStore((state) => state.shippingInfo);

  const { user, isAuthenticated } = useAuthStore();
  const createOrder = useOrderStore((state) => state.createOrder);
  const showToast = useToastStore((state) => state.showToast);

  const [step, setStep] = useState(1); // 1: Identify, 2: Address, 3: Delivery, 4: Payment, 5: Confirmation
  
  // Checkout Forms state
  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: ""
  });

  const [addressData, setAddressData] = useState({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zip: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("Pix"); // Pix, CreditCard, Boleto
  const [creditCard, setCreditCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: "1"
  });

  const [createdOrder, setCreatedOrder] = useState(null);

  // Load profile defaults if authenticated
  useEffect(() => {
    if (cart.length === 0 && step !== 5) {
      navigate("/carrinho");
    }

    if (isAuthenticated && user) {
      setPersonalData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        cpf: "123.456.789-00"
      });

      const defaultAddr = user.addresses?.find(a => a.isDefault) || user.addresses?.[0];
      if (defaultAddr) {
        setAddressData({
          street: defaultAddr.street || "",
          number: defaultAddr.number || "",
          complement: defaultAddr.complement || "",
          neighborhood: defaultAddr.neighborhood || "",
          city: defaultAddr.city || "",
          state: defaultAddr.state || "",
          zip: defaultAddr.zip || ""
        });
      }
    }
  }, [isAuthenticated, user, cart, navigate]);

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    setStep(4);
  };

  const handlePlaceOrder = () => {
    const orderItems = cart.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      volume: item.volume
    }));

    const orderData = {
      customerId: isAuthenticated ? user.id : 999, // 999 for guest
      customerName: personalData.name,
      products: orderItems,
      subtotal: totals.subtotal,
      discount: totals.discountAmount,
      shippingCost: totals.shippingCost,
      total: totals.total,
      paymentMethod: paymentMethod,
      shippingAddress: addressData
    };

    const result = createOrder(orderData);
    if (result.success) {
      setCreatedOrder(result.order);
      setStep(5);
      clearCart();
      showToast("Pedido realizado com sucesso!", "success");
    } else {
      showToast("Erro ao processar pedido. Tente novamente.", "error");
    }
  };

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen py-10 font-sans text-left">
      <SEO title="Checkout Seguro" description="Finalize sua compra de Cachaça Kethy Rios. Pagamento por Pix, Cartão de Crédito ou Boleto bancário." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Progress Tracker */}
        {step < 5 && (
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-brand-chocolate/10 text-xs font-bold uppercase tracking-widest text-brand-dark/40">
            <div className={`flex items-center space-x-2 ${step >= 1 ? "text-brand-chocolate" : ""}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${step > 1 ? "bg-brand-chocolate text-white border-brand-chocolate" : "border-brand-chocolate text-brand-chocolate"}`}>
                {step > 1 ? <Check size={12} /> : "1"}
              </span>
              <span className="hidden sm:inline">Identificação</span>
            </div>
            
            <div className="w-10 h-0.5 bg-brand-chocolate/20"></div>

            <div className={`flex items-center space-x-2 ${step >= 2 ? "text-brand-chocolate" : ""}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${step > 2 ? "bg-brand-chocolate text-white border-brand-chocolate" : "border-brand-chocolate/20 text-brand-dark/40"}`}>
                {step > 2 ? <Check size={12} /> : "2"}
              </span>
              <span className="hidden sm:inline">Endereço</span>
            </div>

            <div className="w-10 h-0.5 bg-brand-chocolate/20"></div>

            <div className={`flex items-center space-x-2 ${step >= 3 ? "text-brand-chocolate" : ""}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${step > 3 ? "bg-brand-chocolate text-white border-brand-chocolate" : "border-brand-chocolate/20 text-brand-dark/40"}`}>
                {step > 3 ? <Check size={12} /> : "3"}
              </span>
              <span className="hidden sm:inline">Entrega</span>
            </div>

            <div className="w-10 h-0.5 bg-brand-chocolate/20"></div>

            <div className={`flex items-center space-x-2 ${step >= 4 ? "text-brand-chocolate" : ""}`}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] border border-brand-chocolate/20 text-brand-dark/40">
                4
              </span>
              <span className="hidden sm:inline">Pagamento</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Content Left */}
          <div className={`${step === 5 ? "lg:col-span-12" : "lg:col-span-7"} bg-white border border-brand-chocolate/10 p-6 shadow-md`}>
            
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <form onSubmit={handlePersonalSubmit} className="space-y-4">
                <h2 className="text-sm uppercase tracking-widest font-bold border-b border-brand-chocolate/15 pb-2 mb-4">1. Identificação</h2>
                
                <div className="space-y-1.5 text-xs">
                  <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={personalData.name}
                    onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
                    className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="uppercase tracking-widest font-semibold text-brand-dark/65">E-mail</label>
                    <input
                      type="email"
                      required
                      value={personalData.email}
                      onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Telefone</label>
                    <input
                      type="tel"
                      required
                      placeholder="(00) 00000-0000"
                      value={personalData.phone}
                      onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="uppercase tracking-widest font-semibold text-brand-dark/65">CPF (para nota fiscal)</label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={personalData.cpf}
                    onChange={(e) => setPersonalData({ ...personalData, cpf: e.target.value })}
                    className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                  />
                </div>

                <div className="pt-4 text-right">
                  <button
                    type="submit"
                    className="bg-brand-chocolate text-white hover:bg-brand-dark text-xs uppercase tracking-widest font-bold px-8 py-3.5 flex items-center justify-center space-x-2 inline-flex"
                  >
                    <span>Ir para Endereço</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Address Info */}
            {step === 2 && (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <h2 className="text-sm uppercase tracking-widest font-bold border-b border-brand-chocolate/15 pb-2 mb-4">2. Endereço de Entrega</h2>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1.5 text-xs">
                    <label className="uppercase tracking-widest font-semibold text-brand-dark/65">CEP</label>
                    <input
                      type="text"
                      required
                      placeholder="89248-000"
                      value={addressData.zip}
                      onChange={(e) => setAddressData({ ...addressData, zip: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                    />
                  </div>
                  <div className="col-span-1 space-y-1.5 text-xs">
                    <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Estado (UF)</label>
                    <input
                      type="text"
                      required
                      placeholder="SC"
                      value={addressData.state}
                      onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1.5 text-xs">
                    <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Rua / Logradouro</label>
                    <input
                      type="text"
                      required
                      value={addressData.street}
                      onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                    />
                  </div>
                  <div className="col-span-1 space-y-1.5 text-xs">
                    <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Número</label>
                    <input
                      type="text"
                      required
                      value={addressData.number}
                      onChange={(e) => setAddressData({ ...addressData, number: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Complemento</label>
                    <input
                      type="text"
                      value={addressData.complement}
                      onChange={(e) => setAddressData({ ...addressData, complement: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Bairro</label>
                    <input
                      type="text"
                      required
                      value={addressData.neighborhood}
                      onChange={(e) => setAddressData({ ...addressData, neighborhood: e.target.value })}
                      className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Cidade</label>
                  <input
                    type="text"
                    required
                    value={addressData.city}
                    onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                    className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                  />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-widest font-semibold text-brand-dark/65 hover:text-brand-chocolate flex items-center space-x-1"
                  >
                    <ArrowLeft size={12} />
                    <span>Voltar</span>
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-chocolate text-white hover:bg-brand-dark text-xs uppercase tracking-widest font-bold px-8 py-3.5 flex items-center justify-center space-x-2 inline-flex"
                  >
                    <span>Ir para Entrega</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Delivery Options */}
            {step === 3 && (
              <form onSubmit={handleDeliverySubmit} className="space-y-4">
                <h2 className="text-sm uppercase tracking-widest font-bold border-b border-brand-chocolate/15 pb-2 mb-4">3. Opções de Entrega</h2>
                
                <div className="border border-brand-beige bg-brand-light/40 p-4 flex justify-between items-center text-xs">
                  <div>
                    <h3 className="font-bold text-brand-chocolate uppercase">Correios Sedex</h3>
                    <p className="text-[10px] text-brand-dark/60 uppercase mt-0.5">
                      Origem de Envio: Garuva - SC | Prazo: {shippingInfo?.days || 3} dias úteis
                    </p>
                  </div>
                  <span className="font-bold text-brand-chocolate">
                    {totals.shippingCost === 0 ? "Grátis" : `R$ ${totals.shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs uppercase tracking-widest font-semibold text-brand-dark/65 hover:text-brand-chocolate flex items-center space-x-1"
                  >
                    <ArrowLeft size={12} />
                    <span>Voltar</span>
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-chocolate text-white hover:bg-brand-dark text-xs uppercase tracking-widest font-bold px-8 py-3.5 flex items-center justify-center space-x-2 inline-flex"
                  >
                    <span>Ir para Pagamento</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Payment Options */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-sm uppercase tracking-widest font-bold border-b border-brand-chocolate/15 pb-2 mb-4">4. Forma de Pagamento</h2>
                
                {/* Method Toggles */}
                <div className="grid grid-cols-3 gap-3 border-b border-brand-chocolate/5 pb-4">
                  {[
                    { id: "Pix", name: "Pix", icon: <QrCode size={18} /> },
                    { id: "CreditCard", name: "Cartão", icon: <CreditCard size={18} /> },
                    { id: "Boleto", name: "Boleto", icon: <Barcode size={18} /> }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center justify-center p-4 border rounded text-xs transition-all uppercase tracking-widest font-bold ${
                        paymentMethod === method.id
                          ? "border-brand-beige bg-brand-chocolate text-brand-beige"
                          : "border-brand-chocolate/20 text-brand-dark/70 hover:bg-brand-light"
                      }`}
                    >
                      {method.icon}
                      <span className="mt-2 text-[10px]">{method.name}</span>
                    </button>
                  ))}
                </div>

                {/* Pix Content */}
                {paymentMethod === "Pix" && (
                  <div className="space-y-4 text-xs text-center p-4 border border-dashed border-brand-beige bg-brand-light/30">
                    <QrCode size={120} className="mx-auto text-brand-dark/80" />
                    <p className="font-semibold text-brand-chocolate">PAGAMENTO POR PIX (5% DE DESCONTO APLICADO)</p>
                    <p className="text-[10px] text-brand-dark/60 leading-relaxed max-w-sm mx-auto uppercase">
                      Escaneie o código acima ou copie a chave Pix abaixo. O pedido será aprovado instantaneamente.
                    </p>
                    <div className="bg-white border border-brand-chocolate/20 p-2 select-all font-mono text-[10px] max-w-xs mx-auto text-center overflow-x-auto">
                      00020101021226850014br.gov.bcb.pix2563kethyrios89248garuvasc
                    </div>
                  </div>
                )}

                {/* Boleto Content */}
                {paymentMethod === "Boleto" && (
                  <div className="space-y-4 text-xs text-center p-4 border border-dashed border-brand-chocolate/20 bg-brand-light/30">
                    <Barcode size={80} className="mx-auto text-brand-dark/70" />
                    <p className="font-semibold text-brand-chocolate">BOLETO BANCÁRIO</p>
                    <p className="text-[10px] text-brand-dark/60 leading-relaxed max-w-sm mx-auto uppercase">
                      O boleto será gerado após a confirmação. O prazo de compensação bancária é de 1 a 2 dias úteis.
                    </p>
                  </div>
                )}

                {/* Credit Card Content */}
                {paymentMethod === "CreditCard" && (
                  <div className="space-y-4">
                    <div className="space-y-1 text-xs">
                      <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Número do Cartão</label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={creditCard.number}
                        onChange={(e) => setCreditCard({ ...creditCard, number: e.target.value })}
                        className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                      />
                    </div>
                    
                    <div className="space-y-1 text-xs">
                      <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Nome Impresso no Cartão</label>
                      <input
                        type="text"
                        value={creditCard.name}
                        onChange={(e) => setCreditCard({ ...creditCard, name: e.target.value })}
                        className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1 text-xs">
                        <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Validade</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={creditCard.expiry}
                          onChange={(e) => setCreditCard({ ...creditCard, expiry: e.target.value })}
                          className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                        />
                      </div>
                      <div className="space-y-1 text-xs">
                        <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Cód. Segurança (CVV)</label>
                        <input
                          type="text"
                          placeholder="000"
                          value={creditCard.cvv}
                          onChange={(e) => setCreditCard({ ...creditCard, cvv: e.target.value })}
                          className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Parcelamento</label>
                      <select
                        value={creditCard.installments}
                        onChange={(e) => setCreditCard({ ...creditCard, installments: e.target.value })}
                        className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                      >
                        <option value="1">1x de R$ {totals.total.toFixed(2)} (Sem Juros)</option>
                        <option value="2">2x de R$ {(totals.total / 2).toFixed(2)} (Sem Juros)</option>
                        <option value="3">3x de R$ {(totals.total / 3).toFixed(2)} (Sem Juros)</option>
                        <option value="6">6x de R$ {(totals.total / 6).toFixed(2)} (Sem Juros)</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-brand-chocolate/10">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs uppercase tracking-widest font-semibold text-brand-dark/65 hover:text-brand-chocolate flex items-center space-x-1"
                  >
                    <ArrowLeft size={12} />
                    <span>Voltar</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="bg-brand-chocolate text-brand-beige hover:bg-brand-dark text-xs uppercase tracking-widest font-bold px-8 py-3.5 flex items-center justify-center space-x-2 inline-flex"
                  >
                    <span>Finalizar Compra</span>
                    <ShieldCheck size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && createdOrder && (
              <div className="text-center py-8 space-y-6">
                
                {/* SVG Confetti Success animation banner */}
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 border border-green-200">
                  <Check size={40} className="animate-bounce" />
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-2xl font-light tracking-widest text-brand-dark uppercase">PEDIDO REALIZADO COM SUCESSO!</h1>
                  <p className="text-xs text-brand-dark/60 uppercase tracking-widest">
                    Obrigado por comprar na Cachaça Kethy Rios. Sua compra foi registrada.
                  </p>
                </div>

                <div className="bg-brand-light border border-brand-chocolate/15 p-5 max-w-md mx-auto space-y-3 text-xs">
                  <div className="flex justify-between border-b border-brand-chocolate/10 pb-2">
                    <span className="text-brand-dark/60 uppercase font-semibold">Número do Pedido</span>
                    <span className="font-bold text-brand-dark">#{createdOrder.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-chocolate/10 pb-2">
                    <span className="text-brand-dark/60 uppercase font-semibold">Valor Total</span>
                    <span className="font-bold text-brand-chocolate">R$ {createdOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-chocolate/10 pb-2">
                    <span className="text-brand-dark/60 uppercase font-semibold">Forma de Pagamento</span>
                    <span className="font-bold text-brand-dark uppercase">{createdOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-dark/60 uppercase font-semibold">Destino</span>
                    <span className="font-bold text-brand-dark uppercase">
                      {createdOrder.shippingAddress.city} - {createdOrder.shippingAddress.state}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-brand-dark/50 leading-relaxed uppercase tracking-wider max-w-md mx-auto">
                  Enviamos o e-mail de confirmação e as informações detalhadas de faturamento para {personalData.email}. O código de rastreamento KR89248{String(createdOrder.id).slice(-3)}BR ficará ativo assim que os Correios coletarem em Garuva/SC.
                </p>

                <div className="pt-4 flex justify-center space-x-4">
                  <Link
                    to="/minha-conta?tab=orders"
                    className="border border-brand-chocolate text-brand-chocolate hover:bg-brand-chocolate hover:text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 transition-colors duration-300"
                  >
                    Ver Meus Pedidos
                  </Link>
                  <Link
                    to="/"
                    className="bg-brand-chocolate text-white hover:bg-brand-dark text-xs uppercase tracking-widest font-bold px-6 py-3 transition-colors duration-300"
                  >
                    Voltar ao Início
                  </Link>
                </div>

              </div>
            )}

          </div>

          {/* Cart Summary Panel (Right) - Hidden in confirmation step */}
          {step < 5 && (
            <div className="lg:col-span-5 space-y-6">
              
              {/* Order Resumo */}
              <div className="bg-white border border-brand-chocolate/10 p-5 shadow-sm space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold border-b border-brand-chocolate/15 pb-2">Resumo da Sacola</h3>
                
                {/* List Items */}
                <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs gap-3">
                      <div className="min-w-0">
                        <p className="font-bold text-brand-dark uppercase truncate">{item.name}</p>
                        <p className="text-[10px] text-brand-dark/50 uppercase">{item.quantity}x {item.volume}</p>
                      </div>
                      <span className="font-semibold text-brand-chocolate shrink-0">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-brand-chocolate/10 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-dark/60 uppercase">Subtotal</span>
                    <span className="font-semibold">R$ {totals.subtotal.toFixed(2)}</span>
                  </div>
                  {totals.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="uppercase">Desconto</span>
                      <span className="font-semibold">- R$ {totals.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-brand-dark/60 uppercase">Frete</span>
                    <span className="font-semibold">
                      {totals.shippingCost === 0 ? "Grátis" : `R$ ${totals.shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-brand-chocolate/10 pt-3 text-brand-dark">
                    <span className="uppercase">Total Final</span>
                    <span className="text-brand-chocolate">R$ {totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-brand-chocolate/5 border border-brand-chocolate/10 p-5 rounded space-y-3 text-left">
                <h4 className="text-xs uppercase tracking-widest font-bold text-brand-dark">Compromisso Kethy Rios</h4>
                <p className="text-[10px] text-brand-dark/70 leading-relaxed uppercase tracking-wider">
                  ✔ Destilados embalados em caixas infláveis anti-quebra especiais.<br />
                  ✔ Origem Garantida de Alambique de SC.<br />
                  ✔ Suporte pós-venda direto e simplificado.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
