# Pizza Tech Italia · React Blog & Pizzeria

Single-page application built with React, Vite and Tailwind CSS that combines a blog about pizza, technology and business with a modern pizzeria website layout.

## Features

- Sticky, accessible header with responsive navigation (desktop + mobile hamburger menu)
- Hero section highlighting the Pizza Tech Italia concept
- Blog section with latest articles and category tags
- Pizzas section showcasing menu items with badges and call-to-action
- Responsive footer with navigation, legal links and social media
- Custom design system with CSS variables (colors, spacing, typography)
- Dark/light support via system preference (CSS `prefers-color-scheme`)
- Semantic HTML and ARIA attributes for better accessibility

## Tech Stack

- React + Vite
- Tailwind CSS v4 (via `@import "tailwindcss";`)
- Custom global styles with CSS variables
- JavaScript (ES202x), JSX

## Project Structure

```
src/
  components/
    TheHeader.jsx
    TheFooter.jsx
    HeroSection.jsx
    PostsGrid.jsx
    PizzasList.jsx
  pages/
    HomePage.jsx
  css/
    index.css        # Global styles, theme tokens, layout helpers
  main.jsx
  App.jsx
```

## Getting Started

### Prerequisites

- Node.js (LTS)
- pnpm, npm or yarn

### Install

pnpm install

# or

npm install

# or

yarn

### Development

pnpm dev

# or

npm run dev

# or

yarn dev

Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Build

pnpm build

# or

npm run build

# or

yarn build

### Preview production build

pnpm preview

# or

npm run preview

# or

yarn preview

## Accessibility & UX

- Semantic layout (`header`, `main`, `section`, `footer`)
- Landmarks and labels for navigation (`aria-label`, `aria-labelledby`)
- Keyboard-friendly header with clear focus states (handled by browser + Tailwind)
- Color contrast tuned for dark background and small footer text
