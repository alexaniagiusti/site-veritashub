import { useEffect } from "react";
import { privacySections } from "./privacyContent";
import styles from "./PrivacyPolicy.module.css";

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p>Informações legais</p>
          <h1>Política de Privacidade do Veritas Hub</h1>
          <span>Última atualização: 05 de junho de 2024</span>
        </header>

        <article className={styles.content}>
          {privacySections.map((section) => (
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
  );
}
