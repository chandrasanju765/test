# BeFiSc Scroll Hero

A React scroll-animation hero section inspired by BeFiSc.com.

## Features
- 12 cards arranged on a **wide horizontal oval** around the center heading
- On scroll, cards **fly off-screen** radially outward
- Heading **scales up** (48% → 100%) and transitions **white → lime green**
- Subtitle, body copy, and CTA buttons **fade + slide in** after cards exit
- Sticky scroll driver (300vh height) with pure JS scroll math — no libraries needed

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  App.js                  — Root app, renders Navbar + ScrollHero
  components/
    Navbar.js             — Fixed top navigation bar
    ScrollHero.js         — Main hero with scroll logic + card data
    Card.js               — Individual card component
```

## How the Animation Works

### Scroll Progress
A single `progress` value (0 → 1) drives everything:
```js
const p = -sectionEl.getBoundingClientRect().top / (sectionHeight * 0.62);
```

### Card Oval Positions
Cards are placed using ellipse math:
```js
const ox = Math.cos(rad) * RX;  // RX = 38vw (wide)
const oy = -Math.sin(rad) * RY; // RY = 22vh (flat)
```

### Animation Timeline
| Scroll %  | What happens                              |
|-----------|-------------------------------------------|
| 0 – 35%   | Cards still on oval, heading small/white  |
| 35 – 90%  | Cards fly off-screen radially             |
| 30 – 80%  | Heading color: white → lime green         |
| 0 – 75%   | Heading scales: 48% → 100%               |
| 62 – 90%  | Subtitle + body fade in                   |
| 74 – 100% | CTA buttons slide up and appear           |

## Customization

### Change card data
Edit the `CARDS` array in `ScrollHero.js`:
```js
{ id: 1, label: "KYC", emoji: "🪪", angle: 120, rotate: -6, accent: "#f59e0b", z: 8 }
```
- `angle`: position on oval (0° = right, counter-clockwise)
- `rotate`: card tilt angle
- `accent`: top border + label color
- `z`: z-index for overlap stacking

### Change oval shape
```js
const RX = 38; // vw — increase for wider oval
const RY = 22; // vh — increase for taller oval
```
