import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(4).max(50).trim().strict(),
        description: Joi.string().required().max(128).trim().strict(),
    })

    try {
        console.log('req.body: ', req.body)

        // abortEarly: false - collect all errors not just the first one
        await correctCondition.validateAsync(req.body, { abortEarly: false })

        // If the validation passes, we call next() to pass control to the next middleware function (i.e. boardController.createNew)
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
}

export const boardValidation = {
    createNew,
}
