import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, Ticket, Truck, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { useToastStore } from "../../store/useToastStore";
import SEO from "../../components/SEO";

export default function Cart() {
  const { 
    cart, 
    coupon, 
    shippingInfo, 
    updateQuantity, 
    removeFromCart, 
    applyCoupon, 
    removeCoupon,
    calculateShipping, 
    getTotals 
  } = useCartStore();

  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  // Component States
  const [couponCode, setCouponCode] = useState("");
  const [cepCode, setCepCode] = useState("");
  const [loadingShipping, setLoadingShipping] = useState(false);

  const totals = getTotals();

  const handleCouponApply = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      showToast(res.message, "success");
      setCouponCode("");
    } else {
      showToast(res.message, "error");
    }
  };

  const handleShippingCalc = (e) => {
    e.preventDefault();
    if (!cepCode) return;
    setLoadingShipping(true);
    
    // Simulate API delay
    setTimeout(() => {
      const res = calculateShipping(cepCode);
      setLoadingShipping(false);
      if (res.success) {
        showToast("Frete calculado com sucesso!", "success");
      } else {
        showToast(res.message, "error");
      }
    }, 800);
  };

  const handleCheckoutRedirect = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="bg-brand-light text-brand-dark min-h-screen py-20 flex flex-col justify-center items-center font-sans space-y-5 text-left">
        <SEO title="Sacola de Compras" description="Sua sacola de compras está vazia." />
        <ShoppingBag size={48} className="text-brand-chocolate/30 animate-pulse" />
        <h2 className="text-xl uppercase tracking-widest font-bold">Sua sacola está vazia</h2>
        <p className="text-xs text-brand-dark/65 uppercase tracking-wider">Adicione produtos de nossa destilaria premium para continuar.</p>
        <Link to="/catalogo" className="bg-brand-chocolate text-white text-xs uppercase tracking-widest font-bold px-8 py-3.5 hover:bg-brand-dark transition-all duration-300 shadow">
          Conhecer Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen py-10 font-sans text-left">
      <SEO title="Sacola de Compras" description="Gerencie seus itens adicionados na sacola, calcule frete de Garuva/SC, e insira cupons de desconto." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-brand-chocolate/10 pb-5 mb-8">
          <h1 className="text-2xl uppercase tracking-widest font-light text-brand-dark">Sacola de Compras</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List (Left) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-brand-chocolate/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between shadow-sm hover:shadow transition-shadow gap-4"
              >
                
                {/* Product visualizer */}
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="w-16 h-20 bg-brand-light border border-brand-chocolate/5 flex items-center justify-center p-2 shrink-0">
                    <img
                      src={item.images?.[0] || "/img/produto.jpg"}
                      alt={item.name}
                      className="max-h-[70px] object-contain rounded"
                    />
                  </div>
                  <div>
                    <Link to={`/produto/${item.id}`} className="block">
                      <h3 className="text-xs sm:text-sm uppercase tracking-widest font-bold hover:text-brand-chocolate text-brand-dark">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-[10px] text-brand-dark/50 uppercase tracking-widest mt-1">{item.volume}</p>
                    <span className="text-xs font-semibold text-brand-chocolate block sm:hidden mt-1">R$ {item.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Adjust Qty & Actions */}
                <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-chocolate/5">
                  <span className="text-xs font-semibold text-brand-dark hidden sm:block">R$ {item.price.toFixed(2)}</span>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center border border-brand-chocolate/20 bg-white">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-brand-dark/70 hover:text-brand-dark"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-brand-dark/70 hover:text-brand-dark"
                    >
                      <Plus size={10} />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-brand-chocolate">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-brand-dark/40 hover:text-red-500 transition-colors focus:outline-none"
                    title="Remover"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

              </div>
            ))}

            {/* Sub-block options: Coupon & Shipping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {/* Shipping Estimator */}
              <div className="bg-white border border-brand-chocolate/10 p-5 shadow-sm space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold flex items-center space-x-1.5">
                  <Truck size={14} className="text-brand-chocolate" />
                  <span>Calcular Frete</span>
                </h3>
                <p className="text-[10px] text-brand-dark/60 uppercase tracking-widest">Origem: Garuva - SC (CEP: 89248-000)</p>
                <form onSubmit={handleShippingCalc} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="DIGITE SEU CEP (EX: 89248-000)"
                    value={cepCode}
                    onChange={(e) => setCepCode(e.target.value)}
                    required
                    className="flex-grow bg-brand-light border border-brand-chocolate/20 text-xs px-3 py-2 uppercase tracking-widest focus:outline-none focus:border-brand-beige"
                  />
                  <button
                    type="submit"
                    disabled={loadingShipping}
                    className="bg-brand-chocolate hover:bg-brand-dark text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 disabled:opacity-50"
                  >
                    {loadingShipping ? "Calculando..." : "Calcular"}
                  </button>
                </form>
                {shippingInfo && (
                  <div className="bg-brand-light p-3 border border-brand-chocolate/10 text-xs space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>{shippingInfo.carrier}</span>
                      <span className="text-brand-chocolate">
                        {shippingInfo.cost === 0 ? "Grátis" : `R$ ${shippingInfo.cost.toFixed(2)}`}
                      </span>
                    </div>
                    <p className="text-[10px] text-brand-dark/60 uppercase">Prazo estimado: {shippingInfo.days} dias úteis</p>
                  </div>
                )}
              </div>

              {/* Coupon Applicator */}
              <div className="bg-white border border-brand-chocolate/10 p-5 shadow-sm space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold flex items-center space-x-1.5">
                  <Ticket size={14} className="text-brand-chocolate" />
                  <span>Cupom de Desconto</span>
                </h3>
                <p className="text-[10px] text-brand-dark/60 uppercase tracking-widest">Dica: KETHY10, KETHY20, FRETEGRATIS</p>
                
                {coupon ? (
                  <div className="flex justify-between items-center bg-brand-light p-3 border border-dashed border-brand-beige text-xs">
                    <div>
                      <span className="font-bold text-brand-chocolate">{coupon.code}</span>
                      <span className="text-brand-dark/60 block text-[10px] uppercase">
                        {coupon.type === "percent" ? `${coupon.value}% de Desconto` : coupon.type === "shipping" ? "Frete Grátis" : `R$ ${coupon.value} de desconto`}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 text-[10px] uppercase font-bold"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCouponApply} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="CÓDIGO DO CUPOM"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow bg-brand-light border border-brand-chocolate/20 text-xs px-3 py-2 uppercase tracking-widest focus:outline-none focus:border-brand-beige"
                    />
                    <button
                      type="submit"
                      className="bg-brand-chocolate hover:bg-brand-dark text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Order Summary (Right) */}
          <div className="lg:col-span-4 bg-white border border-brand-chocolate/10 p-6 shadow-md space-y-5">
            <h3 className="text-xs uppercase tracking-widest font-bold border-b border-brand-chocolate/10 pb-3">Resumo do Pedido</h3>
            
            <div className="text-xs space-y-3.5">
              <div className="flex justify-between">
                <span className="text-brand-dark/70 uppercase">Subtotal</span>
                <span className="font-semibold text-brand-dark">R$ {totals.subtotal.toFixed(2)}</span>
              </div>
              
              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="uppercase">Desconto ({coupon?.code})</span>
                  <span className="font-semibold">- R$ {totals.discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-brand-dark/70 uppercase">Frete</span>
                <span className="font-semibold text-brand-dark">
                  {shippingInfo ? (totals.shippingCost === 0 ? "Grátis" : `R$ ${totals.shippingCost.toFixed(2)}`) : "Calcular frete"}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold border-t border-brand-chocolate/10 pt-4 text-brand-dark">
                <span className="uppercase">Total Estimado</span>
                <span className="text-brand-chocolate">R$ {totals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkouts Actions */}
            <div className="pt-2">
              <button
                onClick={handleCheckoutRedirect}
                className="bg-brand-chocolate hover:bg-brand-dark text-white text-xs uppercase tracking-widest font-bold w-full py-4 flex items-center justify-center space-x-2 transition-all duration-300 shadow rounded"
              >
                <span>Fechar Pedido</span>
                <ArrowRight size={14} />
              </button>
            </div>
            
            <p className="text-[10px] text-brand-dark/50 leading-relaxed text-center uppercase tracking-wider">
              Ao avançar, você confirma ter mais de 18 anos de idade e concorda com nossos termos.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
