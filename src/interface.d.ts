export interface Main {
  /**
   * Main window controls - close, maximize, minimize
   * @param {string} payload - simple string serving as the name of the action to execute 
   * @returns no return value, executes an action
   */
  defaultWindowControls: (payload: string) => void

  /**
   *  Opens a window for creating new schemas
   * @returns 
   */
  openNewSchemaWindow: () => void
}

declare global {
  interface Window {
    Main: Main
  }
}
