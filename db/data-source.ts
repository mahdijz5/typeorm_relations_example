import { DataSource, DataSourceOptions } from "typeorm";
import { seed1680186447282 } from "./migrations/1680186447282-seed";
import { User } from "src/user/entities/user.entity";
import Role from "src/role/entities/role.entity";
import {UserRoleRl} from "src/user/entities/userRoleRl.entity";
import Menu from "src/menu/entities/menu.entity";
import MenuFrontRl from "src/menu/entities/menuFrontRl.enity";
import { FrontModule } from "src/front/front.module";
import Front from "src/front/entities/front.entity";
import MenuRoletRl from "src/role/entities/menuRoleRl.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'role_based_auth',
    synchronize :true,
    entities: [User,Role,UserRoleRl,Menu,MenuFrontRl,FrontModule,Front,MenuRoletRl],
    migrations: [seed1680186447282],
    
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
