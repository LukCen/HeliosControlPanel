
import { statSync, readFileSync, writeFile } from 'node:fs'

export function writeToFile(filePath, contents) {
  const currentFileSize = statSync(filePath).size // rozmiar obecnego pliku liczony w bitach - przy wyniku rownym 0 nie dodaje zawartosci do nowego pliku
  const currentFile = readFileSync(filePath) // content obecnego pliku - argument kodowania zmienia return value na string

  const jsonNewFile = [] // arrayka nowymi treściami w formacie JSON (stary + nowy content)
  if (currentFileSize === 0) {
    jsonNewFile.push(contents) // jesli plik jest pusty - dodaj tylko nową zawartość
  } else {

    jsonNewFile.push(...JSON.parse(currentFile), contents) // jeśli plik nie jest pusty - dodaj obecną zawartość + nową na koniec pliku
  }
  const contentToSave = JSON.stringify(jsonNewFile)

  // funkcja dodająca content do pliku - @filepath - sciezka do pliku, podawana w main.js, @contentToSave - nowa zawartosc, definiowana powyzej
  writeFile(filePath, contentToSave, e => {
    if (e) {
      console.error(e)
    } else {
      console.log('Zapis pliku powiodl sie.')
    }
  })

}
