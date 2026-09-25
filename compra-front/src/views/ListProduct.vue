<template>
    <section class="py-6 bg-neutral-950 pt-18 lg:pt-4 p-4 min-h-screen">
        <div class="flex justify-between container mx-auto px-4 pb-4">
            <p class="font-bold mb-4 text-center text-white text-sm md:text-xl">Listado de Productos</p>
            <router-link to="/crear-producto">
                <p class="bg-orange-500 text-white text-center rounded-md px-4 py-2 text-[10px] md:text-sm">Crear
                    producto</p>
            </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full container mx-auto px-4">
            <div v-for="producto in productos" :key="producto.id" class="h-full ">
                <div
                    class="bg-neutral-900 p-4 rounded-md text-white h-full flex flex-col border-t-4! hover:border-2 hover:-translate-y-0.5  border-orange-500 transition-all duration-200">
                    <div class="flex justify-between items-center text-start!">
                        

                        <template v-for="categoria in listaCategorias" :key="categoria.id">
                            <p v-if="categoria.id === producto.categoria_id" class="text-orange-500 text-[12px]">
                                {{ categoria.nombre }}
                            </p>
                        </template>
                        <p class="px-2 py-1 bg-gray-600 rounded-full text-[11px] color gray-400">Stock: {{
                            producto.stock }}</p>
                    </div>
                    <!-- IMAGEN DEL PRODUCTO -->
                        <div class="my-4 w-full h-48 bg-black rounded-md overflow-hidden mb-3 border border-neutral-800">
                            <img :src="obtenerImagenUrl(producto)" :alt="producto.nombre"
                                class="w-full h-full object-cover" />
                        </div>
                    <div>
                        <h3 class="text-lg font-bold mb-2">{{ producto.nombre }}</h3>
                        <p class="mb-2 text-sm opacity-90">{{ producto.descripcion }}</p>
                    </div>

                    <div class="mt-4 pt-2 border-t border-orange-300 text-sm flex justify-between">
                        <div class="flex flex-col">
                            <p class="font-semibold text-base"> ${{ producto.precio }}</p>

                            <div v-for="marca in listaMarcas" :key="marca.id">
                                <p v-if="marca.id === producto.marca_id" class="text-gray-400 text-sm">
                                    Marca: {{ marca.nombre }}
                                </p>
                            </div>
                        </div>

                        <div class="flex gap-4 items-center ">
                            <div @click="eliminarProducto(producto.id)"
                                class="border border-gray-500 rounded-full p-2  hover:bg-red-400 transition-all duration-200">
                                <div class="w-4 h-4">
                                    <img src="/img/trashWhite.svg" alt="" class="w-full h-full object-contain ">
                                </div>
                            </div>
                            <RouterLink :to="`/editar-producto/${producto.id}`"
                                class="border border-gray-500 rounded-full p-2 hover:bg-orange-400 transition-all duration-200">
                                <div class="w-4 h-4">
                                    <img src="/img/pencilWhite.svg" alt="" class="w-full h-full object-contain ">
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
// VUE
import { onBeforeMount, onMounted, ref } from 'vue';
import { toast } from "vue-sonner";
import 'vue-sonner/style.css';
//AXIOS
import axios from "axios";
//PINIA
import { useAuthStore } from '@/stores/auth';

// DATA
const productos = ref<any[]>([]);
const listaCategorias = ref<any>({});
const listaMarcas = ref<any>({});
const authStore = useAuthStore()

//Functions

function obtenerImagenUrl(producto: any): string {
    if (producto.producto_imagenes && producto.producto_imagenes.length > 0) {
        return `http://localhost:3000${producto.producto_imagenes[0].imagen_url}`;
    }
    return "/img/image.png";
}

function listarProductos() {
    axios.get("http://localhost:3000/api/productos")
        .then(response => {
            console.log("Lista de productos:", response.data);
            productos.value = response.data;
        })
        .catch(error => {
            console.error("Error al obtener la lista de productos:", error);
        });
}

function eliminarProducto(id: number) {
    axios.delete(`http://localhost:3000/api/productos/${id}`, {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
        .then(() => {
            listarProductos()
            toast.success("Producto Eliminado!", {
                description: "El producto se ha eliminado correctamente.",
            })
        })
        .catch(error => {
            const mensajeError = error.response?.data?.message || "No se pudo crear el producto.";
            toast.error("Error de permisos / servidor", {
                description: mensajeError
            });
        });
}



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
            const mensajeError = error.response?.data?.message || "Error al obtener categorias";
            toast.error("Error", { description: mensajeError });
            console.error("Error al obtener categorias:", error);
        });
});

onMounted(() => {
    listarProductos();
});

</script>
