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
  },
  {
    label: "Hackeados",
    image: imgHackeados,
    imageAlt: "Pessoa utilizando computador representando caso de conta hackeada",
    description: "Leia essa história sobre clientes hackeados",
  },
];

export function StorySwitcher() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const activeIndex = progress >= 0.5 ? 1 : 0;
  const slideProgress = Math.min(progress * 2, 1);
  const secondStoryProgress = Math.min(Math.max((progress - 0.5) * 2, 0), 1);

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
                    onClick={() => {
                      window.location.hash = "quem-somos";
                    }}
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
      </div>
    </section>
  );
}
