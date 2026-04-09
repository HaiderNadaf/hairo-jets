# Jesko Jets Clone Implementation Plan

This document is a build blueprint for recreating the visual and interaction style of the Jesko Jets website as a premium cinematic Next.js experience.

It is written for a coding agent and should be treated as the source of truth for implementation.

## 1. Goal

Build a luxury, dark-mode, scroll-driven landing page with:

- A sticky hero section that scrubs through a cloud sequence on canvas.
- A second sticky section that scrubs through a plane morph sequence on canvas.
- A final footer section that uses a looping HTML5 globe video.
- Smooth scrolling and subtle motion polish.
- Minimal, premium typography and professional copy.

The result should feel high-end, precise, and intentionally restrained.

## 2. Required Stack

- Framework: Next.js 14 with App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Motion: Framer Motion
- Smooth scroll: `@studio-freight/lenis`
- Rendering approach: Canvas for image sequences, HTML video for the globe

## 3. Asset Contract

The implementation must use these assets exactly as provided:

- Hero animation frames: `/public/sequence-1/`
- Plane morph frames: `/public/sequence-2/`
- Globe video: `/public/globe-loop.mp4`

Do not rename these folders or move the files.

Frame naming convention in both sequences:

- `ezgif-frame-001.jpg`
- `ezgif-frame-002.jpg`
- ...
- `ezgif-frame-120.jpg`

The code should derive frame paths from the fixed frame count rather than hardcoding every filename.

## 4. Information Architecture

The page should be a single-scrolling experience with three major sections:

1. HeroScroll
2. PlaneMorph
3. Globe footer

Each section should feel like a continuation of the previous one, with large vertical spacing, sticky animation containers, and premium editorial content.

## 5. Proposed File Structure

Use this structure as the implementation target:

```txt
app/
  layout.tsx
  page.tsx
  globals.css

components/
  HeroScroll.tsx
  PlaneMorph.tsx
  Globe.tsx
  SectionHeading.tsx
  Navbar.tsx
  FooterCopy.tsx

hooks/
  useImagePreloader.ts
  useCanvasFrameScrub.ts
  useLenis.ts

lib/
  framePaths.ts
  cn.ts

public/
  sequence-1/
  sequence-2/
  globe-loop.mp4
```

If the repository already contains an app structure, adapt to the existing layout while preserving these logical responsibilities.

## 6. Visual Direction

### 6.1 Core Aesthetic

- Background: near-black luxury tone, `#050505`
- Primary text: white
- Secondary text: muted gray with strong readability
- Overall feeling: minimalist, quiet, expensive, cinematic

### 6.2 Typography

- Use `Inter` or `Geist`
- Headings should have wide tracking and generous line-height
- Copy should be compact, editorial, and polished
- Avoid overly futuristic or tech-bro styling

### 6.3 Layout Language

- Use large vertical spacing and lots of negative space
- Keep content centered inside a max-width container
- Use sticky animation stages for scroll-driven sections
- Add subtle gradient glows or vignettes only where needed

### 6.4 Motion Language

- Motion should feel smooth, expensive, and controlled
- Use Framer Motion for text reveals, fade-ups, and small transitions
- Canvas sequences should dominate the visual storytelling
- Avoid excessive parallax or decorative noise

## 7. Page Composition

## 7.1 Global Layout

Build `app/layout.tsx` with:

- `lang="en"`
- dark body background
- font class applied globally
- metadata for the luxury brand presentation

Suggested metadata:

- Title: Jesko Jets
- Description: Premium private aviation and cinematic aerial experiences

## 7.2 Page Structure

`app/page.tsx` should assemble:

- `Navbar`
- Hero introduction copy
- `HeroScroll`
- Brand stat strip or short value proposition
- `PlaneMorph`
- Short luxury service narrative
- `Globe`
- Final CTA/footer copy

The page should feel like a premium brand story, not a generic product landing page.

## 8. Section Specifications

## 8.1 Navbar

Keep it minimal:

- Logo wordmark left
- Optional links right
- Transparent or slightly blurred background
- High contrast, small text, wide tracking

Suggested links:

- Fleet
- Experience
- Contact

The navbar should not distract from the scroll sequences.

## 8.2 HeroScroll.tsx

### Purpose

This is the opening scrollytelling section and should feel like a cloud-based reveal of the brand world.

### Required behavior

- Use a sticky container with a very tall parent section, `h-[400vh]`
- Load frames from `/public/sequence-1/`
- Map scroll progress from `0` to `1` into the frame index
- Draw the current frame to a canvas
- Keep the canvas centered and responsive
- Ensure the canvas fills the visual stage without distortion

### Recommended structure

- Outer wrapper: `relative h-[400vh]`
- Sticky inner wrapper: `sticky top-0 h-screen overflow-hidden`
- Canvas layer: absolutely positioned, full-bleed, `object-cover` style behavior via canvas scaling
- Text overlay: minimal headline and supporting copy

### Canvas rendering rules

- Use `requestAnimationFrame` only when needed for draw updates
- On scroll, compute the frame index from progress
- Clamp the index between `0` and `frameCount - 1`
- Use `drawImage` with cover-style scaling so the image fills the canvas elegantly
- Recalculate canvas dimensions on resize and device pixel ratio changes

### Interaction feeling

- At the start, the section should feel atmospheric and restrained
- As the user scrolls, the clouds should resolve into clearer motion
- Copy should fade or subtly transform, not jump

### Overlay content suggestions

- Eyebrow: `AERIAL PRESENCE`
- Headline: `Cloudline precision, redefined.`
- Body: `A cinematic arrival experience shaped by silence, scale, and control.`

## 8.3 PlaneMorph.tsx

### Purpose

This is the second major scroll sequence and should feel like the aircraft revealing itself through a refined morph or transformation.

### Required behavior

- Same sticky scrollytelling pattern as `HeroScroll`
- Use `/public/sequence-2/`
- Map scroll progress to frame index
- Draw frames to a canvas
- Different copy and atmosphere than the hero

### Recommended structure

- Outer wrapper: `relative h-[400vh]`
- Sticky stage: `sticky top-0 h-screen`
- Canvas: center-focused, slightly more dramatic than the hero
- Text block: a more concrete brand/service statement

### Interaction feeling

- The plane should emerge with controlled energy
- Movement should feel engineered, not flashy
- The sequence should read as premium product reveal

### Overlay content suggestions

- Eyebrow: `ENGINEERED MOTION`
- Headline: `Form in flight, tuned to intent.`
- Body: `Every frame communicates refinement, speed, and absolute composure.`

## 8.4 Globe.tsx

### Purpose

This is the closing visual anchor and should act as a luxurious atmospheric footer.

### Required behavior

- Use an HTML5 `video`
- `src="/globe-loop.mp4"`
- `autoPlay`
- `loop`
- `muted`
- `playsInline`
- `object-cover`
- Positioned as a background layer with low z-index

### Recommended structure

- Full-width section
- Large vertical padding
- Video background behind foreground text and CTA
- Dark overlay gradient to preserve legibility

### Copy suggestions

- Eyebrow: `GLOBAL REACH`
- Headline: `A world that moves at your pace.`
- Body: `Jesko Jets pairs private aviation with white-glove coordination across every touchpoint.`

## 9. Performance Strategy

## 9.1 useImagePreloader

Create a custom hook to prefetch and cache image sequences before scroll interaction begins.

### Responsibilities

- Accept an array of image paths
- Create `HTMLImageElement` instances
- Resolve when all images are loaded
- Optionally expose loading state and errors
- Cache loaded images by `src` so repeated mounts are cheap

### Implementation expectations

- Preload sequence frames in a non-blocking effect
- Use `Promise.all`
- Avoid reloading already cached frames
- Handle partial failure gracefully

### Suggested hook signature

```ts
useImagePreloader(srcs: string[]): {
  images: HTMLImageElement[];
  isLoading: boolean;
  error: Error | null;
}
```

## 9.2 useCanvasFrameScrub

Create a reusable hook for scroll-driven canvas sequences.

### Responsibilities

- Accept frame sources
- Accept a canvas ref
- Accept a scroll container or sticky wrapper ref
- Render the correct frame based on scroll progress
- Handle resizing and device pixel ratio

### Benefits

- Keeps `HeroScroll` and `PlaneMorph` consistent
- Reduces duplicate canvas logic
- Makes future sequence sections easier to add

## 9.3 useLenis

Set up Lenis globally for smooth scrolling.

### Requirements

- Initialize once in a client-side provider or hook
- Hook into `requestAnimationFrame`
- Clean up on unmount
- Ensure scroll-driven canvas progress stays synchronized with Lenis updates

### Notes

- Use the same easing and duration across the site
- Do not over-smooth the experience to the point that the scroll feels detached

## 10. Frame Utilities

Create `lib/framePaths.ts` with helper functions:

- Generate zero-padded frame paths
- Support the fixed 120-frame sequences
- Return predictable asset paths for both folders

Example utility responsibilities:

- `getFramePath(sequenceDir, index)`
- `getFrameList(sequenceDir, count)`

This avoids manual string assembly in component code.

## 11. Canvas Rendering Details

The canvas sequences should not stretch frames awkwardly.

### Draw strategy

1. Clear the canvas
2. Compute source image aspect ratio
3. Compute canvas aspect ratio
4. Apply cover scaling
5. Center crop if needed
6. Draw the current frame

### Important implementation notes

- Use `window.devicePixelRatio` for crisp rendering
- Set both canvas CSS size and internal backing size
- Use `ResizeObserver` or `window resize` listener to keep dimensions synced
- On first render, draw frame `0` immediately after preload

### Scroll mapping

- Progress should be normalized from the sticky section's scroll window
- Clamp progress to avoid invalid frame indexes
- Use `Math.round(progress * (frameCount - 1))`

## 12. Animation and Micro-Interactions

Use Framer Motion for all DOM-based motion:

- Heading fade-up on section entry
- Subheading stagger
- Small opacity and y-axis motion for supporting copy
- CTA hover transitions

Avoid animating the canvas itself through Framer Motion. The canvas should be updated by scroll state, not by DOM animation.

Suggested motion timing:

- Initial reveal: 0.6s to 0.9s
- Ease: `easeOut`
- Stagger: subtle, around `0.08s`

## 13. Copy System

The copy should sound like a luxury aviation brand.

### Tone

- Confident
- Quietly elite
- Specific without being salesy
- Minimal but not cold

### Suggested brand language

- `Private aviation, reimagined with cinematic precision.`
- `Every arrival is composed. Every departure, effortless.`
- `A service built around discretion, timing, and range.`
- `Global access with the calm of a private atelier.`

### Suggested CTA copy

- Primary: `Request Charter`
- Secondary: `View Fleet`

If the UI includes a CTA, keep it understated and premium.

## 14. Accessibility Requirements

- All text must remain readable against the dark background
- Provide meaningful alt text where applicable, even though the hero visuals are canvas/video-based
- Ensure keyboard focus states are visible and refined
- Respect `prefers-reduced-motion`:
  - Reduce or disable Lenis smoothing
  - Provide a less motion-heavy fallback for sequence sections if needed

## 15. Responsive Behavior

### Desktop

- Full cinematic experience
- Larger typography
- More pronounced spacing

### Tablet

- Maintain sticky sections
- Adjust text block widths
- Reduce some padding but preserve the feel

### Mobile

- Keep the same sequence logic
- Reduce text size and section padding
- Ensure canvas stages scale properly
- Move overlay copy into compact stacked layouts

The page must still feel premium on small screens, not collapsed or cramped.

## 16. Loading Strategy

Since image sequences are performance-sensitive:

- Preload only the currently needed section first
- Optionally defer the second sequence until the hero is visible
- Show a minimal loading state if frames are not ready
- Avoid layout shift by reserving the canvas stage height immediately

Suggested loading treatment:

- A very subtle spinner or text label
- No heavy skeleton UI

## 17. Suggested Build Order

1. Set up the Next.js App Router shell and global styles.
2. Add Lenis scrolling and base layout typography.
3. Implement reusable frame path helpers.
4. Build `useImagePreloader`.
5. Build reusable canvas scrub logic.
6. Implement `HeroScroll`.
7. Implement `PlaneMorph`.
8. Implement `Globe`.
9. Add polished copy and CTA sections.
10. Validate responsiveness and performance.

## 18. Acceptance Criteria

The build is complete when:

- The page uses the exact provided assets.
- The hero and plane sections scrub frames correctly based on scroll.
- The globe footer loops cleanly.
- The site feels premium, dark, and cinematic.
- Smooth scrolling works without breaking scroll progress mapping.
- The code is organized and reusable.
- The copy sounds like a luxury aviation brand.

## 19. Example Component Responsibilities

### `HeroScroll.tsx`

- Owns the hero sequence frames
- Uses canvas and sticky scroll height
- Displays the opening luxury narrative

### `PlaneMorph.tsx`

- Owns the second sequence
- Mirrors the hero technical pattern
- Shifts the mood into product reveal

### `Globe.tsx`

- Owns the footer video background
- Anchors the page with global reach messaging

### `useImagePreloader.ts`

- Preloads and caches frame images

### `useCanvasFrameScrub.ts`

- Connects scroll progress to canvas frame rendering

### `useLenis.ts`

- Initializes and manages smooth scroll

## 20. Implementation Notes for the Coding Agent

- Prefer clean, readable TypeScript over clever abstractions.
- Keep all animation logic deterministic.
- Do not introduce unnecessary dependencies.
- Reuse utility functions across both canvas sections.
- Make sure frame counts are configurable.
- Use stable refs and avoid rerender loops.
- Treat the canvas as the source of visual truth for both sequences.
- Keep the final experience quiet, expensive, and highly polished.

## 21. Luxury Copy Draft

Use or adapt the following copy set:

### Hero

- Eyebrow: `AERIAL PRESENCE`
- Headline: `Cloudline precision, redefined.`
- Body: `A cinematic arrival experience shaped by silence, scale, and control.`

### Plane Section

- Eyebrow: `ENGINEERED MOTION`
- Headline: `Form in flight, tuned to intent.`
- Body: `Every frame communicates refinement, speed, and absolute composure.`

### Globe Footer

- Eyebrow: `GLOBAL REACH`
- Headline: `A world that moves at your pace.`
- Body: `Jesko Jets pairs private aviation with white-glove coordination across every touchpoint.`

### CTA

- Primary: `Request Charter`
- Secondary: `View Fleet`

## 22. Final Delivery Standard

The finished site should feel like a premium motion piece first and a marketing page second.

If anything is simplified during implementation, preserve:

- the scroll rhythm,
- the cinematic pacing,
- the dark luxury tone,
- and the frame-driven storytelling.

