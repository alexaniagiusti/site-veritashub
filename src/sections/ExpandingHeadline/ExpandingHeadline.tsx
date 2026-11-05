import { Fragment, type CSSProperties, useEffect, useRef, useState } from "react";
import { Button } from "../../design-system/components/button";
import { Icon } from "../../design-system/components/Icon/Icon";
import videoPoster from "../../assets/veritas-video-poster.jpg";
import journeyPhoto from "../../assets/veritas-jornada-equipe.png";
import experiencePhoto from "../../assets/veritas-experiencia-equipe.png";
import styles from "./ExpandingHeadline.module.css";

const headlineLines = ["A vida muda, a", "Veritas acompanha!"];
const headline = headlineLines.join("\n");
const introductionFirstLine = "Transformando realidades com ética";
const introductionTitle = `${introductionFirstLine} transparência e dedicação`;
const introductionWords = Array.from(introductionTitle.matchAll(/\S+/g), (match) => ({
  text: match[0],
  offset: match.index,
}));

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

export function ExpandingHeadline() {
  const sectionRef = useRef<HTMLElement>(null);
  const introductionTitleRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(0);

  useEffect(() => {
    const title = introductionTitleRef.current;
    if (!title) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setHasStartedTyping(true);
      observer.disconnect();
    }, { threshold: 0.35, rootMargin: "0px 0px -10% 0px" });

    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStartedTyping) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const startedAt = performance.now();
    let frame = 0;
    const reveal = (now: number) => {
      const count = reducedMotion.matches
        ? introductionTitle.length
        : Math.min(introductionTitle.length, Math.floor((now - startedAt) / 28) + 1);
      setVisibleCharacterCount((previous) => Math.max(previous, count));
      if (count < introductionTitle.length) frame = window.requestAnimationFrame(reveal);
    };

    frame = window.requestAnimationFrame(reveal);
    return () => window.cancelAnimationFrame(frame);
  }, [hasStartedTyping]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const updateProgress = () => {
      window.cancelAnimationFrame(frameRef.current);

      frameRef.current = window.requestAnimationFrame(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setFillProgress(1);
          return;
        }

        const rect = section.getBoundingClientRect();
        const revealStart = window.innerHeight * 0.78;
        const revealEnd = window.innerHeight * 0.34;
        const nextProgress = clamp((revealStart - rect.top) / (revealStart - revealEnd));

        setFillProgress((previous) => Math.max(previous, nextProgress));
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const getLineProgress = (lineIndex: number) => {
    const lineStart = lineIndex / headlineLines.length;
    const lineEnd = (lineIndex + 1) / headlineLines.length;

    return clamp((fillProgress - lineStart) / (lineEnd - lineStart));
  };

  return (
    <section ref={sectionRef} id="sobre-a-veritas" className={styles.section} aria-labelledby="expanding-headline-title">
      <h2 id="expanding-headline-title" className={styles.headline} aria-label={headline}>
        {headlineLines.map((line, index) => (
          <span key={line} className={styles.line}>
            <span className={styles.baseText} aria-hidden="true">
              {line}
            </span>
            <span
              className={styles.fillText}
              aria-hidden="true"
              style={{ "--fill-progress": `${getLineProgress(index) * 100}%` } as CSSProperties}
            >
              {line}
            </span>
          </span>
        ))}
      </h2>
      <div className={styles.video}>
        <div className={styles.videoSurface}>
        {isVideoPlaying ? (
          <iframe
            src="https://www.youtube.com/embed/1uDq3-k1SYk?start=1&rel=0&autoplay=1"
            title="Conheça a Veritas Hub"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            className={styles.videoPreview}
            type="button"
            aria-label="Reproduzir vídeo: Conheça a Veritas Hub"
            onClick={() => setIsVideoPlaying(true)}
          >
            <img src={videoPoster} alt="" width={1280} height={720} loading="lazy" />
            <span className={styles.videoPlay}>
              <Icon name="play" size={40} />
            </span>
          </button>
        )}
        </div>
      </div>

      <div className={styles.introduction}>
        <h3
          ref={introductionTitleRef}
          className={styles.introductionTitle}
          aria-label={introductionTitle}
        >
          <span aria-hidden="true">
            {introductionWords.map((word) => (
              <Fragment key={word.offset}>
                {word.offset === introductionFirstLine.length + 1 && <br className={styles.desktopBreak} />}
                {word.offset > 0 && " "}
                <span className={styles.typingWord}>
                  {Array.from(word.text).map((character, index) => (
                    <span
                      key={index}
                      className={styles.typingCharacter}
                      data-visible={word.offset + index < visibleCharacterCount}
                    >
                      {character}
                    </span>
                  ))}
                </span>
              </Fragment>
            ))}
          </span>
        </h3>
        <p className={styles.description}>
          A Veritas oferece soluções personalizadas em assessoria,
          <br className={styles.desktopBreak} /> promovendo o acesso à verdade e ao que é justo,
          <br className={styles.desktopBreak} /> com relações de confiança e resultados consistentes.
        </p>
        <Button
          variant="accent"
          size="lg"
          onClick={() => {
            window.location.hash = "quem-somos";
            document.getElementById("quem-somos")?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              block: "start",
            });
          }}
        >
          Conheça a Veritas
        </Button>
      </div>

      <div className={styles.cards}>
        <article className={styles.card}>
          <div className={styles.cardCopy}>
            <h3 className={styles.cardTitle}>Nossa <span>jornada</span></h3>
            <p>Democratizamos o acesso ao conhecimento e às soluções, tornando-os acessíveis a todos.</p>
            <p>Trabalhamos para transformar a consultoria com qualidade e rapidez no atendimento.</p>
          </div>
          <img className={styles.cardPhoto} src={journeyPhoto} alt="Integrantes da equipe Veritas reunidas na empresa" loading="lazy" />
        </article>
        <article className={`${styles.card} ${styles.reverseCard}`}>
          <img className={styles.cardPhoto} src={experiencePhoto} alt="Equipe Veritas reunida no escritório" loading="lazy" />
          <div className={styles.cardCopy}>
            <h3 className={styles.cardTitle}>Nosso <span>compromisso</span></h3>
            <p>Buscamos soluções ágeis e uma experiência excepcional para cada cliente.</p>
            <p>Queremos ser seu aliado na busca pelos seus direitos.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
