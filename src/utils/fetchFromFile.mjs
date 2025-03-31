
import { existsSync, statSync, readFileSync } from 'node:fs'
export function fetchFromFile(file) {
  try {
    if (!existsSync(file)) return null

    const currentFileSize = statSync(file).size // rozmiar obecnego pliku liczony w bitach - przy wyniku rownym 0 nie dodaje zawartosci do nowego pliku

    if (currentFileSize === 0) return null

    const currentFile = readFileSync(file) // content obecnego pliku - argument kodowania zmienia return value na string

    return JSON.parse(currentFile)

  } catch (e) {
    throw new Error(`Błąd ładowania pliku konfiguracyjnego : ${e}`)
  }
}
