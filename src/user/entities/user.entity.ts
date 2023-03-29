import { BeforeUpdate, Column, Entity, JoinColumn,OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { hash, hashSync } from "bcrypt";
import UserRoleRl from "./userRoleRl.entity";


@Entity({name : "user"})
export class User {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

    @Column({
        type: "varchar",
        length: 150,
        unique : true
    })
    email : string

    @Column({
        type: "varchar",
        length: 150,
    })
    username : string

    @Column({
        type: "varchar",
    })
    password: string

    @OneToOne(() => UserRoleRl,(userRoleRl) =>userRoleRl.user )
    @JoinColumn()
    userRoleRl : UserRoleRl

    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }
}