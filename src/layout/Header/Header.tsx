import { Button, Icon, Menu } from "../../design-system";
import logoVeritas from "../../assets/logo-veritas-branca.svg";
import styles from "./Header.module.css";

type HeaderVariant = "light" | "dark";

type HeaderProps = {
  variant?: HeaderVariant;
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Serviços", href: "#servicos" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Blog", href: "#blog" },
  { label: "Rodapé", href: "#rodape" },
];

export function Header({ variant = "light" }: HeaderProps) {
  return (
    <header className={`${styles.header} ${styles[variant]}`}>
      <a className={styles.brand} href="#home" aria-label="VeritasHub Home">
        <img className={styles.brandLogo} src={logoVeritas} alt="" aria-hidden="true" />
      </a>

      <Menu
        activeHref="#home"
        ariaLabel="Navegação principal"
        className={styles.nav}
        items={navItems}
        tone={variant}
      />

      <Button
        className={styles.cta}
        iconLeft={<Icon name="whatsapp" size={16} />}
        onClick={() => {
          window.location.hash = "rodape";
        }}
        size="xs"
        variant="primary"
      >
        Fale conosco
      </Button>
    </header>
  );
}
