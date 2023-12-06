export interface UserPost {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    isCritic: boolean
}

export interface UserPut {
    firstName: string,
    lastName: string,
    password: string
}
