import {ProductosRepository} from "../repository/productos.repository";
import {ProductosService} from "../services/productos.service";
import { Request, Response } from "express";

const productosRepository = new ProductosRepository();
const productosService = new ProductosService(productosRepository);

export class ProductosController {
    constructor() {}

    public async GetProducts(req: Request, res: Response) {
        try {
            const products = await productosService.GetProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los productos." });
        }
    }

    public async GetProductByID(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: " ID invalido." });
                return;
            }

            const product = await productosService.GetProductByID(id);

            if (!product) {
                res.status(404).json({ error: "Producto no encontrado." });
                return;
            } else {
            res.json(product);
            }

        } catch (error) {
            res.status(500).json({ error: "Error al obtener el producto." });
        }
    }

    public async CreateProduct(req: Request, res: Response) {
        const data = req.body;
        try {
            const nuevoProducto = await productosService.CreateProduct(data);
            res.status(201).json(nuevoProducto);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async EditProduct(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const data = req.body;
        if (isNaN(id)) {
            res.status(400).json({ error: "ID invalido." });
            return;
        }

        try {
            const productoEditado = await productosService.EditProduct(id, data);
            res.json(productoEditado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async DeleteProduct(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "ID invalido." });
            return;
        }
        try {
            const productoEliminado = await productosService.DeleteProduct(id);
            res.json(productoEliminado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async GetCategories(req: Request, res: Response) {
        const categories = await productosService.GetCategories();
        res.json(categories);
    }

    public async GetProductsByCategory(req: Request, res: Response) {
        const categoryId: number = Number(req.params.categoryId);
        if (isNaN(categoryId)) {
            res.status(400).json({ error: "ID de categoría invalido." });
            return;
        }
        try {
            const productosPorCategoria = await productosService.GetProductsByCategory(categoryId);
            res.json(productosPorCategoria);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async GetBrands(req: Request, res: Response) {
        const brands = await productosService.GetBrands();
        res.json(brands);
    }

    public async GetProductsByBrand(req: Request, res: Response) {
        const brandId: number = Number(req.params.brandId);
        if (isNaN(brandId)) {
            res.status(400).json({ error: "ID de marca invalido." });
            return;
        }

        try {
            const productosPorMarca = await productosService.GetProductsByBrand(brandId);
            res.json(productosPorMarca);
        }catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async uploadImages(req: Request, res: Response) {
        try {
            const productoId = Number(req.params.productoId);
            const files = req.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                return res.status(400).json({ status: "error", message: "No se envió ninguna imagen" });
            }

            const result = await productosService.uploadImage(productoId, files);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({ status: "error", message: error.message || "Error al subir la imagen" });
        }
    }

  public async deleteImage(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID de imagen inválido." });
        }

        const imagenEliminada = await productosService.deleteImage(id);
        return res.status(200).json({
            message: "Imagen eliminada con éxito",
            data: imagenEliminada
        });
    } catch (error: any) {
        return res.status(400).json({ error: error.message || "Error al eliminar la imagen." });
    }
}
}