return (
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
