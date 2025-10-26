// Bicochat Sidebar v1.0
// Author: Subhankar Das
// Turns any webpage into one with a draggable chat sidebar
// Use: <script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO/bicochat-sidebar.js"></script>

(function() {
  // Inject Font Awesome for chat icon
  const fontAwesome = document.createElement("link");
  fontAwesome.rel = "stylesheet";
  fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
  document.head.appendChild(fontAwesome);

  // ===== Inject Styles =====
  const style = document.createElement("style");
  style.textContent = `
    * { box-sizing: border-box; font-family: 'Segoe UI', system-ui, sans-serif; }
    body.sidebar-open { overflow: hidden; }

    .sidebar {
      position: fixed;
      top: 0;
      right: -380px;
      width: 360px;
      height: 100vh;
      background: linear-gradient(140deg, #1e1e2e, #252536);
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: -8px 0 30px rgba(0, 0, 0, 0.35);
      transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      border-radius: 16px 0 0 16px;
      overflow: hidden;
    }

    .sidebar.open { right: 0; }

    .sidebar iframe {
      flex: 1;
      border: none;
      width: 100%;
      background: #121212;
    }

    .cross-close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.12);
      color: #e2e8f0;
      border: none;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      z-index: 1002;
      backdrop-filter: blur(4px);
      transition: all 0.25s ease;
    }

    .cross-close-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      transform: rotate(90deg);
    }

    #draggableButton {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: rgba(15, 23, 42, 0.25);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.2),
        inset 0 0 0 1px rgba(30, 58, 138, 0.4);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      z-index: 1001;
      user-select: none;
      touch-action: none;
    }

    #draggableButton:active { cursor: grabbing; }

    #draggableButton:hover {
      background: rgba(15, 23, 42, 0.35);
      transform: scale(1.08);
      box-shadow:
        0 10px 36px rgba(0, 0, 0, 0.3),
        inset 0 0 0 1px rgba(37, 99, 235, 0.6);
      border-color: rgba(255, 255, 255, 0.12);
    }
  `;
  document.head.appendChild(style);

  // ===== Inject HTML =====
  const html = `
    <div id="draggableButton" title="Drag me or click to open chat">
      <i class="fas fa-comments"></i>
    </div>

    <div class="sidebar" id="sidebar">
      <button class="cross-close-btn" id="closeSidebarBtn" aria-label="Close chat">×</button>
      <iframe src="https://incandescent-gnome-e84ac4.netlify.app/" title="Bicochat Sidebar"></iframe>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", html);

  // ===== JavaScript Logic =====
  const sidebar = document.getElementById("sidebar");
  const draggableBtn = document.getElementById("draggableButton");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");

  function updateSidebarState() {
    if (sidebar.classList.contains("open")) {
      closeSidebarBtn.style.display = "flex";
      draggableBtn.style.display = "none";
      document.body.classList.add("sidebar-open");
    } else {
      closeSidebarBtn.style.display = "none";
      draggableBtn.style.display = "flex";
      document.body.classList.remove("sidebar-open");
    }
  }

  draggableBtn.addEventListener("click", (e) => {
    if (window.hasDragged) return;
    sidebar.classList.add("open");
    updateSidebarState();
  });

  closeSidebarBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
    updateSidebarState();
  });

  updateSidebarState();

  // ===== Draggable Button Logic =====
  let isDragging = false, offsetX, offsetY;
  window.hasDragged = false;

  draggableBtn.addEventListener("mousedown", (e) => {
    isDragging = true;
    window.hasDragged = false;
    offsetX = e.clientX - draggableBtn.getBoundingClientRect().left;
    offsetY = e.clientY - draggableBtn.getBoundingClientRect().top;
    draggableBtn.style.cursor = "grabbing";
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    window.hasDragged = true;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    const maxX = window.innerWidth - draggableBtn.offsetWidth;
    const maxY = window.innerHeight - draggableBtn.offsetHeight;
    draggableBtn.style.left = \`\${Math.max(0, Math.min(x, maxX))}px\`;
    draggableBtn.style.top = \`\${Math.max(0, Math.min(y, maxY))}px\`;
    draggableBtn.style.right = "auto";
    draggableBtn.style.bottom = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    draggableBtn.style.cursor = "grab";
  });

  // Touch support
  draggableBtn.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    isDragging = true;
    window.hasDragged = false;
    offsetX = touch.clientX - draggableBtn.getBoundingClientRect().left;
    offsetY = touch.clientY - draggableBtn.getBoundingClientRect().top;
    e.preventDefault();
  });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    window.hasDragged = true;
    const touch = e.touches[0];
    const x = touch.clientX - offsetX;
    const y = touch.clientY - offsetY;
    const maxX = window.innerWidth - draggableBtn.offsetWidth;
    const maxY = window.innerHeight - draggableBtn.offsetHeight;
    draggableBtn.style.left = \`\${Math.max(0, Math.min(x, maxX))}px\`;
    draggableBtn.style.top = \`\${Math.max(0, Math.min(y, maxY))}px\`;
    draggableBtn.style.right = "auto";
    draggableBtn.style.bottom = "auto";
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
  });
})();
