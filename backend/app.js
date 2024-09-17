const https = require('https');
const fs = require('fs');
const ConnectToDatabase = require('./infrastructure/database/mongodb');
const createServer = require('./infrastructure/server/server');

const startApp = async () => {
  // Conectar a la base de datos
  let connectToDatabase = new ConnectToDatabase();
  await connectToDatabase.connectOpen();

  // Crear la aplicación de servidor
  const app = createServer();

  // Cargar certificado y clave privada
  const privateKey = fs.readFileSync('./backend/infrastructure/ssl/private.key'); 
  const certificate = fs.readFileSync('./backend/infrastructure/ssl/certificate.crt');

  // Crear servidor HTTPS
  const httpsServer = https.createServer(
    {
      key: privateKey,
      cert: certificate,
    },
    app
  );

  // Arrancar el servidor
  httpsServer.listen(
    { port: process.env.EXPRESS_PORT, host: process.env.EXPRESS_HOST },
    () => {
      console.log(`Server running at https://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
    }
  );
};

startApp();
