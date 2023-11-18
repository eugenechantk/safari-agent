export const getElementCoordinates = (element) => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
};

export const smoothScrollTo = async (endY, duration) => {
  const startY = window.scrollY;
  const change = endY - startY;
  const startTime = performance.now();

  function scrollStep(timestamp) {
    const elapsed = timestamp - startTime;
    window.scrollTo(0, easeInOutQuad(elapsed, startY, change, duration));
    if (elapsed < duration) {
      window.requestAnimationFrame(scrollStep);
    }
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  window.requestAnimationFrame(scrollStep);
};
