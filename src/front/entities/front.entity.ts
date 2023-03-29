import MenuFrontRl from "src/menu/entities/menuFrontRl.enity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export default class Front {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

    @Column({length : 150})
    name : string

    @Column({length : 400})
    description : string

    @ManyToMany(() => MenuFrontRl)
    menuFrontRl : MenuFrontRl
} 