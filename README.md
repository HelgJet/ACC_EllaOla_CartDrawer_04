# EXP-0012

# PRD — Cart Drawer: Reassurance Nudge Under "Your Cart"

**Client:** EllaOla
**Test name:** ACC_EllaOla_CartDrawer_04
**Site url:** https://ellaola.com/  
**Surface:** Cart Drawer (site-wide, opens on Add to Cart and on cart icon click)
**Test type:** A/B, add a static reassurance nudge bar at the top of the cart drawer
**Audience trigger:** `Cart.opened`
**Date:** 2026-07-30
**Status:** Ready for build (one claim needs client sign-off, see Build Blockers)
**Supersedes:** None (no known live test on the cart drawer)

---

## Problem Statement

When the cart drawer opens, the shopper sees the line item, a cross-sell block, the subtotal, and a SECURE CHECKOUT button. There is nothing at the top of the drawer that affirms the choice they just made or gives them a reason to keep moving. The moment right after Add to Cart is where hesitation creeps in ("do I really want this, do I need to think about it"). The empty space directly under the "Your Cart" heading is a natural spot to reinforce the decision and nudge the shopper toward checkout.

## Solution

Add a single **static reassurance bar** at the top of the cart drawer, directly under the "Your Cart" heading and above the existing hairline divider. It reads:

> **Good choice! Your selection is being reserved.**

The bar is styled to feel native to EllaOla: a soft sage background (the store green `#4B897D` at low opacity), dark green text, and a small check icon to the left. It is full width within the drawer's padding, sits as its own band, and does not push the line items or checkout button around.

It renders only when the cart has at least one item, so it always references a real selection. It appears on every cart open across all products, on desktop and mobile. Nothing else in the drawer changes.

The bet is **reassurance / affirmation at the decision point**: confirming the shopper made a good choice, at the exact moment the drawer opens, reduces second-guessing and encourages them to proceed to checkout.

## Hypothesis

**IF** we add a reassurance nudge at the top of the cart drawer,
**THEN** conversion rate increases,
**BECAUSE** it affirms the shopper's choice and encourages them to take the next step toward checkout.

**Primary trigger:** Nudging (reassurance / affirmation).

## User Stories

1. As a shopper who just added an item, I want a quick affirmation that I made a good choice, so that I feel more confident continuing.
2. As a shopper opening the cart, I want a clear, calm message at the top of the drawer, so that the first thing I see is positive and reassuring.
3. As a shopper, I want the nudge to look like part of the store, so that it feels trustworthy and not like an injected pop-up.
4. As a shopper on mobile, I want the bar readable and well-placed at the top of the drawer, so that it does not crowd my items or the checkout button.
5. As a shopper who opens an empty cart, I do not want to see a message about a "selection" I have not made, so that the drawer never looks broken or misleading.
6. As a shopper adding any product, I want the same reassurance in the drawer, so that the experience is consistent across the catalog.
7. As a shopper, I want the bar to stay still and quiet (no timer, no flashing), so that it reassures rather than pressures me.
8. As the business, I want only this one addition between Control and Variant, so that any change in conversion is attributable to it.
9. As the business, I want a 50/50 split across desktop and mobile, so that the result reflects all traffic that opens the cart.
10. As the analytics owner, I want purchase conversion rate per group, so that I can judge the hypothesis.

## Implementation Decisions

- **Mechanic kept after critical review.** The brief asks for a reassurance nudge at the top of the drawer. It is a clean, low-risk fit for this surface and this brand: EllaOla already leans on reassurance (45-day money-back guarantee, free US shipping, "Clinicians' Choice", SECURE CHECKOUT). Reinforcing the choice at cart-open is native to that voice. A free-shipping-progress nudge was considered and rejected, because US shipping is already free and unconditional, so there is no threshold to progress toward.
- **Copy (locked, exact):** `Good choice! Your selection is being reserved.`
  - English in all markets. See the localization note below.
  - Sentence case, matching the store's UI copy style.
- **Placement.** Full-width bar **directly under the "Your Cart" heading and above the existing hairline divider**. It reads as part of the drawer header and is the first thing seen when the drawer opens. It must not move or resize the line items, cross-sell block, subtotal, or checkout button.
- **Visual style — native soft sage.**
  - Background: store green `#4B897D` at low opacity (about 12 to 15 percent), rendering as a pale sage tint that sits calmly against the drawer's white/cream.
  - Text: dark green, meeting WCAG AA contrast against the sage background (use a darkened green such as `#2F5C53` if `#4B897D` text does not clear AA on the chosen tint).
  - Icon: a small check icon to the left of the text, same dark green as the text.
  - Font: Sofia (store body font), roughly 13 to 14px, weight consistent with the drawer's UI text.
  - Full width within the drawer's horizontal padding, comfortable vertical padding (about 10 to 12px), optional small 4px radius to match the store's button radius. Spacing must follow the drawer's existing rhythm.
  - It should read as a gentle, positive affirmation, not a heavy banner. No dark/charcoal treatment (off-brand for the pastel aesthetic).
- **Motion.** Static. No entrance animation, no countdown, no timer. The bar is simply present when the drawer opens.
- **Empty-cart behavior.** The bar renders **only when the cart line-item count is at least 1**. On an empty cart (drawer opened via the cart icon with no items) the bar is hidden, so the "selection" wording always references a real item.
- **Scope.** Site-wide cart drawer, every `Cart.opened` event, all products. The drawer is a single shared component, so this is one change in one place.
- **Devices.** Desktop and mobile.
- **Control vs Variant.** Control is the current drawer (no bar). Variant adds the bar as specified. Nothing else changes.
- **Traffic split:** 50/50 Control vs Variant.
- **Audience:** all visitors who open the cart drawer with at least one item.
- **Delivery.** Built through the A/B testing tool's variant capability (or a theme-level change gated to the Variant audience). It must guarantee the placement, copy, styling, static behavior, and empty-cart rule above, and must not alter any other drawer attribute.

## Testing Decisions

- **What makes a good test here:** verify external, user-observable behavior. In Variant, when the cart drawer opens with at least one item, a sage bar appears directly under the "Your Cart" heading reading "Good choice! Your selection is being reserved." with a check icon; it is absent in Control; it is absent on an empty cart in both groups; and it does not move the items, subtotal, or checkout button.
- **Seam:** one seam only, a single element inserted at the top of the cart-drawer template. No other section is edited.
- **Manual QA (desktop + mobile):**
  - Add any product, open the drawer: the bar renders under the header, above the divider, in Sofia, with the sage background, dark green text, and check icon.
  - Text contrast clears WCAG AA on the chosen background.
  - The bar does not shift or resize the line item, cross-sell block, subtotal, or SECURE CHECKOUT button.
  - Open the drawer with an empty cart (via cart icon, no items): the bar does not appear.
  - Repeat on at least two different products to confirm it shows consistently site-wide.
  - On a 375px viewport the bar is readable, fits the drawer width, and wraps cleanly if needed.
- **Split/bucketing check:** about 50 percent of visitors are bucketed to each group; bucketing is stable per visitor across the session.
- **Cross-device/browser:** Variant renders correctly across major desktop and mobile browsers (iOS Safari, Android Chrome).

## Measurement Decisions

- **Primary success metric: Purchase conversion rate** — Control vs Variant. This is the stated hypothesis and the only tracked metric for this test.
- Metrics come from the A/B tool and Shopify order data. The client has no Google Analytics or Microsoft Clarity access, so no scroll-depth or event-based engagement metrics are tracked.
- Test is called when purchase conversion rate reaches an agreed statistical significance threshold within the A/B tool.

## Out of Scope

- Any change to the cart line item, quantity stepper, cross-sell "We think you'll also love" block, subtotal, or SECURE CHECKOUT button.
- Any countdown, timer, or live "reserved for mm:ss" mechanic.
- Any change to inventory handling (the store does not actually reserve cart inventory; see Further Notes).
- Any nudge outside the cart drawer (PDP, mini-cart badge, checkout page).
- Translated copy (all published markets are English; localization here is currency only).
- Showing the bar on an empty cart.

## Further Notes

- **Facts verified on the live store (2026-07-30):**
  - The cart drawer is titled "Your Cart" (Recoleta serif heading), with an X to close and a thin hairline divider under the heading. Below sits the line item, a cream `#FBF6EE` "We think you'll also love" cross-sell block with green `#4B897D` "Add" pills, then SUBTOTAL and a SECURE CHECKOUT button.
  - There is empty white space directly under the "Your Cart" heading, which is the native slot this bar fills.
  - Shipping: free US shipping is unconditional ("Free US shipping today"; announcement bar "we ship to 220 countries including Canada, UK, Australia"). There is no free-shipping threshold or progress bar in the drawer.
  - Design tokens: body font Sofia; headings Recoleta (serif); text `#1A1B18`; store green accent `#4B897D`; cream section background `#FBF6EE`; current-price coral `#ff856b`.
  - Localization: `html lang="en"`, `Shopify.locale="en"`, active currency per geo (EUR observed from a EU geo; base USD). Published markets are US (default) and Canada (`/en-ca`), both English. hreflang alternates `x-default`, `en`, `en-ca`. No non-English markets, no visible language switcher.
- **Localization note.** The brief asks for copy localized to each market/language. The store serves English in every published market and localizes currency only, not language. So the bar copy stays English across US and Canada, and no translation is needed for this test. If a non-English market is later published, the line "Good choice! Your selection is being reserved." must be translated before the test runs there.
- **Claims / compliance (needs client sign-off).** The line "Your selection is being reserved" is **not literally true**: Shopify does not hold or reserve inventory while items sit in a cart. On a pediatrician-developed, clean-label, trust-first kids' brand, a false reservation/scarcity claim carries brand and regulatory risk, and this style of wording is named as a "false scarcity" dark pattern by the FTC (US) and under EU consumer-protection guidance. The client chose to keep the exact briefed wording; this note records the risk. Recommended safer alternatives if legal does not approve the current line: "Good choice! Your selection is saved and ready to check out." or "Good choice! We'll hold this in your cart for you."
- **Dark-pattern guardrail.** Per the decisions above there is no timer, no countdown, and no fake deadline. The only outstanding claim risk is the "reserved" wording flagged above.
- **Attribution / confounds.** Only one element differs between Control and Variant. Keep both groups on the same drawer version for the duration; do not ship other cart-drawer changes while the test runs (one test per surface at a time).
- **Publishing note.** No issue tracker is configured in this repo and the request was for the PRD only, so this spec is delivered as a markdown file rather than published to a tracker.

## Build Blockers

- **Copy sign-off:** the "Your selection is being reserved" line needs client/legal approval before build, because it is not literally true (see Claims / compliance). If not approved, swap in one of the recommended safer lines above; everything else in this spec is unaffected.

## Preview

_populated after implementation_
