import exitHook from 'async-exit-hook'
import express from 'express'
import { closeDatabase, connectToDatabase, getDatabase } from './config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
    const app = express()

    app.get('/', async (req, res) => {
        console.log(await getDatabase().listCollections().toArray())
        res.send('<h1>Hello World!</h1><hr>')
    })

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
