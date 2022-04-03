import { Knex } from "knex";
import { DataClient } from "../../data-providers";

type Ad = {
    ID: number,
    latitude: number,
    longitutde: number,
    createdAt: Date,
    message: string
}

const getLatestAd = (ads: () => Knex.QueryBuilder<any, any>) => async () => {
    const ad = (await ads()
        .select<any, Ad>()
        .orderBy('createdAt', 'desc')
        .first()
    );

    return ad as Ad;
}

export type CreateAd = {
    latitude: number,
    longitude: number,
    createdAt: Date,
    message: string
}

const createAd = (ads: () => Knex.QueryBuilder<any, any>) => async ({latitude, longitude, createdAt, message}: CreateAd) => {
    const item = (await ads()
        .insert({
            'latitude': latitude,
            'longitude': longitude,
            'message': message
        })
        .returning('ID')) as number[];
    
    if(item[0] == undefined)
        throw new Error("Ad was not inserted correctly");
    
    return item[0];
}

export type Handler = {
    getLatestAd: ReturnType<typeof getLatestAd>,
    createAd: ReturnType<typeof createAd>
};

const create = (dataClient: DataClient) => {
    const ads = () => dataClient.mysql('advertisements');
    return {
        createAd: createAd(ads),
        getLatestAd: getLatestAd(ads)
    }
}

export default { create }