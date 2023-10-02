import exitHook from 'async-exit-hook'
import express from 'express'
import { closeDatabase, connectToDatabase } from './config/mongodb'
import { env } from '~/config/environment'
import { api_v1 } from '~/routes/v1'

const START_SERVER = () => {
    const app = express()

    // Parse incoming requests with JSON payloads
    app.use(express.json())

    app.use('/v1', api_v1)

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Server is running at http://${env.APP_HOST}:${env.APP_PORT}`)
    })

    // Clean up database connection when exiting
    exitHook(() => {
        closeDatabase()
        console.log('Disconnected from database')
    })
}

;(async () => {
    try {
        console.log('Connecting to database...')
        // Connect to MongoDB
        await connectToDatabase()
        console.log('Connect to database successfully.')

        // Start server
        START_SERVER()
    } catch (err) {
        console.log(err)
        process.exit(0)
    }
})()
