import { Request, Response } from "express";
import { UsuariosService } from "../services/usuarios.service";
import { validarLogin, validarSignUp } from "../utils/validators"
import { UsuariosRepository } from "../repository/usuarios.repository";

const usuariosRepository = new UsuariosRepository()
const usuariosService = new UsuariosService(usuariosRepository);

export class UsuariosController {

    constructor() { }

    public async signUp(req: Request, res: Response) {
        const errores = validarSignUp(req.body);

        if (errores.length > 0) {
            return res.status(400).json({
                message: "Errores de validación",
                errores,
            });
        }

        try {
            const user = await usuariosService.signUp(req.body)
            return res.status(201).json(user);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    public async login(req: Request, res: Response) {
        const errores = validarLogin(req.body);

        if (errores.length > 0) {
            return res.status(400).json({
                message: "Errores de validación",
                errores,
            });
        }

        try {
            const { token, usuario } = await usuariosService.login(req.body)
            return res.status(200).json({
                status: 'success',
                token,
                usuario
            });
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }

    }
}