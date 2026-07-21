import { type CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./ExpandingHeadline.module.css";

const headlineLines = ["A vida muda, a", "Veritas acompanha!"];
const headline = headlineLines.join("\n");

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

export function ExpandingHeadline() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef(0);
  const [fillProgress, setFillProgress] = useState(0);

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

        setFillProgress(nextProgress);
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
    <section ref={sectionRef} className={styles.section} aria-labelledby="expanding-headline-title">
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
    </section>
  );
}
