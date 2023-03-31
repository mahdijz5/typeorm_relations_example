import Role from '../../role/entities/role.entity';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';

@Entity()
export class UserRoleRl {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

    @OneToOne(() => User,(user) => user.userRoleRl)
    @JoinColumn()
    user? : User

    @ManyToMany(() => Role)
    @JoinTable()
    roles : Role[]            
}