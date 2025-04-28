
import { Schema } from "./interface"
import { colorLog, generateSchemaRow } from "./utils-dom"



// main window nav bar menu - topside main window
const btnClose: HTMLButtonElement | null = document.querySelector('button[title="Close window"]')
const btnMax: HTMLButtonElement | null = document.querySelector('button[title="Maximize window"')
const btnMin: HTMLButtonElement | null = document.querySelector('button[title="Minimize window"')

const btnAddNewSchema: HTMLButtonElement | null = document.querySelector('button[title="Add new schema"')

// basic window controls - close, maximize, minimize (default Windows top menu is hidden)
btnClose?.addEventListener('click', () => {
  window.Main.defaultWindowControls('close')
})
btnMax?.addEventListener('click', () => {
  window.Main.defaultWindowControls('max')
})
btnMin?.addEventListener('click', () => {
  window.Main.defaultWindowControls('min')
})

btnAddNewSchema?.addEventListener('click', window.Main.openNewSchemaWindow)

// add schema window
const schemaName: HTMLInputElement | null = document.querySelector('input#schema-name')
const schemaKey: HTMLInputElement | null = document.querySelector('input#schema-key')
const schemaValue: HTMLInputElement | null = document.querySelector('input#schema-value')
const schemaType: HTMLSelectElement | null = document.querySelector('select#schema-type')
const schemaRequired: HTMLInputElement | null = document.querySelector('input#schema-required')
const schemaPreview: HTMLElement | null = document.querySelector('code')

const btnCreateNewRow: HTMLButtonElement | null = document.querySelector('button#add-new-row')
const btnCreateNewSchema: HTMLButtonElement | null = document.querySelector('button#add-new-schema')
const schemaUl: HTMLUListElement | null = document.querySelector('ul')

// testing
let rowAsObject: Record<string, Array<string | unknown[]>> = {}
btnCreateNewRow?.addEventListener('click', () => {
  const preview: Schema = {
    name: schemaName?.value || '',
    key: schemaKey?.value || '',
    value: schemaValue?.value || '',
    type: schemaType?.value || '',
    required: schemaRequired?.checked || false
  }


  if (schemaPreview) {
    schemaUl?.appendChild(generateSchemaRow(preview))
    const newRowName: string = preview.name as string
    const newRowValue = { ...preview }
    delete newRowValue.name // clean up 'name' from row content
    let arrWithData: Schema[] = (rowAsObject[newRowName] as unknown as Array<Schema>)

    if (!rowAsObject[newRowName]) {
      rowAsObject[newRowName] = []
    }
    if (arrWithData.length > 0) {
      arrWithData = []
    }
    arrWithData.push(newRowValue)
  }

})

btnCreateNewSchema?.addEventListener('click', () => {
  // window.Main.bridgeFunction({ rowAsObject: rowAsObject as unknown as JSON })
  window.Main.bridgeFunction(rowAsObject)
  if (schemaUl) {
    schemaUl.innerHTML = ''
  }
  rowAsObject = {}
  return
})

// connection list

const btnAddNewConnection: HTMLButtonElement | null = document.querySelector('button#btn-add-connection') // opens a window to create new conn
const btnPushConnection: HTMLButtonElement | null = document.querySelector('button#btn-push-connection') // adds a new conn to the conn list
const btnChooseConnectionSchema: HTMLSelectElement | null = document.querySelector('select') // schema select dropdown
const generatedConnectionData: HTMLFormElement | null = document.querySelector('.generated-connection-data') // form generated from selected schema - based on JSON contents

const dataElements: object[] = [] // individual elements received from the schema file
const dataElementNames: string[] = []
btnAddNewConnection?.addEventListener('click', () => {

  window.Main.openAddConnectionWindow()
})

if (document.body.dataset.windowType === "add-connection") {
  getSchemaList()
  // const selectedSchema: HTMLOptionElement | null = document.querySelector("option").selected
  console.log("SCHEMA LIST IS HERE")
  btnChooseConnectionSchema?.addEventListener('change', () => {
    for (let i = 0; i < dataElements.length; i++) {
      const itemWrapper = document.createElement('div')
      itemWrapper.classList.add('flex', 'flex-col', 'gap-4')

      const listItemLabel = document.createElement('label')
      const listItem = document.createElement('input')

      listItemLabel.setAttribute('for', dataElementNames[i])
      listItemLabel.textContent = dataElementNames[i]
      listItem.id = dataElementNames[i]
      itemWrapper.append(listItemLabel, listItem)

      generatedConnectionData?.appendChild(itemWrapper)

    }
    console.log(dataElements[0])
    console.log(dataElementNames)

  })
}

function getSchemaList() {
  window.Main.fetchSchemaList()
  window.Main.fetchSchemaListResponse((data: object) => {
    (data as Array<object>).forEach((elem: object) => {
      // console.dir(Object.keys(elem)[0])
      const option = document.createElement('option')
      option.innerText = Object.keys(elem)[0]
      btnChooseConnectionSchema?.appendChild(option)
      dataElements.push(elem)
      dataElementNames.push(Object.keys(elem)[0])
    })
  })
}


