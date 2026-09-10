import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_fallback';

// Estructura de los datos que van dentro del token
export interface JwtPayload {
  id: number;
  nombre: string;
  email: string;
  role: string
}

// 1. Función para generar el token en el Login
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '8h', // El token vence en 8 horas
  });
}

// 2. Función para verificar el token en el Middleware
export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}