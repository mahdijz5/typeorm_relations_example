import Front from "src/front/entities/front.entity"
import Menu from "src/menu/entities/menu.entity"
import MenuFrontRl from "src/menu/entities/menuFrontRl.enity"
import Role from "src/role/entities/role.entity"
import { User } from "src/user/entities/user.entity"
import UserRoleRl from "src/user/entities/userRoleRl.entity"
import { MigrationInterface, QueryRunner } from "typeorm"

export class seed1680186447282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // admin 
        let admin_menu =  queryRunner.manager.create(Menu,{name : 'root'})
        let admin_menuFrontRl =  queryRunner.manager.create(MenuFrontRl,{menus : []})
        let admin_front =  queryRunner.manager.create(Front,{name :"admin-front",description : "This is default front for admin"})
        let admin_role =  queryRunner.manager.create(Role,{name : "Admin"})
        let admin_userRoleRl =  queryRunner.manager.create(UserRoleRl,{roles :[]})
        let admin_user =  queryRunner.manager.create(User,{email:"root@root.com",username : "root",password : "root"})
        
        admin_menuFrontRl.menus.push(admin_menu)
        admin_role.menu = admin_menu
        admin_front.menuFrontRl = admin_menuFrontRl
        admin_user.userRoleRl = admin_userRoleRl
        admin_userRoleRl.roles.push(admin_role)

        await queryRunner.manager.save(admin_menu)
        await queryRunner.manager.save(admin_menuFrontRl)
        await queryRunner.manager.save(admin_front)
        await queryRunner.manager.save(admin_role)
        await queryRunner.manager.save(admin_userRoleRl)
        await queryRunner.manager.save(admin_user)

        // user
        let user_menu =  queryRunner.manager.create(Menu,{name : 'user'})
        let user_menuFrontRl =  queryRunner.manager.create(MenuFrontRl,{menus : []})
        let user_front =  queryRunner.manager.create(Front,{description : "This is default front for user",name :"user-front" })
        let user_role =  queryRunner.manager.create(Role,{name : "user"})
        let user_userRoleRl =  queryRunner.manager.create(UserRoleRl,{roles : []})

        user_menuFrontRl.menus.push(user_menu)
        user_front.menuFrontRl = user_menuFrontRl
        user_role.menu = user_menu
        user_userRoleRl.roles.push(user_role)

        await queryRunner.manager.save(user_menu)
        await queryRunner.manager.save(user_menuFrontRl)
        await queryRunner.manager.save(user_front)
        await queryRunner.manager.save(user_role)
        await queryRunner.manager.save(user_userRoleRl)
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
    }


}
