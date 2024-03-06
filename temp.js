const stompit = require('stompit');

stompit.connect({ host: 'localhost', port: 61613 }, (err, client) => {
  if (err) {
    console.error('Error connecting to the message broker:', err.message);
    return;
  }

  const subscribeHeaders = {
    destination: 'MyNewQueue',
    ack: 'client-individual', // Use client-individual acknowledgment mode
  };

  const subscription = client.subscribe(subscribeHeaders, (err, message) => {
    if (err) {
      console.error('Error subscribing to the queue:', err.message);
      return;
    }

    message.readString('UTF-8', (err, body) => {
      if (err) {
        console.error('Error reading message body:', err.message);
        return;
      }

      console.log(body);

      // Acknowledge the message after processing
      client.ack(message);

      // Check if this is the last message, then disconnect
      if (message.headers['content-length'] === '0') {
        client.disconnect();
      }
    });
  });
});
