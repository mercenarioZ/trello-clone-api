/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

// This middleware will be used to handle errors from all routes
export const errorHandlingMiddleware = (err, req, res, next) => {
    // If missing statusCode, set it to 500 (Internal Server Error)
    if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

    // Create a responseError variable to store the error message
    const responseError = {
        statusCode: err.statusCode,
        message: err.message || StatusCodes[err.statusCode], 
        stack: err.stack,
    }

    // If the environment is production, remove the stack trace
    if (env.BUILD_MODE !== 'dev') delete responseError.stack

    // Send the error message to the client
    res.status(responseError.statusCode).json(responseError)
}
