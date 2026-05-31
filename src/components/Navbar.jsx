import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User, Heart, ShieldAlert, LogOut, ChevronDown } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const cart = useCartStore((state) => state.cart);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Catálogo", path: "/catalogo" },
    { name: "Nossa História", path: "/#historia" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-chocolate/40 text-brand-light transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group flex flex-col items-center">
              <span className="font-sans text-xl sm:text-2xl font-light tracking-[0.3em] text-brand-beige group-hover:text-white transition-colors duration-300">
                KETHY RIOS
              </span>
              <span className="text-[0.6rem] font-medium tracking-[0.4em] text-brand-gold -mt-1">
                CACHAÇA PREMIUM
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => {
                  const isHashLink = link.path.includes("#");
                  const currentHash = window.location.hash;
                  const targetHash = isHashLink ? link.path.substring(link.path.indexOf("#")) : "";
                  
                  const isLinkActive = isHashLink
                    ? (window.location.pathname === "/" && currentHash === targetHash)
                    : (isActive && !currentHash);

                  return `font-sans text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:text-brand-beige relative py-2 ${
                    isLinkActive ? "text-brand-beige border-b border-brand-beige" : "text-brand-light/80"
                  }`;
                }}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Icons Right */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Favorites Icon */}
            {isAuthenticated && (
              <Link
                to="/minha-conta?tab=favorites"
                className="text-brand-light/80 hover:text-brand-beige transition-colors duration-300 relative"
                title="Favoritos"
              >
                <Heart size={20} className={user?.favorites?.length > 0 ? "fill-brand-beige text-brand-beige" : ""} />
                {user?.favorites?.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-beige text-brand-dark text-[0.65rem] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {user.favorites.length}
                  </span>
                )}
              </Link>
            )}

            {/* Cart Icon */}
            <Link
              to="/carrinho"
              className="text-brand-light/80 hover:text-brand-beige transition-colors duration-300 relative"
              title="Sacola de Compras"
            >
              <ShoppingBag size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-beige text-brand-dark text-[0.65rem] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 text-brand-light/80 hover:text-brand-beige focus:outline-none transition-colors duration-300 text-sm font-medium uppercase tracking-wider"
                  >
                    <User size={18} />
                    <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                    <ChevronDown size={14} className={`transform transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-brand-chocolate border border-brand-beige/20 rounded-md shadow-2xl py-1 z-50 animate-scale-in">
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-xs uppercase tracking-widest text-brand-beige hover:bg-brand-dark transition-colors duration-200"
                        >
                          <ShieldAlert size={14} className="mr-2" /> Painel Admin
                        </Link>
                      )}
                      <Link
                        to="/minha-conta"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-xs uppercase tracking-widest text-brand-light hover:bg-brand-dark transition-colors duration-200"
                      >
                        <User size={14} className="mr-2" /> Minha Conta
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-xs uppercase tracking-widest text-red-400 hover:bg-brand-dark transition-colors duration-200 text-left"
                      >
                        <LogOut size={14} className="mr-2" /> Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold border border-brand-beige/50 px-4 py-2 rounded-full hover:bg-brand-beige hover:text-brand-dark transition-all duration-300"
                >
                  <User size={14} />
                  <span>Entrar</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Mobile Cart */}
            <Link to="/carrinho" className="text-brand-light/80 hover:text-brand-beige relative">
              <ShoppingBag size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-beige text-brand-dark text-[0.65rem] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-light hover:text-brand-beige focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-dark border-t border-brand-chocolate/50 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium tracking-widest uppercase hover:bg-brand-chocolate hover:text-brand-beige transition-all"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Auth options mobile */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/minha-conta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium tracking-widest uppercase hover:bg-brand-chocolate text-brand-beige"
                >
                  Minha Conta
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium tracking-widest uppercase hover:bg-brand-chocolate text-brand-gold"
                  >
                    Painel Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-sm font-medium tracking-widest uppercase hover:bg-brand-chocolate text-red-400"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium tracking-widest uppercase bg-brand-chocolate text-brand-beige text-center border border-brand-beige/30"
              >
                Entrar / Cadastrar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
