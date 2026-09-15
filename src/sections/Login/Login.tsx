import { useEffect, useState, type FormEvent } from "react";
import logoVeritas from "../../assets/logo-verde-veritas.svg";
import loginVideo from "../../assets/video-logo-v-atualizada.webm";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Login.module.css";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, loading, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) window.location.hash = "#admin-blog";
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email || !senha) {
      setErrorMessage("Email e senha são obrigzatórios");
      return;
    }

    try {
      await login({ email, senha });
      window.location.hash = "#admin-blog";
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erro ao fazer login";
      setErrorMessage(message);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.hash = "#home";
  };

  return (
    <section className={styles.loginPage} aria-labelledby="login-title">
      <div className={styles.formColumn}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <button className={styles.backButton} onClick={handleBack} type="button">
            <Icon name="arrow-left" size={20} />
            <span>Voltar</span>
          </button>

          <img className={styles.logo} src={logoVeritas} alt="VeritasHub" />

          <p id="login-title" className={styles.intro}>
            Insira suas credenciais para acessar sua conta
          </p>

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
              {errorMessage}
            </div>
          )}

          <label className={styles.field}>
            <span>E-mail</span>
            <span className={styles.inputShell}>
              <Icon className={styles.inputIcon} name="mail-open" size={24} />
              <input
                autoComplete="email"
                name="email"
                placeholder="Insira seu e-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </span>
          </label>

          <label className={styles.field}>
            <span>Senha</span>
            <span className={styles.inputShell}>
              <Icon className={styles.inputIcon} name="lock" size={24} />
              <input
                autoComplete="current-password"
                name="password"
                placeholder="******"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className={styles.passwordToggle}
                onClick={() => setShowPassword((current) => !current)}
                type="button"
              >
                <Icon name="eye" size={24} />
              </button>
            </span>
          </label>

          <label className={styles.remember}>
            <input name="remember" type="checkbox" />
            <span>Lembrar senha</span>
          </label>

          <Button
            className={styles.submitButton}
            fullWidth
            size="md"
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Login"}
          </Button>

          <a className={styles.forgotLink} href="#login">
            Esqueci minha senha
          </a>
        </form>
      </div>

      <div className={styles.visualPanel} aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.loginVideo}
          preload="auto"
        >
          <source src={loginVideo} type="video/webm" />
        </video>
      </div>
    </section>
  );
}
