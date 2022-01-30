import { DataClient } from "../../data-providers";
import { allKeysOfCar, Car } from "./car.model";
import { Knex } from "knex";

export interface Data {
    getAll: ReturnType<typeof getAll>;
    get: ReturnType<typeof getCar>,
}

export const getCar = (cars: () => Knex.QueryBuilder<any, any>) => async (id: number) => {
    return (await cars().select(allKeysOfCar).select<any, Car>().where({ID: id}) as Car[])[0]
}
export const getAll = (cars: () => Knex.QueryBuilder<any, Car[]>) => async () => {
    return (await cars().select(allKeysOfCar).orderBy('car'));
}

export async function create (data: DataClient): Promise<Data> {
    const cars = () => data.mysql('cars')
    
    return {
        getAll: getAll(cars),
        get: getCar(cars)
    };
}

export default { create }