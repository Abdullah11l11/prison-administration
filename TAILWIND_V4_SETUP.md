# Tailwind CSS v4 Setup Guide

## What Changed in Tailwind v4

Tailwind CSS v4 has a completely new architecture. Here's what's different:

### 1. PostCSS Plugin
The PostCSS plugin moved to a separate package:
```bash
npm install -D @tailwindcss/postcss
```

### 2. Configuration File
**Tailwind v4 does NOT use `tailwind.config.js`!**

Instead, configuration is done directly in your CSS file using:
- CSS variables for theming
- `@theme` directive for custom theme values
- `@plugin` directive for plugins

### 3. CSS Import Syntax

**Old (Tailwind v3):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**New (Tailwind v4):**
```css
@import "tailwindcss";
```

## Current Setup

### postcss.config.js
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### src/index.css
```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... other CSS variables ... */
  }

  .dark {
    /* ... dark theme variables ... */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Using @theme (Optional)

If you want to customize Tailwind's default theme, use the `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --font-family-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 1920px;

  --color-neon-pink: oklch(71.7% 0.25 360);
  --color-neon-lime: oklch(91.5% 0.258 129);
  --color-neon-cyan: oklch(91.3% 0.139 195.8);

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);

  --width-card: 20rem;
}
```

## Content Detection

Tailwind v4 automatically detects your content files. No need to configure content paths!

It scans:
- All files in your source directory
- Common file extensions: `.html`, `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, etc.

## Migration from v3 Config

If you had custom values in `tailwind.config.js`, convert them to CSS:

**Old (v3):**
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
      },
      spacing: {
        '128': '32rem',
      }
    }
  }
}
```

**New (v4):**
```css
@theme {
  --color-primary: #3490dc;
  --spacing-128: 32rem;
}
```

## Benefits of v4

1. ✅ **Faster**: Up to 5x faster than v3
2. ✅ **Simpler**: No JavaScript config file
3. ✅ **Better DX**: Auto-detection, better error messages
4. ✅ **Type-safe**: CSS-based configuration
5. ✅ **Modern**: Uses native CSS features

## Current Project Structure

```
prison-administration/
├── postcss.config.js           # @tailwindcss/postcss plugin
├── src/
│   └── index.css               # @import "tailwindcss" + theme
└── package.json                # @tailwindcss/postcss in devDependencies
```

## Verify Setup

Run the dev server:
```bash
npm run dev
```

If you see the Vite server start without PostCSS errors, you're good to go!

## Documentation

- [Tailwind CSS v4 Beta](https://tailwindcss.com/docs/v4-beta)
- [Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [CSS Configuration](https://tailwindcss.com/docs/theme#customizing-your-theme)

## Note

This project is already set up with Tailwind v4. You don't need to do anything - it just works! 🎉
