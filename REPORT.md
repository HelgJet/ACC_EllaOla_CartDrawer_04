# ACC_EllaOla_CartDrawer_04 experiment report

- Experiment: EXP-0012
- Status: READY_FOR_REVIEW (awaiting human approval)
- Branch: ai-ACC_EllaOla_CartDrawer_04
- Updated: 2026-08-14T12:18:01.993Z

## Brief

> # PRD — Cart Drawer: Reassurance Nudge Under "Your Cart"
> 
> **Client:** EllaOla
> **Test name:** ACC_EllaOla_CartDrawer_04
> **Site url:** https://ellaola.com/  
> **Surface:** Cart Drawer (site-wide, opens on Add to Cart and on cart icon click)
> **Test type:** A/B, add a static reassurance nudge bar at the top of the cart drawer
> **Audience trigger:** `Cart.opened`
> **Date:** 2026-07-30
> **Status:** Ready for build (one claim needs client sign-off, see Build Blockers)
> **Supersedes:** None (no known live test on the cart drawer)
> 
> ---
> 
> ## Problem Statement
> 
> When the cart drawer opens, the shopper sees the line item, a cross-sell block, the subtotal, and a SECURE CHECKOUT button. There is nothing at the top of the drawer that affirms the choice they just made or gives them a reason to keep moving. The moment right after Add to Cart is where hesitation creeps in ("do I really want this, do I need to think about it"). The empty space directly under the "Your Cart" heading is a natural spot to reinforce the decision and nudge the shopper toward checkout.
> 
> ## Solution
> 
> Add a single **static reassurance bar** at the top of the cart drawer, directly under the "Your Cart" heading and above the existing hairline divider. It reads:
> 
> > **Good choice! Your selection is being reserved.**
> 
> The bar is styled to feel native to EllaOla: a soft sage background (the store green `#4B897D` at low opacity), dark green text, and a small check icon to the left. It is full width within the drawer's padding, sits as its own band, and does not push the line items or checkout button around.
> 
> It renders only when the cart has at least one item, so it always references a real selection. It appears on every cart open across all products, on desktop and mobile. Nothing else in the drawer changes.
> 
> The bet is **reassurance / affirmation at the decision point**: confirming the shopper made a good choice, at the exact moment the drawer opens, reduces second-guessing and encourages them to proceed to checkout.
> 
> ## Hypothesis
> 
> **IF** we add a reassurance nudge at the top of the cart drawer,
> **THEN** conversion rate increases,
> **BECAUSE** it affirms the shopper's choice and encourages them to take the next step toward checkout.
> 
> **Primary trigger:** Nudging (reassurance / affirmation).
> 
> ## User Stories
> 
> 1. As a shopper who just added an item, I want a quick affirmation that I made a good choice, so that I feel more confident continuing.
> 2. As a shopper opening the cart, I want a clear, calm message at the top of the drawer, so that the first thing I see is positive and reassuring.
> 3. As a shopper, I want the nudge to look like part of the store, so that it feels trustworthy and not like an injected pop-up.
> 4. As a shopper on mobile, I want the bar readable and well-placed at the top of the drawer, so that it does not crowd my items or the checkout button.
> 5. As a shopper who opens an empty cart, I do not want to see a message about a "selection" I have not made, so that the drawer never looks broken or misleading.
> 6. As a shopper adding any product, I want the same reassurance in the drawer, so that the experience is consistent across the catalog.
> 7. As a shopper, I want the bar to stay still and quiet (no timer, no flashing), so that it reassures rather than pressures me.
> 8. As the business, I want only this one addition between Control and Variant, so that any change in conversion is attributable to it.
> 9. As the business, I want a 50/50 split across desktop and mobile, so that the result reflects all traffic that opens the cart.
> 10. As the analytics owner, I want purchase conversion rate per group, so that I can judge the hypothesis.
> 
> ## Implementation Decisions
> 
> - **Mechanic kept after critical review.** The brief asks for a reassurance nudge at the top of the drawer. It is a clean, low-risk fit for this surface and this brand: EllaOla already leans on reassurance (45-day money-back guarantee, free US shipping, "Clinicians' Choice", SECURE CHECKOUT). Reinforcing the choice at cart-open is native to that voice. A free-shipping-progress nudge was considered and rejected, because US shipping is already free and unconditional, so there is no threshold to progress toward.
> - **Copy (locked, exact):** `Good choice! Your selection is being reserved.`
>   - English in all markets. See the localization note below.
>   - Sentence case, matching the store's UI copy style.
> - **Placement.** Full-width bar **directly under the "Your Cart" heading and above the existing hairline divider**. It reads as part of the drawer header and is the first thing seen when the drawer opens. It must not move or resize the line items, cross-sell block, subtotal, or checkout button.
> - **Visual style — native soft sage.**
>   - Background: store green `#4B897D` at low opacity (about 12 to 15 percent), rendering as a pale sage tint that sits calmly against the drawer's white/cream.
>   - Text: dark green, meeting WCAG AA contrast against the sage background (use a darkened green such as `#2F5C53` if `#4B897D` text does not clear AA on the chosen tint).
>   - Icon: a small check icon to the left of the text, same dark green as the text.
>   - Font: Sofia (store body font), roughly 13 to 14px, weight consistent with the drawer's UI text.
>   - Full width within the drawer's horizontal padding, comfortable vertical padding (about 10 to 12px), optional small 4px radius to match the store's button radius. Spacing must follow the drawer's existing rhythm.
>   - It should read as a gentle, positive affirmation, not a heavy banner. No dark/charcoal treatment (off-brand for the pastel aesthetic).
> - **Motion.** Static. No entrance animation, no countdown, no timer. The bar is simply present when the drawer opens.
> - **Empty-cart behavior.** The bar renders **only when the cart line-item count is at least 1**. On an empty cart (drawer opened via the cart icon with no items) the bar is hidden, so the "selection" wording always references a real item.
> - **Scope.** Site-wide cart drawer, every `Cart.opened` event, all products. The drawer is a single shared component, so this is one change in one place.
> - **Devices.** Desktop and mobile.
> - **Control vs Variant.** Control is the current drawer (no bar). Variant adds the bar as specified. Nothing else changes.
> - **Traffic split:** 50/50 Control vs Variant.
> - **Audience:** all visitors who open the cart drawer with at least one item.
> - **Delivery.** Built through the A/B testing tool's variant capability (or a theme-level change gated to the Variant audience). It must guarantee the placement, copy, styling, static behavior, and empty-cart rule above, and must not alter any other drawer attribute.
> 
> ## Testing Decisions
> 
> - **What makes a good test here:** verify external, user-observable behavior. In Variant, when the cart drawer opens with at least one item, a sage bar appears directly under the "Your Cart" heading reading "Good choice! Your selection is being reserved." with a check icon; it is absent in Control; it is absent on an empty cart in both groups; and it does not move the items, subtotal, or checkout button.
> - **Seam:** one seam only, a single element inserted at the top of the cart-drawer template. No other section is edited.
> - **Manual QA (desktop + mobile):**
>   - Add any product, open the drawer: the bar renders under the header, above the divider, in Sofia, with the sage background, dark green text, and check icon.
>   - Text contrast clears WCAG AA on the chosen background.
>   - The bar does not shift or resize the line item, cross-sell block, subtotal, or SECURE CHECKOUT button.
>   - Open the drawer with an empty cart (via cart icon, no items): the bar does not appear.
>   - Repeat on at least two different products to confirm it shows consistently site-wide.
>   - On a 375px viewport the bar is readable, fits the drawer width, and wraps cleanly if needed.
> - **Split/bucketing check:** about 50 percent of visitors are bucketed to each group; bucketing is stable per visitor across the session.
> - **Cross-device/browser:** Variant renders correctly across major desktop and mobile browsers (iOS Safari, Android Chrome).
> 
> ## Measurement Decisions
> 
> - **Primary success metric: Purchase conversion rate** — Control vs Variant. This is the stated hypothesis and the only tracked metric for this test.
> - Metrics come from the A/B tool and Shopify order data. The client has no Google Analytics or Microsoft Clarity access, so no scroll-depth or event-based engagement metrics are tracked.
> - Test is called when purchase conversion rate reaches an agreed statistical significance threshold within the A/B tool.
> 
> ## Out of Scope
> 
> - Any change to the cart line item, quantity stepper, cross-sell "We think you'll also love" block, subtotal, or SECURE CHECKOUT button.
> - Any countdown, timer, or live "reserved for mm:ss" mechanic.
> - Any change to inventory handling (the store does not actually reserve cart inventory; see Further Notes).
> - Any nudge outside the cart drawer (PDP, mini-cart badge, checkout page).
> - Translated copy (all published markets are English; localization here is currency only).
> - Showing the bar on an empty cart.
> 
> ## Further Notes
> 
> - **Facts verified on the live store (2026-07-30):**
>   - The cart drawer is titled "Your Cart" (Recoleta serif heading), with an X to close and a thin hairline divider under the heading. Below sits the line item, a cream `#FBF6EE` "We think you'll also love" cross-sell block with green `#4B897D` "Add" pills, then SUBTOTAL and a SECURE CHECKOUT button.
>   - There is empty white space directly under the "Your Cart" heading, which is the native slot this bar fills.
>   - Shipping: free US shipping is unconditional ("Free US shipping today"; announcement bar "we ship to 220 countries including Canada, UK, Australia"). There is no free-shipping threshold or progress bar in the drawer.
>   - Design tokens: body font Sofia; headings Recoleta (serif); text `#1A1B18`; store green accent `#4B897D`; cream section background `#FBF6EE`; current-price coral `#ff856b`.
>   - Localization: `html lang="en"`, `Shopify.locale="en"`, active currency per geo (EUR observed from a EU geo; base USD). Published markets are US (default) and Canada (`/en-ca`), both English. hreflang alternates `x-default`, `en`, `en-ca`. No non-English markets, no visible language switcher.
> - **Localization note.** The brief asks for copy localized to each market/language. The store serves English in every published market and localizes currency only, not language. So the bar copy stays English across US and Canada, and no translation is needed for this test. If a non-English market is later published, the line "Good choice! Your selection is being reserved." must be translated before the test runs there.
> - **Claims / compliance (needs client sign-off).** The line "Your selection is being reserved" is **not literally true**: Shopify does not hold or reserve inventory while items sit in a cart. On a pediatrician-developed, clean-label, trust-first kids' brand, a false reservation/scarcity claim carries brand and regulatory risk, and this style of wording is named as a "false scarcity" dark pattern by the FTC (US) and under EU consumer-protection guidance. The client chose to keep the exact briefed wording; this note records the risk. Recommended safer alternatives if legal does not approve the current line: "Good choice! Your selection is saved and ready to check out." or "Good choice! We'll hold this in your cart for you."
> - **Dark-pattern guardrail.** Per the decisions above there is no timer, no countdown, and no fake deadline. The only outstanding claim risk is the "reserved" wording flagged above.
> - **Attribution / confounds.** Only one element differs between Control and Variant. Keep both groups on the same drawer version for the duration; do not ship other cart-drawer changes while the test runs (one test per surface at a time).
> - **Publishing note.** No issue tracker is configured in this repo and the request was for the PRD only, so this spec is delivered as a markdown file rather than published to a tracker.
> 
> ## Build Blockers
> 
> - **Copy sign-off:** the "Your selection is being reserved" line needs client/legal approval before build, because it is not literally true (see Claims / compliance). If not approved, swap in one of the recommended safer lines above; everything else in this spec is unaffected.

## Specification

- Hypothesis: IF we add a static reassurance nudge bar at the top of the cart drawer, THEN purchase conversion rate increases, BECAUSE it affirms the shopper's choice at the decision point and encourages them to proceed toward checkout.
- Page types: CART
- Devices: mobile, desktop
- Audience: All visitors who open the cart drawer (Cart.opened event) with at least one item in the cart, 50/50 Control vs Variant, stable per visitor across session.
- Success criteria: In Variant, when the cart drawer opens with >= 1 item, a sage bar appears directly under the "Your Cart" heading and above the divider, reading "Good choice! Your selection is being reserved." with a check icon.; Bar is absent in Control on all carts.; Bar is absent on an empty cart in both Control and Variant.; Bar does not shift or resize the line item, cross-sell block, subtotal, or SECURE CHECKOUT button.; Bar renders consistently across at least two different products (site-wide).; On a 375px viewport the bar is readable, fits the drawer width, and wraps cleanly.; Variant renders correctly across major desktop and mobile browsers (iOS Safari, Android Chrome).; ~50% of visitors bucketed per group, stable per visitor across session.; Primary metric: purchase conversion rate per group (Control vs Variant) from A/B tool and Shopify order data.
- Assumptions: Bar sits as its own band anchored below the "Your Cart" heading; exact micro-spacing follows the drawer's existing rhythm.; 4px corner radius applied to match store button radius (marked optional in brief).; Sage tint set at the midpoint (~13-14%) of the 12-15% range unless AA contrast requires adjustment.; RISK (human review): the "Your selection is being reserved" line is not literally true; Shopify does not reserve cart inventory. Flagged as potential false-scarcity dark pattern (FTC / EU). Client chose to keep briefed wording. Safer alternatives if legal rejects: "Good choice! Your selection is saved and ready to check out." or "Good choice! We'll hold this in your cart for you."

## Environment

- Platform: shopify (confidence 1)

## Targeting

```
url: ^(https?:\/\/)?(www\.)?ellaola\.com(\/en-ca)?(\/.*)?$
who: return (
  !!window.acceleratedData?.data?.ACC_EllaOla_CartDrawer_04 ||
  (!/(Google(-Extended|-InspectionTool|bot|Other))|(Storebot-Google)/i.test(
    window.navigator?.userAgent
  ) &&
    new Promise((resolve) =>
      window.addEventListener("xlr8d--cart.opened", () => resolve(true), {
        once: true,
      })
    ))
);
```

## Selector

- Chosen: `[id*="cart-drawer" i]`

## Plan

Insert a static sage reassurance bar inside the EllaOla cart drawer, directly under the "Your Cart" heading and above the hairline divider, rendering only when the cart line-item count is >= 1. Variant-only visual change; no other drawer attribute differs from Control. The anchor is the verified cart drawer container [id*="cart-drawer" i]; the bar is inserted into the drawer header area, gated by cart item count, with a duplicate-UI guard for drawer re-renders.

- [insert/all] Bootstrap experiment ACC_EllaOla_CartDrawer_04 via acceleratedDataQueue. runAt the verified cart drawer selector [id*="cart-drawer" i], bind addContent. In addContent destructure [drawer]; determine cart line-item count (prefer cart.js item_count via this.cache(...).catch(this.error), or drawer line-item DOM count) and early-return if < 1 so the bar stays hidden on empty carts in both groups. Guard with document.querySelector('.ACC_EllaOla_CartDrawer_04-bar') before inserting. Insert the sage bar under the "Your Cart" heading and above the hairline divider using insertAdjacentHTML, containing a left check icon and verbatim copy "Good choice! Your selection is being reserved." Re-run on cart.opened / throttled observer so it reappears after re-renders without duplicating. (`[id*="cart-drawer" i]`)
- [style/all] Style .ACC_EllaOla_CartDrawer_04-bar in the variation stylesheet: full-width within the drawer padding; background sage = store green #4B897D at ~13% opacity (rgba(75,137,125,0.13)); text and check icon in dark green #2F5C53 to clear WCAG AA on the tint; Sofia body font at 13-14px; ~10-12px vertical padding; optional 4px border-radius; flex layout with the check icon left of the text and a small gap. No entrance animation, no countdown, no timer. Ensure the bar adds no margin that shifts line items, cross-sell, subtotal, or the SECURE CHECKOUT button. (`[id*="cart-drawer" i]`)

## Variations

- `variations/1/script.js`

## Validation

- static (attempt 1): passed
  - PASS has-variation
  - PASS syntax:variations/1/script.js
  - PASS uses-framework:variations/1/script.js
  - PASS has-init:variations/1/script.js
  - PASS no-eval:variations/1/script.js
  - PASS no-busy-loop:variations/1/script.js
  - PASS no-uncleared-interval:variations/1/script.js
  - PASS no-cache-on-cart-add:variations/1/script.js
  - PASS catch-this-error:variations/1/script.js
  - PASS uses-testName:variations/1/script.js
  - PASS plan-selector-used
  - PASS targeting-url-present
  - PASS targeting-url-valid-regex
  - PASS targeting-script-predicate
  - PASS style-scoped:variations/1/style.css
- visual (attempt 1): passed
  - NOTE stub visual validator: screenshots not captured offline (use Playwright path)
- browser (attempt 1): passed
  - PASS targeting.url.regexp matches https://ellaola.com/
  - PASS site selector exists (132): h1, h2, h3, header, [class*='title' i], [class*='heading' i]
  - PASS site selector exists (1): [id*="cart-drawer" i]
  - NOTE 0 ambient console error(s) on page load (not gated; variation not run here)

## Review

- agent: APPROVED
  - [info] selector-robustness: Anchor uses verified stable drawer selector with runAt and bound callback; browser validation confirms 1 match.
  - [info] experiment-isolation: Class prefix matches this.__testName (ACC_EllaOla_CartDrawer_04) consistently across JS and CSS; no parallel short alias. Test key is ACC_* and matches queue key.
  - [info] cleanup: Bar is removed when cart empties and re-guarded against duplicates; single additive node removed on experiment disable.
  - [info] performance: MutationObserver callback throttled at 150ms; PerformanceObserver wrapped in try/catch and scoped to cart mutation resources.
  - [info] requirements-coverage: Empty-cart gating implemented via cart.js item_count, plan copy is verbatim, insertion under 'Your Cart' heading with fallback to drawer top. Matches plan S1/S2.
  - [info] shopify-compatibility: cart.js GET uses this.cache with rootPath and cache-buster; no cache on cart write endpoints (read-only test). Promise chained with .catch(this.error).
  - [info] mobile-desktop: Responsive rule at max-width 749px adjusts font-size and padding; device set to all in plan; text uses overflow-wrap: anywhere to prevent overflow at narrow widths.
  - [minor] accessibility: role="status" is an ARIA live region; because the bar is inserted whenever the drawer updates and the cart is non-empty, screen readers may announce the reassurance copy on unrelated drawer re-renders. Consider a non-live container or aria-live off if repeated announcements are undesirable.
  - [info] accessibility: Icon marked aria-hidden; text color #2F5C53 on rgba(75,137,125,0.13) tint intended to meet WCAG AA per plan (needs live contrast confirmation).
  - [info] analytics: No sendAnalytics used, consistent with plan (metrics from A/B tool + Shopify order data). No unrequested analytics added.
  - [info] side-effects: No global pollution beyond queue API; observerBound flag prevents duplicate observer binding; no window globals, no manual redirects/cookies.
  - [info] targeting: Targeting excludes Google bots, early-exits when experiment already running, waits for xlr8d--cart.opened with { once: true }. URL regex valid and locale-aware.
  - [minor] conflicts: MutationObserver observes subtree with attributes:true on the whole drawer; the inserted bar and its removal/insertion can themselves trigger observer callbacks. Throttle plus duplicate guard prevent loops, but attributes:true across subtree is broad and may fire frequently on active drawers.
  - [info] security: No eval, no innerHTML +=; static markup built with literal template and inserted via insertAdjacentHTML. Copy is a fixed constant, no user input interpolated.
- agent: APPROVED

## Provenance

- brief-analyst@0.5.5 via pi/anthropic/claude-opus-4-8
- implementation-planner@0.5.5 via pi/anthropic/claude-opus-4-8
- developer@0.5.5 via pi/anthropic/claude-opus-4-8

---
_Generated by the ACC Experiment Agent Harness. The Accelerated Data runtime is provided by the experimentation platform at execution time and is not bundled; implement/review against acc-framework._
