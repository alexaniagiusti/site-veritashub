import type { ReactNode } from "react";
import styles from "./GreenClosing.module.css";

type GreenClosingProps = {
  children: ReactNode;
};

export function GreenClosing({ children }: GreenClosingProps) {
  return (
    <div className={styles.stage}>
      <section className={styles.section} aria-labelledby="green-closing-title">
        <h2 id="green-closing-title">
          A vida continua.
          <br />
          Só que melhor!
        </h2>
      </section>
      <div className={styles.hold} aria-hidden="true" />
      <div className={styles.cover}>{children}</div>
    </div>
  );
}
