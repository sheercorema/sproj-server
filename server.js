//// -> ENTRY POINT
// connects to the database and starts an http server

const initialize = async () => {
    // DATABASE INITIALIZATION
    const database = require('./src/lib/database');
    // try {
    //     database_connection = await database(process.env.DB_CONNECTION_STRING);
    // } catch (error) {
    //     console.log(error);
    //     process.exit();
    // }

    // SERVER INITIALIZATION
    const app = require('express')();
    const http = require('http').createServer(app);

    // middleware
    const morgan = require('morgan');
    const bodyparser = require('body-parser');

    app.use(morgan('combined'))
    app.use(bodyparser.json())

    // register express apps
    app.use('/api', require('./src/apps/api/api'))

    // intialize socket-based datafeed
    //const datafeed_incoming = require('./src/datafeed/incoming/datafeed_incoming');
    //datafeed_incoming(http);
    //const datafeed_outgoing = require('./src/datafeed/outgoing/datafeed_outgoing');
    //datafeed_outgoing(http);

    // start server
    http.listen(process.env.PORT, () => {
        console.log(`Server up, listening on port ${process.env.PORT}`)
    })
}

initialize();