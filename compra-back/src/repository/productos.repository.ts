import { Decimal } from '@prisma/client/runtime/client';
import { prisma } from '../prisma.js';

export class ProductosRepository {

    async GetProducts() {
        const products = await prisma.productos.findMany({
            include: {
                producto_imagenes: true
            }
        });
        return products;
    }

    async GetProductByID(id: number) {
        const products = await prisma.productos.findUnique({
            where: {
                id: id
            },
            include: {
                producto_imagenes: true
            }
        });
        return products;
    }

    async CreateProduct(data: { nombre: string, descripcion: string, precio: number, stock: number, marca_id: number, categoria_id: number }) {
        const product = await prisma.productos.create({
            data
        });
        return product;
    }

    async EditProduct(id: number, data: { nombre?: string, descripcion?: string, precio?: number, stock?: number, marca_id: number, categoria_id: number }) {
        const product = await prisma.productos.update({
            where: {
                id: id
            },
            data
        });
        return product;
    }

    async DeleteProduct(id: number) {
        const product = await prisma.productos.delete({
            where: {
                id: id
            }
        });
        return product;
    }

    //CATEGORIES
    async GetCategories() {
        const categories = await prisma.categorias.findMany();
        return categories;
    }

    async GetCategoryById(id: number) {
        const products = await prisma.categorias.findUnique({
            where: {
                id: id
            }
        });
        return products;
    }

    async CreateCategory(data: { nombre: string }) {
        const category = await prisma.categorias.create({
            data
        })
        return category
    }

    async GetCategoryByName(nombre: string) {
        return await prisma.categorias.findFirst({
            where: { nombre }
        });
    }

    //BRANDS

    async GetBrands() {
        const brands = await prisma.marcas.findMany();
        return brands;
    }

    async GetBrandById(id: number) {
        const products = await prisma.marcas.findUnique({
            where: {
                id: id
            }
        });
        return products;
    }

    async CreateBrand(data: { nombre: string, logo_url: string }) {
        const brand = await prisma.marcas.create({
            data
        })
        return brand
    }

    //IMAGES

    async CreateImageProduct(productoId: number, imagenUrl: string) {
        return await prisma.producto_imagenes.create({
            data: {
                producto_id: productoId,
                imagen_url: imagenUrl
            }
        });
    }

    async FindImageById(id: number) {
        return await prisma.producto_imagenes.findUnique({
            where: { id: id }
        });
    }

    async DeleteImageProduct(id: number) {
        return await prisma.producto_imagenes.delete({
            where: { id: id }
        });
    }


}
