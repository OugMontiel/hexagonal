const https = require('https');
const fs = require('fs');
const ConnectToDatabase = require('./infrastructure/database/mongodb');
const createServer = require('./infrastructure/server/server');

const startApp = async () => {
    let connectToDatabase = new ConnectToDatabase();
    await connectToDatabase.connectOpen();
    const app = createServer();

    // Crear servidor HTTPS
    const httpsServer = https.createServer({
        key: fs.readFileSync('..infrastructure/ssl/private.key'),
        cert: fs.readFileSync('.infrastructure/ssl/certificate.crt')
    }, app);

    httpsServer.listen({port: process.env.EXPRESS_PORT, host:process.env.EXPRESS_HOST}, () => {
        console.log(`https://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
    });
};

startApp();