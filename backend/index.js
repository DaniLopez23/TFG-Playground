const server = require('./app').server // la aplicación Express real
const config = require('./utils/config')

const port = config.PORT

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
