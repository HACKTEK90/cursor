(function() {
  const css = `
/* Reset & Base */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', 'Inter', system-ui, sans-serif;
  background: #ffffff;
  color: #1a1a1a;
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  position: relative;
}

/* Subtle Gradient Background */
body::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(circle at center, rgba(240, 248, 255, 0.6), transparent 50%),
              linear-gradient(135deg, #f8fcff, #ffffff);
  z-index: -1;
  pointer-events: none;
}

/* Main Container */
.container {
  max-width: 800px;
  padding: 80px 40px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 8px 16px -2px rgba(0, 0, 0, 0.08),
    0 16px 32px -4px rgba(0, 0, 0, 0.05);
  transform: translateY(0);
  opacity: 1;
  position: relative;
  z-index: 1;
}

/* Typography */
h1 {
  font-family: 'Inter', sans-serif;
  font-size: 56px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  letter-spacing: -1px;
  line-height: 1.1;
}

p.lead {
  font-size: 20px;
  color: #5f6368;
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
  gap: 8px;
  padding: 12px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #1a73e8;
  background: #f1f3f4;
  border: 1px solid #dfe1e5;
  border-radius: 28px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background: #e8eaed;
  border-color: #dadce0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
  background: #dadce0;
}

/* Divider Line */
.divider {
  width: 60px;
  height: 3px;
  background: #dadce0;
  margin: 40px auto;
  border-radius: 10px;
}

/* Signature Text */
.signature {
  font-size: 15px;
  color: #70757a;
  margin-top: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 60px 20px;
    border-radius: 18px;
  }
  h1 { font-size: 42px; letter-spacing: -0.8px; }
  p.lead { font-size: 18px; }
  .btn { font-size: 15px; padding: 10px 20px; }
}

@media (max-width: 480px) {
  h1 { font-size: 36px; }
  p.lead { font-size: 17px; }
  .btn { font-size: 15px; padding: 10px 20px; }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  body { background: #111; color: #e8eaed; }
  body::before { background: radial-gradient(circle at center, rgba(30, 30, 30, 0.7), transparent 50%), linear-gradient(135deg, #121212, #1a1a1a); }
  .container {
    background: #1f1f1f;
    box-shadow: 
      0 1px 3px rgba(0, 0, 0, 0.3),
      0 4px 6px -1px rgba(0, 0, 0, 0.3),
      0 8px 16px -2px rgba(0, 0, 0, 0.3),
      0 16px 32px -4px rgba(0, 0, 0, 0.3);
  }
  h1, p.lead, .signature { color: #e8eaed; }
  p.lead { color: #bdc1c6; }
  .divider { background: #3c4043; }
  .btn { color: #8ab4f8; background: #2d2d2d; border-color: #5f6368; }
  .btn:hover { background: #3c4043; }
}
  `;

  const style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
})();
