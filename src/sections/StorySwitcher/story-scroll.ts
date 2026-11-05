export function getStoryScrollState(
  scrollY: number,
  sectionTop: number,
  panelHeight: number,
  scrollDistance: number,
  storyCount: number,
) {
  const distance = Math.max(scrollDistance, 1);
  const start = sectionTop + Math.max(panelHeight - distance, 0);
  const end = start + distance;
  const progress = Math.min(Math.max((scrollY - start) / distance, 0), 1);

  return {
    progress,
    showProgress: scrollY < end,
    isPinned: scrollY >= start && scrollY < end,
    storyIndex: Math.round(progress * Math.max(storyCount - 1, 0)),
  };
}
