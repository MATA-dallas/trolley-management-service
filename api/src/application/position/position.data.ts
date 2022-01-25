import { DataClient } from "../../data-providers";
import { allKeysOfCarPosition, allKeysOfPosition, CarPosition, Position } from "./position.model";
import knex, { Knex } from "knex";

export interface Data {
    getAll: ReturnType<typeof getAll>;
    getById: ReturnType<typeof getById>
    getCarPositions: ReturnType<typeof getCarPositions>;
    updatePosition: ReturnType<typeof updatePosition>;
}

export type UpdatePositionParams = {
    Latitude: number,
    Longitude: number,
    UpdateTime: Date
}

export const getById = (positions: () => Knex.QueryBuilder<any, Position>) => async (car: number):Promise<Position> => {
    return (await positions().where({
        car
    }).select(allKeysOfPosition))[0];
}

export const updatePosition = (positions: () => Knex.QueryBuilder<any, Position>) => async (car: number, values: UpdatePositionParams) => {
    return positions().where({
        car: car
    })
    .update({
        ...values,
        UpdateTime: new Date(values.UpdateTime)
    })
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
    return (await positions().select(allKeysOfPosition) as Position[]);
}

export async function create (data: DataClient): Promise<Data> {
    const positions = () => data.mysql('positions');
    const carPositions = () => data.mysql('positions').join('cars', 'cars.car', 'positions.car');
    
    return {
        getAll: getAll(positions),
        getCarPositions: getCarPositions(carPositions),
        updatePosition: updatePosition(positions),
        getById: getById(positions)
    };
}

export default { create }