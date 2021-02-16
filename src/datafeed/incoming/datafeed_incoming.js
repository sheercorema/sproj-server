const socketio = require('socket.io');

const auth = require('../../lib/authorize');
const Datum = require('../Datum');

clients = {}

module.exports = (http) => {
    io = socketio(http);

    Datum.watch().on('change', (data) => {
        console.log(new Date(), data)
    });

    io.on('connection', async (client) => {
        if(client.handshake.auth && client.handshake.auth.type && client.handshake.auth.token) {

            user = await auth(client.handshake.auth.token);
            if (!user) { // failed to authenticate
                client.disconnect(true);
            } else {
                client.user = user;

                if(client.handshake.auth.type != 'sensor') {
                    console.log("CLIENT CONNECTED")

                    client.on('disconnect', () => {
                        delete clients.id
                    })

                    clients.id = client.user._id
                } else {
                    console.log("SENSOR CONNECTED")
                    client.on('reading', (data) => {
                        console.log('Reading from', client.user._id);

                        // write out to database
                        const datum = new Datum()
                        datum.userId = client.user._id;
                        datum.reading = data.reading;

                        datum.save();

                    });
                }
            }
        } else {
            client.disconnect(true);
        }
    });
}