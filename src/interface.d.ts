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
  fetchSchemaList: () => void,
  fetchSchemaListResponse: (response: object | string) => object | string
  pushConnection: (content: Record<number, Record<string, string>>) => Record<number, Record<string, string>> // add connection to the connection list in main window
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

/**
 * This is the name for an individual row of data in your schemas
 */
export type SchemaField = {
  value: string;
  type: string;
  required: boolean;
}


/**
 * A single schema-like 'object', composed of multiple SchemaFields.
 */
export type SchemaBlock = {
  name: string
  fields: SchemaField[]
}

declare global {
  interface Window {
    Main: Main
  }
}
