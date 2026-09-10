<template>
    <section class="min-h-screen lg:min-h-0 flex items-center justify-center pt-18 lg:pt-4 p-4">
        <form @submit.prevent="editarProducto"
            class="flex flex-col bg-zinc-900 p-4 sm:p-6 md:px-12 lg:px-16 text-white rounded-lg w-full max-w-xl">
            <p class="text-2xl text-center pb-4 font-bold">Editar Producto</p>

            <div class="flex flex-col gap-3 w-full">
                <!-- GALERÍA SWIPER (IMÁGENES PERSISTIDAS) -->
                <div class="flex flex-col space-y-2">
                    <label class="font-semibold text-sm">Imágenes Guardadas</label>

                    <div v-if="imagenesExistentes.length > 0" class="bg-black p-2 rounded-md border border-gray-700">
                        <swiper :slides-per-view="1" :space-between="10" pagination navigation class="w-full h-64 rounded">
                            <swiper-slide v-for="img in imagenesExistentes" :key="img.id" class="relative">
                                <img :src="`http://localhost:3000${img.imagen_url}`" class="w-full h-full object-cover rounded" />
                                <button type="button" @click="eliminarImagenExistente(img.id)"
                                    class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 text-xs font-bold z-10">
                                    Eliminar Foto
                                </button>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div v-else class="bg-black p-4 text-center text-xs text-gray-500 rounded border border-gray-700">
                        Este producto no tiene fotos guardadas.
                    </div>
                </div>

                <!-- INPUT PARA AGREGAR NUEVAS FOTOS -->
                <div class="flex flex-col space-y-2">
                    <label class="font-semibold text-sm">Agregar Nuevas Fotos</label>

                    <div v-if="previewNuevasUrls.length > 0" class="grid grid-cols-3 gap-2 bg-black p-2 rounded border border-gray-700">
                        <div v-for="(url, index) in previewNuevasUrls" :key="index" class="relative">
                            <img :src="url" class="w-full h-20 object-cover rounded" />
                            <button type="button" @click="quitarNuevaImagenLocal(index)"
                                class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                ✕
                            </button>
                        </div>
                    </div>

                    <input type="file" accept="image/*" multiple @change="handleFileChange"
                        class="border-2 border-gray-700 bg-orange-400 rounded-md p-2 w-full text-white cursor-pointer focus:outline-none" />
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
                    <textarea
                        class="border-2 border-gray-700 bg-black rounded-md p-2 w-full resize-none focus:outline-none focus:border-orange-500"
                        rows="3" placeholder="Detalles del producto, especificaciones, etc."
                        v-model="descripcion"></textarea>
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
                        Cancelar
                    </RouterLink>
                    <button
                        class="w-full sm:w-2/3 bg-orange-400 text-white hover:bg-orange-500 py-2 px-4 rounded transition-all duration-300 font-semibold">
                        Editar Producto
                    </button>
                </div>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
//VUE
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router"; // 1. Importar el router
import { toast } from "vue-sonner";
import 'vue-sonner/style.css';

// Instancias de Vue Router
const route = useRoute();
const router = useRouter();

//AXIOS
import axios from "axios";

//PINIA
import { useAuthStore } from "@/stores/auth";

//SWIPER
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const nombre = ref<string>("");
const descripcion = ref<string>("");
const precio = ref<number>(0);
const stock = ref<number>(0);
const categoria = ref<string>("");
const listaCategorias = ref<any>({});
const listaMarcas = ref<any>({});
const marca = ref<string>("");

const imagenActual = ref<string>("");
const imagenesExistentes = ref<any[]>([]);
const nuevasImagenes = ref<File[]>([]);
const previewNuevasUrls = ref<string[]>([]);


const id = route.params.id; //obtegno ID por url

const authStore = useAuthStore()

//functions

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        const files = Array.from(target.files);
        files.forEach(file => {
            nuevasImagenes.value.push(file);
            previewNuevasUrls.value.push(URL.createObjectURL(file));
        });
    }
}

function quitarNuevaImagenLocal(index: number) {
    URL.revokeObjectURL(previewNuevasUrls.value[index]);
    previewNuevasUrls.value.splice(index, 1);
    nuevasImagenes.value.splice(index, 1);
}

function eliminarImagenExistente(imagenId: number) {
   axios.delete(`http://localhost:3000/api/productos/imagen/${imagenId}`, {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
        .then(() => {
            imagenesExistentes.value = imagenesExistentes.value.filter(img => img.id !== imagenId);
            toast.success("Foto eliminada correctamente");
        })
        .catch(error => {
            toast.error("Error al borrar foto", { description: error.response?.data?.message });
        });
}

function subirNuevasFotos(idProducto: number) {
    if (nuevasImagenes.value.length === 0) return;

    const formData = new FormData();
    nuevasImagenes.value.forEach(file => {
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

function editarProducto() {
    axios.put(`http://localhost:3000/api/productos/${id}`, {
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
            // Si seleccionó fotos nuevas, las enviamos
            if (nuevasImagenes.value.length > 0) {
                subirNuevasFotos(Number(id));
            }

            toast.success("¡Producto editado correctamente!", {
                description: "Los cambios se guardaron con éxito.",
            });
            router.push("/listar-productos");
        })
        .catch(error => {
            console.error("Error al editar el producto:", error);
            toast.error("Error del servidor", {
                description: "No se pudo editar el producto. Inténtelo más tarde.",
            });
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
            console.error("Error al obtener las categorías:", error);
        });
});


onMounted(() => {
    axios.get(`http://localhost:3000/api/productos/${id}`)
        .then(response => {
            const producto = response.data;
            nombre.value = producto.nombre;
            descripcion.value = producto.descripcion;
            precio.value = producto.precio;
            stock.value = producto.stock;
            categoria.value = producto.categoria_id;
            marca.value = producto.marca_id;
            imagenesExistentes.value = producto.producto_imagenes || [];

            if (producto.producto_imagenes && producto.producto_imagenes.length > 0) {
                imagenActual.value = producto.producto_imagenes[0].imagen_url;
            }
        })
        .catch(error => {
            console.error("Error al obtener el producto:", error);
            toast.error("No se pudo cargar la información del producto");
        });
});
</script>