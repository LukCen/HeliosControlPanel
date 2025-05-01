
import { SchemaBlock, SchemaField } from "./interface"
import { generateSchemaRow } from "./utils-dom"



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

// new schema creation logic
let schemas: SchemaBlock[] = []
let tempFields: SchemaField[] = []

btnCreateNewRow?.addEventListener('click', () => {
  const newField: SchemaField = {
    key: schemaKey?.value || '',
    value: schemaValue?.value || '',
    type: schemaType?.value || '',
    required: schemaRequired?.checked || false
  }
  tempFields.push(newField)
  if (schemaUl) {
    schemaUl.appendChild(generateSchemaRow(newField))
  }
})

btnCreateNewSchema?.addEventListener('click', () => {

  const newSchema: SchemaBlock = {
    name: schemaName?.value || `Unnamed schema ${schemas.length + 1}`,
    fields: tempFields
  }
  schemas.push(newSchema)
  window.Main.bridgeFunction(schemas)

  // reset to prevent data doubling
  schemas = []
  tempFields = []
  if (schemaUl) {
    schemaUl.innerHTML = ''
  }
  if (schemaPreview) {
    schemaPreview.innerText = JSON.stringify(schemas, null, 2)
  }
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
    const currentDataElementValues = Object.values(dataElements[0])[0][0] // i hate this so fucking much but this may do for now
    // remove contents if has anything - anti-duplication measure
    if (generatedConnectionData?.hasChildNodes) {
      generatedConnectionData.innerHTML = ""
    }

    for (let i = 0; i < dataElements.length; i++) {
      const itemWrapper = document.createElement('div')
      itemWrapper.classList.add('flex', 'flex-col', 'gap-4')

      const listItemLabel = document.createElement('label')
      const listItem = document.createElement('input')
      listItem.classList.add('border', 'border-smoky', 'rounded-md')

      listItemLabel.setAttribute('for', dataElementNames[i])
      listItemLabel.textContent = Object.values(currentDataElementValues)[i] as unknown as string
      listItem.id = dataElementNames[i]
      itemWrapper.append(listItemLabel, listItem)

      generatedConnectionData?.appendChild(itemWrapper)

    }
    console.log(Object.keys(currentDataElementValues))
    console.log(Object.values(currentDataElementValues)[0])
    // console.log(dataElementNames)

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


