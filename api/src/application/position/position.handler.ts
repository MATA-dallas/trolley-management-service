import { Data } from "./position.data"

const getAllPositions = (positions: Data) => async () => {
    return positions.getAll();
}


export interface Handler {
    getAllPositions: ReturnType<typeof getAllPositions>
}

const create = (data: Data) : Handler => {
    return {
        getAllPositions: getAllPositions(data)
    };
}

export default { create }