export interface Main {
  test(): () => Promise<void>
}

declare global {
  interface Window {
    Main: Main
  }
}
