import { prefix } from './config'

let logCounter = 0
let errorCounter = 0
let fatalCounter = 0
let warnCounter = 0

/**
 * Add conter and prefix and execute simple console.log()
 * @param  {String} message - Your log text
 * @param  {Object} _object - If you pass an object or array, it's will be put together
 * @return {Function}
 */
export const log = (message, _object) => {
    const object = _object !== undefined
        ? _object
        : ''

    logCounter++

    return console.log(`${logCounter} [LOG|${prefix}] ${message}`, object)
}

/**
 * Add conter and prefix and execute console.error()
 * @param  {String} message - Your log text
 * @param  {Object} _object - If you pass an object or array, it's will be put together
 * @return {Function}
 */
export const error = (message, _object) => {
    const object = _object !== undefined
        ? _object
        : ''

    errorCounter++

    return console.error(`${errorCounter} [ERROR|${prefix}] ${message}`, object)
}

/**
 * Add conter and prefix and create a throw new Error()
 * @param  {String} message - Your log text
 * @return {Function}
 */
export const fatal = (message) => {
    fatalCounter++

    throw new Error(`${fatalCounter} [FATAL|${prefix}] ${message}`)
}

/**
 * Add conter and prefix and execute console.warn()
 * @param  {String} message - Your log text
 * @param  {Object} _object - If you pass an object or array, it's will be put together
 * @return {Function}
 */
export const warn = (message, _object) => {
    const object = _object !== undefined
        ? _object
        : ''

    warnCounter++

    return console.warn(`${warnCounter} [WARN|${prefix}] ${message}`, object)
}
