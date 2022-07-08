
export type Config = {
    apiBaseUrl: string,
    uiBasePrefix: string
}

const config =  {
    apiBaseUrl: 'http://localhost:3001',
    uiBasePrefix:''
} as Config

export {config as ConfigValues};