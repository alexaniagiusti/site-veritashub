import { useState, useEffect } from "react";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import { Input } from "../../design-system/components/input";
import { AdminSidebar } from "../../design-system";
import { AdminFooter } from "../AdminBlog/AdminBlog";
import { useCategorias, useCreateCategoria, useDeleteCategoria, useUpdateCategoria, useCategoria } from "../../hooks/useCategorias";
import type { Categoria } from "../../types";
import adminStyles from "../AdminBlog/AdminBlog.module.css";
import styles from "./AdminCategories.module.css";

export function AdminCategories() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const hash = window.location.hash;
  const isEditMode = hash.startsWith("#admin-edit-category/");
  const editId = isEditMode ? hash.split("/")[1] : null;
  
  const { data, isLoading, error } = useCategorias(page, 10);
  const { mutate: deleteCategoria } = useDeleteCategoria();

  const handleDelete = (id: string | number) => {
    if (confirm("Tem certeza que deseja deletar esta categoria?")) {
      deleteCategoria(String(id));
    }
  };

  return (
    <section className={adminStyles.adminPage} aria-labelledby="categories-admin-title">
      <AdminSidebar activeItems={["Categorias"]} />

      <div className={adminStyles.workspace}>
        <header className={adminStyles.topbar}>
          <h1 id="categories-admin-title">Categorias</h1>
          <Button
            className={styles.addCategoryButton}
            iconLeft={<Icon name="add" size={24} />}
            onClick={() => setIsCategoryModalOpen(true)}
            size="sm"
          >
            Nova categoria
          </Button>
        </header>

        <main className={adminStyles.content}>
          <section className={`${adminStyles.tableCard} ${styles.categoriesCard}`} aria-labelledby="categories-title">
            <div className={adminStyles.tableToolbar}>
              <h2 id="categories-title">Listagem de categorias</h2>
            </div>

            {isLoading && <p>Carregando categorias...</p>}
            {error && <p style={{ color: "red" }}>Erro ao carregar categorias</p>}
            {data && <CategoriesTable categorias={data.data} onDelete={handleDelete} />}
            {data && <CategoriesPagination page={page} total={data.total} onPageChange={setPage} />}
          </section>
        </main>

        <AdminFooter />
      </div>

      {isCategoryModalOpen ? <AddCategoryModal onClose={() => setIsCategoryModalOpen(false)} /> : null}
      
      {isEditMode && editId ? (
        <EditCategoryModal 
          categoryId={editId}
          onClose={() => {
            window.location.hash = "#admin-categories";
          }} 
        />
      ) : null}
    </section>
  );
}

function CategoriesTable({ categorias, onDelete }: { categorias: Categoria[]; onDelete: (id: string | number) => void }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.categoriesTable}>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.nome}</td>
              <td>{categoria.descricao}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    aria-label={`Editar: ${categoria.nome}`} 
                    type="button"
                    onClick={() => {
                      window.location.hash = `#admin-edit-category/${categoria.id}`;
                    }}
                  >
                    <Icon name="edit" size={24} />
                  </button>
                  <button
                    aria-label={`Excluir: ${categoria.nome}`}
                    type="button"
                    onClick={() => onDelete(categoria.id)}
                  >
                    <Icon name="delete-bin" size={24} />
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

function CategoriesPagination({ page, total, onPageChange }: { page: number; total: number; onPageChange: (page: number) => void }) {
  const totalPages = Math.ceil(total / 10);

  return (
    <nav className={styles.pagination} aria-label="Paginação de categorias">
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
        disabled={page === totalPages || totalPages === 0}
      >
        <Icon name="arrow-right" size={24} />
      </button>
    </nav>
  );
}

function AddCategoryModal({ onClose }: { onClose: () => void }) {
  const [nome, setNome] = useState("");
  const { mutate: createCategoria, isPending } = useCreateCategoria();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      createCategoria(
        { nome },
        {
          onSuccess: () => {
            setNome("");
            onClose();
          },
        }
      );
    }
  };

  return (
    <div className={styles.modalOverlay} role="presentation">
      <section aria-labelledby="add-category-title" aria-modal="true" className={styles.categoryModal} role="dialog">
        <div className={styles.modalHeader}>
          <h2 id="add-category-title">Nova categoria</h2>
          <button aria-label="Fechar modal" className={styles.closeButton} onClick={onClose} type="button">
            <Icon name="close" size={24} />
          </button>
        </div>

        <form className={styles.categoryForm} onSubmit={handleSubmit}>
          <Input
            label="Nome da categoria"
            placeholder="Ex.: Direito Trabalhista"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <div className={styles.modalActions}>
            <Button className={styles.cancelButton} onClick={onClose} size="md" variant="secondary" type="button">
              Cancelar
            </Button>
            <Button className={styles.saveButton} size="md" type="submit" disabled={isPending}>
              {isPending ? "Criando..." : "Criar categoria"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

function EditCategoryModal({ categoryId, onClose }: { categoryId: string; onClose: () => void }) {
  const { data: categoria } = useCategoria(categoryId);
  const { mutate: updateCategoria, isPending } = useUpdateCategoria();
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome || "");
    }
  }, [categoria]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCategoria({
      id: categoryId,
      data: { nome },
    });
  };

  if (!categoria) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.categoryModal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>Editar Categoria</h2>
          <button 
            aria-label="Fechar modal"
            className={styles.closeButton} 
            onClick={onClose} 
            type="button"
          >
            <Icon name="close" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <label className={styles.modalField}>
            <span>Nome</span>
            <input 
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>

          <div className={styles.modalActions}>
            <Button 
              onClick={onClose} 
              size="md" 
              variant="secondary" 
              type="button"
              className={styles.cancelModalButton}
            >
              Cancelar
            </Button>
            <Button 
              size="md" 
              type="submit" 
              disabled={isPending}
              className={styles.saveCategoryButton}
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}