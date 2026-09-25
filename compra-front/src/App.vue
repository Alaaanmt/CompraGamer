<template>
    <div class="bg-gray-100">

        <!--HEADER-->
        <header class="lg:pb-22">
            <div
                class="fixed z-20 w-full flex items-center lg:gap-32 bg-neutral-800 h-14 lg:h-22 px-4 md:px-8 lg:px-12 py-2 ">
                <div class="flex w-full gap-4 lg:gap-0 items-center">
                    <div class="w-6 h-6 block lg:hidden" @click="burgerMenu = !burgerMenu">
                        <img src="/img/hamburger-button.svg" alt="" class="w-full h-full object-cover">
                    </div>
                    <RouterLink to="/" class="h-full w-1/3 md:w-1/4 lg:w-1/3">
                        <img src="/img/logo.svg" alt="Logo" class="w-full h-full object-cover">
                    </RouterLink>

                    <!--input-->
                    <div class="relative px-4 py-2 flex-1 flex items-center ">
                        <div class="w-full hidden lg:block">
                            <input type="text" placeholder="Buscar productos"
                                class="w-full h-12 text-sm border border-gray-200 text-white bg-transparent rounded-lg px-4 py-2 pr-10 focus:border-orange-700 focus:border-2 focus:outline-none">
                        </div>
                        <div class="absolute right-8 w-6 h-6 hidden lg:block">
                            <img src="/img/lupaOrange.svg" alt="" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
                <!--user-->
                <div class="flex items-center ">
                    <div class=" hover:bg-neutral-600 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 lg:hidden">
                        <div class="w-6 h-6 block lg:hidden">
                            <img src="/img/lupaOrange.svg" alt="" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <RouterLink to="/profile" v-if="authStore.isLoggedIn"
                        class="flex items-center text-white gap-4 lg:gap-2 hover:bg-neutral-600 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300">
                        <div class="h-6 w-6">
                            <img src="/img/userOrange.svg" alt="User" class="w-full h-full object-cover">
                        </div>
                        <p class="hidden lg:block">{{ authStore.nombreUsuario }}</p>
                    </RouterLink>
                    <div v-else
                        class="flex text-white gap-4 lg:gap-2 hover:bg-neutral-600 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300">
                        <RouterLink to="/login" class="h-6 w-6">
                            <img src="/img/userOrange.svg" alt="User" class="w-full h-full object-cover">
                        </RouterLink>
                        <p class="hidden lg:block">Ingresá</p>
                    </div>
                    <div class=" hover:bg-neutral-600 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300">
                        <div class="h-6 w-6">
                            <img src="/img/carritoOrange.svg" alt="Carrito" class="w-full h-full object-cover">
                        </div>
                    </div>



                </div>
            </div>

        </header>

        <!--NAVBAR-->
        <section
            v-if="!['/crear-producto', '/listar-productos', '/login', '/signup'].includes($route.path) && !$route.path.startsWith('/editar-producto')">
            <div class="lg:flex gap-16 justify-center items-center  py-3 hidden ">
                <a v-for="item in navbar" :key="item.id" :href="item.link"
                    class="text-gray-800 text-md hover:text-orange-700 cursor-pointer transition-all duration-300">
                    {{ item.name }}
                </a>
            </div>
        </section>
        <!--Burger Menu-->
        <div class="z-10 lg:hidden top-14 pt-2 left-0 fixed bg-gray-100 pb-4 w-full transition-all overflow-hidden duration-400"
            :class="burgerMenu ? 'h-46 py-6 opacity-100' : 'h-0 opacity-0 py-0'">
            <div class="px-4">
                <div class="flex flex-col gap-6 items-start">
                    <a v-for="item in navbar" :key="item.id" :href="item.link" class=" text-md cursor-pointer">
                        {{ item.name }}
                    </a>
                </div>
            </div>
        </div>
        <!-- TOASTER GLOBAL DE NOTIFICACIONES -->
        <Toaster position="top-right" richColors />
        <router-view>

        </router-view>
        <!--FOOTER-->
        <!--flechaUp-->
        <router-link to="/" class="px-10 fixed bottom-10 right-6 z-40 cursor-pointer"
            v-if="!['/crear-producto', '/listar-productos', '/login', '/signup', '/profile'].includes($route.path) && !$route.path.startsWith('/editar-producto')">
            <div class="bg-orange-600 p-4 rounded-full w-fit flex items-end ">
                <div class="h-6 w-6">
                    <img src="/img/arrowUp.svg" class="w-full h-full object-cover" alt="">
                </div>
            </div>
        </router-link>
        <footer
            v-if="!['/crear-producto', '/listar-productos', '/profile'].includes($route.path) && !$route.path.startsWith('/editar-producto')">
            <div
                class="flex flex-col lg:flex-row lg:justify-around px-20 py-6 bg-neutral-800  lg:items-center h-full lg:h-48 w-full mt-14">
                <div class="flex justify-around pb-4">
                    <div class="h-30 w-20">
                        <img src="/img/DATAWEB.jpg" alt="" class="w-full h-full object-contain">

                    </div>
                    <div class="border lg:h-0 border-white"></div>
                    <div class="h-30 w-20">
                        <img src="/img/gptw.svg" alt="" class="w-full h-full object-contain lg:hidden block">
                    </div>
                </div>

                <!--Separador-->
                <div class="border lg:h-36 border-gray-400 lg:border-white"></div>

                <!--Links-->
                <div class="flex flex-col justify-center items-center py-6 lg:py-0 space-y-4">
                    <p
                        class="bg-white px-4 py-2 w-fit rounded-md cursor-pointer hover:text-orange-400 transition-all duration-300">
                        Ayuda</p>
                    <p
                        class="border border-white text-white px-4 py-2 w-fit rounded-md cursor-pointer hover:text-orange-400 transition-all duration-300 hover:bg-white">
                        Botón de arrepentimiento</p>
                    <p class="cursor-pointer text-white underline font-semibold">Terminos y condiciones</p>
                </div>

                <!--Separador-->
                <div class="border lg:h-36 border-gray-400 lg:border-white"></div>

                <!--Redes Sociales-->
                <div class="flex flex-col items-center py-4 space-y-4 lg:space-y-6 justify-center">
                    <p class="text-white text-lg font-semibold">Seguinos en</p>
                    <div class="flex flex-wrap justify-center items-center gap-3 mx-auto lg:max-w-[280px]">
                        <div v-for="item in redes" :key="item.id">
                            <div
                                class="w-10 h-10 border border-gray-300 rounded-full p-1 group cursor-pointer hover:bg-white  transition-all duration-300">
                                <img :src="item.img" alt="" class="w-full h-full object-cover group-hover:invert">
                            </div>
                        </div>
                    </div>
                </div>

                <!--Separador-->
                <div class="border lg:h-36 border-gray-400 lg:border-white"></div>

                <!--Trabajá con nosotros-->
                <div class="flex py-6 lg:py-0 lg:flex-col lg:space-y-4 justify-center items-center ">
                    <div class="h-24 hidden lg:block">
                        <img src="/img/gptw.svg" alt="" class="w-full h-full object-contain">
                    </div>
                    <p class="text-white underline cursor-pointer font-semibold">¡Trabajá con nosotros!</p>
                </div>
            </div>
        </footer>
        <!--Derechos-->
        <div class="flex flex-col justify-center items-center text-center py-1 text-[8px]"
            v-if="!['/crear-producto', '/listar-productos', '/login', '/signup', '/profile'].includes($route.path) && !$route.path.startsWith('/editar-producto')">
            <p>Las marcas y logos de compragamer.com compragamer.com/tv compragamer.com/reviews son Propiedad de
                Newton
                Station SRL.</p>
            <p>Todos los derechos reservados 2017.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// VUE
import { onBeforeMount, onMounted, ref } from 'vue';
import { Toaster } from 'vue-sonner';
import { useRouter } from 'vue-router';
//PINIA
import { useAuthStore } from './stores/auth';




// DATA
const navbar = [
    {
        id: 1,
        name: 'Productos',
        link: '/products'
    },
    {
        id: 2,
        name: 'Notebooks',
        link: '/notebooks'
    },
    {
        id: 3,
        name: 'Armá tu PC',
        link: '/armatupc'
    },
    {
        id: 4,
        name: 'Ayuda',
        link: '/ayuda'
    },
]


const redes = [
    {
        id: 1,
        img: '/img/xlogo.svg',
    },
    {
        id: 3,
        img: '/img/facebook.svg',
    },
    {
        id: 2,
        img: '/img/instagram.svg',
    },
    {
        id: 4,
        img: '/img/youtube.svg',
    },
    {
        id: 5,
        img: '/img/linkedin.svg',
    },
    {
        id: 6,
        img: '/img/tiktok.svg',
    },
    {
        id: 7,
        img: '/img/twitch.svg',
    }
]

const burgerMenu = ref(false)
console.log(burgerMenu.value)

const authStore = useAuthStore()
const router = useRouter()

//Functions

function logOut() {
    authStore.logout();
    router.push('/login')
}

</script>