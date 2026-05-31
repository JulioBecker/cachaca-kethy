import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, UserPlus, AlertCircle } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";
import SEO from "../../components/SEO";

export default function Register() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.register);
  const showToast = useToastStore((state) => state.showToast);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const res = registerUser(name, email, password, phone);
    if (res.success) {
      showToast(`Cadastro realizado! Bem-vindo(a), ${name}!`, "success");
      navigate("/minha-conta");
    } else {
      setErrorMsg(res.message);
      showToast(res.message, "error");
    }
  };

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen py-12 flex flex-col justify-center items-center font-sans text-left">
      <SEO title="Cadastre-se" description="Crie sua conta na Cachaça Kethy Rios para comprar e favoritar nossos destilados premium." />

      <div className="max-w-md w-full mx-auto px-4">
        
        <div className="bg-white border border-brand-chocolate/10 p-8 shadow-lg space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-chocolate">Crie sua Conta</span>
            <h1 className="text-2xl font-light tracking-widest text-brand-dark uppercase">CADASTRO</h1>
            <div className="w-12 h-0.5 bg-brand-beige mx-auto mt-1"></div>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">Nome Completo</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="DIGITE SEU NOME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 pl-9 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                />
                <User size={14} className="absolute left-3 top-3.5 text-brand-dark/45" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="EXEMPLO@GMAIL.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 pl-9 focus:outline-none focus:border-brand-beige uppercase tracking-wider"
                />
                <Mail size={14} className="absolute left-3 top-3.5 text-brand-dark/45" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">Telefone</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-brand-light border border-brand-chocolate/20 px-3 py-2.5 pl-9 focus:outline-none focus:border-brand-beige"
                />
                <Phone size={14} className="absolute left-3 top-3.5 text-brand-dark/45" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="uppercase tracking-widest font-semibold text-brand-dark/65 block">Senha</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="CRIE UMA SENHA"
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
              <span>Cadastrar</span>
              <UserPlus size={14} />
            </button>
          </form>

          <div className="border-t border-brand-chocolate/10 pt-4 text-center text-xs">
            <p className="text-brand-dark/65">
              Já possui uma conta?{" "}
              <Link to="/login" className="uppercase font-bold text-brand-chocolate hover:text-brand-beige transition-colors">
                Entrar
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
