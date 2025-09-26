// rightclick-block.js
(function () {
  const TARGET_URL = "https://hacktek90.github.io/accessblock/";

  // Preload iframe (hidden initially)
  const preloadedIframe = document.createElement("iframe");
  preloadedIframe.src = TARGET_URL;
  Object.assign(preloadedIframe.style, {
    width: "100%",
    height: "100%",
    border: "none",
    display: "none",       // hidden until right-click
  });
  document.body.appendChild(preloadedIframe);

  // Create overlay function
  function showOverlay() {
    // avoid multiple overlays
    if (document.getElementById("access-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "access-overlay";
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: 2147483647,
      background: "#000",       // optional dark background
      overflow: "hidden",
    });

    // Show preloaded iframe
    preloadedIframe.style.display = "block";
    overlay.appendChild(preloadedIframe);
    document.body.appendChild(overlay);

    // Disable scrolling on body
    document.body.style.overflow = "hidden";
  }

  // Right-click / contextmenu
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    showOverlay();
  }, { passive: false });

  // Mobile long-press support
  (function enableLongPress() {
    let touchTimer = null;
    const threshold = 700;

    function touchStartHandler(e) {
      if (e.touches && e.touches.length > 1) return;
      touchTimer = setTimeout(showOverlay, threshold);
    }
    function touchEndHandler() {
      if (touchTimer) {
        clearTimeout(touchTimer);
        touchTimer = null;
      }
    }

    document.addEventListener("touchstart", touchStartHandler, { passive: true });
    document.addEventListener("touchend", touchEndHandler);
    document.addEventListener("touchmove", touchEndHandler);
    document.addEventListener("touchcancel", touchEndHandler);
  })();
})();
