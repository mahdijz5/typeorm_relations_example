import { Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Menu from './menu.entity';
import Front from '../../front/entities/front.entity';

@Entity()
export default class MenuFrontRl {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

    @OneToOne(() => Menu,(menu) => menu.menuFrontRl)
    menu : Menu

    @ManyToMany(() => Front)
    @JoinTable()
    fronts : Front[]            
}