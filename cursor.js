document.documentElement.classList.add('js-enabled');

(function(){
  const cursor = document.getElementById('siteCursor');
  const ring = cursor.querySelector('.cursor__ring');
  const dot = cursor.querySelector('.cursor__dot');

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let cursorX = mouseX, cursorY = mouseY;
  const ease = 0.18;

  function setState(name, enabled) {
    cursor.classList.toggle(name, enabled);
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setState('cursor--hidden', false);
  }, { passive: true });

  window.addEventListener('mouseleave', () => setState('cursor--hidden', true));
  window.addEventListener('mouseenter', () => setState('cursor--hidden', false));

  window.addEventListener('mousedown', () => setState('cursor--active', true));
  window.addEventListener('mouseup', () => setState('cursor--active', false));

  const interactiveSelector = 'a, button, input, textarea, select, [role="button"]';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) setState('cursor--hover', true);
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) setState('cursor--hover', false);
  });

  document.addEventListener('selectionchange', () => {
    const selection = document.getSelection();
    setState('cursor--text', selection && selection.toString().length > 0);
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

  document.addEventListener('focusin', (e) => {
    if (e.target.closest(interactiveSelector)) setState('cursor--hover', true);
  });

  document.addEventListener('focusout', () => {
    setState('cursor--hover', false);
  });

  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (media.matches) {
    document.documentElement.style.setProperty('--prefers-reduced-motion', 'reduce');
  }

  const bodyAccent = document.body.dataset.cursorAccent;
  if (bodyAccent) {
    document.documentElement.style.setProperty('--accent', bodyAccent);
  }
})();
