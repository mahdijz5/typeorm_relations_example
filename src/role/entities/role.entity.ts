import {UserRoleRl} from "../../user/entities/userRoleRl.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Menu from "../../menu/entities/menu.entity";
import MenuRoleRl from "src/role/entities/menuRoleRl.entity";

@Entity()
export default class Role {

    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

    @Column({
        length : 50,
        unique : true
    })
    name : string

    @ManyToMany(() => UserRoleRl)
    userRoleRl : UserRoleRl[]

    @OneToOne(() => MenuRoleRl,(menuRoleRl) => menuRoleRl.role)
    menuRoleRl : MenuRoleRl
    
}