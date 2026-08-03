import { useState, useEffect } from "react";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import { AdminSidebar } from "../../design-system";
import { AdminFooter } from "../AdminBlog/AdminBlog";
import { useUsers, useDeleteUser, useCreateUser, useUpdateUser, useUser } from "../../hooks/useUsers";
import type { User } from "../../types";
import adminStyles from "../AdminBlog/AdminBlog.module.css";
import styles from "./AdminAuthors.module.css";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { AxiosError } from "axios";

type AuthorRole = "Administrador" | "Editor" | "Autor";
type AccountStatus = "Ativo" | "Inativo" | "Convidado" | "Suspenso";

export function AdminAuthors() {
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const hash = window.location.hash;
  const isEditMode = hash.startsWith("#admin-edit-author/");
  const editId = isEditMode ? hash.split("/")[1] : null;
  
  const { data, isLoading, error } = useUsers(page, 10);
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = (id: string | number) => {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      deleteUser(String(id));
    }
  };

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

            {isLoading && <p>Carregando usuários...</p>}
            {error && <p style={{ color: "red" }}>Erro ao carregar usuários</p>}
            {data && <AuthorsTable users={data.data} onDelete={handleDelete} />}
            {data && <AuthorsPagination page={page} total={data.total} onPageChange={setPage} />}
          </section>
        </main>

        <AdminFooter />
      </div>

      {isAuthorModalOpen ? <AddAuthorModal onClose={() => setIsAuthorModalOpen(false)} /> : null}
      
      {isEditMode && editId ? (
        <EditAuthorModal 
          userId={editId}
          onClose={() => {
            window.location.hash = "#admin-authors";
          }} 
        />
      ) : null}
    </section>
  );
}

function AddAuthorModal({ onClose }: { onClose: () => void }) {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState<AuthorRole>("Administrador");
  const [status, setStatus] = useState<AccountStatus>("Ativo");
  const [erros, setErros] = useState<string[]>([]);
  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErros([]);
    if (!nome.trim() || !cargo.trim() || !email.trim() || !senha.trim()) {
      setErros(["Preencha todos os campos"]);
      return;
    }

    const roleMap: Record<AuthorRole, 'ADMIN' | 'EDITOR' | 'AUTOR'> = {
      "Administrador": "ADMIN",
      "Editor": "EDITOR",
      "Autor": "AUTOR"
    };

    createUser(
      {
        nome,
        cargo,
        email,
        senha,
        role: roleMap[role],
        ativo: status === "Ativo"
      },
      {
        onSuccess: () => {
          setNome("");
          setCargo("");
          setEmail("");
          setSenha("");
          setRole("Administrador");
          setStatus("Ativo");
          onClose();
        },
        onError: (err) => {
          const message = err instanceof AxiosError ? err.response?.data?.message : null;
          setErros(message ? [message].flat() : ["Erro ao criar usuário"]);
        }
      }
    );
  };

  return (
    <ProtectedRoute>
      <div className={styles.modalOverlay} role="presentation">
        <section aria-labelledby="add-author-title" aria-modal="true" className={styles.authorModal} role="dialog">
          <div className={styles.modalHeader}>
            <h2 id="add-author-title">Adicionar Autor</h2>
            <button aria-label="Fechar modal" className={styles.closeButton} onClick={onClose} type="button">
              <Icon name="close" size={24} />
            </button>
          </div>

          <form className={styles.modalForm} onSubmit={handleSubmit}>
            {erros.length > 0 && (
              <ul role="alert" style={{ color: "red", margin: 0, paddingLeft: "1.25rem" }}>
                {erros.map((erro) => <li key={erro}>{erro}</li>)}
              </ul>
            )}
            <TextField label="Nome" placeholder="Nome do Autor" value={nome} onChange={(e) => setNome(e.target.value)} />
            <TextField helper="Exibido nos artigos" label="Cargo" placeholder="Ex: Editor" value={cargo} onChange={(e) => setCargo(e.target.value)} />
            <TextField helper="usado para login - não editável após criar" label="E-mail" placeholder="nome@veritashub.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Senha" placeholder="Mínimo 8 caracteres" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

            <SegmentedControl
              label="Papel de Acesso"
              onChange={(val) => setRole(val as AuthorRole)}
              options={["Administrador", "Editor", "Autor"] as const}
              value={role}
            />

            <SegmentedControl
              label="Status da Conta"
              onChange={(val) => setStatus(val as AccountStatus)}
              options={["Ativo", "Convidado", "Suspenso"] as const}
              value={status}
            />

            <div className={styles.modalActions}>
              <Button className={styles.cancelModalButton} onClick={onClose} size="md" variant="secondary" type="button">
                Cancelar
              </Button>
              <Button className={styles.saveAuthorButton} size="md" type="submit" disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar Autor"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </ProtectedRoute>
  );
}

function TextField({
  helper,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  helper?: string;
  label: string;
  placeholder: string;
  type?: "email" | "text" | "password";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className={styles.modalField}>
      <span>
        {label}
        {helper ? <small>{helper}</small> : null}
      </span>
      <input placeholder={placeholder} type={type} value={value} onChange={onChange} />
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

function AuthorsTable({ users, onDelete }: { users: User[]; onDelete: (id: string | number) => void }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.authorsTable}>
        <thead>
          <tr>
            <th>Autor</th>
            <th>Email</th>
            <th>Papel de Acesso</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.authorCell}>
                  <span className={styles.authorAvatar} aria-hidden="true" />
                  <span>
                    <strong>{user.nome}</strong>
                  </span>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <RoleBadge role={user.role} />
              </td>
              <td>
                <StatusBadge status={user.status ? "Ativo" : "Inativo"} />
              </td>
              <td>
                <div className={styles.rowActions}>
                  <button 
                    aria-label={`Editar autor: ${user.nome}`} 
                    type="button"
                    onClick={() => {
                      window.location.hash = `#admin-edit-author/${user.id}`;
                    }}
                  >
                    <Icon name="edit" size={24} />
                  </button>
                  <button
                    aria-label={`Excluir autor: ${user.nome}`}
                    type="button"
                    onClick={() => onDelete(user.id)}
                  >
                    <Icon name="delete-bin" size={24} />
                  </button>
                  <button aria-label={`Mais ações: ${user.nome}`} type="button">
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

function RoleBadge({ role }: { role: string }) {
  return <span className={styles.roleBadge}>{role}</span>;
}

function StatusBadge({ status }: { status: "Ativo" | "Inativo" }) {
  return (
    <span className={styles.statusBadge}>
      <span aria-hidden="true" />
      {status}
    </span>
  );
}

function AuthorsPagination({ page, total, onPageChange }: { page: number; total: number; onPageChange: (page: number) => void }) {
  const totalPages = Math.ceil(total / 10);

  return (
    <nav className={styles.pagination} aria-label="Paginação de autores">
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

function EditAuthorModal({ userId, onClose }: { userId: string; onClose: () => void }) {
  const { data: user } = useUser(userId);
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [role, setRole] = useState<AuthorRole>("Autor");
  const [status, setStatus] = useState<AccountStatus>("Ativo");

  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setCargo(user.cargo || "");
      setRole((user.role as AuthorRole) || "Autor");
      setStatus(user.status ? "Ativo" : "Inativo");
    }
  }, [user]);

  const roleMap: Record<AuthorRole, "ADMIN" | "EDITOR" | "AUTOR"> = {
    "Administrador": "ADMIN",
    "Editor": "EDITOR",
    "Autor": "AUTOR"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      id: userId,
      data: {
        nome,
        cargo,
        role: roleMap[role],
        ativo: status === "Ativo",
      },
    });
  };

  if (!user) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.authorModal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>Editar Autor</h2>
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

          <label className={styles.modalField}>
            <span>Cargo</span>
            <input 
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
          </label>

          <label className={styles.modalField}>
            <span>Papel</span>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value as AuthorRole)}
            >
              <option value="Administrador">Administrador</option>
              <option value="Editor">Editor</option>
              <option value="Autor">Autor</option>
            </select>
          </label>

          <label className={styles.modalField}>
            <span>Status</span>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value as AccountStatus)}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
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
              className={styles.saveAuthorButton}
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
