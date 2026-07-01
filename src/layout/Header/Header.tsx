import { type MouseEvent, useEffect, useState } from "react";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import logoVeritas from "../../assets/logo-veritas-branca.svg";
import logoVeritasGreen from "../../assets/logo-verde-veritas.svg";
import styles from "./Header.module.css";

type HeaderVariant = "light" | "dark";

type HeaderProps = {
  activeHref?: string;
  variant?: HeaderVariant;
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Serviços", href: "#servicos" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Blog", href: "#blog" },
  { label: "Rodapé", href: "#rodape" },
];

export function Header({ activeHref: controlledActiveHref, variant = "light" }: HeaderProps) {
  const [activeHref, setActiveHref] = useState(controlledActiveHref ?? "#home");
  const brandLogo = variant === "light" ? logoVeritasGreen : logoVeritas;

  useEffect(() => {
    if (controlledActiveHref) {
      setActiveHref(controlledActiveHref);
    }
  }, [controlledActiveHref]);

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
    setActiveHref(href);
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

      <nav className={styles.nav} aria-label="Navegação principal">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            data-active={activeHref === item.href}
            onClick={(event) => handleNavClick(event, item.href)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className={styles.loginLink} href="#login" onClick={(event) => handleNavClick(event, "#login")}>
        <Icon name="user" size={20} />
        <span>Login</span>
      </a>

      <Button
        className={styles.cta}
        iconLeft={<Icon name="whatsapp" size={16} />}
        onClick={() => {
          setActiveHref("#rodape");
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
