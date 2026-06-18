import { useRef, useState } from "react";
// import heroImage from "../../assets/hero.png";
import heroVideo from "../../assets/VIDEOTESTE 001.webm";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import styles from "./Hero.module.css";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (!video.paused) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    void video.play();
    setIsPlaying(true);
  };

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden="true">
        <video
          id="video-background"
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        >
          <source src={heroVideo} type="video/webm" />
        </video>
        {/* <img className={styles.poster} src={heroImage} alt="" /> */}
      </div>

      <button
        id="botao-player"
        aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
        className={styles.playerButton}
        onClick={toggleVideoPlayback}
        type="button"
      >
        <span className={styles.playerInner}>
          <Icon name={isPlaying ? "pause" : "play"} size={34} />
        </span>
      </button>

      <div className={styles.content}>
        <h1 id="hero-title">Te ajudamos a entender e acessar seus direitos de forma simples</h1>
        <p>
          A Veritas Hub nasceu para transformar burocracia em clareza. Descubra seus direitos
          com uma experiência simples, rápida e acessível.
        </p>

        <div className={styles.actions} aria-label="Ações principais">
          <span>Tem dúvidas sobre seus direitos?</span>
          <Button
            className={styles.primaryAction}
            iconLeft={<Icon name="whatsapp" size={16} />}
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
