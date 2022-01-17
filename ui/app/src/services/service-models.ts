export type Alert = {
    ID: number;
    UpdateID: number
    Type: string
    Alert: string
    Posted: Date
    Expiration: Date
    PostedBy: string
    Active: boolean
}

export type User = {
    ID: number,
    user: string
}

export type CarState = {
    RecordId: string,
    ID: string,
    Time: string,
    Street: string,
    City: string,
    Province: string,
    PostalCode: string,
    County: string,
    Latitude: number,
    Longitude: number,
    Speed: number,
    Altitude: number,
    Battery: 11.734,
    NumSats: number
}

export type Position = {
    car: number,
    latitude: number,
    longitude: number,
    namedPoint: string,
    updateTime: string,
    manualStatus: 'OFF' | ''
}

export type Car = {
    ID: string,
    car: number,
    IMEI: number
}

export type CarDataItem = {
    carState: CarState | null,
    carPosition: Position | null,
    car: Car
}

export type CarData = {
    cars: CarDataItem[]
}