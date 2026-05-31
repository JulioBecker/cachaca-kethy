import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Award, CheckCircle } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <>
      {/* Separate Newsletter Section */}
      <section className="bg-brand-chocolate border-t border-brand-chocolate/30 py-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-dark/40 border border-brand-beige/25 p-6 md:p-8 rounded-lg shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1 text-left">
              <h3 className="text-xl font-light tracking-[0.2em] text-brand-beige">RECEBA NOVIDADES EXCLUSIVAS</h3>
              <p className="text-xs text-brand-light/90 mt-1 uppercase tracking-wider">
                Cadastre seu e-mail e fique por dentro de lançamentos, promoções especiais, eventos e novidades da Cachaça Kethy Rios.
              </p>
            </div>
            <div className="lg:col-span-2">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="SEU MELHOR E-MAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow bg-brand-dark border border-brand-beige/25 text-brand-light text-xs uppercase tracking-widest px-4 py-3.5 focus:outline-none focus:border-brand-beige transition-all"
                />
                <button
                  type="submit"
                  className="bg-brand-beige text-brand-dark hover:bg-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 flex items-center justify-center space-x-2 transition-all duration-300"
                >
                  <span>Inscrever</span>
                  <Send size={14} />
                </button>
              </form>
              {subscribed && (
                <p className="text-brand-beige text-xs mt-2 flex items-center space-x-1.5 animate-fade-in uppercase tracking-widest text-left">
                  <CheckCircle size={14} /> <span>Inscrição realizada com sucesso! Aproveite.</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Section */}
      <footer className="bg-brand-dark border-t border-brand-chocolate/40 text-brand-light/80 pt-16 pb-8 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Middle Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          {/* Logo & About */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-lg font-light tracking-[0.3em] text-brand-beige">KETHY RIOS</span>
              <span className="block text-[0.55rem] font-medium tracking-[0.4em] text-brand-gold -mt-1 uppercase">
                CACHAÇA PREMIUM
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-brand-light/60">
              A Cachaça Kethy Rios nasceu da união entre a música sertaneja e a tradição da produção artesanal catarinense. Produtos exclusivos, qualidade premium e sabores que conquistam cada vez mais apreciadores.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com/CachacaKethyRios" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-brand-light/65 hover:text-brand-beige transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-brand-light/65 hover:text-brand-beige transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-beige mb-4 font-sans">Navegação</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-brand-beige transition-all">Início</Link></li>
              <li><Link to="/catalogo" className="hover:text-brand-beige transition-all">Catálogo Completo</Link></li>
              <li><Link to="/#historia" className="hover:text-brand-beige transition-all">Nossa História</Link></li>
              <li><Link to="/minha-conta" className="hover:text-brand-beige transition-all">Minha Conta</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-beige mb-4">Categorias</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/catalogo?category=Envelhecida" className="hover:text-brand-beige transition-all">Cachaças Envelhecidas</Link></li>
              <li><Link to="/catalogo?category=Prata" className="hover:text-brand-beige transition-all">Cachaças Pratas</Link></li>
              <li><Link to="/catalogo?category=Licor" className="hover:text-brand-beige transition-all">Licores Especiais</Link></li>
              <li><Link to="/catalogo?category=Reserva Especial" className="hover:text-brand-beige transition-all">Reserva Especial</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-beige">Contato</h4>
            <div className="space-y-3 text-xs leading-relaxed text-brand-light/70">
              <p className="flex items-start">
                <MapPin size={16} className="text-brand-beige mr-2.5 shrink-0 mt-0.5" />
                <span>Garuva - SC</span>
              </p>
              <p className="flex items-center">
                <Phone size={14} className="text-brand-beige mr-2.5 shrink-0" />
                <span>(47) 99145-0746</span>
              </p>
              <p className="flex items-center">
                <Mail size={14} className="text-brand-beige mr-2.5 shrink-0" />
                <span>contato@cachacakethyrios.com.br</span>
              </p>
              <p className="text-[10px] text-brand-beige uppercase tracking-wider font-semibold pt-1">
                @CachacaKethyRios
              </p>
            </div>
            
            <div className="border-t border-brand-chocolate/20 pt-3 space-y-1 text-xs">
              <h5 className="font-semibold text-brand-beige uppercase tracking-widest text-[10px]">Horário de Atendimento</h5>
              <p className="text-brand-light/60 text-[10px]">Segunda a Sexta-feira<br />09h às 18h</p>
            </div>
          </div>
        </div>

        {/* Bottom Rights Row */}
        <div className="border-t border-brand-chocolate/20 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-[0.7rem] uppercase tracking-wider text-brand-light/40 gap-6 md:gap-4">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-1.5">
            <Award size={14} className="text-brand-beige" />
            <span>© {new Date().getFullYear()} Cachaça Kethy Rios. Todos os direitos reservados.</span>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <span>Beba com moderação</span>
            <span>Venda proibida para menores de 18 anos</span>
          </div>
        </div>

        {/* Developer attribution */}
        <div className="border-t border-brand-chocolate/10 mt-6 pt-4 text-center text-[0.65rem] uppercase tracking-[0.2em] text-brand-light/35">
          Desenvolvido por CostaBecker - Soluções em Tecnologia
        </div>

      </div>
    </footer>
    </>
  );
}
