import { DataClient } from "../../data-providers";
import { allKeysOfCarPosition, allKeysOfPosition, CarPosition, Position } from "./position.model";
import knex, { Knex } from "knex";

export interface Data {
    getAll: ReturnType<typeof getAll>;
    getCarPositions: ReturnType<typeof getCarPositions>;
    updatePosition: ReturnType<typeof updatePosition>;
}

export type UpdatePositionParams = {
    Latitude: number,
    Longitude: number
}

export const updatePosition = (positions: () => Knex.QueryBuilder<any, Position>) => async (car: number, values: UpdatePositionParams) => {
    return positions().where({
        car: car
    })
    .update(values)
    .then(rows=> {
        return rows > 0;
    })
    .catch(err=> {
        console.error(err);
        throw err;
    });
}

export const getCarPositions = (carPositions: () => Knex.QueryBuilder<any, CarPosition[]>) => async (): Promise<CarPosition[]> => {
    return await carPositions().select(allKeysOfCarPosition);
}

export const getAll = (positions: () => Knex.QueryBuilder<any, Position[]>) => async () => {
    return (await positions().select(allKeysOfPosition));
}

export async function create (data: DataClient): Promise<Data> {
    const positions = () => data.mysql('positions');
    const carPositions = () => data.mysql('positions').join('cars', 'cars.car', 'positions.car');
    
    return {
        getAll: getAll(positions),
        getCarPositions: getCarPositions(carPositions),
        updatePosition: updatePosition(positions)
    };
}

export default { create }