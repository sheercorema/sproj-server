const socketio = require('socket.io');

const auth = require('../../lib/authorize');

module.exports = (http) => {
    io = socketio(http);

    io.on('connection', async (client) => {
        if(client.handshake.auth && client.handshake.auth.token) {
            user = await auth(client.handshake.auth.token);
            if (!user) { // failed to authenticate
                client.disconnect(true);
            } else {
                client.user = user;
                client.on('reading', (data) => {
                    console.log('Reading from', client.user._id);

                    // write out to database

                });
            }
        } else {
            client.disconnect(true);
        }
    });
}