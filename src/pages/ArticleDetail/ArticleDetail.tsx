import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Icon } from "../../design-system/components/Icon/Icon";
import { usePost } from "../../hooks/usePosts";
import { PostContent } from "../../components/PostContent/PostContent";
import styles from "./ArticleDetail.module.css";

type ArticleDetailProps = {
  articleId: string;
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export function ArticleDetail({ articleId }: ArticleDetailProps) {
  const { user } = useAuthContext();
  const { data: post, isLoading, isError } = usePost(articleId);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [articleId]);

  if (isLoading) {
    return <div className={styles.status}>Carregando artigo...</div>;
  }

  if (isError || !post || post.status !== "PUBLISHED") {
    return (
      <div className={styles.status}>
        <h1>Artigo não encontrado</h1>
        <p>Este conteúdo não está disponível ou ainda não foi publicado.</p>
        <a href="#blog">Voltar para o blog</a>
      </div>
    );
  }

  const authorName = user?.nome || post.autor?.nome || "Equipe Veritas Hub";
  const authorRole = user?.cargo || post.autor?.cargo || "Colaborador";
  const publishedAt = post.publicadoEm || post.createdAt;
  const publishedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Data não informada";
  const readingTime = Math.max(1, Math.ceil(stripHtml(post.conteudo).split(" ").length / 200));

  return (
    <article className={styles.page}>
      <header className={styles.articleHeader}>
        <a className={styles.backLink} href="#blog">Blog Veritas Hub</a>
        <span className={styles.category}>{post.categoria?.nome || "Artigo"}</span>
        <h1>{post.titulo}</h1>
        {post.resumo ? <p className={styles.summary}>{post.resumo}</p> : null}

        <div className={styles.meta}>
          <span>
            <Icon name="calendar" size={18} />
            <time>{publishedDate}</time>
          </span>
          <span>
            <Icon name="clock" size={18} />
            <span>{readingTime} min de leitura</span>
          </span>
        </div>
      </header>

      {post.capaUrl ? (
        <figure className={styles.cover}>
          <img src={post.capaUrl} alt={`Capa do artigo: ${post.titulo}`} />
        </figure>
      ) : (
        <div className={styles.coverMockup} role="img" aria-label="Artigo sem imagem de capa">
          <span className={styles.mockupIcon} aria-hidden="true" />
          <strong>Imagem de capa do artigo</strong>
          <small>Nenhuma imagem foi adicionada a esta publicação</small>
        </div>
      )}

      <PostContent html={post.conteudo} className={styles.articleBody} />

      <footer className={styles.articleFooter}>
        <span aria-hidden="true" className={styles.avatar}>{getInitials(authorName)}</span>
        <div>
          <small>Escrito por</small>
          <strong>{authorName}</strong>
          <p>{authorRole}</p>
        </div>
      </footer>
    </article>
  );
}
