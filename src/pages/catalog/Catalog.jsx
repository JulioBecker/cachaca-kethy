import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, Grid, List, Star, Eye } from "lucide-react";
import { useProductStore } from "../../store/useProductStore";
import { useCartStore } from "../../store/useCartStore";
import { useToastStore } from "../../store/useToastStore";
import SEO from "../../components/SEO";

export default function Catalog() {
  const { products, loadProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);

  const location = useLocation();

  // Search, Filters & Sorting State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedWood, setSelectedWood] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("popularity"); // popularity, price-asc, price-desc, rating
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    loadProducts();
    
    // Parse query params (e.g. from footer links)
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(`${product.name} adicionado à sacola!`, "success");
  };

  // Categories list
  const categories = ["Todos", "Envelhecida", "Prata", "Licor", "Reserva Especial", "Kit Presente"];

  // Wood types list
  const woodTypes = [
    "Todos",
    "Carvalho Americano",
    "Carvalho Francês",
    "Amburana",
    "Jequitibá Rosa",
    "Bálsamo",
    "Ipê",
    "Castanheira",
    "Freijó",
    "Sem Madeira"
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    
    const matchesWood = selectedWood === "Todos" || 
      product.wood.toLowerCase().includes(selectedWood.toLowerCase()) ||
      (selectedWood === "Sem Madeira" && product.wood.toLowerCase().includes("sem madeira"));
      
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesWood && matchesPrice;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.salesCount - a.salesCount;
    }
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Todos");
    setSelectedWood("Todos");
    setMaxPrice(1000);
    setSortBy("popularity");
  };

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen py-10 font-sans">
      <SEO 
        title="Catálogo de Cachaças" 
        description="Explore a coleção exclusiva de cachaças finas Cachaça Kethy Rios. Filtre por madeira de envelhecimento (Amburana, Carvalho, Bálsamo, Jequitibá) e encontre o rótulo ideal."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-chocolate/80">Coleção Exclusiva</span>
          <h1 className="text-3xl sm:text-4xl font-light text-brand-dark tracking-widest uppercase">CATÁLOGO DE PRODUTOS</h1>
          <div className="w-12 h-0.5 bg-brand-beige mx-auto"></div>
        </div>

        {/* Outer Catalog Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden w-full">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center space-x-2 bg-white border border-brand-chocolate/10 py-3.5 px-4 text-xs uppercase tracking-widest font-bold text-brand-dark hover:bg-brand-light transition-all shadow-sm"
            >
              <SlidersHorizontal size={14} className="text-brand-chocolate" />
              <span>{showMobileFilters ? "Esconder Filtros" : "Filtrar Produtos"}</span>
            </button>
          </div>

          {/* Filters Sidebar (Left) */}
          <div className={`${showMobileFilters ? "block" : "hidden"} lg:block lg:col-span-3 bg-white border border-brand-chocolate/10 p-6 shadow-md space-y-6 text-left`}>
            <div className="flex justify-between items-center pb-4 border-b border-brand-chocolate/10">
              <h2 className="text-xs uppercase tracking-widest font-bold flex items-center space-x-2">
                <SlidersHorizontal size={14} />
                <span>Filtros</span>
              </h2>
              <button 
                onClick={handleResetFilters}
                className="text-[10px] uppercase tracking-widest font-semibold text-brand-chocolate/65 hover:text-brand-beige transition-colors"
              >
                Limpar
              </button>
            </div>

            {/* Search Box */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-brand-dark/70">Buscar</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nome, madeira..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 text-xs px-3 py-2.5 pl-8 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                />
                <Search size={14} className="absolute left-2.5 top-3.5 text-brand-dark/45" />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-brand-dark/70 block">Categorias</label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-xs px-3 py-2 transition-all duration-200 uppercase tracking-widest border-l-2 ${
                      selectedCategory === cat
                        ? "bg-brand-chocolate/5 border-brand-beige text-brand-chocolate font-bold"
                        : "border-transparent text-brand-dark/70 hover:bg-brand-chocolate/5 hover:text-brand-dark"
                    }`}
                  >
                    {cat === "Todos" ? "Todas as Categorias" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Barrel Wood Filter */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-brand-dark/70 block">Madeira / Maturação</label>
              <select
                value={selectedWood}
                onChange={(e) => setSelectedWood(e.target.value)}
                className="w-full bg-brand-light border border-brand-chocolate/20 text-xs px-3 py-2.5 focus:outline-none focus:border-brand-beige uppercase tracking-widest"
              >
                {woodTypes.map((wood) => (
                  <option key={wood} value={wood}>
                    {wood === "Todos" ? "Todas as Madeiras" : wood}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-semibold text-brand-dark/70">
                <span>Preço Máximo</span>
                <span className="font-bold text-brand-chocolate">R$ {maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-chocolate bg-brand-light cursor-pointer"
              />
            </div>
          </div>

          {/* Products Grid Section (Right) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Sort / Stats Bar */}
            <div className="bg-white border border-brand-chocolate/10 p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs uppercase tracking-widest text-brand-dark/60">
                Mostrando <span className="font-bold text-brand-dark">{sortedProducts.length}</span> produtos encontrados
              </p>
              
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-dark/60">Ordenar por</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-brand-light border border-brand-chocolate/20 text-xs px-3 py-1.5 focus:outline-none focus:border-brand-beige uppercase tracking-widest"
                >
                  <option value="popularity">Mais Vendidos</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>
            </div>

            {/* Grid Container */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white border border-brand-chocolate/10 p-12 text-center shadow-md space-y-4">
                <SlidersHorizontal className="mx-auto text-brand-chocolate/30" size={40} />
                <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-dark/80">Nenhum produto encontrado</h3>
                <p className="text-xs text-brand-dark/60">Experimente ajustar os filtros ou digitar outro termo na busca.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-brand-chocolate text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 hover:bg-brand-dark transition-all duration-300"
                >
                  Resetar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-brand-chocolate/15 hover:border-brand-beige/60 group transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg"
                  >
                    {/* Visual Bottle block */}
                    <Link
                      to={`/produto/${product.id}`}
                      className="flex items-center justify-center bg-brand-light border-b border-brand-chocolate/5 relative overflow-hidden aspect-[4/5] block cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-radial-gradient from-brand-beige/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      {/* Product Image */}
                      <img
                        src={product.images?.[0] || "img/produto.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      <div className="absolute top-3 left-3 bg-brand-chocolate text-brand-beige text-[0.55rem] font-bold uppercase tracking-widest px-2 py-1">
                        {product.wood}
                      </div>

                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center text-red-400 font-semibold text-xs tracking-widest uppercase">
                          Esgotado
                        </div>
                      )}

                      {/* Detail hover button */}
                      <div
                        className="absolute bottom-3 bg-brand-dark/90 hover:bg-brand-dark border border-brand-beige/35 text-brand-beige text-[9px] uppercase tracking-widest px-3 py-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-1"
                      >
                        <Eye size={10} />
                        <span>Ver Detalhes</span>
                      </div>
                    </Link>

                    {/* Details Info */}
                    <div className="p-5 space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest text-brand-chocolate font-bold bg-brand-beige/30 px-2 py-0.5">
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-1 text-brand-gold">
                          <Star size={11} className="fill-brand-gold text-brand-gold" />
                          <span className="text-[10px] font-bold tracking-wider">{product.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <Link to={`/produto/${product.id}`}>
                        <h3 className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-brand-dark hover:text-brand-chocolate transition-colors duration-200 truncate">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-[10px] text-brand-dark/50 uppercase tracking-widest truncate">
                        {product.volume} • ABV {product.abv}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-brand-chocolate/10">
                        <span className="text-xs sm:text-sm font-semibold text-brand-dark">R$ {product.price.toFixed(2)}</span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className="bg-brand-chocolate text-white hover:bg-brand-dark text-[9px] font-bold uppercase tracking-widest px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
