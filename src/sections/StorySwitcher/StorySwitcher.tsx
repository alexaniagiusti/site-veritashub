import { type CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import imgAuxilioAcidente from "../../assets/img-auxilioacidente.jpeg";
import imgHackeados from "../../assets/img-hackeados.jpeg";
import videoAuxilioAcidente from "../../assets/video-auxilioacidente.webm";
import videoHackeados from "../../assets/videohackeados.webm";
import { Icon } from "../../design-system";
import styles from "./StorySwitcher.module.css";

const stories = [
  {
    label: "Auxílio Acidente",
    image: imgAuxilioAcidente,
    video: videoAuxilioAcidente,
    imageAlt: "Homem com o braço imobilizado representando auxílio acidente",
    quote: '"Eu não sabia que tinha direito ao auxílio acidente. A Veritas Hub analisou meu caso, explicou o processo e cuidou de tudo. Hoje recebo um benefício que fez muita diferença para minha família."',
    description: "João Ferreira, beneficiário do Auxílio Acidente, conta como a Veritas Hub ajudou a garantir seu direito.",
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
    video: videoHackeados,
    imageAlt: "Pessoa utilizando computador representando caso de conta hackeada",
    quote: '"Quando percebi que minhas contas tinham sido invadidas, entrei em desespero. A Veritas Hub assumiu o caso rapidamente e conseguiu recuperar meus acessos. Hoje me sinto muito mais seguro."',
    description: "Letícia Souza, cliente da Veritas Hub, compartilha como recuperou o controle de suas contas após um ataque hacker.",
    letterTitle: "Conta hackeada",
    letterQuote: "Achei que tinha perdido anos de trabalho",
    letterParagraphs: [
      "Meu nome é Letícia e uso o Instagram para divulgar meu trabalho.",
      "Em uma manhã, tentei acessar minha conta e descobri que ela tinha sido hackeada. Mudaram meu e-mail, minha senha e perdi totalmente o acesso ao perfil.",
      "O desespero veio na hora. Não era apenas uma rede social, eram anos de conteúdo, clientes e oportunidades.",
      "Depois de várias tentativas sem sucesso, conheci a Veritas Hub. A equipe me orientou durante todo o processo e me ajudou a buscar a recuperação da conta.",
      "Hoje estou novamente com meu perfil e aprendi que, quando isso acontece, procurar ajuda especializada faz toda a diferença.",
    ],
    letterSignature: "Letícia, cliente Veritas Hub.",
  },
];

const transitionStart = 0.2;
const transitionEnd = 0.7;

export function StorySwitcher() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [openLetterIndex, setOpenLetterIndex] = useState<number | null>(null);
  const slideProgress = Math.min(
    Math.max((progress - transitionStart) / (transitionEnd - transitionStart), 0),
    1,
  );
  const activeIndex = slideProgress >= 0.5 ? 1 : 0;
  const secondStoryProgress = Math.min(
    Math.max((progress - transitionEnd) / (1 - transitionEnd), 0),
    1,
  );
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

    const targetProgress = index === 0 ? 0 : transitionEnd;

    window.scrollTo({
      top: sectionTop + scrollableDistance * targetProgress,
      behavior: "smooth",
    });
  };

  const isVideoModal = openLetterIndex === 0;
  const modalTitleId = isVideoModal ? "story-video-title" : "story-letter-title";

  const storyModal = openLetter ? (
    <div
      className={styles.letterOverlay}
      role="presentation"
      onClick={() => setOpenLetterIndex(null)}
    >
      <div
        className={`${styles.letterDialog} ${isVideoModal ? styles.videoDialog : ""}`}
        aria-labelledby={modalTitleId}
        aria-modal="true"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.letterClose}
          onClick={() => setOpenLetterIndex(null)}
          type="button"
          aria-label={isVideoModal ? "Fechar vídeo" : "Fechar depoimento"}
        >
          &times;
        </button>

        {isVideoModal ? (
          <article className={styles.videoModalContent}>
            <div className={styles.videoModalCopy}>
              <p className={styles.videoEyebrow}>História Veritas Hub</p>
              <h3 id="story-video-title">Auxílio Acidente: uma história de direito e recomeço</h3>
              <p>
                Conheça a história de quem encontrou orientação para entender seus direitos e
                buscar o benefício que fez diferença em sua rotina e na de sua família.
              </p>
            </div>

            <div
              className={styles.videoPlaceholder}
              aria-label="Espaço reservado para o vídeo sobre Auxílio Acidente"
              role="img"
            >
              <span className={styles.placeholderPlay} aria-hidden="true">
                <Icon name="play" size={34} />
              </span>
              <span>Vídeo em breve</span>
            </div>
          </article>
        ) : (
          <>
        <div className={styles.envelope} aria-hidden="true">
          <span className={styles.envelopeBack} />
          <span className={styles.envelopeFlap} />
          <span className={styles.envelopeFront} />
        </div>

        <article className={styles.letterPaper}>
          <p className={styles.letterEyebrow}>Hist&oacute;ria Veritas Hub</p>
          <h3 id="story-letter-title">{openLetter.letterTitle}</h3>
          <strong>"{openLetter.letterQuote}"</strong>
          {openLetter.letterParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {openLetter.letterSignature && (
            <p className={styles.letterSignature}>{openLetter.letterSignature}</p>
          )}
        </article>
          </>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <section ref={sectionRef} id="produtos" className={styles.section} aria-labelledby="story-title">
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

        <div
          className={styles.slidesTrack}
          style={{ "--track-offset": `${slideProgress * -50}%` } as CSSProperties}
        >
          {stories.map((story, storyIndex) => (
            <article
              key={story.label}
              className={styles.slide}
              aria-hidden={activeIndex !== storyIndex}
            >
              <div className={styles.layout}>
                <div className={styles.copy}>
                  <h2 id={storyIndex === 0 ? "story-title" : undefined}>{story.quote}</h2>
                  <p>{story.description}</p>
                  <button
                    className={styles.storyCta}
                    onClick={() => setOpenLetterIndex(storyIndex)}
                    type="button"
                  >
                    {storyIndex === 0 ? "Assista ao vídeo" : "Leia o depoimento"}
                    <Icon name="arrow-right" size={20} />
                  </button>
                </div>

                <StoryMedia
                  story={story}
                  onOpenModal={() => setOpenLetterIndex(storyIndex)}
                />
              </div>
            </article>
          ))}
        </div>

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

      </div>
      </section>
      <section className={styles.greenClosing} aria-labelledby="green-closing-title">
        <h2 id="green-closing-title">
          A vida continua.
          <br />
          Só que melhor!
        </h2>
      </section>
      {storyModal ? createPortal(storyModal, document.body) : null}
    </>
  );
}

function StoryMedia({
  story,
  onOpenModal,
}: {
  story: (typeof stories)[number];
  onOpenModal: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    void videoRef.current?.play();
  };

  const resetVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.muted = true;
  };

  const openStoryModal = () => {
    resetVideo();
    onOpenModal();
  };

  return (
    <div className={styles.mediaGroup}>
      <figure className={styles.imageFrame}>
        <img src={story.image} alt={story.imageAlt} />
      </figure>
      <button
        type="button"
        className={styles.videoFrame}
        onMouseEnter={playVideo}
        onMouseLeave={resetVideo}
        onFocus={playVideo}
        onBlur={resetVideo}
        onClick={openStoryModal}
        aria-label={`Abrir história: ${story.label}`}
      >
        <video ref={videoRef} src={story.video} muted loop playsInline preload="metadata" poster={story.image} />
        <span className={`${styles.videoHint} ${styles.compactHint}`}>
          <Icon name="play" size={24} />
          <span>Passe o mouse</span>
        </span>
      </button>
    </div>
  );
}
