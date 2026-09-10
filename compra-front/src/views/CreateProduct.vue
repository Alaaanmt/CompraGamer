<template>
    <section class="min-h-screen lg:min-h-0 flex items-center justify-center pt-18 lg:pt-4 p-4 ">
        <form @submit.prevent="crearProducto"
            class="flex flex-col bg-zinc-900 p-4 sm:p-6 md:px-12 lg:px-16 text-white rounded-lg w-full max-w-xl">
            <p class="text-2xl text-center pb-4 font-bold">Crear Producto</p>

            <div class="flex flex-col gap-3 w-full">
               <!-- INPUT DE IMÁGENES MÚLTIPLES -->
                <div class="flex flex-col space-y-2">
                    <label class="font-semibold text-sm">Imágenes del Producto</label>

                    <!-- Galería de previsualizaciones -->
                    <div class="grid grid-cols-3 sm:grid-cols-4 gap-2 bg-black p-2 rounded-md border border-gray-700 min-h-24">
                        <div v-for="(url, index) in previewUrls" :key="index" class="relative group">
                            <img :src="url" class="w-full h-48 object-cover rounded border border-gray-800" />
                            <button type="button" @click="quitarImagenLocal(index)"
                                class="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                ✕
                            </button>
                        </div>
                        <div v-if="previewUrls.length === 0" class="col-span-full flex items-center justify-center text-xs text-gray-500 py-4">
                            Sin imágenes seleccionadas
                        </div>
                    </div>

                    <input type="file" accept="image/*" multiple @change="handleFileChange"
                        class="p-2 border-2 border-gray-700 bg-orange-400 rounded-md text-white cursor-pointer focus:outline-none" />
                </div>
                <!-- NOMBRE Y DESCRIPCION -->
                <div class="flex flex-col space-y-1">
                    <label class="font-semibold text-sm">Nombre del producto</label>
                    <input
                        class="border-2 border-gray-700 bg-black rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                        type="text" placeholder="Ej: Notebook Intel I5" v-model="nombre" />
                </div>

                <div class="flex flex-col space-y-1">
                    <label class="font-semibold text-sm">Descripción del producto</label>
                    <input
                        class="border-2 border-gray-700 bg-black rounded-md p-2 w-full resize-none focus:outline-none focus:border-orange-500"
                        rows="3" placeholder="Detalles del producto, especificaciones, etc."
                        v-model="descripcion"></input>
                </div>

                <!-- PRECIO Y STOCK -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex flex-col space-y-1">
                        <label class="text-sm text-white font-semibold">Precio</label>
                        <input
                            class="border-2 border-gray-700 bg-black rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                            type="number" placeholder="Precio del producto" v-model="precio" />
                    </div>
                    <div class="flex flex-col space-y-1">
                        <label class="text-sm text-white font-semibold">Stock</label>
                        <input
                            class="border-2 border-gray-700 bg-black rounded-md p-2 w-full focus:outline-none focus:border-orange-500"
                            type="number" placeholder="Stock del producto" v-model="stock" />
                    </div>
                </div>

                <!-- CATEGORIA Y MARCA -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                    <div class="flex flex-col space-y-1">
                        <label class="text-sm text-white font-semibold">Categoría</label>
                        <select
                            class="border-2 border-gray-700 rounded-md p-2 bg-black text-white w-full focus:outline-none focus:border-orange-500"
                            v-model="categoria">
                            <option value="">Seleccionar</option>
                            <option v-for="item in listaCategorias" :key="item.id" :value="item.id"
                                class="bg-black text-white">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col space-y-1">
                        <label class="text-sm font-semibold">Marca</label>
                        <select
                            class="border-2 border-gray-700 rounded-md p-2 bg-black text-white w-full focus:outline-none focus:border-orange-500"
                            v-model="marca">
                            <option value="">Seleccionar</option>
                            <option v-for="item in listaMarcas" :key="item.id" :value="item.id"
                                class="bg-black text-white">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- BOTONES -->
                <div class="flex flex-col-reverse sm:flex-row justify-between gap-3 w-full pt-2">
                    <RouterLink to="/listar-productos"
                        class="w-full sm:w-1/3 text-center bg-white text-orange-400 hover:bg-orange-500 hover:text-white py-2 px-4 rounded transition-all duration-300 font-semibold">
                        Volver
                    </RouterLink>
                    <button
                        class="w-full sm:w-2/3 bg-orange-400 text-white hover:bg-orange-500 py-2 px-4 rounded transition-all duration-300 font-semibold">
                        Crear Producto
                    </button>
                </div>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
//VUE
import { ref, onMounted, onBeforeMount } from "vue";
import { toast } from "vue-sonner";
import { useRoute } from "vue-router";
import 'vue-sonner/style.css';
//AXIOS
import axios from "axios";
//PINIA
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const productoId = route.params.id;

const nombre = ref<string>("");
const descripcion = ref<string>("");
const precio = ref<number>(0);
const stock = ref<number>(0);
const categoria = ref<string>("");
const listaCategorias = ref<any>({});
const listaMarcas = ref<any>({});
const marca = ref<string>("");
const archivosImagenes = ref<File[]>([]);
const previewUrls = ref<string[]>([]);
const productoCreado = ref<boolean | null>(null);


const authStore = useAuthStore();

//Functions
function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        const files = Array.from(target.files);
        files.forEach(file => {
            archivosImagenes.value.push(file);
            previewUrls.value.push(URL.createObjectURL(file));
        });
    }
}

function quitarImagenLocal(index: number) {
    URL.revokeObjectURL(previewUrls.value[index]);
    previewUrls.value.splice(index, 1);
    archivosImagenes.value.splice(index, 1);
}

function subirFoto(idProducto: number) {
    if (archivosImagenes.value.length === 0) return;

    const formData = new FormData();
    archivosImagenes.value.forEach(file => {
        formData.append("images", file);
    });

    axios.post(`http://localhost:3000/api/productos/upload/${idProducto}`, formData, {
        headers: {
            Authorization: `Bearer ${authStore.token}`,
            "Content-Type": "multipart/form-data"
        }
    })
        .then(response => {
            toast.success("Imagen subida con éxito");
        })
        .catch(error => {
            const mensajeError = error.response?.data?.message || "Error al subir la imagen";
            toast.error("Error al subir la imagen", { description: mensajeError });
        });
}

function crearProducto() {

    if (!nombre.value || !descripcion.value || !precio.value || !stock.value || !categoria.value || !marca.value) {
        toast.warning("Por favor, complete todos los campos antes de crear el producto.");
        return;
    }

    axios.post("http://localhost:3000/api/productos", {
        nombre: nombre.value,
        descripcion: descripcion.value,
        precio: precio.value,
        stock: stock.value,
        categoria_id: categoria.value,
        marca_id: marca.value,

    }, {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
        .then(response => {
            const nuevoProductoId = response.data.id;

            // Si hay una foto cargada la subimos
            if (archivosImagenes.value && nuevoProductoId) {
                subirFoto(nuevoProductoId);
            }

            toast.success("¡Producto creado!", {
                description: "El producto se ha guardado correctamente.",
            });

            productoCreado.value = true;
            nombre.value = "";
            descripcion.value = "";
            precio.value = 0;
            stock.value = 0;
            categoria.value = "";
            marca.value = "";
            archivosImagenes.value = [];
            previewUrls.value = [];
        })
        .catch(error => {
            const mensajeError = error.response?.data?.message || "No se pudo crear el producto.";
            toast.error("Error de permisos / servidor", {
                description: mensajeError
            });
        });
};


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
            console.error("Error al obtener las categorías:", error);
        });
});
</script>