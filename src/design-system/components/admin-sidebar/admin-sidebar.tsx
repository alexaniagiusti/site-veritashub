import logoVeritas from "../../../assets/logo-verde-veritas.svg";
import { Icon } from "../Icon/Icon";
import styles from "./admin-sidebar.module.css";
import type { AdminSidebarGroup, AdminSidebarProps, AdminSidebarUser } from "./admin-sidebar.types";

const defaultGroups: readonly AdminSidebarGroup[] = [
  { title: "CONTEÚDO", items: [{ label: "Artigos", icon: "file-list", href: "#admin-blog" }, { label: "Categorias", icon: "price-tag", href: "#admin-categories" }] },
  { title: "CONFIGURAÇÕES", items: [{ label: "Autores", icon: "file-list", href: "#admin-authors" }, { label: "Configurações", icon: "settings", href: "#admin-settings" }, { label: "Logout", icon: "logout", href: "/" }] },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

function getDefaultUser(): AdminSidebarUser {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      const user = JSON.parse(stored);
      return {
        initials: getInitials(user.nome || ''),
        name: user.nome || 'Usuário',
        role: user.cargo || 'Sem cargo'
      };
    } catch {
      return { initials: "AB", name: "Usuário", role: "Sem cargo" };
    }
  }
  return { initials: "AB", name: "Usuário", role: "Sem cargo" };
}

export function AdminSidebar({ activeItems = ["Artigos"], groups = defaultGroups, user, embedded = false, className, onLogout, ...props }: AdminSidebarProps) {
  const finalUser = user || getDefaultUser();

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    if (label === "Logout") {
      e.preventDefault();
      onLogout?.();
      window.location.assign("/");
    }
  };

  return (
    <aside {...props} className={`${styles.sidebar} ${embedded ? styles.embedded : ""} ${className ?? ""}`} aria-label="Menu administrativo">
      <div className={styles.sidebarLogo}><img src={logoVeritas} alt="VeritasHub" /></div>
      <nav className={styles.sidebarNav}>
        {groups.map((group) => <div className={styles.navGroup} key={group.title}><p>{group.title}</p><div className={styles.navItems}>{group.items.map((item) => <a aria-current={activeItems.includes(item.label) ? "page" : undefined} className={activeItems.includes(item.label) ? styles.activeNavItem : undefined} href={item.href} key={item.label} onClick={(e) => handleItemClick(e, item.label)}><Icon name={item.icon} size={24} /><span>{item.label}</span></a>)}</div></div>)}
      </nav>
      <div className={styles.userCard}><span aria-hidden="true" className={styles.userAvatar}>{finalUser.initials}</span><span><strong>{finalUser.name}</strong><small>{finalUser.role}</small></span></div>
    </aside>
  );
}
