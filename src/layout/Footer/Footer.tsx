import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import logoVeritas from "../../assets/logo-veritas-branca.svg";
import styles from "./Footer.module.css";

const footerLinks = ["Home", "Quem Somos", "Time", "Contatos", "Blog"];
const legalLinks = ["Termos de Uso", "Política de privacidade"];

export function Footer() {
  return (
    <footer id="rodape" className={styles.footer}>
      <div className={styles.top}>
        <a className={styles.brand} href="#home" aria-label="VeritasHub Home">
          <img className={styles.brandLogo} src={logoVeritas} alt="" aria-hidden="true" />
        </a>

        <nav className={styles.links} aria-label="Links do rodapé">
          {footerLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`}>
              {link}
            </a>
          ))}
        </nav>

        <div className={styles.socialBlock}>
          <span>Acompanhe nas redes</span>
          <div className={styles.socialLinks} aria-label="Redes sociais">
            <a
              aria-label="Instagram"
              className={styles.socialButton}
              href="https://www.instagram.com/somosveritashub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="instagram" size={24} />
              <span className={styles.srOnly}>Instagram</span>
            </a>
            <a
              aria-label="YouTube"
              className={styles.socialButton}
              href="https://www.youtube.com/@veritashub.pro1"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="youtube" size={24} />
              <span className={styles.srOnly}>YouTube</span>
            </a>
            <button
              aria-label="Facebook"
              className={styles.socialButton}
              onClick={() => {
                window.location.hash = "facebook";
              }}
              type="button"
            >
              <Icon name="facebook" size={24} />
              <span className={styles.srOnly}>Facebook</span>
            </button>
          </div>
        </div>

        <Button
          aria-label="Voltar ao topo"
          className={styles.backTop}
          iconLeft={<Icon className={styles.backTopIcon} name="arrow-right" size={24} />}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          size="lg"
          variant="tertiary"
        >
          <span className={styles.srOnly}>Voltar ao topo</span>
        </Button>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 VeritasHub - Todos os direitos reservados. CNPJ: 27.307.965/0001-88</p>
        <nav className={styles.legal} aria-label="Links legais">
          {legalLinks.map((link) => (
            <a key={link} href="#rodape">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
