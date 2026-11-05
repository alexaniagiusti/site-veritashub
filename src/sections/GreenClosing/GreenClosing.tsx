import type { ReactNode } from "react";
import brazilMap from "../../assets/mapa-brasil-linhas.svg";
import { Button } from "../../design-system/components/button";
import styles from "./GreenClosing.module.css";

type GreenClosingProps = {
  children: ReactNode;
};

export function GreenClosing({ children }: GreenClosingProps) {
  return (
    <div className={styles.stage}>
      <section className={styles.section} aria-labelledby="green-closing-title">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Presença Nacional</p>
            <h2 id="green-closing-title">Atendemos você em todo o Brasil</h2>
            <p className={styles.description}>
              Buscamos não apenas garantir que nossos clientes conquistem seus objetivos de forma ágil,
              mas também proporcionar-lhes uma experiência excepcional, fazendo com que nos reconheçam
              como seu aliado na busca por soluções.
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
          <div className={styles.map}>
            <img src={brazilMap} alt="Mapa do Brasil com a presença da Veritas em todo o território nacional" />
          </div>
        </div>
      </section>
      <div className={styles.hold} aria-hidden="true" />
      <div className={styles.cover}>{children}</div>
    </div>
  );
}
