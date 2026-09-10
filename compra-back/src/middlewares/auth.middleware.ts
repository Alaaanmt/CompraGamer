import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

// Interfaz para extender Request y guardar los datos del usuario logueado
export interface AuthRequest extends Request {
  user?: any;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  // 1. Obtener el header 'authorization' (espera el formato "Bearer <token>")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado: Token no proporcionado' });
  }

  try {
    // 2. Verificamos el token con la función que hiciste en utils
    const decoded = verifyJwt(token);
    
    // 3. Inyectamos los datos del usuario en el request para que el controlador los use
    req.user = decoded;
    
    // 4. Continuamos a la siguiente función/controlador
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

// Middleware que recibe el rol permitido (ej: 'ADMIN')
export function requireRole(roleRequerido: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // req.user viene del middleware authenticateToken previo
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    if (req.user.role !== roleRequerido) {
      return res.status(403).json({ 
        message: `Acceso denegado: Se requiere rol de ${roleRequerido}` 
      });
    }

    next(); // Si el rol coincide, continúa a la ruta
  };
}