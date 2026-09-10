<template>
   <section class="min-h-screen flex items-center justify-center pt-18 lg:pt-4 p-4">
    <form @submit.prevent="registrarse" class="flex mx-auto bg-neutral-900 rounded-md w-full max-w-md p-6 sm:p-10 my-4">
        <div class="flex flex-col justify-center items-center space-y-4 sm:space-y-6 w-full">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div class="flex flex-col space-y-1 text-white w-full">
                    <label class="font-semibold text-sm">Nombre</label>
                    <input
                        class="border-2 border-gray-700 bg-black rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                        type="text" placeholder="Juan" v-model="nombre" />
                </div>

                <div class="flex flex-col space-y-1 text-white w-full">
                    <label class="font-semibold text-sm">Apellido</label>
                    <input
                        class="border-2 border-gray-700 bg-black rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                        type="text" placeholder="Pérez" v-model="apellido" />
                </div>
            </div>

            <!-- Dirección -->
            <div class="flex flex-col space-y-1 text-white w-full">
                <label class="font-semibold text-sm">Dirección</label>
                <input
                    class="border-2 border-gray-700 bg-black rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                    type="text" placeholder="Av. San Martín 1234" v-model="direccion" />
            </div>

            <!-- Correo Electrónico -->
            <div class="flex flex-col space-y-1 text-white w-full">
                <label class="font-semibold text-sm">Correo Electrónico</label>
                <input
                    class="border-2 border-gray-700 bg-black rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                    type="email" placeholder="example@gmail.com" v-model="email" />
            </div>

            <!-- Contraseña -->
            <div class="flex flex-col space-y-1 text-white w-full">
                <label class="font-semibold text-sm">Contraseña</label>
                <input
                    class="border-2 border-gray-700 bg-black rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                    type="password" placeholder="••••••••" v-model="contrasena" />
            </div>

            <!-- Botón de Registro -->
            <button 
                type="submit"
                class="cursor-pointer w-full bg-orange-400 text-white hover:bg-orange-500 py-2.5 px-4 rounded transition-all duration-300 font-semibold mt-2">
                Registrarse
            </button>

            <!-- Link a Login -->
            <RouterLink to="/login" class="hover:text-orange-400 text-sm text-white duration-200 text-center">
                ¿Ya tenés cuenta? Inicia sesión!
            </RouterLink>

        </div>
    </form>
</section>
</template>

<script setup lang="ts">
//VUE
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import 'vue-sonner/style.css';

//AXIOS
import axios from 'axios';

//DATA
const email = ref<string>("")
const contrasena = ref<string>("")
const nombre = ref<string>("")
const apellido = ref<string>("")
const direccion = ref<string>("")

const router = useRouter();

function registrarse() {
    if (!email.value || !contrasena.value || !nombre.value || !apellido.value || !direccion.value) {
        toast.warning("Complete todos los campos")
        return
    }
    axios.post("http://localhost:3000/signup", {
        email: email.value,
        contrasena: contrasena.value,
        nombre: nombre.value,
        apellido: apellido.value,
        direccion: direccion.value

    })
        .then(() => {
            toast.success("Registro exitoso!", {
                description: "Se ha registrado correctamente.",
            })
            router.push('/login');

            email.value = ""
            contrasena.value = ""
            nombre.value = ""
            apellido.value = ""
            direccion.value = ""
        })
        .catch(error => {
            toast.error("Error al registrarse", {
                description: "revise todos los campos"
            })
            console.error("Error al iniciar sesión:", error);
        });
}
</script>