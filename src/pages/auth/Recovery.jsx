import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";
import SEO from "../../components/SEO";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-light text-brand-dark min-h-screen py-16 flex flex-col justify-center items-center font-sans text-left">
      <SEO title="Recuperar Senha" description="Recupere a senha de acesso da sua conta Cachaça Kethy Rios." />

      <div className="max-w-md w-full mx-auto px-4">
        
        <div className="bg-white border border-brand-chocolate/10 p-8 shadow-lg space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-chocolate">Esqueceu as Credenciais</span>
            <h1 className="text-2xl font-light tracking-widest text-brand-dark uppercase">RECUPERAR SENHA</h1>
            <div className="w-12 h-0.5 bg-brand-beige mx-auto mt-1"></div>
          </div>

          {submitted ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 bg-green-50 rounded-full border border-green-200 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle size={24} />
              </div>
              <p className="text-xs font-semibold text-brand-chocolate uppercase tracking-wider">E-MAIL DE RECUPERAÇÃO ENVIADO!</p>
              <p className="text-xs text-brand-dark/70 leading-relaxed uppercase tracking-widest">
                Se o e-mail <span className="font-bold text-brand-dark">{email.toUpperCase()}</span> estiver cadastrado, você receberá um link para redefinir sua senha em instantes.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="bg-brand-chocolate text-white text-xs uppercase tracking-widest font-bold px-6 py-3 block hover:bg-brand-dark transition-colors"
                >
                  Ir para Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <p className="text-xs text-brand-dark/70 leading-relaxed uppercase tracking-widest text-center">
                Insira seu e-mail de cadastro. Enviaremos um link de redefinição de senha temporário.
              </p>

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

              <button
                type="submit"
                className="bg-brand-chocolate hover:bg-brand-dark text-white text-xs uppercase tracking-widest font-bold w-full py-4 flex items-center justify-center space-x-1.5 transition-all duration-300 shadow rounded"
              >
                <span>Enviar Instruções</span>
                <Send size={12} />
              </button>
            </form>
          )}

          <div className="border-t border-brand-chocolate/10 pt-4 text-center text-xs">
            <Link to="/login" className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-bold text-brand-dark/65 hover:text-brand-chocolate transition-colors">
              <ArrowLeft size={12} />
              <span>Voltar ao Login</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
