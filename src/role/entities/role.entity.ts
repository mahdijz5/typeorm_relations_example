import UserRoleRl from "../../user/entities/userRoleRl.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Menu from "../../menu/entities/menu.entity";

@Entity()
export default class Role {

    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

    @Column({
        length : 50
    })
    name : string

    @ManyToMany(() => UserRoleRl)
    userRoleRl : UserRoleRl[]

    @ManyToOne(() => Menu,(menu) => menu.roles)
    @JoinColumn()
    menu : Menu
}