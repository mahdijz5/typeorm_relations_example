import UserDataInterface from "src/interfaces/userData.interface";
import { RoleEnum } from "./enums";

export const isEmpty = (value: string | number | object): boolean => {
    if (value === null) {
        return true;
    } else if (typeof value !== 'number' && value === '') {
        return true;
    } else if (typeof value === 'undefined' || value === undefined) {
        return true;
    } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    } else {
        return false;
    }
}

export const isAdmin = (user :UserDataInterface): boolean => {
    const admin = RoleEnum.admin
    return user.roles.filter(role => admin == role.name).length > 0 ? true : false
}