import { Router } from "express";
import { UsuariosController } from "../controller/usuarios.controller";

const usuariosController = new UsuariosController()
const usuarioRouter = Router() 

usuarioRouter.post("/signup", usuariosController.signUp.bind(usuariosController));
usuarioRouter.post("/login",  usuariosController.login.bind(usuariosController));

export {usuarioRouter}
