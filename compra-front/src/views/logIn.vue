<template>
   <section class="min-h-screen flex items-center justify-center pt-18 lg:pt-4 p-4">
    <div class="bg-neutral-900 rounded-md w-full max-w-sm p-6 sm:p-10 my-4 mx-auto">
        <form @submit.prevent="iniciarSesion" class="flex flex-col justify-center space-y-6 w-full">
            
            <!-- Email -->
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
                    type="password" placeholder="••••••••" v-model="contraseña" />
            </div>

            <!-- Botón de Inicio de Sesión -->
            <button
                type="submit"
                class="cursor-pointer w-full bg-orange-400 text-white hover:bg-orange-500 py-2.5 px-4 rounded transition-all duration-300 font-semibold mt-2">
                Iniciar Sesión
            </button>

            <!-- Link a Signup -->
            <RouterLink to="/signup" class="hover:text-orange-400 text-white text-center text-sm duration-200">
                ¿No tenés cuenta? ¡Registrate!
            </RouterLink>

        </form>
    </div>
</section>
</template>

<script setup lang="ts">
//AXIOS
import axios from 'axios';
//VUE
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import 'vue-sonner/style.css';
import { useRouter } from 'vue-router';

//PINIA
import { useAuthStore } from '@/stores/auth';

//DATA
const email = ref<string>("")
const contraseña = ref<string>("")
const router = useRouter()
const authStore = useAuthStore()

function iniciarSesion() {
    if (!email.value || !contraseña.value) {
        toast.warning("Complete todos los campos")
        return
    }
    axios.post("http://localhost:3000/login", {
        email: email.value,
        contrasena: contraseña.value
    })
        .then((response) => {
            //Guardamos el token y los datos del usuario en el repsonse
            const {token, usuario} = response.data
            authStore.setSession(token, usuario)

            toast.success("Sesion Iniciada!", {
                description: "Ha iniciado sesión correctamente.",
            })
            email.value = ""
            contraseña.value = ""

            router.push("/")
        })
        .catch(error => {
            toast.error("Error al iniciar sesión", {
                description: "datos incorrectos"
            })
            console.error("Error al iniciar sesión:", error);
        });
}
</script>