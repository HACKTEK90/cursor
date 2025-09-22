(function() {
  const css = `
/* Reset & Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  background: #f5f5f7;
  color: #1d1d1f;
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  text-align: center;
  position: relative;
}

/* Subtle Gradient Background */
body::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.8), transparent 70%);
  z-index: -1;
  pointer-events: none;
}

/* Main Container */
.container {
  max-width: 720px;
  padding: 60px 40px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  position: relative;
  z-index: 1;
}

/* Typography */
h1 {
  font-size: 48px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 20px;
  line-height: 1.1;
}

p.lead {
  font-size: 18px;
  color: #3c3c4399; /* subtle gray */
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
}

/* Action Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  background: #0071e3; /* Apple-blue accent */
  border: none;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  background: #005fcc;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
  background: #004ba0;
}

/* Divider Line */
.divider {
  width: 50px;
  height: 2px;
  background: #d2d2d7;
  margin: 40px auto;
  border-radius: 2px;
}

/* Signature Text */
.signature {
  font-size: 14px;
  color: #6e6e73;
  margin-top: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .container { padding: 50px 30px; border-radius: 20px; }
  h1 { font-size: 40px; }
  p.lead { font-size: 16px; }
  .btn { font-size: 15px; padding: 12px 24px; }
}

@media (max-width: 480px) {
  h1 { font-size: 32px; }
  p.lead { font-size: 15px; }
  .btn { font-size: 14px; padding: 10px 20px; }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  body { background: #1c1c1e; color: #f5f5f7; }
  .container { background: #2c2c2e; box-shadow: 0 8px 20px rgba(0,0,0,0.4); }
  p.lead { color: #d1d1d6; }
  .divider { background: #3a3a3c; }
  .btn { background: #0a84ff; color: #ffffff; }
  .btn:hover { background: #006fd6; }
  .btn:active { background: #0054a6; }
}
  `;

  const style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
})();
