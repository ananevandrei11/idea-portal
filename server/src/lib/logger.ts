import debug from 'debug';
import { serializeError } from 'serialize-error';
import winston from 'winston';
import { env } from './env';

const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.colorize({
      all: true,
      level: true,
      message: true,
    }),
    winston.format.prettyPrint(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'backend', hostEnv: env.HOST_ENV },
  transports: [
    new winston.transports.Console({
      format: winston.format.json({
        space: 2,
      }),
    }),
  ],
});

export const logger = {
  info: ({ logType, message, meta }: { logType: string; message: string; meta?: Record<string, any> }) => {
    if (!debug.enabled(`idea-portal:${logType}`)) {
      return;
    }
    winstonLogger.info(message, { logType, ...meta });
  },
  error: ({ logType, error, meta }: { logType: string; error: any; meta?: Record<string, any> }) => {
    if (!debug.enabled(`idea-portal:${logType}`)) {
      return;
    }
    const serializedError = serializeError(error);
    winstonLogger.error(serializedError.message || 'Unknown error', {
      logType,
      error,
      errorStack: serializedError.stack,
      ...meta,
    });
  },
};
