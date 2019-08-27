import { Router } from "express";
import UserController from "../controllers/UserController";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyRole } from "../middlewares/verifyRole";

  const router = Router();

  // Get user for a particular id
  router.get(
    "/:id([0-9]+)",
    [verifyJwt, verifyRole(["ADMIN"])],
    UserController.getOneById
  );

  //Create a new user
  router.post("/", [verifyJwt], UserController.newUser);

  export default router;