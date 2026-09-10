import {defineStore} from 'pinia'
import { ref, computed } from 'vue';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  apellido: string;
  direccion: string;
  role: string;
}

export const useAuthStore = defineStore('auth', () => {
  // Inicializamos desde localStorage para no perder la sesión al presionar F5
  const token = ref<string | null>(localStorage.getItem('token'));
  const usuario = ref<Usuario | null>(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  );

  const isLoggedIn = computed(() => !!token.value);
  const nombreUsuario = computed(() => usuario.value?.nombre || '');

  function setSession(newToken: string, newUser: Usuario) {
    token.value = newToken;
    usuario.value = newUser;
    localStorage.setItem('token', newToken);
    localStorage.setItem('usuario', JSON.stringify(newUser));
  }

  function logout() {
    token.value = null;
    usuario.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  return {
    token,
    usuario,
    isLoggedIn,
    nombreUsuario,
    setSession,
    logout
  };
});