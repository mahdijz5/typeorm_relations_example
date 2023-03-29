import Role from 'src/role/entities/role.entity';
import { Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';

@Entity()
export default class UserRoleRl {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

    @OneToOne(() => User,(user) => user.userRoleRl)
    user : User

    @ManyToMany(() => Role)
    @JoinTable()
    roles : Role[]            
}