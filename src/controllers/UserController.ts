import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";

class UserController{

    static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
        const id: number = parseInt(req.params.id);
        let user: any = {}

        //Get the user from database
        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            res.status(404).send("User not found");
        }
        res.send(user)
    };

    static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
        let user = new User();
        user.userName = req.body.userName;
        user.password = req.body.password;
        user.organizationId = req.body.organizationId;
        user.role = req.body.role;
        user.email = req.body.email;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("User created");
    };
};

export default UserController;
