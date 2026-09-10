<template>
    <section class="min-h-screen lg:min-h-0 flex items-center justify-center pt-18 lg:pt-4 p-4">
        <div class="bg-zinc-900 text-white flex justify-center w-full max-w-2xl mx-auto rounded-md py-8 px-6 sm:px-10">
            <div class="flex flex-col w-full">
                <p class="text-2xl font-bold uppercase text-center pb-8">Perfil</p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                    <div class="flex flex-col space-y-2">
                        <label>Nombre</label>
                        <input class="bg-black rounded-md text-white p-2 cursor-not-allowed w-full" type="text" disabled v-model="nombre"> 
                    </div>
                    <div class="flex flex-col space-y-2">
                        <label>Apellido</label>
                        <input class="bg-black rounded-md text-white p-2 cursor-not-allowed w-full" type="text" disabled v-model="apellido">
                    </div>
                </div>

                <!-- Email -->
                <div class="flex flex-col space-y-2 pb-4">
                    <label>Email</label>
                    <input class="bg-black rounded-md text-white p-2 cursor-not-allowed w-full" type="text" disabled v-model="email">
                </div>

                <!-- Dirección -->
                <div class="flex flex-col space-y-2">
                    <label>Dirección</label>
                    <input class="bg-black rounded-md text-white p-2 cursor-not-allowed w-full" type="text" disabled v-model="direccion">
                </div>

                <!-- Botones de Acción -->
                <div class="flex flex-col-reverse sm:flex-row justify-between gap-3 w-full pt-8">
                    <button @click="goBack"
                        class="w-full sm:w-1/3 text-center bg-white text-orange-400 hover:bg-orange-500 hover:text-white py-2 px-4 rounded transition-all duration-300 font-semibold cursor-pointer">
                        Volver
                    </button>
                    <button @click="logOut"
                        class="w-full sm:w-2/3 bg-orange-400 text-white hover:bg-orange-500 py-2 px-4 rounded transition-all duration-300 font-semibold cursor-pointer">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
//VUE
import router from '@/router';
import { ref } from 'vue';
//PINIA
import { useAuthStore } from '@/stores/auth';


//DATA
const authStore = useAuthStore()
const nombre = ref(authStore.usuario?.nombre);
const email = ref(authStore.usuario?.email);
const apellido = ref(authStore.usuario?.apellido)
const direccion = ref(authStore.usuario?.direccion)


//Functions
function goBack() {
    router.back()
}

function logOut() {
    authStore.logout();
    router.push('/login')
}
</script>