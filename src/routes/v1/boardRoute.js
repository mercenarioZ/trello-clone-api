import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: 'Get board list' })
    })
    .post(boardValidation.createNew, boardController.createNew)

Router.route('/:id')
    .get(boardController.getDetail)
    .put() // update board
export const boardRoute = Router
