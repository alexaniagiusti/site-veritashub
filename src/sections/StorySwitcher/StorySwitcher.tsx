import { type CSSProperties, useEffect, useRef, useState } from "react";
import imgAcidente from "../../assets/img-acidente.png";
import imgHackeados from "../../assets/img-hackeados.png";
import logoVeritas from "../../assets/logo-verde-veritas.svg";
import styles from "./StorySwitcher.module.css";

const stories = [
  {
    label: "Auxílio Acidente",
    image: imgAcidente,
    imageAlt: "Homem com o braço imobilizado representando auxílio acidente",
    description: "Leia essa história sobre o auxílio acidente",
    letterTitle: "Auxílio-Acidente",
    letterQuote: "Eu achava que voltar a trabalhar significava que eu não tinha mais nenhum direito.",
    letterParagraphs: [
      "Meu nome é Marcos, tenho 46 anos e trabalho na área industrial há mais de 20 anos.",
      "Depois de um acidente no trabalho, fiquei afastado pelo INSS e, quando voltei, já não tinha a mesma força na mão direita. Passei a sentir dores e dificuldade para fazer tarefas que antes eram simples.",
      "Como eu tinha voltado a trabalhar, achei que o assunto estava encerrado.",
      "Foi através da Veritas Hub que descobri que poderia ter direito ao Auxílio-Acidente. Eu nem sabia que esse benefício existia.",
      "Hoje recebo um valor que ajuda nas despesas da minha família e tenho a sensação de que meus direitos foram respeitados.",
    ],
  },
  {
    label: "Hackeados",
    image: imgHackeados,
    imageAlt: "Pessoa utilizando computador representando caso de conta hackeada",
    description: "Leia essa história sobre clientes hackeados",
    letterTitle: "Conta hackeada",
    letterQuote: "Achei que tinha perdido anos de trabalho",
    letterParagraphs: [
      "Meu nome é Amanda e uso o Instagram para divulgar meu trabalho.",
      "Em uma manhã, tentei acessar minha conta e descobri que ela tinha sido hackeada. Mudaram meu e-mail, minha senha e perdi totalmente o acesso ao perfil.",
      "O desespero veio na hora. Não era apenas uma rede social, eram anos de conteúdo, clientes e oportunidades.",
      "Depois de várias tentativas sem sucesso, conheci a Veritas Hub. A equipe me orientou durante todo o processo e me ajudou a buscar a recuperação da conta.",
      "Hoje estou novamente com meu perfil e aprendi que, quando isso acontece, procurar ajuda especializada faz toda a diferença.",
    ],
    letterSignature: "Amanda, cliente Veritas Hub.",
  },
];

export function StorySwitcher() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [openLetterIndex, setOpenLetterIndex] = useState<number | null>(null);
  const activeIndex = progress >= 0.5 ? 1 : 0;
  const slideProgress = Math.min(progress * 2, 1);
  const secondStoryProgress = Math.min(Math.max((progress - 0.5) * 2, 0), 1);
  const openLetter = openLetterIndex === null ? null : stories[openLetterIndex];

  useEffect(() => {
    const section = sectionRef.current;
    let frameId = 0;

    if (!section) {
      return;
    }

    const updateProgress = () => {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
        const nextProgress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);

        setProgress(nextProgress);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (openLetterIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenLetterIndex(null);
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openLetterIndex]);

  const handleTabClick = (index: number) => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollableDistance = section.offsetHeight - window.innerHeight;

    const targetProgress = index === 0 ? 0 : 0.5;

    window.scrollTo({
      top: sectionTop + scrollableDistance * targetProgress,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} id="servicos" className={styles.section} aria-labelledby="story-title">
      <div className={styles.stickyPanel}>
        <div className={styles.switcher} aria-label="Histórias disponíveis">
          {stories.map((switcherStory, index) => (
            <button
              key={switcherStory.label}
              className={`${styles.switcherButton} ${activeIndex === index ? styles.activeButton : ""}`}
              onClick={() => handleTabClick(index)}
              type="button"
            >
              {switcherStory.label}
            </button>
          ))}
        </div>

        {stories.map((story, storyIndex) => {
          const isCoverSlide = storyIndex === 1;
          const translateY = isCoverSlide ? `${(1 - slideProgress) * 100}%` : "0%";

          return (
            <article
              key={story.label}
              className={`${styles.slide} ${isCoverSlide ? styles.coverSlide : ""}`}
              style={{ transform: `translateY(${translateY})` }}
              aria-hidden={activeIndex !== storyIndex}
            >
              <div className={styles.layout}>
                <figure className={styles.imageFrame}>
                  <img src={story.image} alt={story.imageAlt} />
                </figure>

                <div className={styles.copy}>
                  <img className={styles.storyLogo} src={logoVeritas} alt="Veritas Hub" />
                  <h2 id={storyIndex === 0 ? "story-title" : undefined}>{story.description}</h2>
                  <button
                    className={styles.storyCta}
                    onClick={() => setOpenLetterIndex(storyIndex)}
                    type="button"
                  >
                    Conheça a Veritas Hub
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        <div
          className={styles.progressTrack}
          aria-label="Progresso da história"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round(secondStoryProgress * 100)}
          role="progressbar"
          style={{ "--story-progress": `${secondStoryProgress * 100}%` } as CSSProperties}
        >
        </div>

        {openLetter && (
          <div
            className={styles.letterOverlay}
            role="presentation"
            onClick={() => setOpenLetterIndex(null)}
          >
            <div
              className={styles.letterDialog}
              aria-labelledby="story-letter-title"
              aria-modal="true"
              role="dialog"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className={styles.letterClose}
                onClick={() => setOpenLetterIndex(null)}
                type="button"
                aria-label="Fechar carta"
              >
                ×
              </button>

              <div className={styles.envelope} aria-hidden="true">
                <span className={styles.envelopeBack} />
                <span className={styles.envelopeFlap} />
                <span className={styles.envelopeFront} />
              </div>

              <article className={styles.letterPaper}>
                <p className={styles.letterEyebrow}>História Veritas Hub</p>
                <h3 id="story-letter-title">{openLetter.letterTitle}</h3>
                <strong>"{openLetter.letterQuote}"</strong>
                {openLetter.letterParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {openLetter.letterSignature && (
                  <p className={styles.letterSignature}>{openLetter.letterSignature}</p>
                )}
              </article>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
