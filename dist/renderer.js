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
  var schemas = [];
  var tempFields = [];
  btnCreateNewRow?.addEventListener("click", () => {
    const newField = {
      key: schemaKey?.value || "",
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
    window.Main.bridgeFunction(schemas);
    schemas = [];
    tempFields = [];
    if (schemaUl) {
      schemaUl.innerHTML = "";
    }
    if (schemaPreview) {
      schemaPreview.innerText = JSON.stringify(schemas, null, 2);
    }
  });
  var btnAddNewConnection = document.querySelector("button#btn-add-connection");
  var btnPushConnection = document.querySelector("button#btn-push-connection");
  var btnChooseConnectionSchema = document.querySelector("select");
  var generatedConnectionData = document.querySelector(".generated-connection-data");
  var dataElements = [];
  btnAddNewConnection?.addEventListener("click", () => {
    window.Main.openAddConnectionWindow();
  });
  if (document.body.dataset.windowType === "add-connection") {
    getSchemaList();
    console.log("SCHEMA LIST IS HERE");
    btnChooseConnectionSchema?.addEventListener("change", () => {
      const currentlySelectedSchemaName = btnChooseConnectionSchema.value;
      const currentlySelectedSchemaValues = dataElements.find((elem) => elem.name === currentlySelectedSchemaName) || null;
      if (generatedConnectionData?.hasChildNodes) {
        generatedConnectionData.innerHTML = "";
      }
      for (let i = 0; i < dataElements.length; i++) {
        const schemaFormBlock = document.createElement("div");
        schemaFormBlock.classList.add("flex", "flex-col");
        const schemaFormLabel = document.createElement("label");
        schemaFormLabel.setAttribute("for", dataElements[i].name);
        schemaFormLabel.innerText = currentlySelectedSchemaValues?.fields[i].key;
        const schemaFormInput = document.createElement("input");
        schemaFormInput.classList.add("text-smoky", "border-2", "rounded-md", "px-4", "py-2");
        schemaFormInput.id = dataElements[i].name;
        schemaFormInput.placeholder = currentlySelectedSchemaValues?.fields[i].value;
        schemaFormBlock.append(schemaFormLabel, schemaFormInput);
        generatedConnectionData?.appendChild(schemaFormBlock);
      }
      console.log(currentlySelectedSchemaValues?.fields[0].key);
    });
  }
  function getSchemaList() {
    window.Main.fetchSchemaList();
    window.Main.fetchSchemaListResponse((data) => {
      data.forEach((elem) => {
        const schemaItem = document.createElement("option");
        schemaItem.classList.add("text-smoky", "px-4", "py-2");
        schemaItem.innerText = elem.name;
        btnChooseConnectionSchema?.appendChild(schemaItem);
        dataElements.push(elem);
      });
    });
  }
})();
