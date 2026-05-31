import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck, MapPin, Wine, Flame, ChevronRight } from "lucide-react";
import { useProductStore } from "../../store/useProductStore";
import { useCartStore } from "../../store/useCartStore";
import { useToastStore } from "../../store/useToastStore";
import SEO from "../../components/SEO";

export default function Home() {
  const { products, loadProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    loadProducts();
    // Scroll to hash links if present in URL
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  // Filter 4 featured premium products
  const featuredProducts = products.filter(p => [1, 3, 9, 10].includes(p.id));

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(`${product.name} adicionado à sacola!`, "success");
  };

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen font-sans">
      <SEO 
        title="Início" 
        description="E-commerce oficial da Cachaça Kethy Rios. Cachaças artesanais extra premium envelhecidas em barris de carvalho, amburana, jequitibá rosa e bálsamo. Enviamos de Garuva/SC para todo o Brasil."
      />

      {/* Hero Section */}
      <section className="relative bg-brand-dark overflow-hidden border-b border-brand-chocolate/30 py-16 sm:py-32 min-h-[450px] sm:min-h-[600px] flex items-center">
        {/* Background Image Banner */}
        <div className="absolute inset-0 z-0">
          <img 
            src="img/produto3.jpeg" 
            alt="Cachaça Kethy Rios Banner" 
            className="w-full h-full object-cover object-center"
          />
          {/* Base gradient overlay for dark text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/75 to-transparent z-10"></div>
          
          {/* Gradient blur overlay */}
          <div 
            className="absolute inset-0 bg-brand-dark/20 z-10"
            style={{
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0) 75%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0) 75%)'
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          {/* Text Column Left */}
          <div className="max-w-2xl space-y-6 text-left animate-fade-in">
            <span 
              className="text-xs uppercase tracking-[0.4em] text-brand-beige font-semibold"
              style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.95), 0 0 8px rgba(0, 0, 0, 0.8)' }}
            >
              Destilaria de Alambique Premium
            </span>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-widest text-white leading-tight uppercase"
              style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.7)' }}
            >
              A Tradição do <br />
              <span className="font-bold text-brand-beige">Sabor Extra Premium</span>
            </h1>
            <p 
              className="text-sm sm:text-base text-brand-light/95 leading-relaxed font-light max-w-xl"
              style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 0, 0, 0.7)' }}
            >
              A união perfeita entre a música sertaneja e a tradição da cachaça artesanal catarinense. Produzida em parceria com a Cachaçaria Moendão, cada garrafa entrega sabor, qualidade e personalidade em uma experiência única.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/catalogo"
                className="bg-brand-beige text-brand-dark hover:bg-white text-xs uppercase tracking-widest font-semibold px-8 py-4 transition-all duration-300 shadow-lg text-center flex items-center justify-center space-x-2"
              >
                <span>Descobrir Catálogo</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/#historia"
                className="border border-brand-beige/40 text-brand-beige hover:border-white hover:text-white text-xs uppercase tracking-widest font-semibold px-8 py-4 transition-all duration-300 text-center"
              >
                Nossa História
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navegue por Categoria Section */}
      <section className="py-20 bg-brand-light-gray border-b border-brand-chocolate/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-chocolate font-bold block mb-2">
            Escolha sua Experiência
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-brand-dark tracking-widest uppercase mb-4">
            Navegue por Categoria
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mb-12"></div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 justify-center">
            {[
              {
                name: "Todas as Cachaças",
                path: "/catalogo",
                svg: (
                  <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 22C22 18 24 14 26 12H38C40 14 42 18 42 22V54C42 56 40 58 38 58H26C24 58 22 56 22 54V22Z" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M28 12V6H36V12" stroke="currentColor" strokeWidth="2.5"/>
                    <line x1="22" y1="36" x2="42" y2="36" stroke="currentColor" strokeWidth="2"/>
                    <path d="M46 30C46 27 48 24 49 23H57C58 24 60 27 60 30V54C60 55 59 56 58 56H48C47 56 46 55 46 54V30Z" stroke="currentColor" strokeWidth="1.75" opacity="0.7"/>
                    <path d="M51 23V19H55V23" stroke="currentColor" strokeWidth="1.75" opacity="0.7"/>
                  </svg>
                )
              },
              {
                name: "Envelhecidas",
                path: "/catalogo?category=Envelhecida",
                svg: (
                  <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10C20 10 14 24 14 32C14 40 20 54 20 54H44C44 54 50 40 50 32C50 24 44 10 44 10H20Z" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M27 10C27 10 23 24 23 32C23 40 27 54 27 54" stroke="currentColor" strokeWidth="1.75" strokeDasharray="2 2"/>
                    <path d="M37 10C37 10 41 24 41 32C41 40 37 54 37 54" stroke="currentColor" strokeWidth="1.75" strokeDasharray="2 2"/>
                    <path d="M15.5 22H48.5" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M14 32H50" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M15.5 42H48.5" stroke="currentColor" strokeWidth="2.5"/>
                  </svg>
                )
              },
              {
                name: "Pratas",
                path: "/catalogo?category=Prata",
                svg: (
                  <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 12V6H38V12" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M20 22C20 18 24 16 26 14H38C40 16 44 18 44 22V54C44 56 42 58 40 58H24C22 58 20 56 20 54V22Z" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M48 14L50 18L54 20L50 22L48 26L46 22L42 20L46 18Z" fill="currentColor"/>
                    <path d="M14 42L15 44L17 45L15 46L14 48L13 46L11 45L13 44Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                name: "Licores",
                path: "/catalogo?category=Licor",
                svg: (
                  <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 10H38V16L34 26V50H18V10Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M42 28H52L47 38V48H43V48M41 48H53" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="28" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )
              },
              {
                name: "Reserva Especial",
                path: "/catalogo?category=Reserva Especial",
                svg: (
                  <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 15V6H38V15" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M28 6L32 18L36 6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 28C16 22 22 18 24 16H40C42 18 48 22 48 28V54C48 57 45 58 42 58H22C19 58 16 57 16 54V28Z" stroke="currentColor" strokeWidth="2.5"/>
                    <circle cx="32" cy="34" r="6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M32 31V37M29 34H35" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )
              },
              {
                name: "Kits & Presentes",
                path: "/catalogo?category=Kit Presente",
                svg: (
                  <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="18" y="22" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
                    <rect x="15" y="16" width="34" height="6" rx="1" stroke="currentColor" strokeWidth="2.5" fill="none" />
                    <line x1="32" y1="16" x2="32" y2="50" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="18" y1="36" x2="46" y2="36" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M32 16C32 16 27 11 29 9C31 7 33 11 32 16Z" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M32 16C32 16 37 11 35 9C33 7 32 11 32 16Z" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                )
              }
            ].map((cat, i) => (
              <Link
                key={i}
                to={cat.path}
                className="group flex flex-col items-center focus:outline-none"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-brand-gold/30 bg-brand-chocolate shadow-lg shadow-brand-chocolate/40 flex items-center justify-center hover:bg-brand-beige hover:border-brand-dark hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="transform group-hover:scale-110 transition-transform duration-300 text-brand-beige group-hover:text-brand-dark">
                    {cat.svg}
                  </div>
                </div>
                <span className="text-xs tracking-widest font-bold text-brand-dark group-hover:text-brand-chocolate transition-colors mt-4 uppercase text-center block max-w-[130px] leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand History Section */}
      <section id="historia" className="py-20 bg-brand-light relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Frame left */}
            <div className="lg:col-span-5 relative flex justify-center px-4 sm:px-8 md:px-0 mb-8 md:mb-0">
              <div className="border border-brand-beige/50 p-3 bg-white shadow-2xl relative max-w-[260px] sm:max-w-xs md:max-w-sm w-full mx-auto">
                <div className="aspect-[4/5] bg-brand-dark/10 flex items-center justify-center overflow-hidden relative group">
                  <img 
                    src="img/produto.jpg" 
                    alt="Cachaça Kethy Rios Origem"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-4 -right-2 md:-right-4 bg-brand-chocolate text-brand-beige text-[10px] md:text-xs uppercase tracking-widest px-3 md:px-4 py-2 md:py-3 border border-brand-beige/30 shadow-lg font-bold">
                  Fundada em SC
                </div>
              </div>
            </div>

             {/* Texts right */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-chocolate/80 font-bold block">
                UMA HISTÓRIA DE PARCERIA E TRADIÇÃO
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-brand-dark uppercase">
                A História da <br />
                <span className="font-semibold text-brand-chocolate">Cachaça Kethy Rios</span>
              </h2>
              <div className="w-20 h-1 bg-brand-beige"></div>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed">
                A Cachaça Kethy Rios nasceu da parceria entre a cantora sertaneja Kethy Rios e a tradicional Cachaçaria Moendão, localizada na cidade de Gaspar, Santa Catarina.
              </p>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed">
                Foi em 2021 que a paixão pela música sertaneja se encontrou com a excelência da produção artesanal de cachaças, dando origem a uma marca que rapidamente conquistou admiradores em toda a região.
              </p>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-medium">
                Com produtos cuidadosamente selecionados e envelhecidos em madeiras nobres, a linha Kethy Rios oferece sabores marcantes e sofisticados, agradando especialmente ao público feminino que busca qualidade, elegância e autenticidade em cada momento.
              </p>
              <div className="pt-2">
                <Link
                  to="/catalogo"
                  className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-brand-chocolate hover:text-brand-beige transition-all group"
                >
                  <span>Conheça toda a nossa coleção</span>
                  <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Free Shipping Banner Section */}
      <section className="bg-brand-beige text-brand-dark border-y border-brand-chocolate/20 relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-beige/10 via-brand-beige/5 to-transparent opacity-95 z-0"></div>
        
        {/* Subtle decorative vector lines in background for luxury marble feel */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 50 Q 200 150 400 50 T 800 50 T 1200 150" fill="none" stroke="#231913" strokeWidth="1"/>
            <path d="M 100 100 Q 300 20 500 100 T 900 100" fill="none" stroke="#231913" strokeWidth="1"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Cardboard Box SVG Graphic (Left) */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative hover:scale-105 transition-transform duration-300 cursor-pointer">
              <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-6 filter drop-shadow-[0_10px_20px_rgba(50,34,26,0.25)]">
                {/* 3D Box look */}
                {/* Top lid left */}
                <path d="M50 20 L20 32 L50 45 L80 32 Z" fill="#d5b98a" stroke="#231913" strokeWidth="1"/>
                {/* Top lid flap center line */}
                <line x1="50" y1="20" x2="50" y2="45" stroke="#231913" strokeWidth="1"/>
                {/* Left side */}
                <path d="M20 32 L20 72 L50 85 L50 45 Z" fill="#c3a674" stroke="#231913" strokeWidth="1"/>
                {/* Right side */}
                <path d="M50 45 L50 85 L80 72 L80 32 Z" fill="#af915d" stroke="#231913" strokeWidth="1"/>
                {/* Packing tape */}
                <path d="M47 21 L18 32.5 L18 35.5 L47 24 Z" fill="#87531E" opacity="0.45"/>
                {/* Packaging fragile signs */}
                <path d="M25 45 H30 V50 H25 Z M33 45 H38 V50 H33 Z" fill="#231913" opacity="0.5"/>
                
                {/* Brand Logo printed on box */}
                <rect x="54" y="49" width="22" height="13" rx="0.5" fill="#231913" stroke="#E7CFA5" strokeWidth="0.75" transform="skewY(-10)"/>
                <text x="65" y="55" fill="#E7CFA5" fontSize="2" fontFamily="Montserrat" fontWeight="bold" textAnchor="middle" transform="skewY(-10)">KETHY RIOS</text>
                <text x="65" y="59" fill="#E7CFA5" fontSize="1.3" fontFamily="Montserrat" textAnchor="middle" transform="skewY(-10)">GARUVA - SC</text>
              </svg>
            </div>
          </div>

          {/* Banner Text Content (Center/Right) */}
          <div className="md:col-span-8 text-center md:text-left space-y-4 text-brand-dark">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-chocolate font-bold block">
              CONDIÇÃO ESPECIAL DE ENTREGA
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-widest text-brand-dark leading-none">
                ENTREGAMOS PARA TODO O BRASIL
              </h2>
            </div>
            
            <div className="border-t border-brand-chocolate/20 pt-3 max-w-xl">
              <p className="text-[10px] sm:text-xs text-brand-dark/85 uppercase tracking-wider leading-relaxed">
                Receba os produtos da linha Kethy Rios com segurança e praticidade. Qualidade garantida desde a produção até a sua casa.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/catalogo"
                className="bg-brand-dark text-white hover:bg-brand-chocolate text-[10px] sm:text-xs uppercase tracking-widest font-bold px-6 py-3.5 transition-all duration-300 inline-block shadow-md"
              >
                Aproveitar Agora
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="py-20 bg-brand-chocolate text-brand-light relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-chocolate to-brand-dark opacity-50 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-beige font-semibold">Lotes Selecionados</span>
            <h2 className="text-3xl font-light text-white tracking-widest">PRODUTOS EM DESTAQUE</h2>
            <div className="w-16 h-0.5 bg-brand-beige mx-auto"></div>
            <p className="text-xs text-brand-light/80 uppercase tracking-wider">
              Cachaças artesanais e coquetéis desenvolvidos para proporcionar experiências únicas.
            </p>
          </div>

          {/* Grid Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-brand-dark/80 border border-brand-chocolate/40 hover:border-brand-beige/50 group transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Image block (Represented with luxury SVG template) */}
                <div className="p-6 flex items-center justify-center bg-brand-chocolate/20 border-b border-brand-chocolate/40 relative overflow-hidden aspect-[4/5]">
                  {/* Decorative background light */}
                  <div className="absolute inset-0 bg-radial-gradient from-brand-beige/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <img
                    src="img/produto.jpg"
                    alt={product.name}
                    className="max-h-[200px] object-contain transform group-hover:scale-105 transition-transform duration-300 rounded"
                  />
                  
                  {/* Quick stats tag overlay */}
                  <div className="absolute top-3 left-3 bg-brand-beige text-brand-dark text-[0.6rem] font-bold uppercase tracking-widest px-2 py-1">
                    {product.wood}
                  </div>
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center text-red-400 font-semibold text-xs tracking-widest uppercase">
                      Esgotado
                    </div>
                  )}
                </div>

                {/* Info block */}
                <div className="p-5 space-y-2 text-left">
                  <div className="flex items-center space-x-1 text-brand-gold">
                    <Star size={12} className="fill-brand-gold" />
                    <span className="text-[10px] font-bold tracking-wider">{product.rating.toFixed(1)}</span>
                  </div>
                  <Link to={`/produto/${product.id}`} className="block">
                    <h3 className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-white hover:text-brand-beige transition-colors duration-200 truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[10px] text-brand-light/50 uppercase tracking-widest">{product.volume} • ABV {product.abv}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-brand-chocolate/30">
                    <span className="text-sm font-semibold text-brand-beige">R$ {product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="bg-brand-beige text-brand-dark hover:bg-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Catalog link button */}
          <div className="text-center pt-12">
            <Link
              to="/catalogo"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-brand-beige border-b border-brand-beige pb-1.5 hover:text-white hover:border-white transition-all duration-300"
            >
              <span>Ver Todos os Produtos ({products.length})</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Differentiators */}
      <section id="diferenciais" className="py-20 bg-brand-light text-brand-dark scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-chocolate/80 font-bold">Por que escolher</span>
            <h2 className="text-3xl font-light text-brand-dark tracking-widest">NOSSOS DIFERENCIAIS</h2>
            <div className="w-16 h-0.5 bg-brand-beige mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-brand-beige/40 bg-white p-8 text-center space-y-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-chocolate/10 flex items-center justify-center mx-auto text-brand-chocolate">
                <Wine size={22} />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-bold">Qualidade Premiada</h3>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Produzida em parceria com uma das cachaçarias mais respeitadas da região, reconhecida pela excelência em cada lote.
              </p>
            </div>
            
            <div className="border border-brand-beige/40 bg-white p-8 text-center space-y-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-chocolate/10 flex items-center justify-center mx-auto text-brand-chocolate">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-bold">Produção Artesanal</h3>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Cada etapa é realizada com atenção aos detalhes, preservando os aromas, sabores e a autenticidade da bebida.
              </p>
            </div>
            
            <div className="border border-brand-beige/40 bg-white p-8 text-center space-y-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-chocolate/10 flex items-center justify-center mx-auto text-brand-chocolate">
                <MapPin size={22} />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-bold">Origem Catarinense</h3>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Fabricada em Gaspar, Santa Catarina, unindo tradição, qualidade e o melhor da produção regional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Slider */}
      <section className="py-20 bg-brand-dark text-brand-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-beige font-semibold">Depoimentos</span>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-widest">O QUE DIZEM NOSSOS CLIENTES</h2>
            <div className="w-16 h-0.5 bg-brand-beige mx-auto"></div>
          </div>

          {/* Simple Slider layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-brand-chocolate/40 border border-brand-beige/10 p-8 rounded space-y-4">
              <div className="flex text-brand-beige">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-brand-beige" />)}
              </div>
              <p className="text-xs italic text-brand-light/80 leading-relaxed">
                "A Cachaça Premium surpreendeu pela suavidade e aroma. Um produto diferenciado e de excelente qualidade."
              </p>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-white">Mariana Souza</p>
                <p className="text-[10px] text-brand-beige">Cliente Verificado</p>
              </div>
            </div>

            <div className="bg-brand-chocolate/40 border border-brand-beige/10 p-8 rounded space-y-4">
              <div className="flex text-brand-beige">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-brand-beige" />)}
              </div>
              <p className="text-xs italic text-brand-light/80 leading-relaxed">
                "Experimentei o coquetel de café e me apaixonei. Equilibrado, saboroso e perfeito para qualquer ocasião."
              </p>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-white">Juliana Martins</p>
                <p className="text-[10px] text-brand-beige">Cliente Verificado</p>
              </div>
            </div>

            <div className="bg-brand-chocolate/40 border border-brand-beige/10 p-8 rounded space-y-4">
              <div className="flex text-brand-beige">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-brand-beige" />)}
              </div>
              <p className="text-xs italic text-brand-light/80 leading-relaxed">
                "A Cachaça Ouro tem um sabor incrível. Dá para perceber o cuidado em cada detalhe da produção."
              </p>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-white">Ricardo Fernandes</p>
                <p className="text-[10px] text-brand-beige">Cliente Verificado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Purchase */}
      <section className="bg-brand-beige py-16 text-center text-brand-dark relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="text-3xl font-light tracking-widest">LEVE A EXCLUSIVIDADE PARA SUA CASA</h2>
          <p className="text-xs uppercase tracking-widest text-brand-dark/80 max-w-xl mx-auto leading-relaxed">
            Parcele suas compras e receba produtos exclusivos diretamente de Santa Catarina. Qualidade, tradição e sabor em cada garrafa.
          </p>
          <div className="pt-4">
            <Link
              to="/catalogo"
              className="bg-brand-dark text-white hover:bg-brand-chocolate text-xs uppercase tracking-widest font-bold px-10 py-4 transition-all duration-300 inline-block shadow-xl"
            >
              Comprar Cachaça Kethy Rios
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
