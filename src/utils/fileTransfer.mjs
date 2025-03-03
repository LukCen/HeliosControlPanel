
import fs from 'fs'
import Client from 'ssh2-sftp-client'
const sftp = new Client()

const config = {
  host: '192.168.0.110',
  port: '22',
  username: 'vmserver',
  password: 'Ins3rtpl95.'
}
const remoteConnections = []
const remotePath = `/var/www/images`

async function listFiles() {
  console.log('------------------------- LIST FILES CONSOLE CLEAR -----------------')
  try {
    await sftp.connect(config)
    const files = await sftp.list(remotePath).then((e) =>
      console.log(e.map((e => { return e.name }))))
    // console.log(`Pliki na serwerze: ${files}`)
    await sftp.end()
  } catch (e) {
    throw new Error(`Błąd listowania plików : ${e}`)
  }
  console.log('------------------------- LIST FILES CONSOLE CLEAR -----------------')
}

// listFiles()

////////////// ATTEMPT 1 /////////////////

// async function transferFiles(contents) {
//   // check if connection already active
//   if (remoteConnections.includes(config.host)) {
//     await sftp.connect(config)
//   }
//   try {
//     remoteConnections.push(config.host)
//     console.dir(`raw contents from transferFiles: ${contents}`)
//     console.log('#1 - Establishing connection...')

//     console.log(`#2 - convertile file to file stream...`)
//     for (const files of contents) {
//       const file = fs.readFileSync(files)
//       console.log(`files: ${file}`)
//       console.log(`#3 - Transferring file : ${file.name}`)
//       console.log(`#4 newpath generated`)
//       await sftp.put(file, remotePath)
//       console.log(`$5 putting file...`)
//       console.log('Transfer successful!')
//     }
//   } catch (e) {
//     console.log(`fileTransfer | ERROR TRANSFERING FILES: ${e}`)
//   } finally {
//     await sftp.end()
//     remoteConnections.splice(remoteConnections.indexOf(config.host), 1);
//   }
// }

////////////// ATTEMPT 2 /////////////////
async function transferFiles(contents) {
  try {
    await sftp.connect(config)
    remoteConnections.push(config.host)
    console.log('#1 - Connection established.')

    for (const { name, content } of contents) {
      const fileBuffer = Buffer.from(content, 'base64')
      const remoteFilePath = `${remotePath}/${name}`
      console.log('File buffer =' + fileBuffer)
      console.log(`#2 Transferring file : ${name}`)
      await sftp.put(fileBuffer, remoteFilePath)
    }
    console.log('Transfer successful')
  } catch (e) {
    console.log(`fileTransfer | Error transferring files - catch block returned : ${e}`)
  } finally {
    await sftp.end()
    console.log(`File transfer ended - connection cut successfully`)
    remoteConnections.splice(remoteConnections.indexOf(config.host), 1)
  }
}
export { transferFiles }
