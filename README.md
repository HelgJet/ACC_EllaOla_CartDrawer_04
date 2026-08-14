# ACC_EllaOla_CartDrawer_04

Inserts a static sage reassurance bar at the top of the EllaOla cart drawer, directly under the "Your Cart" heading, rendering only when the cart has at least one item (cart.js item_count >= 1). Variant-only additive change. Anchored on the verified drawer selector [id*="cart-drawer" i]; the bar is placed above the drawer body by locating the drawer's heading node (visible text "Your Cart") within the verified drawer root, with a fallback of prepending inside the drawer. A throttled MutationObserver plus a PerformanceObserver on /cart/(change|add|update|clear) re-inserts the bar after drawer re-renders, guarded by a duplicate-UI check. Copy is used verbatim per brief. Styling: #4B897D at ~13% opacity background, #2F5C53 dark green text and check icon (WCAG AA), Sofia body font 13.5px, ~11px vertical padding, 4px radius. Empty carts show no bar in either group. NOTE: the "reserved" copy is a pending client/legal sign-off build blocker per the brief; wording is kept exactly as briefed.

## Preview

v1 - store-demo preview (codebase_debug link)
