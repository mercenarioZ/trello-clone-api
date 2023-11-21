import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services/boardService';

const createNew = async (req, res, next) => {
    try {
        const createdBoard = await boardService.createNew(req.body);

        res.status(StatusCodes.CREATED).json(createdBoard);
    } catch (error) {}
};

const getDetail = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const boardDetail = await boardService.getDetail(boardId);

        res.status(StatusCodes.OK).json(boardDetail);
    } catch (error) {
        next(error);
    }
};

export const boardController = {
    createNew,
    getDetail,
};
