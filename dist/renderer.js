"use strict";
(() => {
  // src/renderer.ts
  var btnClose = document.querySelector('button[title="Close window"]');
  var btnMax = document.querySelector('button[title="Maximize window"');
  var btnMin = document.querySelector('button[title="Minimize window"');
  btnClose?.addEventListener("click", () => {
    window.Main.windowClose();
  });
  btnMax?.addEventListener("click", () => {
    window.Main.windowMaximize();
  });
  btnMin?.addEventListener("click", () => {
    window.Main.windowMinimize();
  });
  console.log("renderer active");
})();
