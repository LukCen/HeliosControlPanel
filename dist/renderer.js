"use strict";
(() => {
  // src/renderer.ts
  var btnClose = document.querySelector('button[title="Close window"]');
  var btnMax = document.querySelector('button[title="Maximize window"');
  var btnMin = document.querySelector('button[title="Minimize window"');
  var btnAddNewSchema = document.querySelector('button[title="Add new schema"');
  btnClose?.addEventListener("click", () => {
    window.Main.defaultWindowControls("close");
  });
  btnMax?.addEventListener("click", () => {
    window.Main.defaultWindowControls("max");
  });
  btnMin?.addEventListener("click", () => {
    window.Main.defaultWindowControls("min");
  });
  btnAddNewSchema?.addEventListener("click", window.Main.openNewSchemaWindow);
})();
