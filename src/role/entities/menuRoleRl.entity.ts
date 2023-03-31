import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Menu from '../../menu/entities/menu.entity';
import Front from '../../front/entities/front.entity';
import Role from "src/role/entities/role.entity";

@Entity()
export default class MenuRoleRl {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

    @OneToOne(() => Role,(role) => role.menuRoleRl)
    @JoinColumn()
    role : Role           
    
    @ManyToMany(() => Menu)
    @JoinTable()
    menus : Menu[]
}