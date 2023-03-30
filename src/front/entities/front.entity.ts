import MenuFrontRl from "../../menu/entities/menuFrontRl.enity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @OneToOne(() => MenuFrontRl,(menuFrontRl)=>menuFrontRl.front)
    @JoinColumn()
    menuFrontRl : MenuFrontRl
} 