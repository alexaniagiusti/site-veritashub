import styles from "./ExpandingHeadline.module.css";

export function ExpandingHeadline() {
  return (
    <section className={styles.section} aria-labelledby="expanding-headline-title">
      <h2 id="expanding-headline-title">
        A vida continua.
        <br />
        Só que melhor!
      </h2>
    </section>
  );
}
