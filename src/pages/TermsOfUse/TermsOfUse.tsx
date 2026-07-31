import { type MouseEvent, useEffect } from "react";
import { termsSections } from "./termsContent";
import styles from "./TermsOfUse.module.css";

export function TermsOfUse() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#termos-de-uso-${id}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p>Informações legais</p>
          <h1>Termos e Condições Gerais de Uso da Plataforma Veritas Hub</h1>
          <span>Última atualização: 28 de outubro de 2024</span>
        </header>

        <div className={styles.document}>
          <aside className={styles.index} aria-label="Índice dos termos de uso">
            <strong>Índice</strong>
            <nav>
              {termsSections.map((section) => (
                <a key={section.id} href={`#${section.id}`} onClick={(event) => scrollToSection(event, section.id)}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className={styles.content}>
            {termsSections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.blocks.map((block, index) => {
                  if (block.type === "heading") return <h3 key={index}>{block.text}</h3>;
                  if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
                  return <p key={index}>{block.text}</p>;
                })}
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
