import multer from "multer";
import { randomUUID } from "crypto";
import fs from "fs"
import path from "path";
import { Pool, ResultSetHeader } from "mysql2";

//Definir la ruta relativa dentro del proyecto, sino se me crea ene l disco C
const uploadDir = path.join(process.cwd(), 'uploads');

//Chequear si la carpeta existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        //Va a chequear si el archivo ya existe o viene sin nombre
        const ext = path.extname(file.originalname || '').toLowerCase()
        //Llama al chequeo para poder utilizarlo, sino genera el nombre
        const name = `${randomUUID()}${ext || ''}`
        //lo guarda
        cb(null, name)
    }
})

//Aceptar solo imagenes
const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
    if ((file.mimetype || '').startsWith('image/')) {
        return cb(null, true)
    }
    return cb(new Error('no es un tipo de imagen.'))
}

export const uploadImages = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024,
        files: 1
    }
}).array('images', 1)
