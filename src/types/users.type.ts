export interface UserReq {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    isCritic: string
}

export interface UserBD {
    user_id: number,
    username: string,
    first_name: string,
    last_name: string,
    pass: string,
    is_critic: boolean,
}