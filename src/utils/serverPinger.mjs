// FOR DIRTY TESTS
// DONT INCLUDE

const ping = require('ping')
const Client = require('ssh2-sftp-client')
const sftp = new Client()


const config = {
  host: '192.168.0.110',
  port: '22',
  username: 'vmserver',
  password: 'Ins3rtpl95.'
}

const remotePath = `/var/www/images`
// ping.sys.probe(host, (isAlive) => {
//   if (isAlive) {
//     console.log(`Server ${host} dostepny`)
//   } else {
//     console.log(`Server ${host} niedostepny`)
//   }
// })



// scan files in target directory and return their names in an array
async function listFiles() {
  try {
    await sftp.connect(config)
    const files = await sftp.list(remotePath).then((e) =>
      console.log(e.map((e => { return e.name }))))
    // console.log(`Pliki na serwerze: ${files}`)
    await sftp.end()
  } catch (e) {
    throw new Error(`Błąd : ${e}`)
  }
}

listFiles()
