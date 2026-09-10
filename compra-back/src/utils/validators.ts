export interface SignUpInput {
  nombre: string;
  apellido: string;
  direccion: string;
  email: string;
  contrasena: string;
}

export function validarSignUp(data: SignUpInput): string[] {
  const errores: string[] = [];

  // 1. Validar Email mediante Expresión Regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errores.push("El email no tiene un formato válido.");
  }

  // 2. Validar Contraseña (mínimo 8 caracteres, una mayúscula y un número)
  if (!data.contrasena || data.contrasena.length < 8) {
    errores.push("La contraseña debe tener al menos 8 caracteres.");
  } else {
    if (!/[A-Z]/.test(data.contrasena)) {
      errores.push("La contraseña debe tener al menos una letra mayúscula.");
    }
    if (!/[0-9]/.test(data.contrasena)) {
      errores.push("La contraseña debe tener al menos un número.");
    }
  }

  // 3. Validar textos obligatorios
  if (!data.nombre || data.nombre.trim().length < 2) {
    errores.push("El nombre debe tener al menos 2 caracteres.");
  }

  if (!data.apellido || data.apellido.trim().length < 2) {
    errores.push("El apellido debe tener al menos 2 caracteres.");
  }

  return errores; // Retorna un array con los mensajes de error encontrados

}

export function validarLogin(data: { email: string; contrasena: string }): string[] {
  const errores: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email || !emailRegex.test(data.email)) {
    errores.push("El email no tiene un formato válido.");
  }

  if (!data.contrasena || data.contrasena.trim() === "") {
    errores.push("La contraseña no puede estar vacía.");
  }

  return errores;
}