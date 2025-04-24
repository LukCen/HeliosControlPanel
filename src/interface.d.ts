export interface Main {
  /**
   * Main window controls - close, maximize, minimize
   * @param {string} payload - simple string serving as the name of the action to execute 
   * @returns no return value, executes an action
   */
  defaultWindowControls: (payload: string) => void

  /**
   *  Opens a window for creating new schemas
   */
  openNewSchemaWindow: () => void
  bridgeFunction: (contentToWrite: unknown) => void, // func for writing to schema file - rename later
  openAddConnectionWindow: () => void,
  fetchSchemaList: () => void
  pushConnection: (content: object | string) => object | string
}

/**
 * Interface with types for creating new schema objects ('blueprints' for your database requests) - used in addSchema window
 * Key-value pairs are added via a local function called 'generateSchemaRow'
 */
export interface Schema {
  name?: string,
  key: string,
  value: string | number | string[] | number[] | null
  type: string,
  required: boolean
}

declare global {
  interface Window {
    Main: Main
  }
}
