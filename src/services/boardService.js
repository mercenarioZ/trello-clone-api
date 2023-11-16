import { slugify } from '~/utils/formatters'

const createNew = async (requestBody) => {
    try {
        const newBoard = {
            ...requestBody,
            slug: slugify(requestBody.title),
        }

        return newBoard
    } catch (error) {
        // throw error
    }
}

export const boardService = {
    createNew,
}
