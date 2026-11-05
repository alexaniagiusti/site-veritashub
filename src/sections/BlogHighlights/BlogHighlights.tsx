import traumaImage from "../../assets/blog-demo-traumatismos.png";
import cultureImage from "../../assets/blog-demo-cultura.png";
import workplaceImage from "../../assets/blog-demo-lugares.png";
import { Button } from "../../design-system/components/button";
import styles from "./BlogHighlights.module.css";

const demoPosts = [
  {
    title: "CID T07 - Traumatismos múltiplos não especificados",
    image: traumaImage,
    imageAlt: "Ilustração de um exame de raio-X sobre fundo verde",
  },
  {
    title: "Cultura organizacional ganha destaque em conteudo novo da Veritas Hub",
    image: cultureImage,
    imageAlt: "Ilustração de pessoas conectadas em círculo",
  },
  {
    title: "Lugares Incríveis para Trabalhar 2026.",
    image: workplaceImage,
    imageAlt: "Medalha com o símbolo da Veritas",
  },
];

export function BlogHighlights() {
  const openBlog = () => {
    window.location.hash = "#blog";
  };

  return (
    <section id="destaques-blog" className={styles.section} aria-labelledby="blog-highlights-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="blog-highlights-title">Destaques do blog Veritas</h2>
          <p>Conheça melhor a Veritas HUB com nossos conteúdos.</p>
          <Button onClick={openBlog} size="sm" variant="accent">
            Acessar o Blog
          </Button>
        </div>

        <div className={styles.cards}>
          {demoPosts.map((post) => (
            <article className={styles.card} key={post.title}>
              <img className={styles.articleImage} src={post.image} alt={post.imageAlt} loading="lazy" />
              <h3>{post.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
