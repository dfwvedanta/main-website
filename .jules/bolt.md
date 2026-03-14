# Bolt's Performance Journal

## 2025-05-15 - [Dead Code and Event Handler Optimization]
**Learning:** Static sites often contain legacy "experiment" code (like unused particle systems or meditation timers) that bloats the script size without providing value. Furthermore, frequent event listeners (scroll, resize) without throttling and with inline DOM queries are major sources of main-thread congestion.

**Action:** Always audit for unused classes and functions. Cache DOM elements in constructors or on initialization to avoid repeated queries. Apply throttling/debouncing to high-frequency events to maintain 60fps performance during interactions.

## 2024-05-23 - [LCP Optimization and Dead Code Reduction]
**Learning:** Hero images in static sites often lack proper prioritization, leading to delayed LCP. Additionally, large chunks of "template" JavaScript (like parallax or specific modal logic for non-existent elements) can significantly increase the script evaluation time.

**Action:** Use `fetchpriority="high"` and `loading="eager"` for hero images. Aggressively prune unused JS logic that doesn't map to current DOM elements.
