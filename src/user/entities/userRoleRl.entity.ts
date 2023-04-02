import Role from '../../role/entities/role.entity';
import { BeforeRemove, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
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

    @ManyToMany(() => Role,(role) => role.userRoleRl)
    @JoinTable()
    roles : Role[]    
            
} 