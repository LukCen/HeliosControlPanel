"use strict";
(() => {
  // src/utils-dom.ts
  function generateSchemaRow(field) {
    const row = document.createElement("li");
    row.classList.add("flex", "w-full", "gap-1", "even:bg-plum", "odd:bg-violet");
    Object.entries(field).forEach(([key, val]) => {
      const dataBlock = document.createElement("div");
      dataBlock.classList.add("flex", "justify-center", "items-center", "px-2", "py-1");
      dataBlock.innerText = `${val}`;
      row.appendChild(dataBlock);
    });
    return row;
  }

  // src/pages/schema/renderer.ts
  var btnClose = document.querySelector('button[title="Close window"]');
  btnClose?.addEventListener("click", () => {
    window.SchemaWindow.defaultWindowControls("close");
  });
  var schemaName = document.querySelector("input#schema-name");
  var schemaKey = document.querySelector("input#schema-key");
  var schemaValue = document.querySelector("input#schema-value");
  var schemaType = document.querySelector("select#schema-type");
  var schemaRequired = document.querySelector("input#schema-required");
  var schemaPreview = document.querySelector("code");
  var btnCreateNewRow = document.querySelector("button#add-new-row");
  var btnCreateNewSchema = document.querySelector("button#add-new-schema");
  var schemaUl = document.querySelector("ul");
  var schemas = [];
  var tempFields = [];
  btnCreateNewRow?.addEventListener("click", () => {
    const newField = {
      value: schemaValue?.value || "",
      type: schemaType?.value || "",
      required: schemaRequired?.checked || false
    };
    tempFields.push(newField);
    if (schemaUl) {
      schemaUl.appendChild(generateSchemaRow(newField));
    }
  });
  btnCreateNewSchema?.addEventListener("click", () => {
    const newSchema = {
      name: schemaName?.value || `Unnamed schema ${schemas.length + 1}`,
      fields: tempFields
    };
    schemas.push(newSchema);
    window.Main["schema:writeToFile"](schemas);
    schemas = [];
    tempFields = [];
    if (schemaUl) {
      schemaUl.innerHTML = "";
    }
    if (schemaPreview) {
      schemaPreview.innerText = JSON.stringify(schemas, null, 2);
    }
  });
})();
