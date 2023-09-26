import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: 'Get board list' })
    })
    .post((req, res) => {
        res.status(StatusCodes.CREATED).json({ message: 'Created new board' })
    })

export const boardRoutes = Router
