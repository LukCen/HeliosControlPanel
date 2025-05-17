import { SchemaBlock } from "interface"

// window controls
const btnClose: HTMLButtonElement | null = document.querySelector('button[title="Close window"]')
btnClose?.addEventListener('click', () => {
  window.Connection.defaultWindowControls('close')
})



const btnPushConnection: HTMLButtonElement | null = document.querySelector('button#btn-push-connection') // adds a new conn to the conn list
const btnChooseConnectionSchema: HTMLSelectElement | null = document.querySelector('select') // schema select dropdown
const generatedConnectionData: HTMLFormElement | null = document.querySelector('.generated-connection-data') // form generated from selected schema - based on JSON contents
const connectionListContainer: HTMLUListElement | null = document.querySelector('.connection-container') // ul where connections will be inserted
const dataElements: SchemaBlock[] = [] // individual elements received from the schema file



// check for window type - will be used for all windows later on, prevents code from running from the wrong window
if (document.body.dataset.windowType === "add-connection") {
  getSchemaList()

  btnChooseConnectionSchema?.addEventListener('change', () => {
    generateConnectionFormFromSchema()
  })
}

function getSchemaList() {
  window.Connection["connection:fetchSchemaList"]() // extract schema data - sent from the main
  window.Connection["connection:fetchSchemaListResponse"]((data: object) => { // parse and process data from the schema file
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
  return connectionDataContainer
}

btnPushConnection?.addEventListener('click', () => {
  window.Connection["connection:pushConnection"]()
})

function pushConnectionData() {
  console.log('pushConnectionDataExecuted')
  const connectionData = parseConnectionData()
  console.log(connectionData)
  const connectionTemplate: HTMLTemplateElement | null = document.querySelector('.connection-container template')
  const clone = connectionTemplate?.content.cloneNode(true) as HTMLElement
  for (const k in connectionData) {
    const connectionId: HTMLDivElement | null = clone?.querySelector('.connection-id')
    const connectionName: HTMLDivElement | null = clone?.querySelector('.connection-name')
    const connectionStatus: HTMLDivElement | null = clone?.querySelector('.connection-status')

    // TODO : replace with proper typing at some point
    if (connectionId) {
      connectionId.innerText = connectionListContainer?.childNodes.length as unknown as string
    }
    if (connectionName) {
      connectionName.innerText = Object.values(connectionData[k]) as unknown as string
    }

    if (connectionStatus) {
      connectionStatus.innerText = "OK"
    }
    console.dir(connectionId)
    console.dir(connectionName)
    console.dir(connectionStatus)
  }
  if (document.body.dataset.windowType === "main") {
    connectionListContainer?.appendChild(clone)
  }
  console.log('function executed')
}
window.Connection["connection:pushConnectionItem"](() => {
  console.log('executed')
  pushConnectionData()
})
