import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

const MONGODB_URI = env.MONGODB_URI

const DATABASE_NAME = env.DATABASE_NAME

let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

// Connect to MongoDB
export const connectToDatabase = async () => {
    await mongoClientInstance.connect()

    trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const getDatabase = () => {
    if (!trelloDatabaseInstance) {
        throw new Error('Database not initialized')
    }

    return trelloDatabaseInstance
}

// Close MongoDB connection when exiting
export const closeDatabase = async () => {
    await mongoClientInstance.close()
}
