import { type MouseEvent, useState } from "react";
import { Button, Icon, Menu } from "../../design-system";
import logoVeritas from "../../assets/logo-veritas-branca.svg";
import logoVeritasGreen from "../../assets/logo-verde-veritas.svg";
import styles from "./Header.module.css";

type HeaderVariant = "light" | "dark";

type HeaderProps = {
  activeHref?: string;
  onActiveHrefChange?: (href: string) => void;
  variant?: HeaderVariant;
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Produtos", href: "#produtos" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Rodapé", href: "#rodape" },
  { label: "Blog", href: "#blog" },
];

export function Header({
  activeHref: controlledActiveHref,
  onActiveHrefChange,
  variant = "light",
}: HeaderProps) {
  const [localActiveHref, setLocalActiveHref] = useState("#home");
  const activeHref = controlledActiveHref ?? localActiveHref;
  const brandLogo = variant === "light" ? logoVeritasGreen : logoVeritas;

  const scrollToSection = (href: string) => {
    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      window.location.hash = href;
      return;
    }

    const headerOffset = document.querySelector("header")?.clientHeight ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.history.pushState(null, "", href);
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setLocalActiveHref(href);
    onActiveHrefChange?.(href);
    scrollToSection(href);
  };

  return (
    <header className={`${styles.header} ${styles[variant]}`}>
      <a
        className={styles.brand}
        href="#home"
        aria-label="VeritasHub Home"
        onClick={(event) => handleNavClick(event, "#home")}
      >
        <img className={styles.brandLogo} src={brandLogo} alt="" aria-hidden="true" />
      </a>

      <Menu
        activeHref={activeHref}
        ariaLabel="Navegação principal"
        className={styles.nav}
        items={navItems}
        onItemClick={(event, item) => handleNavClick(event, item.href)}
        tone={variant}
      />

      <a className={styles.loginLink} href="#login" onClick={(event) => handleNavClick(event, "#login")}>
        <Icon name="user" size={20} />
        <span>Login</span>
      </a>

      <Button
        className={styles.cta}
        iconLeft={<Icon name="whatsapp" size={16} />}
        onClick={() => {
          setLocalActiveHref("#rodape");
          onActiveHrefChange?.("#rodape");
          scrollToSection("#rodape");
        }}
        size="xs"
        variant="primary"
      >
        Fale conosco
      </Button>
    </header>
  );
}
