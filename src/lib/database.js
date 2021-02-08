const mongoose = require('mongoose');

module.exports = (connection_string) => {
    return new Promise( async (resolve) => {
    
        mongoose.set('useCreateIndex', true);

        mongoose.connection.once('open', () => {
            console.log('[DATABASE] Connection established.');
            resolve(mongoose.connection);
        })

        mongoose.connection.on('error', (error) => {
            console.log(error)
        })

        try {
            await mongoose.connect(connection_string, {useNewUrlParser: true, useUnifiedTopology: true})
        } catch (error) {
            throw(error);
        }
    
    })
}