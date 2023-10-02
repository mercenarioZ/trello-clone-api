import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'

const Router = express.Router()

// API v1/status
Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'OK. Api v1 is ready to use!' })
})

// Board routes
Router.use('/boards', boardRoute)

export const api_v1 = Router
