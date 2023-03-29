import UserRoleRl from '../../user/entities/userRoleRl.entity';
import { User } from "../../user/entities/user.entity"
import { define, factory } from "typeorm-seeding"

console.log("factory")
define(User, () => {
    const user = new User()
    user.username = `root`
    user.password = 'root'
    user.email = 'root@root.com',
    user.userRoleRl = factory(UserRoleRl)() as any
    return user
})