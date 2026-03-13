# Bolt's Performance Journal

## 2025-05-15 - [Dead Code and Event Handler Optimization]
**Learning:** Static sites often contain legacy "experiment" code (like unused particle systems or meditation timers) that bloats the script size without providing value. Furthermore, frequent event listeners (scroll, resize) without throttling and with inline DOM queries are major sources of main-thread congestion.

**Action:** Always audit for unused classes and functions. Cache DOM elements in constructors or on initialization to avoid repeated queries. Apply throttling/debouncing to high-frequency events to maintain 60fps performance during interactions.

## 2025-05-23 - [Dual Loading Strategy for Duplicate Image Sources]
**Learning:** In static sites, the same image asset may be used both "above the fold" (hero section) and "below the fold" (modals/galleries) within the same page. Standard automation may flag this as a conflict.
**Action:** Always prioritize the above-the-fold instance with `loading="eager"` to protect LCP, while applying `loading="lazy"` to the deferred instances. This reduces bandwidth contention for modal assets during the initial paint without delaying the hero image.
