import  Role  from 'src/role/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import ClosureTableMenu from './closureTableMenu.entity';
import MenuFrontRl from './menuFrontRl.enity';

@Entity()
export default class Menu {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id: number

    @Column({length : 100})
    name : string

    @OneToMany(() => Role,(role) => role.menu)
    roles : Role[]

    @OneToOne(() => ClosureTableMenu,(table)=> table.parent)
    table : ClosureTableMenu

    @ManyToMany(() => MenuFrontRl)
    @JoinTable()
    menuFrontRl : MenuFrontRl
}