import { ProductosRepository } from "../repository/productos.repository";
import { config } from "../config/config";
import fs from 'fs/promises';
import path from 'path';
import { error } from "console";
import { prisma } from "../prisma";

export class ProductosService {

    constructor(private productosRepository: ProductosRepository) {}

    //PRODUCTS
    async GetProducts() {
        return await this.productosRepository.GetProducts();
    }

    async GetProductByID(id: number) {
        if (isNaN(id)) {
            throw new Error("El ID proporcionado no es un número válido.");
        }
        return await this.productosRepository.GetProductByID(id);
    }

    async CreateProduct(data: { nombre: string, descripcion: string, precio: number, stock: number, marca_id: number, categoria_id: number}) {
        if (!data.nombre || !data.descripcion || !data.precio || !data.stock || !data.marca_id || !data.categoria_id) {
            throw new Error("Todos los campos son obligatorios.");
        }
        if (isNaN(data.precio) || isNaN(data.stock) || isNaN(data.marca_id) || isNaN(data.categoria_id)) {
            throw new Error("Los campos precio, stock, marca_id y categoria_id deben ser números válidos.");
        }
        if (data.precio < 0 || data.stock < 0) {
            throw new Error("Los campos precio y stock no pueden ser negativos.");
        }
        return await this.productosRepository.CreateProduct(data);
    }

    async EditProduct(id: number, data: { nombre?: string, descripcion?: string, precio?: number, stock?: number, marca_id: number, categoria_id: number}) {
        if (isNaN(id)) {
            throw new Error("El ID proporcionado no es un número válido.");
        }
        if (data.stock !== undefined && isNaN(data.stock)) {
            throw new Error("El campo stock debe ser un número válido.");
        }
        if (data.precio !== undefined && data.precio < 0) {
            throw new Error("El campo precio no puede ser negativo.");
        }
        if (data.stock !== undefined && data.stock < 0 ) {
            throw new Error("El campo stock no puede ser negativo.");
        }
        return await this.productosRepository.EditProduct(id, data);
    }

    async DeleteProduct(id: number) {
        if (isNaN(id)) {
            throw new Error("El ID proporcionado no es un número válido.");
        }
        return await this.productosRepository.DeleteProduct(id);
    }


    //CATEGORIES
    async GetCategories() {
        return await this.productosRepository.GetCategories();
    }

    async GetCategoryById(categoryId: number) {
        if (isNaN(categoryId)) {
            throw new Error("El ID de categoría proporcionado no es un número válido.");
        }
        if (categoryId <= 0) {
            throw new Error("El ID de categoría debe ser un número positivo.");
        }
        return await this.productosRepository.GetCategoryById(categoryId);
    }

    async CreateCategory(nombre: string){
        const nombreCategory = await this.productosRepository.GetCategoryByName(nombre)
        if(!nombre || !nombre.trim()){
            throw new Error("El nombre no puede estar incompleto")
        }

        
        if(nombreCategory){
            throw new Error("El nombre de la categoría ya existe.");
        }
        
        return await this.productosRepository.CreateCategory({
            nombre: nombre.trim()
        });
    }


    //BRANDS
    async GetBrands() {
        return await this.productosRepository.GetBrands();
    }

    async GetBrandById(brandId: number) {
        if (isNaN(brandId)) {
            throw new Error("El ID de marca proporcionado no es un número válido.");
        }
        if (brandId <= 0) {
            throw new Error("El ID de marca debe ser un número positivo.");
        }
        return await this.productosRepository.GetBrandById(brandId);
    }

    async CreateBrand(nombre: string, file: Express.Multer.File){
        if(!nombre || !file){
            throw new Error("Completar todos los campos")
        }

        let logo_url: string | undefined = undefined;

        if (file) {
        logo_url = '/uploads/' + file.filename;
    }
        return await this.productosRepository.CreateBrand({
            nombre,
            logo_url
        })
    }


    //IMAGES
    async UploadImage(productoId: number, files: Express.Multer.File[]) {
        const results = [];

        for (const file of files) {
            const name = file.filename;
            const path = '/uploads/' + name;

            // Persiste mediante Prisma
            const archivoGuardado = await this.productosRepository.CreateImageProduct(productoId, path);

            results.push({
                id: archivoGuardado.id,
                producto_id: archivoGuardado.producto_id,
                path: `${config.baseUrl}${archivoGuardado.imagen_url}`
            });
        }


        return {
            status: "success",
            data: results
        };
    }

   async DeleteImage(id: number) {
    if (isNaN(id) || id <= 0) {
        throw new Error("El ID de la imagen proporcionado no es válido.");
    }

    // 1. Buscamos el registro a través del repository
    const imagen = await this.productosRepository.FindImageById(id);

    if (!imagen) {
        throw new Error("La imagen especificada no existe.");
    }

    // 2. Borramos el registro en la Base de Datos
    const imagenEliminada = await this.productosRepository.DeleteImageProduct(id);

    // 3. Borramos el archivo físico del servidor
    try {
        const rutaFisica = path.join(process.cwd(), imagen.imagen_url);
        await fs.unlink(rutaFisica);
    } catch (err) {
        console.error("No se pudo borrar el archivo físico:", err);
    }

    return imagenEliminada;

}
}