import { Button } from "../../design-system/components/button";
import styles from "./BlogHighlights.module.css";

const highlights = [
  "Aqui fica o título do artigo em destaque",
  "Aqui fica o título do artigo em destaque",
  "Aqui fica o título do artigo em destaque",
];

export function BlogHighlights() {
  const openBlog = () => {
    window.location.hash = "blog";
  };

  return (
    <section className={styles.section} aria-labelledby="blog-highlights-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="blog-highlights-title">Destaques do blog Veritas</h2>
          <p>Conheça melhor a Veritas HUB com nossos conteúdos.</p>
          <Button onClick={openBlog} size="sm" variant="tertiary">
            Acessar o Blog
          </Button>
        </div>

        <div className={styles.cards}>
          {highlights.map((title, index) => (
            <a className={styles.card} href="#blog" key={index}>
              <div className={styles.imagePlaceholder} aria-hidden="true">
                <svg viewBox="0 0 48 48" role="img">
                  <path d="M8 10h32v28H8zM8 31l9-9 7 7 5-5 11 11M31 18h.01" />
                </svg>
                <span>Imagem do artigo</span>
              </div>
              <h3>{title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
