

# 🎯 Custom Cursor Plugin

A lightweight JavaScript plugin that replaces the default system cursor with a smooth, animated custom cursor.

## ✨ Features

* Smooth trailing motion
* Expanding ring hover effect
* Click (active) animations
* Text-selection styling
* Works automatically on links, buttons, inputs, textareas, and selects
* Plug-and-play: **only 1 script tag needed**

---

## 🚀 Installation

Add this line before the closing `</body>` tag of your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/hacktek90/cursor@main/cursor-plugin.js" defer></script>
```

That’s it — no CSS, no HTML to copy. The plugin will inject everything automatically.

---

## 🛠 Usage

### Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cursor Demo</title>
</head>
<body>
  <h1>Hello World</h1>
  <button>Click Me</button>

  <!-- Cursor Plugin -->
  <script src="https://cdn.jsdelivr.net/gh/hacktek90/cursor@main/cursor-plugin.js" defer></script>
</body>
</html>
```

---

## ⚙️ Optional Configuration (coming soon 🚧)

You’ll be able to control the cursor appearance via `data-` attributes on `<body>`:

```html
<body 
  data-cursor-accent="255,0,120" 
  data-cursor-size="20" 
  data-cursor-offset="6"
  data-cursor-idle="10000"
>
```

* `data-cursor-accent` → Accent color (RGB)
* `data-cursor-size` → Size of the center dot (px)
* `data-cursor-offset` → Vertical offset for fine-tuning
* `data-cursor-idle` → Idle timeout in ms (e.g. glow red after inactivity)

---

## 📄 License

MIT License – free to use, modify, and share.

---


