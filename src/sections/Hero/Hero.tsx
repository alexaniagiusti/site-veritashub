import { useRef, useState } from "react";
// import heroImage from "../../assets/hero.png";
import heroVideo from "../../assets/VIDEO- HERO FINAL 1.1.webm";
import { Icon } from "../../design-system/components/Icon/Icon";
import { Button } from "../../design-system/components/button";
import styles from "./Hero.module.css";
import { CameraModal } from "../../design-system/components/camera-modal/CameraModal";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

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

  // Mantém a lógica pronta enquanto somente o botão permanece comentado.
  void isPlaying;
  void toggleVideoPlayback;

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

      <div className={styles.content}>
        <div className={styles.heroControls}>
          {/* Controle de play temporariamente desativado.
          <button
            id="botao-player"
            aria-label={isPlaying ? "Pausar video" : "Reproduzir video"}
            className={styles.playerButton}
            onClick={toggleVideoPlayback}
            type="button"
          >
            <span className={styles.playerInner}>
              <Icon name={isPlaying ? "pause" : "play"} size={22} />
            </span>
          </button>
          */}

          <Button
            aria-label="Acessar câmeras ao vivo"
            className={styles.liveButton}
            iconLeft={<span className={styles.liveIndicator} aria-hidden="true" />}
            size="md"
            variant="secondary"
            onClick={() => setIsCameraModalOpen(true)}
          >
            Ao vivo
          </Button>
        </div>

        <h1 id="hero-title">
          Seus direitos com
          <br />
          clareza e simplicidade.
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
      {isCameraModalOpen ? (
        <CameraModal onClose={() => setIsCameraModalOpen(false)} />
      ) : null}
    </section>
  );
}
