import bcrypt from "bcrypt";
import { UsuariosRepository } from "../repository/usuarios.repository";
import { generateToken } from "../utils/jwt";

export class UsuariosService {
    constructor(private usuariosRepository: UsuariosRepository) { }

    async signUp(data: { nombre: string, apellido: string, direccion: string, contrasena: string, email: string }) {
        const existingUser = await this.usuariosRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("El email ya está registrado");
        }
        // 2. Hashear la contraseña
        const hashedPassword = await bcrypt.hash(data.contrasena, 10);

        const newUser = await this.usuariosRepository.createUser({
            ...data,
            contrasena: hashedPassword,
        });

        const { contrasena, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async login(data: { email: string, contrasena: string }) {
        const existingUser = await this.usuariosRepository.findByEmail(data.email);
        if (!existingUser) {
            throw new Error("El email no está registrado");
        }

        const passwordTrue = await bcrypt.compare(data.contrasena, existingUser.contrasena)
        if (!passwordTrue) {
            throw new Error("Credenciales inválidas.");
        }

        const token = generateToken({
           id: existingUser.id,
           nombre: existingUser.nombre,
           email: existingUser.email,
           role: existingUser.role
        })

        const { contrasena, ...userWithoutPassword } = existingUser;
        return{
            token,
            usuario:userWithoutPassword
        } ;
        
    }

}
