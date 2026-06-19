import { useEffect, useRef, useState } from "react";
import styles from "./ExpandingHeadline.module.css";

export function ExpandingHeadline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.72;

      if (rect.top <= triggerPoint && rect.bottom >= 0) {
        setIsExpanded(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="expanding-headline-title">
      <h2
        id="expanding-headline-title"
        className={`${styles.headline} ${isExpanded ? styles.expanded : ""}`}
      >
        A vida continua.
        <br />
        Só que melhor!
      </h2>
    </section>
  );
}
