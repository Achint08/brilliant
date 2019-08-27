import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1566778647191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.userName = "admin";
        user.firstName = "admin"
        user.lastName = "";
        user.organizationId = "Brilliant";
        user.password = "password";
        user.email = "admin@brilliant.com"
        user.hashPassword();
        user.role = "ADMIN";
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
