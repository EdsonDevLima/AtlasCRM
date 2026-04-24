import { useContext, useState, type FormEvent } from "react"
import Style from "./auth.module.css"
import { ContextUserApp } from "../../context/contextApp"
import { toast } from "react-toastify"
import { HeaderAuthenticate } from "../../components/headers/authenticateHeader"
import { ButtonLoading } from "../../components/load/ButtonLoading"

export function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useContext(ContextUserApp)
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);

  try {
    if (isLogin) {
      if (!email || !password) {
        toast.error("Preencha todos os campos");
        return;
      }
      await login(email, password);
    } else {
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Preencha todos os campos");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem");
        return;
      }
      await register(name, email, password, confirmPassword);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <section className={Style.AuthSection}>
      <HeaderAuthenticate/>
      <div className={Style.authContent}>
        <div className={Style.authHero}>
          <span className={Style.badge}>Atlas CRM</span>
          <h1>Organize clientes, pedidos e produtos em um fluxo mais claro.</h1>
          <p>
            Acesse sua conta para acompanhar vendas, atualizar cadastros e manter o
            time produtivo em qualquer tela.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={Style.authForm}>
          <div className={Style.formHeader}>
            <span>{isLogin ? "Bem-vindo de volta" : "Crie sua conta"}</span>
            <h2>{isLogin ? "Entrar" : "Cadastrar-se"}</h2>
            <p>
              {isLogin
                ? "Use seu email e senha para acessar o workspace."
                : "Preencha os dados abaixo para começar a usar a plataforma."}
            </p>
          </div>

          {!isLogin && (
            <label>
              Nome:
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                placeholder="Seu nome completo"
              />
            </label>
          )}

          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="voce@empresa.com"
            />
          </label>

          <label>
            Senha:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </label>

          {!isLogin && (
            <label>
              Confirmação de senha:
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
                placeholder="Repita a senha"
              />
            </label>
          )}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={Style.changeModeButton}
          >
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={Style.changeModeButton}
          >
            {isLogin
              ? "Não tem conta? Criar conta"
              : "Já tem conta? Fazer login"}
          </button>

          <ButtonLoading 
            loading={loading} 
            text={isLogin ? "Login" : "Cadastrar-se"} 
          />
        </form>
      </div>
    </section>
  )
}
