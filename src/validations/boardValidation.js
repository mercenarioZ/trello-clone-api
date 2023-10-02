import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(4).max(50).trim().strict(),
        description: Joi.string().required().max(128).trim().strict(),
    })

    try {
        console.log('req.body: ', req.body)

        // abortEarly: false - collect all errors not just the first one
        await correctCondition.validateAsync(req.body, { abortEarly: false })

        res.status(StatusCodes.CREATED).json({
            message: 'POST - Created new board',
        })
    } catch (error) {
        console.log('Error: ', error)

        // The 422 (Unprocessable Entity) status code means the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            error: new Error(error).message
        })
    }
}

export const boardValidation = {
    createNew,
}
