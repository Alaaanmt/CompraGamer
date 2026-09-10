import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
export class UsuariosRepository{

    async createUser(data: {nombre:string, apellido:string, direccion:string, contrasena:string, email:string}){
        const user = await prisma.usuarios.create({
            data
        })
        return user
    }

    async findByEmail(email:string){
        const user = await prisma.usuarios.findUnique({
            where: {
                email: email
            }
        })
        return user
    }

    
}