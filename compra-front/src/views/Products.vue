<template>
    <section class="px-4 lg:px-12 pt-16 lg:pt-0">
        <div class="flex justify-between items-center pb-1">
            <!--PRODUCTOS-->
            <div class="flex gap-2 lg:gap-4 items-center">
                <div class="hover:bg-neutral-400 p-2 rounded-md duration-300 transition-all">
                    <img src="/img/caret-left.svg" alt="" class="w-full h-full object-contain">
                </div>
                <p class="font-semibold text-2xl ">Productos</p>
            </div>
            <!--INPUT-->
            <div class="flex flex-col relative" @click="ordenarPor = !ordenarPor">
                <div
                    class="flex justify-between items-center cursor-pointer text-gray-500 text-sm border-b border-gray-500  gap-4 lg:gap-48">
                    <p>Ordenar por</p>
                    <div class="w-4">
                        <img :src="!ordenarPor ? '/img/flecha-abajo-gris.svg' : '/img/flecha-arriba-gris.svg'" alt=""
                            class="w-full h-full object-contain">
                    </div>

                </div>
                <div class="flex flex-col cursor-pointer absolute top-full left-0 w-full bg-white rounded-md overflow-hidden shadow-lg z-10 transition-all duration-300"
                    :class="ordenarPor ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'">
                    <p class="hover:bg-neutral-300 px-4 py-2">Destacados</p>
                    <p class="hover:bg-neutral-300 px-4 py-2">Mayor Precio</p>
                    <p class="hover:bg-neutral-300 px-4 py-2">Menor Precio</p>
                </div>
            </div>
        </div>
        <div class="border border-black "></div>
    </section>

    <!--LISTADO DE PRODUCTOS-->
    <section class="px-4 lg:px-12 pt-10 flex flex-col items-center md:items-start md:flex-row md:justify-between gap-6 ">
        <!-- EJEMPLO DE FORMA MODERNA.
    <swiper
         :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000 }">
        <swiper-slide v-for="item in bannerProductos" :key="item.id">
        <img :src="item.img" alt="Banner" />
        </swiper-slide>
    </swiper>
   
        -->
        <aside class="md:flex flex-col gap-4 w-1/3 " @click="categoriasActiva = !categoriasActiva">
            <div id="filters" class="space-y-4 ">
                <div class="flex items-center justify-between md:justify-start gap-1 md:gap-2 cursor-pointer select-none border border-orange-600 text-orange-600 px-3 py-2 rounded-md  md:border-none md:px-0 md:py-0 md:text-black">
                    <div class="w-3 shrink-0">
                        <img :src="categoriasActiva ? '/img/flecha-arriba-naranja.svg' : '/img/flecha-abajo-naranja.svg'"
                            alt="" class="w-full h-auto object-contain">
                    </div>
                    <p class="font-semibold md:text-lg text-sm" >Categorías</p>
                </div>
                <div class=" md:flex md:flex-col gap-2 overflow-hidden transition-all duration-300"
                    :class="categoriasActiva ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'">
                    <router-link v-for="categoria in listaCategorias" :key="categoria.id"
                        :to="'/productos?cat=' + categoria.id">
                        <p class="lowercase text-[13px] hover:bg-neutral-200 px-2 py-0.5 duration-300 transition-all text-start">{{
                            categoria.nombre }}</p>
                    </router-link>
                </div>
            </div>
            <div class="swiper bannerProductos w-full">
                <div class="swiper-wrapper">
                    <div v-for="item in bannerProductos" :key="item.id" class="swiper-slide ">
                        <div class="overflow-hidden rounded-2xl md:w-auto md:h-auto hidden md:block">
                            <img :src="item.img" alt="" class="w-full h-full object-contain">
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full">
            <div v-for="producto in productos" :key="producto.id">
                <div
                    class=" flex flex-col md:justify-between  bg-white border-neutral-300 border p-4 rounded-3xl hover:cursor-pointer hover:shadow-neutral-400 hover:shadow-md duration-300 transition-all ease-in-out">
                    <!--IMAGEN-->
                    <div class=" flex flex-col">
                        <div class="rounded-md overflow-hidden aspect-[4/3] md:aspect-square mb-2 ">
                            <img :src="obtenerImagenUrl(producto)" alt="" class="w-full h-full object-cover">
                        </div>

                        <div v-for="marca in listaMarcas" :key="marca.id">
                            <div v-if="marca.id == producto.marca_id" class="text-gray-400 text-[11px] pb-2">{{
                                marca.nombre }}</div>
                        </div>
                        <p>{{ producto.nombre }}</p>

                    </div>
                    <p class="color-black font-semibold text-xl pt-10 pb-6">$ {{ producto.precio }}</p>
                    <!--BOTON-->
                    <div>
                        <div
                            class=" px-4 py-2 flex justify-center gap-2 bg-orange-600 rounded-md text-center font-semibold text-white">
                            <div class="w-5">
                                <img src="/img/carritoWhite.svg" alt="" class="w-full h-full object-contain">
                            </div>
                            <p class="text-[14px]">Sumar al
                                Carrito</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
//AXIOS
import axios from 'axios';

//VUE
import { toast } from "vue-sonner";
import { onBeforeMount, onMounted, ref, nextTick } from 'vue';
import router from '@/router';

//SWIPER
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

//DATA
const productos = ref<any[]>([]);
const listaCategorias = ref<any>({});
const listaMarcas = ref<any>({});
const categoriasActiva = ref(false)
const ordenarPor = ref(false)

const bannerProductos = [
    {
        id: 1,
        img: "/img/bannerProducto1.jpg",
        link: ""
    },
    {
        id: 2,
        img: "/img/bannerProducto2.jpg",
        link: ""
    },
    {
        id: 3,
        img: "/img/bannerProducto3.jpg",
        link: ""
    },
    {
        id: 4,
        img: "/img/bannerProducto4.jpg",
        link: ""
    },
    {
        id: 5,
        img: "/img/bannerProducto5.jpg",
        link: ""
    },
    {
        id: 6,
        img: "/img/bannerProducto6.jpg",
        link: ""
    },
]
//FUNCTIONS

function obtenerImagenUrl(producto: any): string {
    if (producto.producto_imagenes && producto.producto_imagenes.length > 0) {
        return `http://localhost:3000${producto.producto_imagenes[0].imagen_url}`;
    }
    return "/img/image.png";
}

function listarProductos() {
    let endpoint = "http://localhost:3000/api/productos";

    if (router.currentRoute.value.query.cat) {
        endpoint += `?cat=${router.currentRoute.value.query.cat}`;
    }

    axios.get(endpoint)
        .then(response => {
            console.log("Lista de productos:", response.data);
            productos.value = response.data;
        })
        .catch(error => {
            console.error("Error al obtener la lista de productos:", error);
        });
}

//LIFECYCLE

onBeforeMount(() => {
    axios.get("http://localhost:3000/api/productos/marca")
        .then(response => {
            listaMarcas.value = response.data;
        })
        .catch(error => {
            console.error("Error al obtener las marcas:", error);
        });
    axios.get("http://localhost:3000/api/productos/categoria")
        .then(response => {
            listaCategorias.value = response.data;
        })
        .catch(error => {
            const mensajeError = error.response?.data?.message || "Error al obtener Categoria";
            toast.error("Error", { description: mensajeError });
            console.error("Error al eliminar el producto:", error);
        });
});

onMounted(async () => {
    //FUNCTIONS
    listarProductos(),

        //SWIPERS
        await nextTick() // Espera a que Vue termine de renderizar los elementos en el HTML real, y recién ahí inicializa Swiper
    new Swiper(".bannerProductos", {
        modules: [Pagination, Autoplay],
        grabCursor: true,
        freeMode: true,
        loop: true,
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }
    })

})

//HACER WATCH DE RUTA   

</script>