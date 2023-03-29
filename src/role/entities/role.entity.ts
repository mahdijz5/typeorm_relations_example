import UserRoleRl from "src/user/entities/userRoleRl.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Menu from "src/menu/entities/menu.entity";

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