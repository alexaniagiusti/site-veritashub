import { type CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import imgAuxilioAcidente from "../../assets/capa1.png";
import videoAuxilioAcidente from "../../assets/depoimento-auxilioacidente.webm";
import videoDireitoDigital from "../../assets/depoimento2-previa.webm";
import { Button, Icon } from "../../design-system";
import styles from "./StorySwitcher.module.css";

const stories = [
  {
    label: "Auxílio Acidente",
    poster: imgAuxilioAcidente,
    video: videoAuxilioAcidente,
    quote: '"Eu não sabia que tinha direito ao auxílio acidente. A Veritas Hub analisou meu caso, explicou o processo e cuidou de tudo."',
    description: "Fábio D'Angelo, beneficiário do auxílio acidente, conta como a Veritas Hub ajudou a garantir seu direito.",
    modalTitle: "Auxílio Acidente: uma história de direito e recomeço",
    modalDescription: "Conheça a história de quem encontrou orientação para entender seus direitos e buscar o benefício que fez diferença em sua rotina e na de sua família.",
    youtubeEmbed: "https://www.youtube.com/embed/BD4xKBF0PYk?si=_0D5YXk-JLYRUJh9",
  },
  {
    label: "Direito Digital",
    video: videoDireitoDigital,
    poster: "",
    quote: '"Percebi que minha conta tinha sido hackeada quando perdi o acesso às informações dos meus clientes. Conheci a Veritas Hub e a recuperação foi rápida e simples."',
    description: "Jociel Soares, cliente da Veritas Hub, compartilha como recuperou o controle de suas contas após um ataque hacker.",
    modalTitle: "Direito Digital: Jociel recuperou suas contas com a ajuda da Veritas Hub",
    modalDescription: "Conheça a história de Jociel Soares, que buscou orientação para recuperar suas contas após uma invasão e retomar o controle de sua presença digital.",
    youtubeEmbed: "https://www.youtube.com/embed/KWoYi5uKXf0",
  },
];

const transitionStart = 0.2;
const transitionEnd = 0.7;

export function StorySwitcher() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
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

  const modalTitleId = "story-video-title";

  const storyModal = openLetter ? (
    <div
      className={styles.letterOverlay}
      role="presentation"
      onClick={() => setOpenLetterIndex(null)}
    >
      <div
        className={`${styles.letterDialog} ${styles.videoDialog}`}
        aria-labelledby={modalTitleId}
        aria-modal="true"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.letterClose}
          onClick={() => setOpenLetterIndex(null)}
          type="button"
          aria-label="Fechar vídeo"
        >
          &times;
        </button>

          <article className={styles.videoModalContent}>
            <div className={styles.videoModalCopy}>
              <p className={styles.videoEyebrow}>História Veritas Hub</p>
              <h3 id={modalTitleId}>{openLetter.modalTitle}</h3>
              <p>{openLetter.modalDescription}</p>
            </div>

            <div className={styles.videoEmbed}>
              <iframe
                src={openLetter.youtubeEmbed}
                title={`Depoimento de ${openLetter.label}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </article>
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
          style={{
            "--track-offset": `${slideProgress * -50}%`,
            "--mobile-track-offset": `${mobileActiveIndex * -50}%`,
          } as CSSProperties}
        >
          {stories.map((story, storyIndex) => (
            <article
              key={story.label}
              className={styles.slide}
              aria-hidden={activeIndex !== storyIndex}
            >
              <div className={styles.layout}>
                <h3 className={styles.mobileProductTitle}>{story.label}</h3>
                <div className={styles.copy}>
                  <h2 id={storyIndex === 0 ? "story-title" : undefined}>{story.quote}</h2>
                  <p>{story.description}</p>
                  <Button
                    className={styles.storyCta}
                    iconRight={<Icon name="arrow-right" size={20} />}
                    onClick={() => setOpenLetterIndex(storyIndex)}
                    size="md"
                    variant="tertiary"
                  >
                    Assista ao vídeo
                  </Button>
                </div>

                <StoryMedia
                  story={story}
                  onOpenModal={() => setOpenLetterIndex(storyIndex)}
                />
              </div>
            </article>
          ))}
        </div>

        <div className={styles.mobileCarouselControls} aria-label="Navegação das histórias">
          <button
            aria-label="História anterior"
            disabled={mobileActiveIndex === 0}
            onClick={() => setMobileActiveIndex((index) => Math.max(index - 1, 0))}
            type="button"
          >
            <Icon name="arrow-left" size={24} />
          </button>

          <div className={styles.mobileDots} aria-hidden="true">
            {stories.map((story, index) => (
              <span className={mobileActiveIndex === index ? styles.activeDot : ""} key={story.label} />
            ))}
          </div>

          <button
            aria-label="Próxima história"
            disabled={mobileActiveIndex === stories.length - 1}
            onClick={() => setMobileActiveIndex((index) => Math.min(index + 1, stories.length - 1))}
            type="button"
          >
            <Icon name="arrow-right" size={24} />
          </button>
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
  return (
    <div className={styles.mediaGroup}>
      <button
        type="button"
        className={styles.videoFrame}
        onClick={onOpenModal}
        aria-label={`Abrir história: ${story.label}`}
      >
          <video
            src={story.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={story.poster || undefined}
          />
          <span className={styles.videoHint} aria-hidden="true">
            Clique para assistir ao vídeo completo
          </span>
      </button>
    </div>
  );
}
