import { Router } from "express";
import { productoRouter } from "./productos.routes.js";
import {usuarioRouter} from "./usuarios.routes.js";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/productos", productoRouter);
        router.use(usuarioRouter)
        return router;
    }
}
