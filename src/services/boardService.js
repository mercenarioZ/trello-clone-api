import { StatusCodes } from 'http-status-codes';
import { cloneDeep } from 'lodash';
import { boardModel } from '~/models/boardModel';
import ApiError from '~/utils/ApiError';
import { slugify } from '~/utils/formatters';

const createNew = async (requestBody) => {
    try {
        const newBoard = {
            ...requestBody,
            slug: slugify(requestBody.title),
        };

        const createdBoard = await boardModel.createNew(newBoard);
        console.log(createdBoard);

        // Get new board
        const getNewBoard = await boardModel.findById(createdBoard.insertedId);
        console.log(getNewBoard);

        return getNewBoard;
    } catch (error) {
        // throw error
    }
};

const getDetail = async (boardId) => {
    const boardDetail = await boardModel.getDetail(boardId);

    if (!boardDetail) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found.');
    }

    // Why deep clone here? Because we don't want to modify the original object
    const responseBoardDetail = cloneDeep(boardDetail);
    
    // Modify the response structure to match the front-end. You can use the .equals() method to compare 2 ObjectId instead of converting them to string
    responseBoardDetail.columns.forEach((column) => {
        column.cards = responseBoardDetail.cards.filter(
            (card) => card.columnId.toString() === column._id.toString()
        );
    });

    // Remove the cards key from the response
    delete responseBoardDetail.cards;

    return responseBoardDetail;
};
export const boardService = {
    createNew,
    getDetail,
};
