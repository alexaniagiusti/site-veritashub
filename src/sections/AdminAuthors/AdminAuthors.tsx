import { useState } from "react";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import { AdminSidebar } from "../../design-system";
import { AdminFooter } from "../AdminBlog/AdminBlog";
import adminStyles from "../AdminBlog/AdminBlog.module.css";
import styles from "./AdminAuthors.module.css";

type AuthorRole = "Administrador" | "Editor" | "Autor";
type AccountStatus = "Ativo" | "Convidado" | "Suspenso";

type Author = {
  name: string;
  email: string;
  position: string;
  role: AuthorRole;
  status: "Ativo";
};

const authors: Author[] = [
  {
    name: "Ana Beatriz Santos",
    email: "ana@veritashub.com",
    position: "Design Lead",
    role: "Administrador",
    status: "Ativo",
  },
  {
    name: "Mariana Costa",
    email: "mariana@veritashub.com",
    position: "Design Lead",
    role: "Editor",
    status: "Ativo",
  },
  {
    name: "Rafael Mendonça",
    email: "rafael@veritashub.com",
    position: "Design Lead",
    role: "Autor",
    status: "Ativo",
  },
  {
    name: "Carlos Eduardo Lima",
    email: "carlos@veritashub.com",
    position: "Design Lead",
    role: "Autor",
    status: "Ativo",
  },
];

export function AdminAuthors() {
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

  return (
    <section className={adminStyles.adminPage} aria-labelledby="authors-admin-title">
      <AdminSidebar activeItems={["Autores"]} />

      <div className={adminStyles.workspace}>
        <header className={adminStyles.topbar}>
          <h1 id="authors-admin-title">Autores</h1>
          <Button
            className={styles.addAuthorButton}
            iconLeft={<Icon name="add" size={24} />}
            onClick={() => setIsAuthorModalOpen(true)}
            size="sm"
          >
            Adicionar autor
          </Button>
        </header>

        <main className={adminStyles.content}>
          <section className={`${adminStyles.tableCard} ${styles.authorsCard}`} aria-labelledby="authors-title">
            <div className={adminStyles.tableToolbar}>
              <h2 id="authors-title">Autores e contas de acesso</h2>
              <label className={adminStyles.searchField}>
                <Icon name="search" size={24} />
                <span className={adminStyles.srOnly}>Buscar autores</span>
                <input placeholder="Buscar autores..." type="search" />
              </label>
            </div>

            <AuthorsTable authors={authors} />
            <AuthorsPagination />
          </section>
        </main>

        <AdminFooter />
      </div>

      {isAuthorModalOpen ? <AddAuthorModal onClose={() => setIsAuthorModalOpen(false)} /> : null}
    </section>
  );
}

function AddAuthorModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState<AuthorRole>("Administrador");
  const [status, setStatus] = useState<AccountStatus>("Ativo");

  return (
    <div className={styles.modalOverlay} role="presentation">
      <section aria-labelledby="add-author-title" aria-modal="true" className={styles.authorModal} role="dialog">
        <div className={styles.modalHeader}>
          <h2 id="add-author-title">Adicionar Autor</h2>
          <button aria-label="Fechar modal" className={styles.closeButton} onClick={onClose} type="button">
            <Icon name="close" size={24} />
          </button>
        </div>

        <form className={styles.modalForm}>
          <TextField label="Nome" placeholder="Nome do Autor" />
          <TextField helper="Exibido nos artigos" label="Cargo" placeholder="Nome do Autor" />
          <TextField helper="usado para login - não editável após criar" label="E-mail" placeholder="nome@veritashub.com" type="email" />

          <SegmentedControl
            label="Papel de Acesso"
            onChange={setRole}
            options={["Administrador", "Editor", "Autor"]}
            value={role}
          />

          <SegmentedControl
            label="Status da Conta"
            onChange={setStatus}
            options={["Ativo", "Convidado", "Suspenso"]}
            value={status}
          />

          <div className={styles.modalActions}>
            <Button className={styles.cancelModalButton} onClick={onClose} size="md" variant="secondary">
              Cancelar
            </Button>
            <Button className={styles.saveAuthorButton} onClick={onClose} size="md">
              Salvar Autor
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

function TextField({
  helper,
  label,
  placeholder,
  type = "text",
}: {
  helper?: string;
  label: string;
  placeholder: string;
  type?: "email" | "text";
}) {
  return (
    <label className={styles.modalField}>
      <span>
        {label}
        {helper ? <small>{helper}</small> : null}
      </span>
      <input placeholder={placeholder} type={type} />
    </label>
  );
}

function SegmentedControl<TValue extends string>({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: TValue) => void;
  options: readonly TValue[];
  value: TValue;
}) {
  return (
    <fieldset className={styles.segmentedField}>
      <legend>{label}</legend>
      <div className={styles.segmentedControl}>
        {options.map((option) => (
          <button
            aria-pressed={option === value}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function AuthorsTable({ authors }: { authors: Author[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.authorsTable}>
        <thead>
          <tr>
            <th>Autor</th>
            <th>Cargo</th>
            <th>Papel de Acesso</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.email}>
              <td>
                <div className={styles.authorCell}>
                  <span className={styles.authorAvatar} aria-hidden="true" />
                  <span>
                    <strong>{author.name}</strong>
                    <small>{author.email}</small>
                  </span>
                </div>
              </td>
              <td>{author.position}</td>
              <td>
                <RoleBadge role={author.role} />
              </td>
              <td>
                <StatusBadge status={author.status} />
              </td>
              <td>
                <div className={styles.rowActions}>
                  <button aria-label={`Editar autor: ${author.name}`} type="button">
                    <Icon name="edit" size={24} />
                  </button>
                  <button aria-label={`Excluir autor: ${author.name}`} type="button">
                    <Icon name="delete-bin" size={24} />
                  </button>
                  <button aria-label={`Mais ações: ${author.name}`} type="button">
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

function RoleBadge({ role }: { role: AuthorRole }) {
  return <span className={styles.roleBadge}>{role}</span>;
}

function StatusBadge({ status }: { status: Author["status"] }) {
  return (
    <span className={styles.statusBadge}>
      <span aria-hidden="true" />
      {status}
    </span>
  );
}

function AuthorsPagination() {
  return (
    <nav className={styles.pagination} aria-label="Paginação de autores">
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
