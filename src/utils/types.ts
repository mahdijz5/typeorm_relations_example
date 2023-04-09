//! User

import Menu from "src/menu/entities/menu.entity"

export type CreateUserParams = {
    username: string
    email: string
    password: string,
}

export type UpdateUserParams = {
    username?: string
    email?: string
}

export type ResetPasswordParams = {
    password : string
    confirmPassword : string
}

//! Role
export type CreateRoleParams = {
    name : string
}

export type UpdateRoleParams = {
    name? : string
    menusId? : number[]
}

//! Front
export type CreateMenuParams = {
    name : string,
    parent? : Menu
}

export type UpdateMenuParams = {
    name : string
    parent? : number
    fronts? : number[]
}

//! Front
export type CreateFrontParams = {
    name : string
}

export type UpdateFrontParams = {
    name : string
}
