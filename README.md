# Mohamed El-Taher — developer portfolio

A local React + TypeScript + Vite portfolio, with a real Three.js sculptural head and GSAP ScrollTrigger choreography. No deployment has been performed.

[View actual desktop/mobile captures and the forward/reverse hero recording](docs/review/README.md).

## Install and run

Requires Node.js 20.19+ or 22.12+ (verified with Node 24).

```bash
cd /workspace/newPortfolioVersion
npm ci
npm run dev
```

Open http://localhost:5173. For a production build and local preview:

```bash
npm run build
npm run preview
```

Open the URL Vite prints (normally http://localhost:4173).

## Editing

- `src/content.ts`: personal facts, introduction, skills, the three projects, and verified repository URLs.
- `src/App.tsx`: semantic sections and a single main GSAP scroll timeline. `matchMedia` removes pinning and transitions for reduced motion.
- `src/Sculpture.tsx`: Three.js model loading, metallic material, environment lighting, perspective, controlled triangle fragmentation, fallback, and resource cleanup.
- `src/style.css`: responsive desktop, tablet, and mobile composition.
- `public/assets/`: local portrait, transparent derivative, mesh, and attribution.

The hero pins for 1.65 viewport heights, crossfades the portrait into the separate sculpture, rotates and disperses its surface, introduces the About message, and releases into normal scrolling. All transformation values derive from the same reversible progress value. DPR is capped at 1.75 on desktop and 1.25 on small screens; rendering skips offscreen, hidden-tab, and inactive sequence states. Resize observers, event listeners, GSAP contexts, animation frames, geometry, materials, renderer, and environment resources are cleaned up.

## Assets and differences from the references

- The exact supplied portrait was found in the owner's existing repository. Its unmodified version appears in About. The hero uses an AI-assisted transparent cutout, which may differ in small details.
- The metallic object is a licensed, separate Lee Perry-Smith head mesh. It is not a reconstruction of Mohamed's face. See `public/assets/credits.txt` for attribution and license.
- The effect uses reflective mesh geometry and controlled triangle fragmentation. It does not reproduce the reference video's liquid drips, hair geometry, or facial morph.
- The project artwork is explicitly labeled conceptual. No usable authentic project screenshots were supplied. No unverified demo buttons were included.
- The three GitHub repository destinations were verified via successful Git access. LinkedIn uses the supplied URL; its remote availability was not verified.
- Live Lando Norris, Active Theory, and the old hosted portfolio could not load through the environment's network policy. The three supplied recordings were sampled into contact sheets and intermediate frames, including their reverse sequences, and used as the primary visual references. The existing portfolio's source was accessible via Git.

## Verification performed

- TypeScript and Vite production build.
- Chromium desktop at 1440 × 900: initial hero, model loaded, intermediate scroll states, forward/reverse scroll, restored controls, pin release, and all three project sections.
- Mobile Chromium at 390 × 844 with touch emulation: hero, intermediate states, reverse scrolling, work navigation, contact, no horizontal overflow.
- Tablet resize to 768 × 1024 with no horizontal overflow.
- Reduced motion: no pin spacer; content remains accessible; keyboard skip link works.
- Disabled WebGL: composed static fallback appears.
- Narrow 320px layout: hero, work, and contact checked for overflow; contact/back-to-top links checked.
- Normal requests returned no missing-asset HTTP errors and the browser console reported no errors.
- Deliberately aborted mesh and hero-image requests: fallback appears and essential text, projects, and navigation remain accessible.
- The verification run reported no JavaScript page errors.

Browser testing uses software-rendered Chromium in this environment. Safari, Firefox, physical mobile devices, and hardware-GPU performance have not been tested. Vite reports a size advisory for the Three.js vendor chunk (~528 kB before gzip); the app uses local assets and does not need an external font or asset CDN.
