import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetUserController } from "../modules/users/useCases/getUser/GetUserController";
import { LoginUserController } from "../modules/users/useCases/loginUser/LoginUserController";

const getUserController = new GetUserController()
const createUserController = new CreateUserController()
const loginUserUseController = new LoginUserController()
const userRoutes = Router()

userRoutes.post("/register", createUserController.handle)
userRoutes.post("/login", loginUserUseController.handle)
userRoutes.get("/", getUserController.handle)

export { userRoutes }