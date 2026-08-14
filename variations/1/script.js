window.acceleratedDataQueue = window.acceleratedDataQueue || [];
window.acceleratedDataQueue.push({
  ACC_EllaOla_CartDrawer_04: {
    var: {
      drawerSelector: '[id*="cart-drawer" i]',
      get rootPath() {
        return window.Shopify?.routes?.root || "/";
      },
      copy: "Good choice! Your selection is being reserved.",
      observerBound: false,
      hasItems: false,
    },

    init() {
      this.runAt(this.var.drawerSelector, this.startObserver.bind(this));
    },

    startObserver([drawer]) {
      if (this.var.observerBound) return;
      this.var.observerBound = true;

      const update = this.throttle(this.onDrawerUpdate.bind(this, drawer), 150);

      new MutationObserver(update).observe(drawer, {
        childList: true,
        subtree: true,
        attributes: true,
      });

      try {
        new PerformanceObserver((entries) => {
          const hit = entries
            .getEntriesByType("resource")
            .some(({ name }) =>
              /\/cart\/(change|add|clear|update)/i.test(name)
            );
          if (hit) {
            this.var.hasItems = false;
            this.fetchCount(update);
          }
        }).observe({ entryTypes: ["resource"] });
      } catch (e) {
        this.error("PerformanceObserver failed:", e);
      }

      this.fetchCount(update);
      update();
    },

    fetchCount(cb) {
      this.cache(`${this.var.rootPath}cart.js?v=${Date.now()}`)
        .then((cart) => {
          this.var.hasItems = !!(cart && (cart.item_count || 0) >= 1);
          if (typeof cb === "function") cb();
        })
        .catch(this.error);
    },

    onDrawerUpdate(drawer) {
      const tn = this.__testName;
      const existing = drawer.querySelector(`.${tn}-bar`);
      if (!this.var.hasItems) {
        if (existing) existing.remove();
        return;
      }
      if (existing) return;
      this.renderBar(drawer);
    },

    findHeading(drawer) {
      const nodes = drawer.querySelectorAll("h1, h2, h3, header, [class*='title' i], [class*='heading' i]");
      for (const node of nodes) {
        const txt = (node.textContent || "").trim().toLowerCase();
        if (txt === "your cart" || txt.startsWith("your cart")) return node;
      }
      return null;
    },

    renderBar(drawer) {
      const tn = this.__testName;
      if (drawer.querySelector(`.${tn}-bar`)) return;

      const bar = `<div class="${tn}-bar" role="status">` +
        `<span class="${tn}-icon" aria-hidden="true">` +
        `<svg viewBox="0 0 20 20" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">` +
        `<path d="M4 10.5L8 14.5L16 6" stroke="#2F5C53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
        `</svg>` +
        `</span>` +
        `<span class="${tn}-text">${this.var.copy}</span>` +
        `</div>`;

      const heading = this.findHeading(drawer);
      if (heading) {
        heading.insertAdjacentHTML("afterend", bar);
      } else {
        drawer.insertAdjacentHTML("afterbegin", bar);
      }
    },
  },
});