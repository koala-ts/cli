const logger = console;
const silent = () => undefined;

if (process.env.NODE_ENV === 'test') {
    logger.log = silent;
    logger.info = silent;
    logger.warn = silent;
    logger.error = silent;
    logger.debug = silent;
}

export default logger;
