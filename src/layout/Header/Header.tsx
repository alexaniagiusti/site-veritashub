import { type MouseEvent, useEffect, useState } from "react";
import { Button, Icon, Menu } from "../../design-system";
import logoVeritas from "../../assets/logo-veritas-branca.svg";
import logoVeritasGreen from "../../assets/logo-verde-veritas.svg";
import { mainNavItems } from "../navigation";
import styles from "./Header.module.css";

type HeaderVariant = "light" | "dark";

type HeaderProps = {
  activeHref?: string;
  onActiveHrefChange?: (href: string) => void;
  trackActiveSection?: boolean;
  variant?: HeaderVariant;
};

export function Header({
  activeHref: controlledActiveHref,
  onActiveHrefChange,
  trackActiveSection = true,
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

  useEffect(() => {
    if (!trackActiveSection) {
      return;
    }

    let frameId = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const availableSections = mainNavItems
          .map((item) => ({ item, element: document.querySelector<HTMLElement>(item.href) }))
          .filter(
            (entry): entry is { item: (typeof mainNavItems)[number]; element: HTMLElement } =>
              entry.element !== null,
          );

        if (availableSections.length === 0) {
          return;
        }

        const triggerPosition = window.innerHeight * 0.35;
        let currentItem: (typeof mainNavItems)[number] | null = null;

        for (const entry of availableSections) {
          if (entry.element.getBoundingClientRect().top <= triggerPosition) {
            currentItem = entry.item;
          }
        }

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
          currentItem = availableSections[availableSections.length - 1].item;
        }

        if (currentItem && currentItem.href !== activeHref) {
          setLocalActiveHref(currentItem.href);
          onActiveHrefChange?.(currentItem.href);
        }
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [activeHref, onActiveHrefChange, trackActiveSection]);

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
        items={mainNavItems}
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
