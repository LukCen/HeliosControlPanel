export interface Main {
  windowClose: () => void,
  windowMaximize: () => void,
  windowMinimize: () => void
}

declare global {
  interface Window {
    Main: Main
  }
}
