export interface IUser {
    id: string
    email: string
    created_at: string
}
export interface IProfileResponse {
    data: IUser | null
    error: string | null
}