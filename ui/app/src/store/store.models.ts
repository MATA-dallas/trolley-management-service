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
    user: string,
    password: string,
    enabled: boolean
}