import { Router } from "express";
import { ProductosController } from "../controller/productos.controller";
import { authenticateToken, requireRole } from "../middlewares/auth.middleware";
import { uploadImages } from "../utils/upload";

const productosController = new ProductosController();
const productoRouter = Router();


productoRouter.get("/", productosController.GetProducts.bind(productosController));

productoRouter.get("/categoria", productosController.GetCategories.bind(productosController));
productoRouter.get("/categoria/:categoryId", productosController.GetProductsByCategory.bind(productosController));

productoRouter.get("/marca", productosController.GetBrands.bind(productosController));
productoRouter.get("/marca/:brandId", productosController.GetProductsByBrand.bind(productosController));

productoRouter.get("/:id", productosController.GetProductByID.bind(productosController));

productoRouter.post("/", authenticateToken, requireRole("ADMIN"), productosController.CreateProduct.bind(productosController));
productoRouter.put("/:id", authenticateToken, requireRole("ADMIN"), productosController.EditProduct.bind(productosController));
productoRouter.delete("/:id", authenticateToken, requireRole("ADMIN"), productosController.DeleteProduct.bind(productosController));

productoRouter.post("/upload/:productoId", authenticateToken, requireRole("ADMIN"),uploadImages, productosController.uploadImages.bind(productosController));
productoRouter.delete('/imagen/:id', authenticateToken, requireRole("ADMIN"), productosController.deleteImage.bind(productosController));
export { productoRouter };
