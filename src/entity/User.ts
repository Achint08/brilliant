
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["userName"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    userName: string;

    @Column()
    @Length(4, 20)
    firstName: string;

    @Column()
    @Length(4, 20)
    lastName: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    organizationId: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    email: string;

    @Column()
    @CreateDateColumn()
    userCreationTime: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, password: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}
