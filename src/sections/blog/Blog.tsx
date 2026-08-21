import { useState } from "react";
import { Icon } from "../../design-system/components/Icon/Icon";
import { ArticleCard } from "../../design-system/components/article-card";
import { usePosts } from "../../hooks/usePosts";
import { useCategorias } from "../../hooks/useCategorias";
import imgDestaqueBlog from "../../assets/img-destaque-blog.png";
import styles from "./Blog.module.css";

export function Blog() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Todos os Artigos");
  
  const { data: postsData, isLoading: postsLoading } = usePosts(page, 8);
  const { data: categoriasData } = useCategorias(1, 100);

  const publishedPosts = postsData?.data.filter(post => post.status === "PUBLISHED") || [];
  const featuredPost = publishedPosts[0];

  const filteredPosts = selectedCategory === "Todos os Artigos" 
    ? publishedPosts 
    : publishedPosts.filter(post => post.categoria?.nome === selectedCategory);

  const categories = [
    "Todos os Artigos",
    ...(categoriasData?.data.map(cat => cat.nome) || [])
  ];

  const totalPages = Math.ceil((postsData?.total || 0) / 8);

  return (
    <section className={styles.blogPage} aria-labelledby="blog-title">
      <div className={styles.container}>
        <h1 id="blog-title">BLOG VERITAS HUB</h1>

        {featuredPost && (
          <ArticleCard
            author={{
              initials: featuredPost.autor?.nome?.split(' ').slice(0, 2).map((word: string) => word[0]).join('').toUpperCase() || 'AB',
              name: featuredPost.autor?.nome || "Autor",
              role: featuredPost.autor?.cargo || "Colaborador",
            }}
            category={featuredPost.categoria?.nome?.toUpperCase() || "SEM CATEGORIA"}
            date={new Date(featuredPost.createdAt || new Date()).toLocaleDateString("pt-BR", { year: 'numeric', month: 'long', day: 'numeric' })}
            excerpt={featuredPost.resumo || featuredPost.conteudo.substring(0, 150)}
            href={`#artigo-${featuredPost.id}`}
            imageAlt={featuredPost.titulo}
            imageSrc={featuredPost.capaUrl ||imgDestaqueBlog}
            readingTime="5min de Leitura"
            title={featuredPost.titulo}
            variant="featured"
          />
        )}

        <nav className={styles.categoryNav} aria-label="Categorias do blog">
          {categories.map((category) => (
            <button 
              className={selectedCategory === category ? styles.activeCategory : undefined} 
              key={category} 
              onClick={() => {
                setSelectedCategory(category);
                setPage(1);
              }}
              type="button"
            >
              {category}
            </button>
          ))}
        </nav>

        {postsLoading ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Carregando artigos...</p>
        ) : filteredPosts.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Nenhum artigo encontrado nesta categoria.</p>
        ) : (
          <>
            <div className={styles.postsGrid}>
              {filteredPosts.map((post) => (
                <article className={styles.postCard} key={post.id}>
                  <a className={styles.postLink} href={`#artigo-${post.id}`}>
                    <img src={post.capaUrl || imgDestaqueBlog} alt={post.titulo} />
                    <div className={styles.postBody}>
                      <p className={styles.postCategory}>{post.categoria?.nome?.toUpperCase() || "SEM CATEGORIA"}</p>
                      <h2>{post.titulo}</h2>
                      <span className={styles.divider} />
                      <Author author={{
                        initials: post.autor?.nome?.split(' ').slice(0, 2).map((word: string) => word[0]).join('').toUpperCase() || 'AB',
                        name: post.autor?.nome || "Autor",
                        role: post.autor?.cargo || "Colaborador",
                      }} />
                    </div>
                  </a>
                </article>
              ))}
            </div>

            <nav className={styles.pagination} aria-label="Paginação do blog">
              <button 
                aria-label="Página anterior" 
                disabled={page === 1}
                onClick={() => setPage(Math.max(1, page - 1))}
                type="button"
              >
                <Icon name="arrow-left" size={24} />
              </button>
              {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => (
                <button 
                  aria-current={page === i + 1 ? "page" : undefined} 
                  key={i + 1} 
                  onClick={() => setPage(i + 1)}
                  type="button"
                >
                  {i + 1}
                </button>
              ))}
              <button 
                aria-label="Próxima página" 
                disabled={page === totalPages}
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                type="button"
              >
                <Icon name="arrow-right" size={24} />
              </button>
            </nav>
          </>
        )}
      </div>
    </section>
  );
}

type AuthorProps = {
  author: {
    initials: string;
    name: string;
    role: string;
  };
  variant?: "dark" | "light";
};

function Author({ author, variant = "dark" }: AuthorProps) {
  return (
    <div className={`${styles.author} ${variant === "light" ? styles.authorLight : ""}`}>
      <span aria-hidden="true" className={styles.avatar}>
        {author.initials}
      </span>
      <span>
        <strong>{author.name}</strong>
        <small>{author.role}</small>
      </span>
    </div>
  );
}
