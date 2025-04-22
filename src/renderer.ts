import { Schema } from "./interface"
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

// testing
const rowAsObject: Record<string, Array<string | unknown[]>> = {}
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

    if (!rowAsObject[newRowName]) {
      rowAsObject[newRowName] = []
    }

    (rowAsObject[newRowName] as unknown as Array<Schema>).push(newRowValue)
  }

})



btnCreateNewSchema?.addEventListener('click', () => {
  // window.Main.bridgeFunction({ rowAsObject: rowAsObject as unknown as JSON })
  window.Main.bridgeFunction(rowAsObject)
  return
})
