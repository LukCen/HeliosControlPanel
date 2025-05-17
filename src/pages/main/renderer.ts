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

// opens the window for creating new schemas
btnAddNewSchema?.addEventListener('click', window.Main.openNewSchemaWindow)

// open connection window
const btnAddNewConnection: HTMLButtonElement | null = document.querySelector('button#btn-add-connection')
btnAddNewConnection?.addEventListener('click', () => {
  window.Main["connection:openWindow"]()
})
