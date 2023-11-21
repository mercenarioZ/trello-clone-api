import Joi from 'joi'
import { getDatabase } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'

const BOARD_COLLECTION_NAME = 'boards'

// Schema Validation
const BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),

    columnOrderIds: Joi.array()
        .items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        )
        .default([]),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
    return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
        // abortEarly = false: return all errors at once, instead of just the first one Joi encounters.
        abortEarly: false,
    })
}

const createNew = async (data) => {
    try {
        const dataValidated = await validateSchema(data)

        return await getDatabase()
            .collection(BOARD_COLLECTION_NAME)
            .insertOne(dataValidated)
    } catch (error) {
        throw new Error(error)
    }
}

const findById = async (boardId) => {
    try {
        return await getDatabase()
            .collection(BOARD_COLLECTION_NAME)
            .findOne({
                _id: new ObjectId(boardId),
                // _destroy: false,
            })
    } catch (error) {
        throw new Error(error)
    }
}

const getDetail = async (boardId) => {
    try {
        const result = await getDatabase()
            .collection(BOARD_COLLECTION_NAME)
            .aggregate([
                {
                    $match: {
                        _id: new ObjectId(boardId),
                        _destroy: false,
                    },
                },

                {
                    // lookup syntax: https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
                    $lookup: {
                        from: columnModel.COLUMN_COLLECTION_NAME,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'columns',
                    },
                },

                {
                    $lookup: {
                        from: cardModel.CARD_COLLECTION_NAME,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'cards',
                    },
                },
            ])
            .toArray()
            
        return result[0] || null
    } catch (error) {
        throw new Error(error)
    }
}

export const boardModel = {
    BOARD_COLLECTION_NAME,
    BOARD_COLLECTION_SCHEMA,
    createNew,
    findById,
    getDetail,
}
