import { boardModel } from '~/models/boardModel'
import { slugify } from '~/utils/formatters'

const createNew = async (requestBody) => {
    try {
        const newBoard = {
            ...requestBody,
            slug: slugify(requestBody.title),
        }

        const createdBoard = await boardModel.createNew(newBoard)
        console.log(createdBoard)

        // Get new board
        const getNewBoard = await boardModel.findById(createdBoard.insertedId)
        console.log(getNewBoard)

        return getNewBoard
    } catch (error) {
        // throw error
    }
}

export const boardService = {
    createNew,
}
