import { Icon } from "../../design-system/components/Icon/Icon";
import { ArticleCard } from "../../design-system/components/article-card";
import imgAcidente from "../../assets/img-acidente.png";
import imgDestaqueBlog from "../../assets/img-destaque-blog.png";
import imgHackeados from "../../assets/img-hackeados.png";
import styles from "./Blog.module.css";

const categories = ["Todos os Artigos", "Auxílio Acidente", "Hackeados", "Orientação Jurídica"];

const authors = {
  ana: {
    name: "Ana Beatriz Santos",
    role: "Advogada - Direito Trabalhista",
    initials: "AB",
  },
  ricardo: {
    name: "Ricardo Dias",
    role: "Advogado - Especialista em Direito Digital",
    initials: "RD",
  },
};

const posts = [
  {
    category: "HACKEADOS",
    title: "Conta hackeada: os primeiros passos para recuperar o acesso e proteger seus dados",
    image: imgAcidente,
    imageAlt: "Profissional analisando exame de raio-x",
    author: authors.ana,
  },
  {
    category: "HACKEADOS",
    title: "Seus dados vazaram? Saiba o que a LGPD garante e como ser indenizado",
    image: imgHackeados,
    imageAlt: "Pessoa preocupada diante de um computador com alerta de segurança",
    author: authors.ricardo,
  },
  {
    category: "HACKEADOS",
    title: "Conta hackeada: os primeiros passos para recuperar o acesso e proteger seus dados",
    image: imgAcidente,
    imageAlt: "Profissional analisando exame de raio-x",
    author: authors.ana,
  },
  {
    category: "HACKEADOS",
    title: "Seus dados vazaram? Saiba o que a LGPD garante e como ser indenizado",
    image: imgHackeados,
    imageAlt: "Pessoa preocupada diante de um computador com alerta de segurança",
    author: authors.ricardo,
  },
];

export function Blog() {
  return (
    <section className={styles.blogPage} aria-labelledby="blog-title">
      <div className={styles.container}>
        <h1 id="blog-title">BLOG VERITAS HUB</h1>

        <ArticleCard
          author={authors.ana}
          category="AUXÍLIO ACIDENTE"
          date="27 de junho de 2026"
          excerpt="Um acidente pode deixar qualquer pessoa desorientada. Mas conhecer seus direitos e agir rápido faz toda a diferença na hora de garantir o que é seu - da perícia ao seguro obrigatório."
          href="#artigo-destaque"
          imageAlt="Homem em atendimento médico recebendo orientação"
          imageSrc={imgDestaqueBlog}
          readingTime="5min de Leitura"
          title="Sofreu um acidente de trabalho? Saiba o que fazer nas primeiras 24 horas"
          variant="featured"
        />

        <nav className={styles.categoryNav} aria-label="Categorias do blog">
          {categories.map((category, index) => (
            <button className={index === 0 ? styles.activeCategory : undefined} key={category} type="button">
              {category}
            </button>
          ))}
        </nav>

        <div className={styles.postsGrid}>
          {posts.map((post, index) => (
            <article className={styles.postCard} key={`${post.title}-${index}`}>
              <img src={post.image} alt={post.imageAlt} />
              <div className={styles.postBody}>
                <p className={styles.postCategory}>{post.category}</p>
                <h2>{post.title}</h2>
                <span className={styles.divider} />
                <Author author={post.author} />
              </div>
            </article>
          ))}
        </div>

        <nav className={styles.pagination} aria-label="Paginação do blog">
          <button aria-label="Página anterior" type="button">
            <Icon name="arrow-left" size={24} />
          </button>
          {[1, 2, 3].map((page) => (
            <button aria-current={page === 1 ? "page" : undefined} key={page} type="button">
              {page}
            </button>
          ))}
          <button aria-label="Próxima página" type="button">
            <Icon name="arrow-right" size={24} />
          </button>
        </nav>
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
