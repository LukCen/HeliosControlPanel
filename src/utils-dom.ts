
import { Schema, SchemaField } from 'interface';

//-------------------------------------------------------------------------------------------------------------------------
// Predefined color object
const colors: Record<string, number> = {
  red: 9,
  green: 10,
  blue: 12,
  yellow: 11,
  magenta: 13,
  cyan: 14,
  white: 15,
  black: 0,
  grey: 234, // dark grey
  mint: 49,  // mint green
};

/**
 * Quick and dirty way to color your terminal console logs.
 * Works in the bash terminal, should work in the browser console as well.
 * @param {string} text - contents of your message
 * @param {string} colorName - color your message will have, based on the following list: <br>
 * - red
 * - green
 * - blue
 * - yellow
 * - magenta
 * - cyan
 * - white
 * - black
 * - grey
 * - mint
 *
 * Can be viewed and modified inside src/utils/utils.ts
 */
export function colorLog(text: string, colorName: string) {
  const colorCode = colors[colorName];
  if (colorCode !== undefined) {
    const color = `\x1b[38;5;${colorCode}m`;
    const reset = '\x1b[0m';
    console.log(`${color}${text}${reset}`);
  } else {
    console.log('Color not found!');
  }
}
//-------------------------------------------------------------------------------------------------------------------------

export function generateSchemaRow(field: SchemaField) {

  const row: HTMLLIElement | null = document.createElement('li')
  row.classList.add('flex', 'w-full', 'gap-1', 'even:bg-plum', 'odd:bg-violet')

  Object.entries(field).forEach(([key, val]) => {
    const dataBlock = document.createElement('div')
    dataBlock.classList.add('flex', 'justify-center', 'items-center', 'px-2', 'py-1')
    dataBlock.innerText = `${val}`
    row.appendChild(dataBlock)
  })
  return row
}



