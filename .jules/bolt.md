# Bolt's Performance Journal

## 2025-05-15 - [Dead Code and Event Handler Optimization]
**Learning:** Static sites often contain legacy "experiment" code (like unused particle systems or meditation timers) that bloats the script size without providing value. Furthermore, frequent event listeners (scroll, resize) without throttling and with inline DOM queries are major sources of main-thread congestion.

**Action:** Always audit for unused classes and functions. Cache DOM elements in constructors or on initialization to avoid repeated queries. Apply throttling/debouncing to high-frequency events to maintain 60fps performance during interactions.
