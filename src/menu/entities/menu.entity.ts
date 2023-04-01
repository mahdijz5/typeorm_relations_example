import {Tree,TreeChildren,TreeParent, Column, Entity, ManyToMany, PrimaryGeneratedColumn, OneToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import MenuFrontRl from './menuFrontRl.enity';
import MenuRoletRl from '../../role/entities/menuRoleRl.entity';

@Entity()
@Tree("closure-table", {
    closureTableName: "menu_closure",
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

    @Column({type : "bigint",default : 0})
    depth : number

    @OneToOne(() => MenuFrontRl,(menuFrontRl) => menuFrontRl.menu)
    menuFrontRl : MenuFrontRl

    @ManyToMany(() => MenuRoletRl)
    menuRoleRl : MenuRoletRl[]

    @BeforeInsert()
    @BeforeUpdate()
    async setDepth() {
        if (this.depth&&this.parent) {
            this.depth = +this.parent.depth+1
        }
    }
}