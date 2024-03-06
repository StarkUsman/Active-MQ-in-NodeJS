const stompit = require('stompit')

stompit.connect({ host: 'localhost', port: 61613 }, (err, client) => {

    if (err) {
        console.log('connect error ' + err.message)
        return
    }

  frame = client.send({ destination: 'MyNewQueue' })

  frame.write('My 1st message')
  frame.write('My 2nd message')
  frame.write('My 3rd message')
  frame.write('My 4th message')
  frame.end()
  client.disconnect()
})