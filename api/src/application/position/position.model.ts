
export type ManualStatus = 'OFF' | '';

export type Position = {
    car: number,
    latitude: number,
    longitude: number,
    namedPoint: string,
    updateTime: Date,
    manualStatus: ManualStatus
}

export type CarPosition = Position & {
    car: number,
    IMEI: number
}

export const allKeysOfPosition:string[] = ['car','latitude','longitude','namedPoint','updateTime','manualStatus']

export const allKeysOfCarPosition: string[] = ['IMEI', 'positions.car', 'latitude','longitude','namedPoint','updateTime','manualStatus'];