
export type Position = {
    car: number,
    latitude: number,
    longitude: number,
    namedPoint: string,
    updateTime: Date,
    manualStatus: 'OFF' | ''
}

export const allKeysOfPosition:string[] = ['car','latitude','longitude','namedPoint','updateTime','manualStatus']