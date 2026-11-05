import { type CSSProperties, type PointerEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import imgAuxilioAcidente from "../../assets/depoimento-auxilio-poster.jpg";
import imgDireitoDigital from "../../assets/depoimento-digital-poster.jpg";
import playIcon from "../../assets/story-play.svg";
import { Icon } from "../../design-system";
import styles from "./StorySwitcher.module.css";
import { getStoryScrollState } from "./story-scroll";

const stories = [
  {
    label: "Auxílio Acidente",
    poster: imgAuxilioAcidente,
    quote: "Eu não sabia que tinha direito ao auxílio acidente. A Veritas Hub analisou meu caso, explicou o processo e cuidou de tudo.",
    highlight: "cuidou de tudo",
    author: "Fábio D'Angelo",
    credential: "Beneficiário do auxílio acidente",
    youtubeEmbed: "https://www.youtube.com/embed/BD4xKBF0PYk?si=_0D5YXk-JLYRUJh9",
  },
  {
    label: "Direito Digital",
    poster: imgDireitoDigital,
    quote: "Percebi que minha conta tinha sido hackeada quando perdi o acesso às informações dos meus clientes. Conheci a Veritas Hub e a recuperação foi rápida e simples.",
    highlight: "rápida e simples",
    author: "Jociel Soares",
    credential: "Cliente da Veritas Hub • Recuperação de contas digitais",
    youtubeEmbed: "https://www.youtube.com/embed/KWoYi5uKXf0",
  },
];

const slideDuration = 10_000;

export function StorySwitcher() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const idleTimeoutRef = useRef(0);
  const lastWheelChangeRef = useRef(0);
  const activeIndexRef = useRef(0);
  const dragRef = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);
  const [isPaused, setIsPaused] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isIdle, setIsIdle] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const isRunning = isVisible && isPageVisible && isIdle && !isDragging && !isPaused && playingIndex === null;

  const markActivity = useCallback(() => {
    setIsIdle(false);
    window.clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = window.setTimeout(() => setIsIdle(true), 1000);
  }, []);

  const selectStory = useCallback((index: number) => {
    const next = (index + stories.length) % stories.length;
    activeIndexRef.current = next;
    setPlayingIndex(null);
    setActiveIndex(next);
    setCycle((value) => value + 1);
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    markActivity();
    suppressClickRef.current = false;
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    markActivity();
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) > 10 && Math.abs(distance) > Math.abs(event.clientY - drag.y)) {
      drag.moved = true;
      suppressClickRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      trackRef.current?.setAttribute("data-dragging", "true");
    }
    if (drag.moved) {
      const atEdge = (activeIndex === 0 && distance > 0) || (activeIndex === stories.length - 1 && distance < 0);
      trackRef.current?.style.setProperty("--drag-offset", `${distance * (atEdge ? 0.2 : 1)}px`);
    }
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    trackRef.current?.removeAttribute("data-dragging");
    trackRef.current?.style.removeProperty("--drag-offset");
    if (event.type !== "pointercancel" && drag.moved && Math.abs(event.clientX - drag.x) >= 60) {
      selectStory(Math.min(Math.max(activeIndex + (event.clientX < drag.x ? 1 : -1), 0), stories.length - 1));
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    markActivity();
  };

  useEffect(() => {
    window.addEventListener("scroll", markActivity, { passive: true });
    return () => {
      window.removeEventListener("scroll", markActivity);
      window.clearTimeout(idleTimeoutRef.current);
    };
  }, [markActivity]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let accumulated = 0;
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      markActivity();
      if (playingIndex !== null) return;
      // Vertical gestures follow the page's scroll timeline in both directions.
      // Only horizontal gestures select a slide independently of that timeline.
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      const delta = event.deltaX
        * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1);
      if (!delta) return;
      const next = activeIndex + Math.sign(delta);
      if (next < 0 || next >= stories.length) return;
      event.preventDefault();
      if (performance.now() - lastWheelChangeRef.current < 650) return;
      accumulated = Math.sign(accumulated) === Math.sign(delta) ? accumulated + delta : delta;
      if (Math.abs(accumulated) < 50) return;
      lastWheelChangeRef.current = performance.now();
      accumulated = 0;
      selectStory(next);
    };
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [activeIndex, playingIndex, markActivity, selectStory]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const progressBar = scrollProgressRef.current;
    if (!section || !panel || !progressBar) return;

    let frame = 0;
    let panelHeight = 0;
    let sectionTop = 0;
    let scrollDistance = 1;
    let lastScrollY = window.scrollY;
    const renderProgress = (syncStory = false) => {
      const scrollY = window.scrollY;
      const state = getStoryScrollState(scrollY, sectionTop, panelHeight, scrollDistance, stories.length);
      progressBar.style.setProperty("--scroll-progress", String(state.progress));
      progressBar.setAttribute("aria-valuenow", String(Math.round(state.progress * 100)));
      progressBar.hidden = !state.showProgress;
      if (syncStory && scrollY !== lastScrollY && state.isPinned && state.storyIndex !== activeIndexRef.current) {
        selectStory(state.storyIndex);
      }
      lastScrollY = scrollY;
    };
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        renderProgress(true);
      });
    };
    const updateLayout = () => {
      const nextHeight = panel.getBoundingClientRect().height;
      if (nextHeight !== panelHeight) {
        panelHeight = nextHeight;
        section.style.setProperty("--story-panel-height", `${panelHeight}px`);
      }
      const sectionBounds = section.getBoundingClientRect();
      sectionTop = window.scrollY + sectionBounds.top;
      scrollDistance = sectionBounds.height - panelHeight;
      renderProgress();
    };
    const observer = new ResizeObserver(updateLayout);
    observer.observe(panel);
    updateLayout();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateLayout);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateLayout);
    };
  }, [selectStory]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35), { threshold: [0, 0.35] });
    observer.observe(panel);
    const handleVisibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);


  return (
    <>
      <section ref={sectionRef} id="produtos" className={styles.section} aria-labelledby="story-title" aria-roledescription="carrossel">
        <div ref={panelRef} className={styles.stickyPanel} onPointerMoveCapture={markActivity} onPointerDownCapture={markActivity}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Depoimentos</p>
          <h2 id="story-title">Veja como prestamos assessoria para você</h2>
          <div className={styles.controls}>
            <div className={styles.pagination} aria-label="Escolher depoimento">
              {stories.map((story, index) => (
                <button
                  key={story.label}
                  type="button"
                  className={`${styles.dotButton} ${activeIndex === index ? styles.activeDot : ""}`}
                  aria-label={`Depoimento ${index + 1}: ${story.label}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  onClick={() => { markActivity(); selectStory(index); }}
                >
                  <span className={styles.dotTrack}>
                    {activeIndex === index && (
                      <span
                        key={cycle}
                        className={styles.progressFill}
                        style={{ animationDuration: `${slideDuration}ms`, animationPlayState: isRunning ? "running" : "paused" }}
                        onAnimationEnd={() => selectStory(activeIndex + 1)}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <button type="button" className={styles.pauseButton} aria-label={(isPaused || playingIndex !== null) ? "Retomar carrossel" : "Pausar carrossel"} onClick={() => {
              if (playingIndex !== null) {
                setPlayingIndex(null);
                setIsPaused(false);
              } else setIsPaused((paused) => !paused);
            }}>
              <Icon name={(isPaused || playingIndex !== null) ? "play" : "pause"} size={14} />
            </button>
          </div>
        </header>

        <div
          ref={viewportRef}
          className={styles.viewport}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onPointerLeave={(event) => { if (!dragRef.current?.moved) finishDrag(event); }}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            if (suppressClickRef.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClickRef.current = false;
            }
          }}
        >
          <div ref={trackRef} className={styles.slidesTrack} style={{ "--active-index": activeIndex } as CSSProperties}>
            {stories.map((story, index) => {
              const [quoteStart, quoteEnd] = story.quote.split(story.highlight);
              return (
                <article key={`${story.label}-${index}`} className={styles.slide} data-active={activeIndex === index} aria-roledescription="slide" aria-label={`${index % stories.length + 1} de ${stories.length}`}>
                  <div className={styles.videoFrame}>
                    <div className={styles.videoSurface}>
                    {playingIndex === index ? (
                      <iframe
                        src={`${story.youtubeEmbed}${story.youtubeEmbed.includes("?") ? "&" : "?"}autoplay=1&rel=0&playsinline=1`}
                        title={`Depoimento completo: ${story.label}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <button type="button" className={styles.videoPreview} aria-label={`Assistir ao depoimento completo: ${story.label}`} onClick={() => {
                        selectStory(index);
                        setPlayingIndex(index);
                      }}>
                        <img className={styles.videoPoster} src={story.poster} alt="" loading="eager" />
                        <span className={styles.playIcon}><img src={playIcon} alt="" /></span>
                      </button>
                    )}
                    </div>
                  </div>
                  <figure className={styles.copy}>
                    <div className={styles.quotation}>
                      <span className={styles.quoteMark} aria-hidden="true">“</span>
                      <blockquote className={styles.quote}>
                        <p>{quoteStart}<strong>{story.highlight}</strong>{quoteEnd}</p>
                      </blockquote>
                    </div>
                    <figcaption className={styles.attribution}>
                      <strong>{story.author}</strong>
                      <span>{story.credential}</span>
                    </figcaption>
                  </figure>
                </article>
              );
            })}
          </div>
        </div>
        <div
          ref={scrollProgressRef}
          className={styles.scrollProgress}
          role="progressbar"
          aria-label="Progresso da rolagem dos depoimentos"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
        />
        </div>
      </section>

    </>
  );
}
