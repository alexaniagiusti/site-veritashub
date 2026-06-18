import heroImage from "../../assets/hero.png";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import styles from "./StorySwitcher.module.css";

export function StorySwitcher() {
  return (
    <section id="servicos" className={styles.section} aria-labelledby="story-title">
      <div className={styles.switcher} aria-label="Histórias disponíveis">
        <Button className={styles.switcherButton} size="md" variant="primary">
          Auxílio Acidente
        </Button>
        <Button className={styles.switcherButton} size="md" variant="ghost">
          Hackeados
        </Button>
      </div>

      <div className={styles.layout}>
        <h2 id="story-title">Veritas Hub</h2>

        <figure className={styles.imageFrame}>
          <img src={heroImage} alt="Pessoa atendida pela Veritas Hub" />
        </figure>

        <div className={styles.copy}>
          <p>Leia essa história sobre o auxílio acidente</p>
          <Button
            className={styles.storyCta}
            iconRight={<Icon name="arrow-right" size={16} />}
            onClick={() => {
              window.location.hash = "quem-somos";
            }}
            size="xs"
            variant="secondary"
          >
            Conheça a Veritas Hub
          </Button>
        </div>
      </div>
    </section>
  );
}
