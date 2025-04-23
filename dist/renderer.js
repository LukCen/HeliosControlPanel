"use strict";
(() => {
  // src/utils-dom.ts
  function generateSchemaRow(contents) {
    const { key, value, type, required } = contents;
    console.dir(contents, { depth: null });
    const row = document.createElement("li");
    row.classList.add("flex", "w-full", "gap-1", "even:bg-plum", "odd:bg-violet");
    for (let i = 0; i < Object.keys(contents).length; i++) {
      const dataBlock = document.createElement("div");
      dataBlock.classList.add("flex", "justify-center", "items-center", "px-2", "py-1");
      dataBlock.innerText = Object.values(contents)[i];
      row.appendChild(dataBlock);
    }
    return row;
  }

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
  var schemaName = document.querySelector("input#schema-name");
  var schemaKey = document.querySelector("input#schema-key");
  var schemaValue = document.querySelector("input#schema-value");
  var schemaType = document.querySelector("select#schema-type");
  var schemaRequired = document.querySelector("input#schema-required");
  var schemaPreview = document.querySelector("code");
  var btnCreateNewRow = document.querySelector("button#add-new-row");
  var btnCreateNewSchema = document.querySelector("button#add-new-schema");
  var schemaUl = document.querySelector("ul");
  var rowAsObject = {};
  btnCreateNewRow?.addEventListener("click", () => {
    const preview = {
      name: schemaName?.value || "",
      key: schemaKey?.value || "",
      value: schemaValue?.value || "",
      type: schemaType?.value || "",
      required: schemaRequired?.checked || false
    };
    if (schemaPreview) {
      schemaUl?.appendChild(generateSchemaRow(preview));
      const newRowName = preview.name;
      const newRowValue = { ...preview };
      delete newRowValue.name;
      if (!rowAsObject[newRowName]) {
        rowAsObject[newRowName] = [];
      }
      rowAsObject[newRowName].push(newRowValue);
    }
  });
  btnCreateNewSchema?.addEventListener("click", () => {
    window.Main.bridgeFunction(rowAsObject);
    return;
  });
  var btnAddNewConnection = document.querySelector("button#btn-add-connection");
  btnAddNewConnection?.addEventListener("click", () => {
    window.Main.openAddConnectionWindow();
  });
})();
