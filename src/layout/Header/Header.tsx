import { type MouseEvent, useEffect, useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeHref = controlledActiveHref ?? localActiveHref;
  const brandLogo = variant === "light" ? logoVeritasGreen : logoVeritas;

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const scrollPosition = window.scrollY;
    const originalBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyStyles.overflow;
      document.body.style.position = originalBodyStyles.position;
      document.body.style.top = originalBodyStyles.top;
      document.body.style.width = originalBodyStyles.width;
      window.scrollTo(0, scrollPosition);
    };
  }, [isMobileMenuOpen]);

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

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToSection(href));
      });
      return;
    }

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

      <div className={`${styles.controls} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
      <Menu
        activeHref={activeHref}
        ariaLabel="Navegação principal"
        className={styles.nav}
        items={navItems}
        onItemClick={(event, item) => handleNavClick(event, item.href)}
        tone={variant}
      />

      </div>

      <button
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        className={styles.mobileMenuButton}
        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        type="button"
      >
        <Icon name={isMobileMenuOpen ? "close" : "menu"} size={24} />
      </button>

      <div className={`${styles.mobileActions} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
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

              if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => scrollToSection("#rodape"));
                });
                return;
              }

              scrollToSection("#rodape");
            }}
        size="xs"
        variant="primary"
      >
        Fale conosco
      </Button>
      </div>
    </header>
  );
}
