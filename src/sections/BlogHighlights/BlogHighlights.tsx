import imgDestaqueBlog from "../../assets/img-destaque-blog.png";
import { Button } from "../../design-system/components/button";
import { usePosts } from "../../hooks/usePosts";
import type { Post } from "../../types";
import styles from "./BlogHighlights.module.css";

const getPublicationTime = (post: Post) => {
  const timestamp = Date.parse(post.publicadoEm || post.createdAt || "");

  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export function BlogHighlights() {
  const { data, isLoading } = usePosts(1, 100);
  const latestPosts = [...(data?.data ?? [])]
    .filter((post) => post.status === "PUBLISHED")
    .sort((first, second) => getPublicationTime(second) - getPublicationTime(first))
    .slice(0, 3);

  const openBlog = () => {
    window.location.hash = "#blog";
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

        <div className={styles.cards} aria-busy={isLoading || undefined}>
          {isLoading
            ? Array.from({ length: 3 }, (_, index) => (
                <div className={`${styles.card} ${styles.skeleton}`} key={index} aria-hidden="true">
                  <span className={styles.skeletonImage} />
                  <span className={styles.skeletonTitle} />
                </div>
              ))
            : latestPosts.map((post) => (
                <a className={styles.card} href={`#artigo-${post.id}`} key={post.id}>
                  <img
                    className={styles.articleImage}
                    src={post.capaUrl || imgDestaqueBlog}
                    alt={`Imagem de destaque do artigo ${post.titulo}`}
                  />
                  <h3>{post.titulo}</h3>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
}
