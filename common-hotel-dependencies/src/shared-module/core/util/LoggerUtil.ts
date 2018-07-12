/**
 * General LoggerUtil
 * @export
 * @class LoggerUtil
 */
export class LoggerUtil {

    /**
     * Colosrs only for nodejs
     * @private
     * @memberof LoggerUtil
     */
    private colors = {
        Reset: '\x1b[0m',
        fg: {
            Red: '\x1b[31m',
            Green: '\x1b[32m',
            Yellow: '\x1b[33m',
            White: '\x1b[37m',
            // Orange: '\x1b[38;5;214m',
            AQUA: '\x1b[1;36m',
        },
    };

    /**
     * Static types of logs available.
     */
    public static LOG: string = 'log';
    public static INFO: string = 'info';
    public static ERROR: string = 'error';
    public static WARN: string = 'warn';

    /**
     * Private static constants
     */
    private static CHARACTERS_TWO_DIGITS = 10;
    private static MILLISECONDS_DIVISOR = 1000;
    private static ROUND_TO_DIGITS = 2;

    /**
     * Class or section name
     * @private
     * @type {string}
     * @memberof LoggerUtil
     */
    private classSectionName: string;

    /**
     * The file name.
     * @private
     * @type {string}
     * @memberof LoggerUtil
     */
    private fileName: string;

    /**
     * Creates an instance of LoggerUtil.
     * @param {string} classSectionName
     * @param {string} [__filename] this is only for nodejs (pass the __filename)
     * @memberof LoggerUtil
     */
    constructor(classSectionName: string, __filename?: string) {
        this.classSectionName = classSectionName;
        this.fileName = __filename;
    }

    /**
     * Gets the class or section name
     * @returns {string}
     * @memberof LoggerUtil
     */
    public getClassSectionName(): string {
        return this.classSectionName;
    }

    /**
     * Gets the file name (nodejs)
     * @returns {string}
     * @memberof LoggerUtil
     */
    public getFileName(): string {
        return this.fileName;
    }

    /**
     * colorLog
     * @private
     * @param {string} logType
     * @returns {string}
     * @memberof LoggerUtil
     */
    private colorLog(logType: string): string {
        let color: string = null;
        switch (logType) {
            case LoggerUtil.LOG:
                color = 'Green';
                break;
            case LoggerUtil.INFO:
                color = 'DodgerBlue';
                break;
            case LoggerUtil.ERROR:
                color = 'Red';
                break;
            case LoggerUtil.WARN:
                color = 'Orange';
                break;
            default:
                color = color;
        }
        return color;
    }

    /**
     * Log general
     * @param {*} message
     * @param {...any[]} optionalParams
     * @memberof LoggerUtil
     */
    public log(message: any, ...optionalParams: any[]) {
        /* tslint:disable */
        if (console) {
            if (require) {
                console.log(this.colors.fg.Green, '[LoggerUtil][' + LoggerUtil.LOG + '] - ' + this.formatDate(new Date()) + '   - [' + this.getClassSectionName() + ' - ' + this.getFileName() + ']   - ',
                    message, this.colors.Reset, '\n', ...optionalParams);
            } else {
                console.log('[LoggerUtil][' + LoggerUtil.LOG + ']   - ' + this.formatDate(new Date()) + '   - [' + this.getClassSectionName() + ']   - ',
                    message, '\n', ...optionalParams);
            }
        }
        /* tslint:enable */
    }

    /**
     * Log errors
     * @param {*} message
     * @param {...any[]} optionalParams
     * @memberof LoggerUtil
     */
    public error(message: any, ...optionalParams: any[]) {
        /* tslint:disable */
        if (console) {
            if (require) {
                console.error(this.colors.fg.Red, '[LoggerUtil][' + LoggerUtil.ERROR + ']   - ' + this.formatDate(new Date()) + '   - [' + this.getClassSectionName() + ' - ' + this.getFileName() + ']   - ',
                    message, this.colors.Reset, '\n', ...optionalParams);
            } else {
                console.error('%c[LoggerUtil][' + LoggerUtil.ERROR + ']   - ' + this.formatDate(new Date()) + '   - [' + this.getClassSectionName() + ']   - ',
                    'color:' + this.colorLog(LoggerUtil.ERROR), message, '\n', ...optionalParams);
            }
        }
        /* tslint:enable */
    }

    /**
     * Log information
     * @param {*} message
     * @param {...any[]} optionalParams
     * @memberof LoggerUtil
     */
    public info(message: any, ...optionalParams: any[]) {
        /* tslint:disable */
        if (console) {
            if (require) {
                console.info(this.colors.fg.AQUA, '[LoggerUtil][' + LoggerUtil.INFO + ']   - ' + this.formatDate(new Date()) + '   - [' + this.getClassSectionName() + ' - ' + this.getFileName() + ']   - ',
                    message, this.colors.Reset, '\n', ...optionalParams);
            } else {
                console.info('%c[LoggerUtil][' + LoggerUtil.INFO + ']   - ' + this.formatDate(new Date()) + '   - [' + this.getClassSectionName() + ']   - ',
                    'color:' + this.colorLog(LoggerUtil.INFO), message, '\n', ...optionalParams);
            }
        }

        /* tslint:enable */
    }

    /**
     * Log warning
     * @param {*} message
     * @param {...any[]} optionalParams
     * @memberof LoggerUtil
     */
    public warn(message: any, ...optionalParams: any[]) {
        /* tslint:disable */
        if (console) {
            if (require) {
                console.warn(this.colors.fg.Yellow, '[LoggerUtil][' + LoggerUtil.WARN + ']   - ' + this.formatDate(new Date()) + '   - [' + this.getClassSectionName() + ' - ' + this.getFileName() + ']   - ',
                    message, this.colors.Reset, '\n', ...optionalParams);
            } else {
                console.warn('%c[LoggerUtil][' + LoggerUtil.WARN + ']   - ' + this.formatDate(new Date()) + '   - [' + this.getClassSectionName() + ']   - ',
                    'color:' + this.colorLog(LoggerUtil.WARN), message, '\n', ...optionalParams);
            }
        }
        /* tslint:enable */
    }

    /**
     * pad
     * @private
     * @param {number} numberValue
     * @returns {(string | number)}
     * @memberof LoggerUtil
     */
    private pad(numberValue: number): string | number {
        if (numberValue < LoggerUtil.CHARACTERS_TWO_DIGITS) {
            return '0' + numberValue;
        }
        return numberValue;
    }

    /**
     * Format date.
     * @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
     * @private
     * @param {Date} currentDate
     * @returns {string} '2017-11-8 12:37:04'
     * @memberof LoggerUtil
     * @example https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
     */
    private formatDate(currentDate: Date): string {
        const nextIndex = 2;
        const removeIndex = 5;
        return currentDate.getUTCFullYear() +
            '-' + this.pad(currentDate.getUTCMonth() + 1) +
            '-' + this.pad(currentDate.getUTCDate()) +
            ' ' + this.pad(currentDate.getUTCHours()) +
            ':' + this.pad(currentDate.getUTCMinutes()) +
            ':' + this.pad(currentDate.getUTCSeconds()) +
            ':' + (currentDate.getUTCMilliseconds() / LoggerUtil.MILLISECONDS_DIVISOR)
                .toFixed(LoggerUtil.ROUND_TO_DIGITS).slice(nextIndex, removeIndex);
    }

}