const https = require('https');
const fs = require('fs');
const ConnectToDatabase = require('./infrastructure/database/mongodb');
const createServer = require('./infrastructure/server/server');

const startApp = async () => {
    let connectToDatabase = new ConnectToDatabase();
    await connectToDatabase.connectOpen();
    const app = createServer();

    // Cargar certificado y clave privada
    const privateKey = fs.readFileSync('./backend/infrastructure/ssl/private.key');
    const certificate = fs.readFileSync('./backend/infrastructure/ssl/certificate.crt');

    // Crear servidor HTTPS
    const httpsServer = https.createServer({
        key: privateKey,
        cert: certificate
    }, app);

    httpsServer.listen({port: process.env.EXPRESS_PORT, host:process.env.EXPRESS_HOST}, () => {
        console.log(`https://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
    });
};

startApp();