import Client from 'ssh2-sftp-client'
const sftp = new Client()

// konfiguracja serwera zasobów do którego chcemy wysłać zasoby
const config = {
  host: '192.168.0.110',
  port: '22',
  username: 'vmserver',
  password: 'Ins3rtpl95.'
}

// adres folderu w którym zasoby mają wylądować
const remotePath = `/var/www/images`


const remoteConnections = []

// testowe - listuje pliki z lokalizacji remotePath

async function listFiles() {
  console.log('------------------------- LIST FILES CONSOLE OUTPUT -----------------')
  try {
    await sftp.connect(config)
    const files = await sftp.list(remotePath).then((e) =>
      console.log(e.map((e => { return e.name }))))
    console.log(`Pliki na serwerze: ${files}`)
    await sftp.end()
  } catch (e) {
    throw new Error(`Błąd listowania plików : ${e}`)
  }
  console.log('------------------------- LIST FILES CONSOLE OUTPUT -----------------')
}

async function transferFiles(contents) {
  try {
    await sftp.connect(config)
    remoteConnections.push(config.host)
    // console.log('#1 - Connection established.')

    for (const { name, content } of contents) {
      const fileBuffer = Buffer.from(content, 'base64')
      const remoteFilePath = `${remotePath}/${name}`
      // console.log('File buffer =' + fileBuffer)
      // console.log(`#2 Transferring file : ${name}`)
      await sftp.put(fileBuffer, remoteFilePath)
    }
    // console.log('Transfer successful')
  } catch (e) {
    // console.log(`fileTransfer | Error transferring files - catch block returned : ${e}`)
  } finally {
    await sftp.end()
    // console.log(`File transfer ended - connection cut successfully`)
    remoteConnections.splice(remoteConnections.indexOf(config.host), 1)
  }
}
export { transferFiles }
