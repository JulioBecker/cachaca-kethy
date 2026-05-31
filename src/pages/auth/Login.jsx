import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";
import SEO from "../../components/SEO";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { login, isAuthenticated, user } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname || (user.isAdmin ? "/admin" : "/minha-conta");
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const res = login(email, password);
    if (res.success) {
      showToast(`Bem-vindo(a) de volta, ${res.user.name}!`, "success");
      const from = res.user.isAdmin ? "/admin" : "/minha-conta";
      navigate(from);
    } else {
      setErrorMsg(res.message);
      showToast(res.message, "error");
    }
  };

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen py-16 flex flex-col justify-center items-center font-sans text-left">
      <SEO title="Entrar" description="Faça login em sua conta de Cachaça Kethy Rios para gerenciar seus pedidos e favoritos." />

      <div className="max-w-md w-full mx-auto px-4">
        
        {/* Box Card */}
        <div className="bg-white border border-brand-chocolate/10 p-8 shadow-lg space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-chocolate">Bem-vindo à Experiência</span>
            <h1 className="text-2xl font-light tracking-widest text-brand-dark uppercase">IDENTIFICAÇÃO</h1>
            <div className="w-12 h-0.5 bg-brand-beige mx-auto mt-1"></div>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Admin Helpers */}
          <div className="bg-brand-chocolate/5 border border-brand-chocolate/10 p-3 rounded text-[10px] space-y-1 text-brand-dark/70">
            <p className="font-bold uppercase tracking-wider text-brand-chocolate">Dicas de Acesso rápido:</p>
            <p>• Admin: <span className="font-semibold select-all">admin@kethyrios.com.br</span> (Senha: <span className="font-semibold select-all">admin</span>)</p>
            <p>• Cliente: <span className="font-semibold select-all">arthur@kethyrios.com.br</span> (Senha: <span className="font-semibold select-all">user123</span>)</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="EXEMPLO@KETHYRIOS.COM.BR"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 pl-9 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                />
                <Mail size={14} className="absolute left-3 top-3.5 text-brand-dark/45" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="uppercase tracking-widest font-semibold text-brand-dark/65">Senha</label>
                <Link to="/recuperar-senha" className="text-[10px] uppercase tracking-widest font-bold text-brand-chocolate/80 hover:text-brand-beige">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 pl-9 focus:outline-none focus:border-brand-beige"
                />
                <Lock size={14} className="absolute left-3 top-3.5 text-brand-dark/45" />
              </div>
            </div>

            <button
              type="submit"
              className="bg-brand-chocolate hover:bg-brand-dark text-white text-xs uppercase tracking-widest font-bold w-full py-4 flex items-center justify-center space-x-1.5 transition-all duration-300 shadow rounded"
            >
              <span>Entrar</span>
              <LogIn size={14} />
            </button>
          </form>

          <div className="border-t border-brand-chocolate/10 pt-4 text-center text-xs">
            <p className="text-brand-dark/65">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="uppercase font-bold text-brand-chocolate hover:text-brand-beige transition-colors">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
