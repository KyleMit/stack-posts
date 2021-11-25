import { CreateMethod, epochToISO, Modify } from "../utils";

export interface IUserBase {
    user_id: number;
}

export interface IUserApi extends IUserBase {
    reputation: number
    creation_date: number
    profile_image: string
    display_name: string
}

export interface IUser extends Modify<IUserApi, {
    creation_date: string
}> {}


export const transformApiUsers = (users: IUserApi[]): IUser[] => users.map((u) => User.create({
    ...u,
    creation_date: epochToISO(u.creation_date),
}))

const createUserBase: CreateMethod<IUserBase> = (args) => ({
    user_id: args?.user_id ?? 0
})

export const UserBase = {
    create: createUserBase
}

const createUser: CreateMethod<IUser> = (args) => ({
    user_id: args?.user_id ?? 0,
    reputation: args?.reputation ?? 0,
    creation_date: args?.creation_date ?? '',
    profile_image: args?.profile_image ?? '',
    display_name: args?.display_name ?? ''
})

export const User = {
    create: createUser
}
