# Bolt's Performance Journal

## 2025-05-15 - [Dead Code and Event Handler Optimization]
**Learning:** Static sites often contain legacy "experiment" code (like unused particle systems or meditation timers) that bloats the script size without providing value. Furthermore, frequent event listeners (scroll, resize) without throttling and with inline DOM queries are major sources of main-thread congestion.

**Action:** Always audit for unused classes and functions. Cache DOM elements in constructors or on initialization to avoid repeated queries. Apply throttling/debouncing to high-frequency events to maintain 60fps performance during interactions.

## 2025-05-15 - [Safe Declarative Optimizations in Static Projects]
**Learning:** In static sites with dynamic UI triggers (like carousels or modals), deleting "unused-looking" code is risky. Safe, declarative HTML optimizations for asset loading provide significant wins without regression risk. Specifically, balancing `loading="eager"`/`fetchpriority="high"` for LCP and `loading="lazy"` for off-screen assets is highly effective.

**Action:** Prioritize safe HTML attributes (`loading`, `fetchpriority`, `decoding`) over code removal in unfamiliar static environments. Always verify LCP impact and visual consistency after image optimization.
