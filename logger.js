const { createLogger, format, transports } = require('winston');

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.prettyPrint(),
  format.padLevels(),
  format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
  format.align(),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = createLogger({
  level: 'info',
  format: format.json(),
  //defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'prod') {
  logger.add(new transports.Console({
    format: alignedWithColorsAndTime,
    
  }));
}

module.exports = logger;