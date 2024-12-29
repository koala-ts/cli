import { gray, green, red, yellow } from 'yoctocolors';
import { ILogger } from '../types';

const logger: ILogger = {
    info: (...args: any[]) => console.log(green(args.join(' '))),
    warn: (...args: any[]) => console.warn(yellow(args.join(' '))),
    error: (...args: any[]) => console.error(red(args.join(' '))),
    debug: (...args: any[]) => console.debug(gray(args.join(' '))),
};

const silent = () => undefined;

if (process.env.NODE_ENV === 'test') {
    logger.info = silent;
    logger.warn = silent;
    logger.error = silent;
    logger.debug = silent;
}

export default logger;
