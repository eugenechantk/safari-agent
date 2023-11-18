export const getElementCoordinates = (element) => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
};

export const smoothScrollTo = (endY, duration) => {
  const startY = window.scrollY;
  const change = endY - startY;
  const startTime = performance.now();

  function scrollStep(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newY = startY + change * progress;
      window.scrollTo({left:0, top:newY, behavior:"smooth"});

      if (elapsed < duration) {
          window.requestAnimationFrame(scrollStep);
      }
  }

  window.requestAnimationFrame(scrollStep);
}