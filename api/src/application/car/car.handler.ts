import { Data } from "./car.data"

const getCarById = (cars: Data) => async (id: number) => {
    return cars.get(id);
}

const getAllCars = (cars: Data) => async () => {
    return cars.getAll();
}


export interface Handler {
    getAllCars: ReturnType<typeof getAllCars>,
    getCarById: ReturnType<typeof getCarById>
}

const create = (data: Data) : Handler => {
    return {
        getCarById: getCarById(data),
        getAllCars: getAllCars(data)
    };
}

export default { create }