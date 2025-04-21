import { gray, green, red, yellow } from 'yoctocolors';
import { ILogger } from '../types';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export function colorFormat(level: LogLevel, ...args: unknown[]) {
    const colorMap = {
        info: green,
        warn: yellow,
        error: red,
        debug: gray,
    };
    return colorMap[level](args.join(' '));
}

export function createLogger(level: LogLevel, logFn: (...args: unknown[]) => void, mode: string = 'default') {
    if (mode === 'test') {
        return () => undefined;
    }
    return (...args: unknown[]) => logFn(colorFormat(level, ...args));
}

const logger: ILogger = {
    info: createLogger('info', console.log, process.env.NODE_ENV),
    warn: createLogger('warn', console.warn, process.env.NODE_ENV),
    error: createLogger('error', console.error, process.env.NODE_ENV),
    debug: createLogger('debug', console.debug, process.env.NODE_ENV),
};

export default logger;
