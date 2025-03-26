import * as fs from 'node:fs'


export function writeToFile(filePath, contents) {
  const currentFileSize = fs.statSync(filePath).size // rozmiar obecnego pliku liczony w bitach - przy wyniku rownym 0 nie dodaje zawartosci do nowego pliku
  const currentFile = fs.readFileSync(filePath) // content obecnego pliku - argument kodowania zmienia return value na string

  const jsonNewFile = [] // arrayka do z JSON-owania (stary + nowy content)
  if (currentFileSize === 0) {
    jsonNewFile.push(contents) // jesli plik jest pusty - dodaj tylko nową zawartość
  } else {

    jsonNewFile.push(...JSON.parse(currentFile), contents) // jeśli plik nie jest pusty - dodaj obecną zawartość + nową na koniec pliku
  }
  const contentToSave = JSON.stringify(jsonNewFile)
  console.log(contentToSave)

  console.log(`current file = ${currentFile}`)
  // funkcja dodająca content do pliku - @filepath - sciezka do pliku, podawana w main.js, @contentToSave - nowa zawartosc, definiowana powyzej
  fs.writeFile(filePath, contentToSave, e => {
    if (e) {
      console.error(e)
    } else {
      console.log('Zapis pliku powiodl sie.')
    }
    // console.log(`filePath: ${filePath}, contents: ${contents}`)
  })
  console.log(`writeToFile odpalone`)
}
