const btnClose: HTMLButtonElement | null = document.querySelector('button[title="Close window"]')
const btnMax: HTMLButtonElement | null = document.querySelector('button[title="Maximize window"')
const btnMin: HTMLButtonElement | null = document.querySelector('button[title="Minimize window"')

// main window nav bar menu - topside main window
// basic window controls - close, maximize, minimize (default Windows top menu is hidden)
btnClose?.addEventListener('click', () => {
  window.Main.windowClose()
})
btnMax?.addEventListener('click', () => {
  window.Main.windowMaximize()
})
btnMin?.addEventListener('click', () => {
  window.Main.windowMinimize()
})

console.log('renderer active')
