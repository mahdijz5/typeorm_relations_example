import UserRoleRl from "../user/entities/userRoleRl.entity";
import { User } from "../user/entities/user.entity";
import Role from "../role/entities/role.entity";
import Menu from "../menu/entities/menu.entity";
import MenuFrontRl from "../menu/entities/menuFrontRl.enity";
import { FrontModule } from "../front/front.module";
import Front from "../front/entities/front.entity";
import CreateUsers from "../database/seeds/users.seeder";

const rootDir = process.env.NODE_ENV === 'dist'
    ? 'dist'
    : 'src';
// console.log(`${rootDir}/**/entities/*.entity{.ts,.js}`);
module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize : true,
    entities: [User,Role,UserRoleRl,Menu,MenuFrontRl,FrontModule,Front],
    migrations: [`${rootDir}/database/seeds/*{.ts,.js}`],
    seeds: [`${rootDir}/database/seeds/*{.ts,.js}`],
    factories: [`${rootDir}/database/factories/*{.ts,.js}`],
    cli: {
        migrationsDir: `${rootDir}/database/seeds`,
    },
};