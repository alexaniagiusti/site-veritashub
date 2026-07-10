import { ArticleCard, BlogSidebar, Button, Icon, Input, Menu, Tag, colors, radius, shadows, spacing, typography, type IconName } from "../../design-system";
import { Footer } from "../../layout/Footer";
import styles from "./Sandbox.module.css";

const colorGroups = Object.entries(colors);
const iconNames: IconName[] = ["instagram", "facebook", "whatsapp", "youtube", "menu", "close", "arrow-right", "arrow-left", "play", "pause"];
const typeSamples = [typography.display.d1, typography.heading.h1, typography.heading.h3, typography.heading.h5, typography.body18.regular, typography.body16.regular, typography.body14.regular, typography.body12.regular];
const menuItems = [{ label: "Home", href: "#menu-home" }, { label: "Serviços", href: "#menu-services" }, { label: "Quem somos", href: "#menu-about" }, { label: "Blog", href: "#menu-blog" }, { label: "Em breve", href: "#menu-disabled", disabled: true }];
const blogCategories = [{ label: "Todos os artigos", href: "#blog-all", count: 24, active: true }, { label: "Notícias", href: "#blog-news", count: 8 }, { label: "Segurança", href: "#blog-security", count: 6 }, { label: "Tecnologia", href: "#blog-tech", count: 7 }, { label: "Institucional", href: "#blog-company", count: 3 }];

export function Sandbox() {
  return (
    <main className={styles.sandbox}>
      <header className={styles.hero}>
        <a href="/" className={styles.back}>← Voltar ao site</a>
        <span className={styles.eyebrow}>Veritas Design System</span>
        <h1>Component sandbox</h1>
        <p>Uma visão viva dos tokens, componentes, estados e combinações disponíveis para o produto.</p>
      </header>

      <nav className={styles.nav} aria-label="Seções da sandbox">
        {['Fundações', 'Componentes', 'Blog'].map((item) => <a key={item} href={`#${item.toLowerCase().replace('ç', 'c').replace('õ', 'o')}`}>{item}</a>)}
      </nav>

      <div className={styles.groupHeader} id="fundacoes"><span>Fundamentos</span><h2>Fundações do sistema</h2><p>Decisões visuais primitivas compartilhadas por toda a interface.</p></div>
      <section className={styles.section} id="cores"><SectionTitle index="01" title="Cores" description="Paletas primitivas compartilhadas por todos os componentes." />
        {colorGroups.map(([group, palette]) => <div className={styles.palette} key={group}><h3>{group}</h3><div className={styles.swatches}>{Object.entries(palette).map(([name, value]) => <div className={styles.swatch} key={name}><span style={{ background: value }} /><small>{name}<br />{value}</small></div>)}</div></div>)}
      </section>

      <section className={styles.section} id="tipografia"><SectionTitle index="02" title="Tipografia" description="Escala tipográfica oficial em Poppins e Inter." />
        <div className={styles.typeList}>{typeSamples.map((sample, index) => <div className={styles.typeRow} key={index}><small>{sample.fontSize} / {sample.fontWeight}</small><p style={sample}>A verdade transforma.</p></div>)}</div>
      </section>

      <section className={styles.section} id="espacamento"><SectionTitle index="03" title="Espaçamento e elevação" description="Ritmo, raios e sombras definidos como tokens." />
        <div className={styles.tokenGrid}><div className={styles.tokenCard}><h3>Spacing</h3>{[4,8,12,16,24,32,48,64].map(value => <div className={styles.measure} key={value}><code>{value}</code><span style={{ width: spacing[value as keyof typeof spacing] }} /></div>)}</div><div className={styles.tokenCard}><h3>Radius</h3><div className={styles.radiusGrid}>{[4,8,16,24,32].map(value => <span key={value} style={{ borderRadius: radius[value as keyof typeof radius] }}>{value}px</span>)}</div></div><div className={styles.tokenCard}><h3>Shadows</h3>{Object.entries(shadows).map(([name, value]) => <span className={styles.shadow} key={name} style={{ boxShadow: value }}>{name}</span>)}</div></div>
      </section>

      <div className={styles.groupHeader} id="componentes"><span>Componentes globais</span><h2>Interface do produto</h2><p>Peças genéricas utilizadas em diferentes páginas e fluxos.</p></div>
      <section className={styles.section} id="botoes"><SectionTitle index="04" title="Button" description="Variantes, tamanhos e estados do componente de ação." />
        <Showcase>{(['primary','secondary','tertiary','danger'] as const).map(variant => <Button key={variant} variant={variant}>{variant}</Button>)}</Showcase>
        <Showcase>{(['xs','sm','md','lg'] as const).map(size => <Button key={size} size={size} iconRight={<Icon name="arrow-right" size={18} />}>{size}</Button>)}</Showcase>
        <Showcase><Button disabled>Disabled</Button><Button loading>Carregando</Button><Button variant="secondary" iconLeft={<Icon name="whatsapp" size={18} />}>Com ícone</Button></Showcase>
      </section>

      <section className={styles.section} id="inputs"><SectionTitle index="05" title="Input" description="Campos acessíveis com label, ajuda e estados semânticos." />
        <div className={styles.formGrid}><Input fullWidth label="Nome" placeholder="Digite seu nome" hint="Como devemos chamar você?" /><Input fullWidth label="E-mail" type="email" defaultValue="contato@veritas.com" status="success" hint="E-mail válido" /><Input fullWidth label="E-mail" defaultValue="email-invalido" error="Informe um e-mail válido" /><Input fullWidth label="Campo desabilitado" placeholder="Indisponível" disabled /></div>
      </section>

      <section className={styles.section} id="menu"><SectionTitle index="06" title="Menu" description="Navegação horizontal reutilizável com contraste, item ativo e estado desabilitado." />
        <div className={styles.menuShowcase}><span>Horizontal · light</span><Menu activeHref="#menu-home" items={menuItems} ariaLabel="Exemplo de menu claro" /></div>
        <div className={`${styles.menuShowcase} ${styles.menuDark}`}><span>Horizontal · dark</span><Menu activeHref="#menu-services" items={menuItems} tone="dark" ariaLabel="Exemplo de menu escuro" /></div>
      </section>

      <section className={`${styles.section} ${styles.footerSection}`} id="rodape"><SectionTitle index="07" title="Footer" description="Rodapé institucional utilizado nas páginas do site." />
        <div className={styles.footerPreview}><Footer /></div>
      </section>

      <section className={styles.section} id="icones"><SectionTitle index="08" title="Icon" description="Biblioteca encapsulada para manter tamanho e linguagem consistentes." />
        <div className={styles.icons}>{iconNames.map(name => <div key={name}><Icon name={name} size={24} /><small>{name}</small></div>)}</div>
      </section>

      <div className={`${styles.groupHeader} ${styles.blogHeader}`} id="blog"><span>Componentes editoriais</span><h2>Blog</h2><p>Peças específicas para organizar categorias e apresentar matérias, separadas dos componentes globais.</p></div>
      <section className={styles.section}><SectionTitle index="B01" title="Tag" description="Identificação semântica de editorias e assuntos." />
        <Showcase><Tag>Notícias</Tag><Tag tone="yellow">Segurança</Tag><Tag tone="blue">Tecnologia</Tag><Tag tone="neutral">Institucional</Tag></Showcase>
      </section>
      <section className={styles.section}><SectionTitle index="B02" title="Article card" description="Cartão de matéria alimentado por propriedades, disponível nos formatos padrão e destaque." />
        <div className={styles.featuredArticle}><ArticleCard href="#article-featured" variant="featured" category="Segurança" categoryTone="yellow" date="10 jul 2026" title="Como proteger seus dados em um mundo cada vez mais conectado" excerpt="Entenda os riscos mais comuns e as boas práticas que ajudam a manter suas informações seguras." /></div>
        <div className={styles.articleGrid}><ArticleCard href="#article-one" category="Notícias" date="08 jul 2026" title="Informação confiável quando ela mais importa" excerpt="A verificação dos fatos ajuda a tomar decisões melhores em momentos críticos." /><ArticleCard href="#article-two" category="Institucional" categoryTone="neutral" date="02 jul 2026" title="Conheça quem trabalha pela verdade todos os dias" excerpt="Pessoas, processos e tecnologia unidos para tornar a informação mais transparente." /></div>
      </section>
      <section className={styles.section}><SectionTitle index="B03" title="Blog sidebar" description="Navegação por categorias posicionada à esquerda da área de conteúdo." />
        <div className={styles.sidebarLayout}>
          <BlogSidebar categories={blogCategories} />
          <div className={styles.contentMockup} aria-hidden="true"><span>Área de conteúdo</span><i /><i /><i /></div>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ index, title, description }: { index: string; title: string; description: string }) { return <div className={styles.sectionTitle}><span>{index}</span><div><h2>{title}</h2><p>{description}</p></div></div>; }
function Showcase({ children }: { children: React.ReactNode }) { return <div className={styles.showcase}>{children}</div>; }
