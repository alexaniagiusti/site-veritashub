import { useEffect, useRef, useState } from "react";
import styles from "./AboutTeam.module.css";

const photos = [
  new URL("../../assets/img-1.JPG", import.meta.url).href,
  new URL("../../assets/img-2.JPG", import.meta.url).href,
  new URL("../../assets/img-3.JPG", import.meta.url).href,
  new URL("../../assets/img-4.JPG", import.meta.url).href,
  new URL("../../assets/img-5.JPG", import.meta.url).href,
];
const carouselPhotos = [...photos, ...photos];
const clientCount = 20000;

export function AboutTeam() {
  const counterRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef(0);
  const hasUserScrolledRef = useRef(false);
  const hasStartedCounterRef = useRef(false);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const counter = counterRef.current;

    if (!counter) {
      return;
    }

    const startCounter = () => {
      if (hasStartedCounterRef.current) {
        return;
      }

      hasStartedCounterRef.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setAnimatedCount(clientCount);
        return;
      }

      const duration = 1500;
      const start = performance.now();

      const animate = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setAnimatedCount(Math.round(clientCount * easedProgress));

        if (progress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(animate);
        }
      };

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    const checkCounterPosition = () => {
      if (!hasUserScrolledRef.current || hasStartedCounterRef.current) {
        return;
      }

      const rect = counter.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.82;

      if (rect.top <= triggerPoint && rect.bottom >= 0) {
        startCounter();
      }
    };

    const handleScroll = () => {
      hasUserScrolledRef.current = true;
      checkCounterPosition();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkCounterPosition);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkCounterPosition);
    };
  }, []);

  const countLabel =
    animatedCount >= clientCount ? "20 mil" : animatedCount.toLocaleString("pt-BR");

  return (
    <section id="quem-somos" className={styles.section} aria-labelledby="about-team-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Movidos pelo propósito de transformar vidas</span>
          <h2 id="about-team-title">Pessoas apaixonadas pelo que fazem</h2>
          <p>
            Somos uma equipe de aproximadamente 289 especialistas apaixonados por transformar
            vidas e democratizar o acesso àquilo que é direito.
          </p>
          <p>
            Nosso propósito ganha força através dos resultados que construímos todos os dias.
            Já atendemos mais de 20 mil clientes em todo o Brasil, mantemos uma base ativa
            superior a 10 mil pessoas e realizamos mais de 2 mil atendimentos mensais.
          </p>
          <p>
            Mais do que uma empresa, somos um movimento que conecta conhecimento, tecnologia e
            pessoas para garantir que cada brasileiro tenha acesso aos seus direitos.
          </p>

          <div
            ref={counterRef}
            className={styles.clientCounter}
            aria-label="Mais de 20 mil clientes em todo o Brasil"
          >
            <strong>+ de {countLabel}</strong>
            <span>clientes em todo o Brasil</span>
          </div>
        </div>

        <div className={styles.gallery} aria-label="Equipe Veritas Hub">
          <div className={`${styles.carouselColumn} ${styles.carouselUp}`}>
            {carouselPhotos.map((photo, index) => (
              <img key={`up-${photo}-${index}`} src={photo} alt="" />
            ))}
          </div>

          <div className={`${styles.carouselColumn} ${styles.carouselDown}`}>
            {carouselPhotos.map((photo, index) => (
              <img key={`down-${photo}-${index}`} src={photo} alt="" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
