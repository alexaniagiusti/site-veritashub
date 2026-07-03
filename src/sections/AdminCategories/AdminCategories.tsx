import { useState } from "react";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import { Input } from "../../design-system/components/input";
import { AdminFooter, AdminSidebar } from "../AdminBlog/AdminBlog";
import adminStyles from "../AdminBlog/AdminBlog.module.css";
import styles from "./AdminCategories.module.css";

type Category = {
  color: string;
  name: string;
};

const categories: Category[] = [
  { name: "Auxílio Acidente", color: "#23E600" },
  { name: "Hackeados", color: "#FFD500" },
  { name: "Direito Trabalhista", color: "#1C98FF" },
  { name: "Previdenciário", color: "#DD4249" },
];

export function AdminCategories() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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

            <CategoriesTable categories={categories} />
          </section>
        </main>

        <AdminFooter />
      </div>

      {isCategoryModalOpen ? <AddCategoryModal onClose={() => setIsCategoryModalOpen(false)} /> : null}
    </section>
  );
}

function CategoriesTable({ categories }: { categories: Category[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.categoriesTable}>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Cor</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.name}>
              <td>{category.name}</td>
              <td>
                <span className={styles.colorPreview}>
                  <span aria-hidden="true" style={{ backgroundColor: category.color }} />
                  {category.color}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddCategoryModal({ onClose }: { onClose: () => void }) {
  const [selectedColor, setSelectedColor] = useState("#23E600");

  return (
    <div className={styles.modalOverlay} role="presentation">
      <section aria-labelledby="add-category-title" aria-modal="true" className={styles.categoryModal} role="dialog">
        <div className={styles.modalHeader}>
          <h2 id="add-category-title">Nova categoria</h2>
          <button aria-label="Fechar modal" className={styles.closeButton} onClick={onClose} type="button">
            <Icon name="close" size={24} />
          </button>
        </div>

        <form className={styles.categoryForm}>
          <Input label="Nome da categoria" placeholder="Ex.: Direito Trabalhista" />

          <label className={styles.colorField}>
            <span>Cor da categoria</span>
            <span className={styles.colorPicker}>
              <span aria-hidden="true" style={{ backgroundColor: selectedColor }} />
              <input
                aria-label="Escolher cor da categoria"
                onChange={(event) => setSelectedColor(event.target.value)}
                type="color"
                value={selectedColor}
              />
              <strong>{selectedColor}</strong>
            </span>
          </label>

          <div className={styles.modalActions}>
            <Button className={styles.cancelButton} onClick={onClose} size="md" variant="secondary">
              Cancelar
            </Button>
            <Button className={styles.saveButton} onClick={onClose} size="md">
              Criar categoria
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
