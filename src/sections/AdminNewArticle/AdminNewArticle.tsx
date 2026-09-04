import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef, useState, type ChangeEvent } from "react";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import { AdminSidebar } from "../../design-system";
import { AdminFooter } from "../AdminBlog/AdminBlog";
import { useCreatePost } from "../../hooks/usePosts";
import { useCategorias } from "../../hooks/useCategorias";
import adminStyles from "../AdminBlog/AdminBlog.module.css";
import styles from "./AdminNewArticle.module.css";

const initialContent = "";

const toolbarGroups = [
  [
    { label: "Desfazer", icon: "undo", action: "undo" },
    { label: "Refazer", icon: "redo", action: "redo" },
  ],
  [
    { label: "Parágrafo", icon: "paragraph", action: "paragraph" },
    { label: "Título 1", icon: "heading-one", action: "heading-one" },
    { label: "Título 2", icon: "heading-two", action: "heading-two" },
  ],
  [
    { label: "Negrito", icon: "bold", action: "bold" },
    { label: "Itálico", icon: "italic", action: "italic" },
    { label: "Sublinhado", icon: "underline", action: "underline" },
    { label: "Tachado", icon: "strikethrough", action: "strike" },
  ],
  [
    { label: "Lista", icon: "list-unordered", action: "bullet-list" },
    { label: "Lista numerada", icon: "list-ordered", action: "ordered-list" },
  ],
  [
    { label: "Alinhar à esquerda", icon: "align-left", action: "align-left" },
    { label: "Centralizar", icon: "align-center", action: "align-center" },
    { label: "Alinhar à direita", icon: "align-right", action: "align-right" },
    { label: "Justificar", icon: "align-justify", action: "align-justify" },
  ],
  [
    { label: "Inserir link", icon: "link", action: "link" },
    { label: "Inserir imagem", icon: "image-add", action: "image" },
  ],
] as const;

type ToolbarAction = (typeof toolbarGroups)[number][number]["action"];

export function AdminNewArticle() {
  const editorImageInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const [wordCount, setWordCount] = useState(() => countWords(stripHtml(initialContent)));
  const [description, setDescription] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoriaId, setCategoriaId] = useState<string>("");
  const [publicationMode, setPublicationMode] = useState<"publish" | "draft">("publish");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const { mutate: createPost, isPending } = useCreatePost();
  const { data: categoriasData } = useCategorias(1, 100);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Escreva o conteúdo do artigo...",
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: styles.proseMirror,
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      setWordCount(countWords(currentEditor.getText()));
    },
  });

  const descriptionCount = description.length;
  const primaryActionLabel = publicationMode === "publish" ? "Publicar" : "Salvar Rascunho";

  const handlePublish = () => {
    if (!titulo.trim() || !editor?.getText().trim() || !categoriaId) {
      alert("Preencha título, conteúdo e categoria");
      return;
    }

    createPost({
      titulo,
      conteudo: editor.getHTML(),
      categoriaId: parseInt(categoriaId, 10),
      resumo:description,
      status: publicationMode === "publish" ? "PUBLISHED" : "DRAFT",
      capaUrl: coverPreview || undefined,
    });
  };

  const insertEditorImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !editor) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const src = String(reader.result);
      editor.chain().focus().setImage({ src, alt: file.name }).run();
      event.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  const handleCoverImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setCoverPreview(String(reader.result));
      event.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  const removeCoverImage = () => {
    setCoverPreview(null);

    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
  };

  return (
    <section className={adminStyles.adminPage} aria-labelledby="new-article-title">
      <AdminSidebar />

      <div className={adminStyles.workspace}>
        <header className={`${adminStyles.topbar} ${styles.newArticleTopbar}`}>
          <h1 id="new-article-title">Novo Artigo</h1>
          <div className={styles.topbarActions}>
            <Button
              className={styles.cancelButton}
              onClick={() => {
                window.location.hash = "#admin-blog";
              }}
              size="sm"
              variant="secondary"
            >
              Cancelar
            </Button>
            <Button
              className={styles.publishButton}
              iconLeft={<Icon name="check" size={24} />}
              size="sm"
              onClick={handlePublish}
              disabled={isPending}
            >
              {isPending ? "Salvando..." : primaryActionLabel}
            </Button>
          </div>
        </header>

        <main className={`${adminStyles.content} ${styles.newArticleContent}`}>
          <section className={styles.formCard}>
            <div className={styles.formGrid}>
              <div className={styles.mainFields}>
                <label className={styles.field}>
                  <span>
                    Título do Artigo <strong>*</strong>
                  </span>
                  <input
                    placeholder="Insira aqui o título do seu artigo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </label>

                <label className={styles.field}>
                  <span>
                    Descrição <strong>*</strong>
                    <small aria-hidden="true">i</small>
                  </span>
                  <span className={styles.textareaShell}>
                    <textarea
                      maxLength={120}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Uma breve descrição sobre seu artigo..."
                      value={description}
                    />
                    <em>{descriptionCount}/120</em>
                  </span>
                </label>

                <div className={styles.editorBlock}>
                  <p>Conteúdo</p>
                  <div className={styles.editorShell}>
                    <div className={styles.editorToolbar} aria-label="Ferramentas do editor">
                      {toolbarGroups.map((group) => (
                        <div className={styles.toolbarGroup} key={group.map((item) => item.action).join("-")}>
                          {group.map((item) => {
                            const disabled = !editor || !canRunToolbarAction(item.action, editor);

                            return (
                              <button
                                aria-label={item.label}
                                aria-pressed={isToolbarActionActive(item.action, editor)}
                                className={isToolbarActionActive(item.action, editor) ? styles.activeToolbarButton : undefined}
                                disabled={disabled}
                                key={item.action}
                                onClick={() => {
                                  if (item.action === "image") {
                                    editorImageInputRef.current?.click();
                                    return;
                                  }

                                  runToolbarAction(item.action, editor);
                                }}
                                title={item.label}
                                type="button"
                              >
                                <Icon name={item.icon} size={24} />
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    <input
                      accept="image/*"
                      className={styles.hiddenFileInput}
                      onChange={insertEditorImage}
                      ref={editorImageInputRef}
                      type="file"
                    />
                    <EditorContent className={styles.editorContent} editor={editor} />
                    <div className={styles.editorFooter}>
                      <span>{wordCount} words</span>
                      <span aria-hidden="true" className={styles.resizeHandle} />
                    </div>
                  </div>
                </div>
              </div>

              <aside className={styles.sidePanel} aria-label="Configurações do artigo">
                <section className={styles.panelCard}>
                  <h2>Publicação:</h2>
                  <label className={`${styles.radioOption} ${publicationMode === "publish" ? styles.selectedOption : ""}`}>
                    <input
                      checked={publicationMode === "publish"}
                      name="publication"
                      onChange={() => setPublicationMode("publish")}
                      type="radio"
                    />
                    <span>Publicar agora</span>
                  </label>
                  <label className={`${styles.radioOption} ${publicationMode === "draft" ? styles.selectedOption : ""}`}>
                    <input
                      checked={publicationMode === "draft"}
                      name="publication"
                      onChange={() => setPublicationMode("draft")}
                      type="radio"
                    />
                    <span>Salvar Rascunho</span>
                  </label>
                </section>

                <section className={styles.panelCard}>
                  <h2>Categoria:</h2>
                  <div className={styles.categoryControls}>
                    <select
                      value={categoriaId}
                      onChange={(e) => setCategoriaId(e.target.value)}
                    >
                      <option value="">Selecione uma categoria</option>
                      {categoriasData?.data.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </section>

                <section className={`${styles.panelCard} ${styles.coverCard}`}>
                  <h2>Imagem de capa:</h2>
                  <p className={styles.uploadHint}>Tamanho máximo permitido: 50 MB.</p>
                  <div className={styles.uploadControl}>
                    <label className={styles.uploadBox}>
                      {coverPreview ? (
                        <img alt="Prévia da imagem de capa" src={coverPreview} />
                      ) : (
                        <>
                          <Icon name="image-add" size={24} />
                          <span>Clique para enviar ou arraste uma imagem aqui</span>
                        </>
                      )}
                      <input accept="image/*" onChange={handleCoverImage} ref={coverImageInputRef} type="file" />
                    </label>
                    {coverPreview ? (
                      <button className={styles.removeCoverButton} onClick={removeCoverImage} type="button">
                        <Icon name="delete-bin" size={18} />
                        Remover imagem
                      </button>
                    ) : null}
                  </div>
                </section>
              </aside>
            </div>
          </section>
        </main>

        <AdminFooter />
      </div>
    </section>
  );
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ");
}

function runToolbarAction(action: ToolbarAction, editor: ReturnType<typeof useEditor>) {
  if (!editor || !canRunToolbarAction(action, editor)) {
    return;
  }

  const chain = editor.chain().focus();

  switch (action) {
    case "undo":
      chain.undo().run();
      break;
    case "redo":
      chain.redo().run();
      break;
    case "paragraph":
      chain.setParagraph().run();
      break;
    case "heading-one":
      chain.toggleHeading({ level: 1 }).run();
      break;
    case "heading-two":
      chain.toggleHeading({ level: 2 }).run();
      break;
    case "bold":
      chain.toggleBold().run();
      break;
    case "italic":
      chain.toggleItalic().run();
      break;
    case "underline":
      chain.toggleUnderline().run();
      break;
    case "strike":
      chain.toggleStrike().run();
      break;
    case "bullet-list":
      chain.toggleBulletList().run();
      break;
    case "ordered-list":
      chain.toggleOrderedList().run();
      break;
    case "align-left":
      chain.setTextAlign("left").run();
      break;
    case "align-center":
      chain.setTextAlign("center").run();
      break;
    case "align-right":
      chain.setTextAlign("right").run();
      break;
    case "align-justify":
      chain.setTextAlign("justify").run();
      break;
    case "link": {
      const previousUrl = editor.getAttributes("link").href as string | undefined;
      const url = window.prompt("Informe a URL do link", previousUrl ?? "https://");

      if (url === null) {
        return;
      }

      if (url.trim() === "") {
        chain.unsetLink().run();
        return;
      }

      chain.setLink({ href: url }).run();
      break;
    }
    case "image":
      break;
  }
}

function canRunToolbarAction(action: ToolbarAction, editor: ReturnType<typeof useEditor>) {
  if (!editor) {
    return false;
  }

  if (action === "undo") {
    return editor.can().undo();
  }

  if (action === "redo") {
    return editor.can().redo();
  }

  return true;
}

function isToolbarActionActive(action: ToolbarAction, editor: ReturnType<typeof useEditor>) {
  if (!editor) {
    return false;
  }

  switch (action) {
    case "bold":
      return editor.isActive("bold");
    case "italic":
      return editor.isActive("italic");
    case "underline":
      return editor.isActive("underline");
    case "strike":
      return editor.isActive("strike");
    case "bullet-list":
      return editor.isActive("bulletList");
    case "ordered-list":
      return editor.isActive("orderedList");
    case "heading-one":
      return editor.isActive("heading", { level: 1 });
    case "heading-two":
      return editor.isActive("heading", { level: 2 });
    case "paragraph":
      return editor.isActive("paragraph");
    case "align-left":
      return editor.isActive({ textAlign: "left" });
    case "align-center":
      return editor.isActive({ textAlign: "center" });
    case "align-right":
      return editor.isActive({ textAlign: "right" });
    case "align-justify":
      return editor.isActive({ textAlign: "justify" });
    default:
      return false;
  }
}
