// import heroImage from "../../assets/hero.png";
import heroVideo from "../../assets/VIDEO- HERO FINAL 1.1.webm";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden="true">
        <video
          id="video-background"
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroVideo} type="video/webm" />
        </video>
        {/* <img className={styles.poster} src={heroImage} alt="" /> */}
      </div>

      <div className={styles.content}>
        <h1 id="hero-title">
          Seus direitos com
          <br />
          clareza e <span className={styles.highlight}>simplicidade</span>
        </h1>
        <p>
          Na Veritas Hub, o que parece difícil se torna mais fácil
          <br />
          de entender, com uma experiência clara e acolhedora para você.
        </p>

        <div className={styles.actions} aria-label="Acoes principais">
          <span>Tem dúvidas sobre seus direitos?</span>
          <Button
            className={styles.primaryAction}
            iconLeft={<Icon name="whatsapp" size={24} />}
            onClick={() => {
              window.location.hash = "rodape";
            }}
            size="sm"
            variant="primary"
          >
            Fale com um especialista
          </Button>
        </div>
      </div>
    </section>
  );
}
