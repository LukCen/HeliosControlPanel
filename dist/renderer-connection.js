"use strict";
(() => {
  // src/pages/connection/renderer.ts
  var btnClose = document.querySelector('button[title="Close window"]');
  btnClose?.addEventListener("click", () => {
    window.Connection.defaultWindowControls("close");
  });
  var btnPushConnection = document.querySelector("button#btn-push-connection");
  var btnChooseConnectionSchema = document.querySelector("select");
  var generatedConnectionData = document.querySelector(".generated-connection-data");
  var connectionListContainer = document.querySelector(".connection-container");
  var dataElements = [];
  if (document.body.dataset.windowType === "add-connection") {
    getSchemaList();
    btnChooseConnectionSchema?.addEventListener("change", () => {
      generateConnectionFormFromSchema();
    });
  }
  function getSchemaList() {
    window.Connection["connection:fetchSchemaList"]();
    window.Connection["connection:fetchSchemaListResponse"]((data) => {
      data.forEach((elem) => {
        const schemaItem = document.createElement("option");
        schemaItem.classList.add("text-smoky", "px-4", "py-2");
        schemaItem.innerText = elem.name;
        btnChooseConnectionSchema?.appendChild(schemaItem);
        dataElements.push(elem);
      });
    });
  }
  function generateConnectionFormFromSchema() {
    const currentlySelectedSchemaName = btnChooseConnectionSchema?.value;
    const currentlySelectedSchemaValues = dataElements.find((elem) => elem.name === currentlySelectedSchemaName) || null;
    if (generatedConnectionData?.hasChildNodes) {
      generatedConnectionData.innerHTML = "";
    }
    for (let i = 0; i < dataElements.length; i++) {
      const idToApply = `${currentlySelectedSchemaName}_${currentlySelectedSchemaValues?.fields[i].value}`;
      const schemaFormBlock = document.createElement("div");
      schemaFormBlock.classList.add("flex", "flex-col");
      const schemaFormLabel = document.createElement("label");
      schemaFormLabel.setAttribute("for", idToApply);
      schemaFormLabel.innerText = currentlySelectedSchemaValues?.fields[i].value;
      const schemaFormInput = document.createElement("input");
      schemaFormInput.classList.add("text-smoky", "border-2", "rounded-md", "px-4", "py-2");
      schemaFormInput.id = idToApply;
      schemaFormInput.placeholder = currentlySelectedSchemaValues?.fields[i].value;
      schemaFormBlock.append(schemaFormLabel, schemaFormInput);
      generatedConnectionData?.appendChild(schemaFormBlock);
    }
  }
  function parseConnectionData() {
    const connectionDataContainer = {};
    const arrayOfConnectionElements = Array.from(generatedConnectionData);
    arrayOfConnectionElements?.forEach((elem, i) => {
      const eK = elem.id;
      const eV = elem.value;
      connectionDataContainer[i] = { [eK]: eV };
    });
    return connectionDataContainer;
  }
  btnPushConnection?.addEventListener("click", () => {
    window.Connection["connection:pushConnection"]();
  });
  function pushConnectionData() {
    console.log("pushConnectionDataExecuted");
    const connectionData = parseConnectionData();
    console.log(connectionData);
    const connectionTemplate = document.querySelector(".connection-container template");
    const clone = connectionTemplate?.content.cloneNode(true);
    for (const k in connectionData) {
      const connectionId = clone?.querySelector(".connection-id");
      const connectionName = clone?.querySelector(".connection-name");
      const connectionStatus = clone?.querySelector(".connection-status");
      if (connectionId) {
        connectionId.innerText = connectionListContainer?.childNodes.length;
      }
      if (connectionName) {
        connectionName.innerText = Object.values(connectionData[k]);
      }
      if (connectionStatus) {
        connectionStatus.innerText = "OK";
      }
      console.dir(connectionId);
      console.dir(connectionName);
      console.dir(connectionStatus);
    }
    if (document.body.dataset.windowType === "main") {
      connectionListContainer?.appendChild(clone);
    }
    console.log("function executed");
  }
  window.Connection["connection:pushConnectionItem"](() => {
    console.log("executed");
    pushConnectionData();
  });
})();
