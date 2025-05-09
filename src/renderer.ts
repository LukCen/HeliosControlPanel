
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
const connectionListContainer: HTMLUListElement | null = document.querySelector('.connection-container') // ul where connections will be inserted
const dataElements: SchemaBlock[] = [] // individual elements received from the schema file

// open connection window
btnAddNewConnection?.addEventListener('click', () => {
  window.Main.openAddConnectionWindow()
})


// check for window type - will be used for all windows later on, prevents code from running from the wrong window
if (document.body.dataset.windowType === "add-connection") {
  getSchemaList()

  btnChooseConnectionSchema?.addEventListener('change', () => {
    generateConnectionFormFromSchema()
  })
}

function getSchemaList() {
  window.Main.fetchSchemaList() // extract schema data - sent from the main
  window.Main.fetchSchemaListResponse((data: object) => { // parse and process data from the schema file
    (data as SchemaBlock[]).forEach((elem: SchemaBlock) => {
      const schemaItem = document.createElement('option')
      schemaItem.classList.add('text-smoky', 'px-4', 'py-2')
      schemaItem.innerText = elem.name
      btnChooseConnectionSchema?.appendChild(schemaItem)
      dataElements.push(elem)
    })
  })
}


/**
 * Goes through the selected schema, based on its JSON contents, and generates a form for establishing a connection. 
 */
function generateConnectionFormFromSchema() {
  const currentlySelectedSchemaName = btnChooseConnectionSchema?.value // currently selected schema name
  const currentlySelectedSchemaValues = dataElements.find((elem) => elem.name === currentlySelectedSchemaName) || null // currently selected schema object
  // remove contents if has anything - anti-duplication measure
  if (generatedConnectionData?.hasChildNodes) {
    generatedConnectionData.innerHTML = ""
  }

  for (let i = 0; i < dataElements.length; i++) {
    const idToApply = `${currentlySelectedSchemaName}_${currentlySelectedSchemaValues?.fields[i].value as string}`
    const schemaFormBlock = document.createElement('div') //box for the label/input pair
    schemaFormBlock.classList.add('flex', 'flex-col')

    // create the label
    const schemaFormLabel = document.createElement('label')
    schemaFormLabel.setAttribute('for', idToApply)
    schemaFormLabel.innerText = currentlySelectedSchemaValues?.fields[i].value as string

    // create the input element
    const schemaFormInput = document.createElement('input')
    schemaFormInput.classList.add('text-smoky', 'border-2', 'rounded-md', 'px-4', 'py-2')
    schemaFormInput.id = idToApply
    schemaFormInput.placeholder = currentlySelectedSchemaValues?.fields[i].value as string

    schemaFormBlock.append(schemaFormLabel, schemaFormInput)

    generatedConnectionData?.appendChild(schemaFormBlock)
  }
}

function parseConnectionData() {
  const connectionDataContainer: Record<number, Record<string, string>> = {}
  const arrayOfConnectionElements = Array.from(generatedConnectionData as unknown as NodeListOf<HTMLElement>)
  arrayOfConnectionElements?.forEach((elem: any, i) => {
    const eK: string = elem.id
    const eV: string = elem.value
    connectionDataContainer[i] = { [eK]: eV }
  })
  console.log("Connection data container below :")
  console.dir(connectionDataContainer)
  return connectionDataContainer
}

btnPushConnection?.addEventListener('click', () => {
  const newConnectionItem: HTMLLIElement | null = document.createElement('li')
  newConnectionItem.classList.add('flex', 'gap-2', 'items-center')

  const newConnectionId: HTMLDivElement | null = document.createElement('div')
  const newConnectionName: HTMLDivElement | null = document.createElement('div')
  const newConnectionStatus: HTMLDivElement | null = document.createElement('div')

  const newConnectionButtonsContainer: HTMLDivElement | null = document.createElement('div')
  const newConnectionButtonRemove: HTMLButtonElement | null = document.createElement('button')
  const newConnectionButtonDetails: HTMLButtonElement | null = document.createElement('button')
})
