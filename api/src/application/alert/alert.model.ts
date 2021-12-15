import { keys } from 'ts-transformer-keys';

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

export const allKeysOfAlert: string[] = [ 'ID', 'UpdateID', 'Type', 'Alert', 'Posted', 'Expiration', 'PostedBy', 'Active']