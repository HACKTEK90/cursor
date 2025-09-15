(function () {
  // Inject CSS
  const css = `
  :root {
    --cursor-size: 16px;
    --ring-size: 44px;
    --ring-border: 2px;
    --accent: 28, 120, 255;
    --accent-solid: rgba(28,120,255,1);
    --ring-glow: rgba(var(--accent),0.18);
    --transition-fast: 120ms;
    --transition-mid: 240ms;
    --shadow: 0 6px 18px rgba(2,6,23,0.12);
    --cursor-offset-y: 4px;
  }
  html.js-enabled * { cursor: none !important; }
  .cursor {
    position: fixed;
    left: 0; top: 0;
    width: var(--ring-size); height: var(--ring-size);
    margin-left: calc(var(--ring-size) * -0.5);
    margin-top: calc(var(--ring-size) * -0.5 + var(--cursor-offset-y));
    pointer-events: none;
    transform: translate3d(-50%, -50%, 0);
    display: grid; place-items: center;
    z-index: 99999;
    transition: transform var(--transition-fast) ease-out;
    will-change: transform, opacity;
  }
  .cursor__ring {
    width: 100%; height: 100%;
    border-radius: 999px;
    border: var(--ring-border) solid rgba(var(--accent), 0.22);
    background: radial-gradient(circle at 30% 30%, rgba(var(--accent),0.04), transparent 40%);
    box-shadow: var(--shadow), 0 0 24px var(--ring-glow) inset;
    transition: width var(--transition-mid) ease, height var(--transition-mid) ease,
                border-color var(--transition-mid) ease, transform var(--transition-mid) ease,
                opacity var(--transition-fast) ease;
    display: grid; align-items: center; justify-items: center;
  }
  .cursor__dot {
    width: var(--cursor-size); height: var(--cursor-size);
    border-radius: 50%;
    background: var(--accent-solid);
    box-shadow: 0 4px 10px rgba(2,6,23,0.18);
    transform: scale(1);
    transition: transform var(--transition-fast) ease,
                background var(--transition-fast) ease,
                opacity var(--transition-fast) ease;
  }
  .cursor--hover .cursor__ring {
    width: calc(var(--ring-size) * 1.15);
    height: calc(var(--ring-size) * 1.15);
    border-color: rgba(var(--accent), 0.36);
    transform: translateZ(0) scale(1.02);
  }
  .cursor--hover .cursor__dot {
    transform: scale(0.72);
    background: white;
    box-shadow: 0 6px 18px rgba(2,6,23,0.12), 0 0 0 4px rgba(var(--accent),0.06);
  }
  .cursor--active .cursor__dot { transform: scale(0.42); }
  .cursor--active .cursor__ring { transform: scale(0.96); opacity: 0.95; }
  .cursor--text .cursor__ring { border-style: dashed; opacity: 0.95; }
  .cursor--hidden { opacity: 0; }
  `;
  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);

  // Inject HTML
  const markup = `
    <div class="cursor" id="siteCursor" aria-hidden="true">
      <div class="cursor__ring"><div class="cursor__dot"></div></div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", markup);

  document.documentElement.classList.add("js-enabled");

  // Behavior
  const cursor = document.getElementById("siteCursor");
  const ring = cursor.querySelector(".cursor__ring");

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let cursorX = mouseX, cursorY = mouseY;
  const ease = 0.18;

  function setState(name, enabled) {
    cursor.classList.toggle(name, enabled);
  }

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setState("cursor--hidden", false);
  }, { passive: true });

  window.addEventListener("mouseleave", () => setState("cursor--hidden", true));
  window.addEventListener("mouseenter", () => setState("cursor--hidden", false));
  window.addEventListener("mousedown", () => setState("cursor--active", true));
  window.addEventListener("mouseup", () => setState("cursor--active", false));

  const interactiveSelector = "a, button, input, textarea, select, [role='button']";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) setState("cursor--hover", true);
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) setState("cursor--hover", false);
  });

  document.addEventListener("selectionchange", () => {
    const selection = document.getSelection();
    setState("cursor--text", selection && selection.toString().length > 0);
  });

  function loop() {
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;

    cursor.style.transform =
      `translate3d(${cursorX}px, ${cursorY + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-offset-y'))}px, 0) translate(-50%, -50%)`;

    const vx = (mouseX - cursorX);
    const rot = Math.max(Math.min((vx * 0.03), 6), -6);
    ring.style.transform = `rotate(${rot}deg)`;

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  document.addEventListener("focusin", (e) => {
    if (e.target.closest(interactiveSelector)) setState("cursor--hover", true);
  });
  document.addEventListener("focusout", () => setState("cursor--hover", false));

  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (media.matches) {
    document.documentElement.style.setProperty("--prefers-reduced-motion", "reduce");
  }

  const bodyAccent = document.body.dataset.cursorAccent;
  if (bodyAccent) {
    document.documentElement.style.setProperty("--accent", bodyAccent);
  }
})();
