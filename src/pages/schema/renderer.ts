import { SchemaBlock, SchemaField } from "interface"
import { generateSchemaRow } from "utils-dom"

const btnClose: HTMLButtonElement | null = document.querySelector('button[title="Close window"]')

// basic window controls - close, maximize, minimize (default Windows top menu is hidden)
btnClose?.addEventListener('click', () => {
  window.SchemaWindow.defaultWindowControls('close')
})

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
  window.Main["schema:writeToFile"](schemas)

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
