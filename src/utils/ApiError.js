// Define a custom error class extending the Error class 
class ApiError extends Error {
    constructor(statusCode, message) {
        // Call the parent constructor here
        // The parent (Error) class is already has a message property
        super(message)

        this.name = 'ApiError'

        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}

export default ApiError
