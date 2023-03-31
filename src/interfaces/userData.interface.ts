export default interface UserDataInterface {
    id?: number,
    username?: string,
    email?: string,
    roles? : {name : string, id :number}[]
    userRoleRl?: {roles :any}

}