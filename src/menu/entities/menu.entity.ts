import {Tree,TreeChildren,TreeParent, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import MenuFrontRl from './menuFrontRl.enity';
import MenuRoletRl from '../../role/entities/menuRoleRl.entity';

@Entity()
@Tree("closure-table",{
    closureTableName: "menu",
    ancestorColumnName: (column) => "ancestor_" + column.propertyName,
    descendantColumnName: (column) => "descendant_" + column.propertyName,
})
export default class Menu {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id: number

    @Column({length : 100,unique : true})
    name : string

    @TreeChildren()
    children: Menu[]

    @TreeParent()
    parent: Menu

    @ManyToMany(() => MenuFrontRl)
    menuFrontRl : MenuFrontRl[]

    @ManyToMany(() => MenuRoletRl)
    menuRoleRl : MenuRoletRl[]
}