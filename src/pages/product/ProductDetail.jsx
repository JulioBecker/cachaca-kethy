import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ShieldCheck, Heart, Award, ArrowLeft, Plus, Minus, ShoppingBag, Send } from "lucide-react";
import { useProductStore } from "../../store/useProductStore";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";
import SEO from "../../components/SEO";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  const { products, loadProducts, addProductReview } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { user, isAuthenticated, toggleFavorite } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("description"); // description, specs, pairing

  // Zoom States
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });

  // Review Form States
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    loadProducts();
    setSelectedImageIdx(0);
    setQuantity(1);
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="bg-brand-light text-brand-dark min-h-screen py-20 flex flex-col justify-center items-center font-sans space-y-4">
        <h2 className="text-xl uppercase tracking-widest font-bold">Produto não encontrado</h2>
        <p className="text-xs text-brand-dark/65">O produto que você está procurando não existe ou foi removido.</p>
        <Link to="/catalogo" className="bg-brand-chocolate text-white text-xs uppercase tracking-widest font-semibold px-6 py-3">
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  const isFavorite = user?.favorites?.includes(product.id) || false;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${quantity}x ${product.name} adicionado à sacola!`, "success");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/carrinho");
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      showToast("Faça login para adicionar aos favoritos.", "error");
      navigate("/login");
      return;
    }
    toggleFavorite(product.id);
    showToast(isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos", "success");
  };

  // Add review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewer = isAuthenticated ? user.name : reviewName || "Anônimo";
    
    addProductReview(product.id, {
      user: reviewer,
      rating: reviewRating,
      comment: reviewComment
    });

    showToast("Avaliação enviada com sucesso!", "success");
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
  };

  // Get related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.wood === product.wood))
    .slice(0, 3);

  // Zoom Handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: "block",
      backgroundImage: `url(${product.images[selectedImageIdx] || "default_bottle.jpg"})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%"
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  // Generate placeholder mock images array if not full
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ["default_bottle.jpg"];

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen py-10 font-sans text-left">
      <SEO 
        title={product.name} 
        description={product.tagline}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/catalogo" className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-brand-dark/70 hover:text-brand-chocolate mb-8 transition-colors">
          <ArrowLeft size={14} />
          <span>Voltar ao Catálogo</span>
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Images Section (Left) */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            
            {/* Gallery Thumbnails */}
            <div className="col-span-2 flex flex-col space-y-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`border p-1 bg-white aspect-[4/5] flex items-center justify-center transition-all ${
                    selectedImageIdx === idx ? "border-brand-beige shadow-md" : "border-brand-chocolate/10 hover:border-brand-beige"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail`}
                    className="max-h-[50px] object-contain rounded"
                  />
                </button>
              ))}
            </div>

            {/* Main Interactive Zoom Image */}
            <div className="col-span-10 relative bg-white border border-brand-chocolate/10 shadow-md aspect-[4/5] flex items-center justify-center overflow-hidden">
              
              {/* Product Image representation */}
              <div 
                className="relative cursor-zoom-in w-full h-full flex justify-center items-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={productImages[selectedImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Simulated Lens Zoom Box */}
                <div 
                  className="absolute border border-brand-beige pointer-events-none rounded shadow-inner"
                  style={{
                    ...zoomStyle,
                    position: "absolute",
                    right: 10,
                    top: 10,
                    width: "100px",
                    height: "100px",
                    pointerEvents: "none",
                    border: "1px solid #E7CFA5",
                    backgroundColor: "white",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Details Section (Right) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-chocolate bg-brand-beige/35 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl font-light tracking-wide text-brand-dark uppercase">
                {product.name}
              </h1>
              <p className="text-xs text-brand-chocolate italic font-medium">{product.tagline}</p>
            </div>

            {/* Stars Review Summary */}
            <div className="flex items-center space-x-3">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating) ? "fill-brand-gold text-brand-gold" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-xs text-brand-dark/70 font-semibold tracking-wider">
                {product.rating.toFixed(1)} ({product.reviews.length} avaliações)
              </span>
            </div>

            {/* Price block */}
            <div className="bg-brand-chocolate/5 p-5 border border-brand-chocolate/10 flex justify-between items-center rounded">
              <div>
                <span className="text-[10px] text-brand-dark/60 block uppercase tracking-widest font-semibold">Valor Exclusivo</span>
                <span className="text-2xl font-bold text-brand-dark">R$ {product.price.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-brand-dark/60 block uppercase tracking-widest font-semibold">Volume</span>
                <span className="text-sm font-semibold">{product.volume}</span>
              </div>
            </div>

            {/* Buying Inputs */}
            {product.stock > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {/* Quantity adjustment */}
                  <div className="flex items-center border border-brand-chocolate/20 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 text-brand-dark/70 hover:text-brand-dark transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-10 text-center text-xs font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-2.5 text-brand-dark/70 hover:text-brand-dark transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  
                  {/* Stock notice */}
                  <span className="text-xs text-green-600 font-medium">
                    Em estoque ({product.stock} unidades disponíveis)
                  </span>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="border border-brand-chocolate text-brand-chocolate hover:bg-brand-chocolate hover:text-white text-xs uppercase tracking-widest font-semibold py-4 flex items-center justify-center space-x-2 transition-all duration-300 rounded"
                  >
                    <ShoppingBag size={14} />
                    <span>Adicionar à Sacola</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="bg-brand-chocolate text-white hover:bg-brand-dark text-xs uppercase tracking-widest font-bold py-4 transition-all duration-300 rounded shadow-md"
                  >
                    Comprar Agora
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 p-4 rounded text-red-700 text-xs font-semibold uppercase tracking-widest text-center">
                Produto Temporariamente Indisponível
              </div>
            )}

            {/* Favorite & Guarantee */}
            <div className="flex justify-between items-center pt-4 border-t border-brand-chocolate/10 text-xs">
              <button
                onClick={handleToggleFavorite}
                className="flex items-center space-x-1.5 text-brand-dark/70 hover:text-red-500 transition-colors uppercase tracking-widest font-semibold"
              >
                <Heart size={16} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
                <span>{isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}</span>
              </button>
              <div className="flex items-center space-x-1 text-brand-dark/60 uppercase tracking-widest font-semibold">
                <ShieldCheck size={16} className="text-brand-beige" />
                <span>Compra 100% Segura</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tab specifications */}
        <div className="mb-16 border border-brand-chocolate/10 bg-white p-6 md:p-8 shadow-sm">
          {/* Tab titles */}
          <div className="flex border-b border-brand-chocolate/10 pb-3 mb-6 space-x-6 text-xs uppercase tracking-widest font-bold">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-2 border-b-2 transition-all ${
                activeTab === "description" ? "border-brand-beige text-brand-chocolate" : "border-transparent text-brand-dark/50"
              }`}
            >
              Descrição Completa
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-2 border-b-2 transition-all ${
                activeTab === "specs" ? "border-brand-beige text-brand-chocolate" : "border-transparent text-brand-dark/50"
              }`}
            >
              Ficha Técnica
            </button>
            <button
              onClick={() => setActiveTab("pairing")}
              className={`pb-2 border-b-2 transition-all ${
                activeTab === "pairing" ? "border-brand-beige text-brand-chocolate" : "border-transparent text-brand-dark/50"
              }`}
            >
              Harmonização
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  {product.features.map((feat, i) => <li key={i}>{feat}</li>)}
                </ul>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 uppercase tracking-widest text-[10px] sm:text-xs">
                <div className="flex justify-between py-2.5 border-b border-brand-chocolate/10">
                  <span className="font-bold text-brand-dark/60">Madeira / Tonel</span>
                  <span>{product.wood}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-brand-chocolate/10">
                  <span className="font-bold text-brand-dark/60">Teor Alcoólico (ABV)</span>
                  <span>{product.abv}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-brand-chocolate/10">
                  <span className="font-bold text-brand-dark/60">Volume Líquido</span>
                  <span>{product.volume}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-brand-chocolate/10">
                  <span className="font-bold text-brand-dark/60">Coloração</span>
                  <span>{product.details.color}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-brand-chocolate/10">
                  <span className="font-bold text-brand-dark/60">Aromas principais</span>
                  <span>{product.details.aroma}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-brand-chocolate/10">
                  <span className="font-bold text-brand-dark/60">Paladar</span>
                  <span>{product.details.taste}</span>
                </div>
              </div>
            )}

            {activeTab === "pairing" && (
              <div className="space-y-2">
                <h4 className="font-bold text-brand-chocolate text-xs uppercase tracking-widest">Dica do Produtor:</h4>
                <p>{product.details.pairing}</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Reviews list (Left) */}
          <div className="lg:col-span-7 bg-white border border-brand-chocolate/10 p-6 shadow-sm space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-bold border-b border-brand-chocolate/10 pb-3">
              Avaliações de Clientes ({product.reviews.length})
            </h3>
            
            {product.reviews.length === 0 ? (
              <p className="text-xs italic text-brand-dark/60">Seja o primeiro a avaliar este produto!</p>
            ) : (
              <div className="space-y-6 divide-y divide-brand-chocolate/5">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs uppercase tracking-wider font-bold">{rev.user}</p>
                      <span className="text-[10px] text-brand-dark/50">{rev.date}</span>
                    </div>
                    <div className="flex text-brand-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className={i < rev.rating ? "fill-brand-gold text-brand-gold" : "text-gray-300"} />
                      ))}
                    </div>
                    <p className="text-xs text-brand-dark/75 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Review Form (Right) */}
          <div className="lg:col-span-5 bg-white border border-brand-chocolate/10 p-6 shadow-sm space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold border-b border-brand-chocolate/10 pb-3">
              Escrever Avaliação
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              {!isAuthenticated && (
                <div className="space-y-1">
                  <label className="uppercase tracking-widest font-semibold text-brand-dark/60">Seu Nome</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige"
                  />
                </div>
              )}
              
              <div className="space-y-1">
                <label className="uppercase tracking-widest font-semibold text-brand-dark/60 block">Sua Nota</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                >
                  <option value="5">5 estrelas (Excelente)</option>
                  <option value="4">4 estrelas (Muito Bom)</option>
                  <option value="3">3 estrelas (Regular)</option>
                  <option value="2">2 estrelas (Ruim)</option>
                  <option value="1">1 estrela (Péssimo)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-widest font-semibold text-brand-dark/60 block">Comentário</label>
                <textarea
                  required
                  rows="4"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2 focus:outline-none focus:border-brand-beige"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-brand-chocolate text-white hover:bg-brand-dark text-xs uppercase tracking-widest font-bold px-6 py-3 w-full flex items-center justify-center space-x-1.5 transition-all duration-300"
              >
                <span>Enviar Comentário</span>
                <Send size={12} />
              </button>
            </form>
          </div>

        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-brand-chocolate/10 pt-10">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Quem comprou este produto também se interessou por:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="bg-white border border-brand-chocolate/10 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[4/5] bg-brand-light flex items-center justify-center p-4 border-b border-brand-chocolate/5 relative">
                    <img
                      src={p.images?.[0] || "img/produto.jpg"}
                      alt={p.name}
                      className="max-h-[110px] object-contain rounded"
                    />
                    <span className="absolute top-2 left-2 bg-brand-chocolate text-brand-beige text-[8px] uppercase tracking-widest px-1.5 py-0.5">{p.wood}</span>
                  </div>
                  <div className="pt-3 text-left space-y-1">
                    <Link to={`/produto/${p.id}`} className="block">
                      <h4 className="text-xs uppercase tracking-widest font-bold truncate hover:text-brand-chocolate">{p.name}</h4>
                    </Link>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-semibold">R$ {p.price.toFixed(2)}</span>
                      <Link to={`/produto/${p.id}`} className="text-[9px] font-bold uppercase tracking-widest text-brand-chocolate border-b border-brand-chocolate pb-0.5 hover:text-brand-beige hover:border-brand-beige">Ver</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
