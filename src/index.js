const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

const PORT = process.env.PORT || 5000;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info(
    "\r\n                                                                                          \r\n        ,--,                                                                              \r\n      ,--.'|                                 ,---,                                        \r\n   ,--,  | :              ,--,             .'  .' `\\                                      \r\n,---.'|  : '            ,--.'|           ,---.'     \\                   ,---,             \r\n|   | : _' |            |  |,            |   |  .`\\  |              ,-+-. /  |  ,----._,. \r\n:   : |.'  |  ,--.--.   `--'_            :   : |  '  |  ,--.--.    ,--.'|'   | /   /  ' / \r\n|   ' '  ; : /       \\  ,' ,'|           |   ' '  ;  : /       \\  |   |  ,\"' ||   :     | \r\n'   |  .'. |.--.  .-. | '  | |           '   | ;  .  |.--.  .-. | |   | /  | ||   | .\\  . \r\n|   | :  | ' \\__\\/: . . |  | :           |   | :  |  ' \\__\\/: . . |   | |  | |.   ; ';  | \r\n'   : |  : ; ,\" .--.; | '  : |__         '   : | /  ;  ,\" .--.; | |   | |  |/ '   .   . | \r\n|   | '  ,/ /  /  ,.  | |  | '.'|        |   | '` ,/  /  /  ,.  | |   | |--'   `---`-'| | \r\n;   : ;--' ;  :   .'   \\;  :    ;        ;   :  .'   ;  :   .'   \\|   |/       .'__/\\_: | \r\n|   ,/     |  ,     .-./|  ,   /         |   ,.'     |  ,     .-./'---'        |   :    : \r\n'---'       `--`---'     ---`-'          '---'        `--`---'                  \\   \\  /  \r\n                                                                                 `--`-'   \r\n"
  );
  logger.info('Connected to MongoDB');
  server = app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
