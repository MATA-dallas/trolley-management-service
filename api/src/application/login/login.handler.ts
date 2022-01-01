import { User } from "./login.data";

export interface Handler {
    getAuthenticatedUser: (username: string, passwordHash: string) => Promise<User | null>
}

