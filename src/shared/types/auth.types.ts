import { IUser } from "./user.types"

export enum EnumStorage {
    TOKEN = 'access_token',
    USER = 'user'
}

export interface IToken {
	token: string
}

export interface IAuthResponse {
    data: IUser | null,
    error: null | string
}

