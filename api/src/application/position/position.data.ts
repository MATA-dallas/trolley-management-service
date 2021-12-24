import { DataClient } from "../../data-providers";
import { allKeysOfPosition, Position } from "./position.model";
import { Knex } from "knex";

export interface Data {
    getAll: ReturnType<typeof getAll>;
}

export const getAll = (positions: () => Knex.QueryBuilder<any, Position[]>) => async () => {
    return (await positions().select(allKeysOfPosition));
}

export async function create (data: DataClient): Promise<Data> {
    const positions = () => data.mysql('positions')
    
    return {
        getAll: getAll(positions)
    };
}

export default { create }