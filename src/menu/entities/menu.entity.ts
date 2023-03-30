import  Role  from '../../role/entities/role.entity';
import {Tree,TreeChildren,TreeParent, Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import MenuFrontRl from './menuFrontRl.enity';

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

    @OneToMany(() => Role,(role) => role.menu)
    roles : Role[]

    @TreeChildren()
    children: Menu[]

    @TreeParent()
    parent: Menu

    @ManyToMany(() => MenuFrontRl)
    menuFrontRl : MenuFrontRl[]
}