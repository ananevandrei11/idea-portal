import winston, { format, transports } from 'winston';
import { env } from './env';

export const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: 'server', hostEnv: env.HOST_ENV },
  transports: [
    new transports.Console({
      format: format.json(),
    }),
  ],
});
