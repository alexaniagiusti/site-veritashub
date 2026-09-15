import { useState } from "react";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import { Input } from "../../design-system/components/input";
import { AdminSidebar } from "../../design-system";
import { AdminFooter } from "../AdminBlog/AdminBlog";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdateProfile, useChangePassword } from "../../hooks/useProfile";
import type { User } from "../../types";
import adminStyles from "../AdminBlog/AdminBlog.module.css";
import styles from "./AdminSettings.module.css";

const settingsTabs = ["Meu perfil", "Senha", "Blog"] as const;
type SettingsTab = (typeof settingsTabs)[number];

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Meu perfil");
  const { user } = useAuthContext();

  return (
    <section className={adminStyles.adminPage} aria-labelledby="settings-admin-title">
      <AdminSidebar activeItems={["Configurações"]} />

      <div className={adminStyles.workspace}>
        <header className={adminStyles.topbar}>
          <h1 id="settings-admin-title">Ajustes</h1>
        </header>

        <main className={adminStyles.content}>
          <section className={`${adminStyles.tableCard} ${styles.settingsCard}`} aria-labelledby="settings-title">
            <div className={`${adminStyles.tableToolbar} ${styles.settingsToolbar}`}>
              <h2 id="settings-title">Configurações de perfil e senha</h2>
            </div>

            <div className={styles.settingsBody}>
              <nav className={styles.tabs} aria-label="Seções de configuração">
                {settingsTabs.map((tab) => (
                  <button
                    aria-current={activeTab === tab ? "page" : undefined}
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </nav>

              {activeTab === "Senha" ? <PasswordSettings /> : null}
              {activeTab === "Meu perfil" ? <ProfileSettings user={user} /> : null}
              {activeTab === "Blog" ? <BlogSettings /> : null}
            </div>
          </section>
        </main>

        <AdminFooter />
      </div>
    </section>
  );
}

function ProfileSettings({ user }: { user: User | null }) {
  const [nome, setNome] = useState(user?.nome || "");
  const [cargo, setCargo] = useState(user?.cargo || "");
  const { updateUser } = useAuthContext();
  const { mutate: updateProfile, isPending } = useUpdateProfile(updateUser);

  const isChanged = nome !== (user?.nome || "") || cargo !== (user?.cargo || "");

  const handleSave = () => {
    if (!nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }
    updateProfile({ nome, cargo });
  };

  return (
    <>
      <div className={styles.profileGrid}>
        <section className={styles.panel} aria-labelledby="profile-data-title">
          <h3 id="profile-data-title">Dados do Perfil</h3>

          <Input
            className={styles.settingsInput}
            label="Nome"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />
          <Input
            className={styles.settingsInput}
            helper="Exibido sob seu nome nos artigos"
            label="Cargo"
            onChange={(e) => setCargo(e.target.value)}
            value={cargo}
          />
          <Input
            className={styles.settingsInput}
            disabled
            helper="Usado para login, não pode ser alterado"
            label="E-mail"
            value={user?.email || "sem-email@example.com"}
          />
        </section>

        <section className={`${styles.panel} ${styles.avatarPanel}`} aria-labelledby="avatar-title">
          <h3 id="avatar-title">Foto do Avatar</h3>
          <div className={styles.avatarContent}>
            <div className={styles.avatarPreview} aria-hidden="true">
              {nome?.split(' ').slice(0, 2).map((word: string) => word[0]).join('').toUpperCase() || 'AB'}
            </div>
            <button className={styles.uploadButton} type="button">
              <Icon name="upload" size={24} />
              Enviar foto
            </button>
            <button className={styles.removeButton} type="button">
              Remover
            </button>
            <span>JPG, PNG até 2MB</span>
          </div>
        </section>
      </div>

      <div className={styles.saveRow}>
        <Button
          className={styles.saveButton}
          disabled={!isChanged || isPending}
          iconLeft={<Icon name="check" size={24} />}
          onClick={handleSave}
          size="md"
        >
          {isPending ? "Salvando..." : "Salvar Perfil"}
        </Button>
      </div>
    </>
  );
}

function PasswordSettings() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const { mutate: changePassword, isPending } = useChangePassword();

  const isValid = novaSenha.trim() && confirmarSenha.trim() && novaSenha === confirmarSenha && novaSenha.length >= 8;

  const handleSave = () => {
    if (!isValid) {
      alert("Preencha todos os campos corretamente");
      return;
    }
    changePassword({ novaSenha });
  };

  return (
    <>
      <section className={`${styles.panel} ${styles.passwordPanel}`} aria-labelledby="password-title">
        <h3 id="password-title">Alterar senha</h3>

        {/* <PasswordField
          label="Senha atual"
          onChange={(e) => setSenhaAtual(e.target.value)}
          value={senhaAtual}
        /> */}
        <PasswordField
          label="Nova senha"
          onChange={(e) => setNovaSenha(e.target.value)}
          placeholder="Mínimo 8 caracteres"
          value={novaSenha}
        />
        <PasswordField
          label="Confirmar nova senha"
          onChange={(e) => setConfirmarSenha(e.target.value)}
          placeholder="Repetir a nova senha"
          subtle
          value={confirmarSenha}
        />
      </section>

      <div className={styles.passwordSaveRow}>
        <Button
          className={styles.passwordSaveButton}
          disabled={!isValid || isPending}
          iconLeft={<Icon name="lock" size={24} />}
          onClick={handleSave}
          size="md"
        >
          {isPending ? "Atualizando..." : "Atualizar senha"}
        </Button>
      </div>
    </>
  );
}

function BlogSettings() {
  return (
    <>
      <section className={`${styles.panel} ${styles.blogPanel}`} aria-labelledby="blog-settings-title">
        <h3 id="blog-settings-title">Informações do Blog</h3>

        <ProfileField label="Nome do Blog" value="Blog Veritas Hub" />

        <label className={`${styles.field} ${styles.blogDescriptionField}`}>
          <span>
            Descrição
            <small>usada em SEO e meta tags</small>
          </span>
          <span className={styles.textareaShell}>
            <textarea
              defaultValue="Informação, orientação e soluções para quem precisa fazer valer seus direitos."
              maxLength={120}
            />
            <span className={styles.textareaFooter}>
              <small>0/120</small>
              <span aria-hidden="true" className={styles.resizeHandle} />
            </span>
          </span>
        </label>

        <label className={`${styles.field} ${styles.articlesPerPageField}`}>
          <span>Artigos por página</span>
          <select defaultValue="8 artigos">
            <option>8 artigos</option>
            <option>12 artigos</option>
            <option>16 artigos</option>
          </select>
        </label>
      </section>

      <div className={styles.blogSaveRow}>
        <Button className={styles.blogSaveButton} disabled iconLeft={<Icon name="check" size={24} />} size="md">
          Salvar ajustes
        </Button>
      </div>
    </>
  );
}

function PasswordField({
  label,
  onChange,
  placeholder,
  subtle = false,
  value,
}: {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  subtle?: boolean;
  value?: string;
}) {
  return (
    <Input
      className={`${styles.settingsInput} ${subtle ? styles.subtleInputField : ""}`}
      label={label}
      onChange={onChange}
      placeholder={placeholder}
      type="password"
      value={value}
    />
  );
}

function ProfileField({
  disabled = false,
  helper,
  label,
  value,
}: {
  disabled?: boolean;
  helper?: string;
  label: string;
  value: string;
}) {
  return (
    <Input className={styles.settingsInput} defaultValue={value} disabled={disabled} helper={helper} label={label} />
  );
}
