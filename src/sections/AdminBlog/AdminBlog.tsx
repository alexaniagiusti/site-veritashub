import { useState } from "react";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import { AdminSidebar } from "../../design-system/components/admin-sidebar";
import { usePosts, useDeletePost } from "../../hooks/usePosts";
import type { Post } from "../../types";
import styles from "./AdminBlog.module.css";
import { useAuth } from "../../hooks/useAuth";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export function AdminBlog() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = usePosts(page, 10);
  const { mutate: deletePost } = useDeletePost();
  const { logout } = useAuth();

  const handleDelete = (id: string | number) => {
    if (confirm("Tem certeza que deseja deletar este artigo?")) {
      deletePost(String(id));
    }
  };

  return (
    <ProtectedRoute>
      <section className={styles.adminPage} aria-labelledby="admin-title">

        <AdminSidebar onLogout={logout} />

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

              {isLoading && <p>Carregando artigos...</p>}
              {error && <p style={{ color: "red" }}>Erro ao carregar artigos</p>}
              {data && <ArticlesTable posts={data.data} onDelete={handleDelete} />}
              {data && <AdminPagination page={page} total={data.total} onPageChange={setPage} />}
            </section>
          </main>

          <AdminFooter />
        </div>
      </section>
    </ProtectedRoute>
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

function ArticlesTable({ posts, onDelete }: { posts: Post[]; onDelete: (id: string | number) => void }) {
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
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <div className={styles.titleCell}>
                  <span className={styles.checkbox} aria-hidden="true" />
                  {post.capaUrl ? (
                    <img
                      className={styles.thumbnail}
                      src={post.capaUrl}
                      alt=""
                      aria-hidden="true"
                    />
                  ) : (
                    <span className={styles.thumbnailFallback} aria-hidden="true" />
                  )}
                  <span className={styles.articleTitle}>{post.titulo}</span>
                </div>
              </td>
              <td>
                <CategoryBadge category={post.categoria?.nome || "Sem categoria"} />
              </td>
              <td>
                <StatusBadge status={post.status === "PUBLISHED" ? "Publicado" : "Rascunho"} />
              </td>
              <td>
                {post.createdAt 
                  ? new Date(post.createdAt).toLocaleDateString("pt-BR") 
                  : "-"}
              </td>
              <td>
                <div className={styles.rowActions}>
                  <button
                    aria-label={`Editar: ${post.titulo}`}
                    type="button"
                    onClick={() => {
                      window.location.hash = `#admin-edit-article/${post.id}`;
                    }}
                  >
                    <Icon name="edit" size={24} />
                  </button>
                  <button
                    aria-label={`Excluir: ${post.titulo}`}
                    type="button"
                    onClick={() => onDelete(post.id)}
                  >
                    <Icon name="delete-bin" size={24} />
                  </button>
                  <button aria-label={`Mais ações: ${post.titulo}`} type="button">
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

function CategoryBadge({ category }: { category: string }) {
  const isAccident = category.includes("Acidente");

  return <span className={`${styles.categoryBadge} ${isAccident ? styles.accidentBadge : styles.hackedBadge}`}>{category}</span>;
}

function StatusBadge({ status }: { status: "Publicado" | "Rascunho" }) {
  return (
    <span className={`${styles.statusBadge} ${status === "Publicado" ? styles.publishedStatus : styles.draftStatus}`}>
      <span aria-hidden="true" />
      {status}
    </span>
  );
}

function AdminPagination({ page, total, onPageChange }: { page: number; total: number; onPageChange: (page: number) => void }) {
  const totalPages = Math.ceil(total / 10);

  return (
    <nav className={styles.pagination} aria-label="Paginação de artigos">
      <button
        aria-label="Página anterior"
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        <Icon name="arrow-left" size={24} />
      </button>
      {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => (
        <button
          aria-current={page === i + 1 ? "page" : undefined}
          key={i + 1}
          type="button"
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        aria-label="Próxima página"
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        <Icon name="arrow-right" size={24} />
      </button>
    </nav>
  );
}
