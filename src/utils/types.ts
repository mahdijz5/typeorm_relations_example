//! User

export type CreateUserParams = {
    username: string
    email: string
    password: string,
}

export type UpdateUserParams = {
    username: string
    email: string
    password: string
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
    name : string
}