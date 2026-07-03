import logoVeritas from "../../assets/logo-verde-veritas.svg";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import styles from "./AdminBlog.module.css";

type ArticleStatus = "Publicado" | "Rascunho";
type ArticleCategory = "Auxílio Acidente" | "Hackeados";

type Article = {
  title: string;
  category: ArticleCategory;
  status: ArticleStatus;
  author: string;
};

const articles: Article[] = [
  {
    title: "Você sofreu um acidente? Descubra se tem direito ao Auxílio-Acidente",
    category: "Auxílio Acidente",
    status: "Publicado",
    author: "Design Lead",
  },
  {
    title: "Auxílio-Acidente: os 7 erros que fazem o INSS negar seu benefício",
    category: "Auxílio Acidente",
    status: "Publicado",
    author: "Design Lead",
  },
  {
    title: "Diferença entre Auxílio-Doença e Auxílio-Acidente",
    category: "Auxílio Acidente",
    status: "Publicado",
    author: "Design Lead",
  },
  {
    title: "Como solicitar o Auxílio-Acidente passo a passo",
    category: "Auxílio Acidente",
    status: "Publicado",
    author: "Design Lead",
  },
  {
    title: "Minha conta do Instagram foi hackeada. O que devo fazer?",
    category: "Hackeados",
    status: "Rascunho",
    author: "Design Lead",
  },
  {
    title: "Conta do WhatsApp clonada: quem responde pelos prejuízos?",
    category: "Hackeados",
    status: "Publicado",
    author: "Design Lead",
  },
  {
    title: "O que fazer nas primeiras 24 horas após um ataque hacker",
    category: "Hackeados",
    status: "Publicado",
    author: "Design Lead",
  },
  {
    title: "LGPD e vazamento de dados: quais são seus direitos?",
    category: "Hackeados",
    status: "Publicado",
    author: "Design Lead",
  },
  {
    title: "Meu benefício foi negado. O que fazer agora?",
    category: "Auxílio Acidente",
    status: "Rascunho",
    author: "Design Lead",
  },
  {
    title: "Quais documentos aumentam as chances de aprovação?",
    category: "Auxílio Acidente",
    status: "Publicado",
    author: "Design Lead",
  },
];

const sidebarGroups = [
  {
    title: "CONTEÚDO",
    items: [
      { label: "Artigos", icon: "file-list", href: "#admin-blog" },
      { label: "Categorias", icon: "price-tag", href: "#admin-blog" },
    ],
  },
  {
    title: "CONFIGURAÇÕES",
    items: [
      { label: "Autores", icon: "file-list", href: "#admin-authors" },
      { label: "Configurações", icon: "settings", href: "#admin-settings" },
      { label: "Logout", icon: "logout", href: "#login" },
    ],
  },
] as const;

export function AdminBlog() {
  return (
    <section className={styles.adminPage} aria-labelledby="admin-title">
      <AdminSidebar />

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <h1 id="admin-title">Artigos</h1>
          <Button
            className={styles.newArticleButton}
            iconLeft={<Icon name="add" size={24} />}
            onClick={() => {
              window.location.hash = "#admin-new-article";
            }}
            size="sm"
          >
            Novo Artigo
          </Button>
        </header>

        <main className={styles.content}>
          <section className={styles.tableCard} aria-labelledby="articles-title">
            <div className={styles.tableToolbar}>
              <h2 id="articles-title">Todos os artigos</h2>
              <label className={styles.searchField}>
                <Icon name="search" size={24} />
                <span className={styles.srOnly}>Buscar artigos</span>
                <input placeholder="Buscar Artigos..." type="search" />
              </label>
            </div>

            <ArticlesTable articles={articles} />
            <AdminPagination />
          </section>
        </main>

        <AdminFooter />
      </div>
    </section>
  );
}

type AdminSidebarProps = {
  activeItems?: readonly string[];
};

export function AdminSidebar({ activeItems = ["Artigos"] }: AdminSidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Menu administrativo">
      <div className={styles.sidebarLogo}>
        <img src={logoVeritas} alt="VeritasHub" />
      </div>

      <nav className={styles.sidebarNav}>
        {sidebarGroups.map((group) => (
          <div className={styles.navGroup} key={group.title}>
            <p>{group.title}</p>
            <div className={styles.navItems}>
              {group.items.map((item) => {
                const isActive = activeItems.includes(item.label);

                return (
                  <a className={isActive ? styles.activeNavItem : undefined} href={item.href} key={item.label}>
                    <Icon name={item.icon} size={24} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className={styles.userCard}>
        <span aria-hidden="true" className={styles.userAvatar}>
          AB
        </span>
        <span>
          <strong>Ana Beatriz Santos</strong>
          <small>Advogada - Direito Trabalhista</small>
        </span>
      </div>
    </aside>
  );
}

export function AdminFooter() {
  return (
    <footer className={styles.adminFooter}>
      <Icon name="copyright" size={24} />
      <span>Todos os direitos reservados - Veritas HUB 2026</span>
    </footer>
  );
}

function ArticlesTable({ articles }: { articles: Article[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.articlesTable}>
        <thead>
          <tr>
            <th>
              <div className={styles.titleCell}>
                <span className={styles.checkbox} aria-hidden="true" />
                <span>Título</span>
              </div>
            </th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.title}>
              <td>
                <div className={styles.titleCell}>
                  <span className={styles.checkbox} aria-hidden="true" />
                  <span className={styles.thumbnail} aria-hidden="true" />
                  <span className={styles.articleTitle}>{article.title}</span>
                </div>
              </td>
              <td>
                <CategoryBadge category={article.category} />
              </td>
              <td>
                <StatusBadge status={article.status} />
              </td>
              <td>{article.author}</td>
              <td>
                <div className={styles.rowActions}>
                  <button aria-label={`Editar: ${article.title}`} type="button">
                    <Icon name="edit" size={24} />
                  </button>
                  <button aria-label={`Excluir: ${article.title}`} type="button">
                    <Icon name="delete-bin" size={24} />
                  </button>
                  <button aria-label={`Mais ações: ${article.title}`} type="button">
                    <Icon name="more" size={24} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CategoryBadge({ category }: { category: ArticleCategory }) {
  const isAccident = category === "Auxílio Acidente";

  return <span className={`${styles.categoryBadge} ${isAccident ? styles.accidentBadge : styles.hackedBadge}`}>{category}</span>;
}

function StatusBadge({ status }: { status: ArticleStatus }) {
  return (
    <span className={`${styles.statusBadge} ${status === "Publicado" ? styles.publishedStatus : styles.draftStatus}`}>
      <span aria-hidden="true" />
      {status}
    </span>
  );
}

function AdminPagination() {
  return (
    <nav className={styles.pagination} aria-label="Paginação de artigos">
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
  );
}
