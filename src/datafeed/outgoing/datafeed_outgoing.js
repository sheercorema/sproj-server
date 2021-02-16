const socketio = require('socket.io');

const auth = require('../../lib/authorize');
const Datum = require('../Datum');

module.exports = (http) => {
    io = socketio(http);

    io.on('connection', async (client) => {
        if(client.handshake.auth && client.handshake.auth.token) {
            user = await auth(client.handshake.auth.token);
            if (!user) { // failed to authenticate
                client.disconnect(true);
            } else {
                client.user = user;
                Datum.watch().on('change', data => console.log(new Date(), data));
            }
        } else {
            client.disconnect(true);
        }
    });
}