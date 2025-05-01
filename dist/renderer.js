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
  var dataElementNames = [];
  btnAddNewConnection?.addEventListener("click", () => {
    window.Main.openAddConnectionWindow();
  });
  if (document.body.dataset.windowType === "add-connection") {
    getSchemaList();
    console.log("SCHEMA LIST IS HERE");
    btnChooseConnectionSchema?.addEventListener("change", () => {
      const currentDataElementValues = Object.values(dataElements[0])[0][0];
      if (generatedConnectionData?.hasChildNodes) {
        generatedConnectionData.innerHTML = "";
      }
      for (let i = 0; i < dataElements.length; i++) {
        const itemWrapper = document.createElement("div");
        itemWrapper.classList.add("flex", "flex-col", "gap-4");
        const listItemLabel = document.createElement("label");
        const listItem = document.createElement("input");
        listItem.classList.add("border", "border-smoky", "rounded-md");
        listItemLabel.setAttribute("for", dataElementNames[i]);
        listItemLabel.textContent = Object.values(currentDataElementValues)[i];
        listItem.id = dataElementNames[i];
        itemWrapper.append(listItemLabel, listItem);
        generatedConnectionData?.appendChild(itemWrapper);
      }
      console.log(Object.keys(currentDataElementValues));
      console.log(Object.values(currentDataElementValues)[0]);
    });
  }
  function getSchemaList() {
    window.Main.fetchSchemaList();
    window.Main.fetchSchemaListResponse((data) => {
      data.forEach((elem) => {
        const option = document.createElement("option");
        option.innerText = Object.keys(elem)[0];
        btnChooseConnectionSchema?.appendChild(option);
        dataElements.push(elem);
        dataElementNames.push(Object.keys(elem)[0]);
      });
    });
  }
})();
