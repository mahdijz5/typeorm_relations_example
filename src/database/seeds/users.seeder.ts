import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../user/entities/user.entity';

console.log("seed")
export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<any> {
        return await factory(User)().createMany(1);
    }
}