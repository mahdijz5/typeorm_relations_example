import  Menu from 'src/menu/entities/menu.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ClosureTableMenu {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id :number

    @OneToOne(() => Menu,(parent)=> parent.table)
    @JoinColumn()
    parent : Menu

    @OneToOne(() => Menu,(child)=> child.table)
    @JoinColumn()
    child : Menu

    @Column({type : "int64",default : 0})
    depth : number
}