import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const myFormat = winston.format.printf(({
  level, message, timestamp,
}) => `[${level}] ${timestamp as string} - ${message as string}`);

export const winstonLogger = WinstonModule.createLogger({
  instance: winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
      myFormat,
    ),
    transports: [
      new winston.transports.Console(),
    ],
  }),
});
