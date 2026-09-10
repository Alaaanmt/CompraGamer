<template>
    

    <!--SWIPER-->
    <section class="pt-14 lg:pt-0">
        <div class="swiper banner ">
            <div class="swiper-wrapper">
                <div v-for="item in banner" :key="item.id" class="swiper-slide">
                    <div class="w-full aspect-24/10 lg:aspect-auto">
                        <img :src="item.img" alt="" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </section>

    <!--PAGOS Y ENVIOS-->
    <section>
        <div class="swiper pagos  ">
            <div class="swiper-wrapper lg:!grid lg:!grid-cols-3 lg:!justify-center mt-8 ">
                <div v-for="item in pagos" :key="item.id"
                    class="swiper-slide flex justify-center items-center mx-auto gap-4 py-4 bg-white w-full">

                    <div class="flex items-center gap-4 w-full justify-center">
                        <div class="flex-shrink-0">
                            <img :src="item.img" :alt="item.text" class="w-8 h-8 object-contain">
                        </div>
                        
                        <div>
                            <p class="font-semibold text-sm leading-tight">{{ item.text }}</p>
                            <p class="text-[11px] text-gray-500">{{ item.text2 }}</p>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </section>
    <!--PRODUCTOS DESTACADOS-->
    <section class="px-4 lg:px-12 pt-10">
        <p class="text-2xl pb-4">Conocé nuestros <b>productos destacados</b></p>
        <!--CATEGORIAS-->
        <div class="swiper productosNombres">
            <div class="swiper-wrapper flex gap-2 mb-4">
                <div v-for="(productos, categoria) in productosDestacados" :key="categoria"
                    @click="categoriaActiva = categoria" class="swiper-slide !w-fit">
                    <div class="px-4 py-2 rounded-full border transition-all text-sm font-medium cursor-pointer" :class="[categoriaActiva === categoria ? 'bg-orange-600 text-white border-orange-600' :
                        'bg-white text-gray-500']">
                        <p>{{ categoria }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-4">
            <!-- SWIPER -->
            <div class="swiper productosDestacados">
                <div class="swiper-wrapper">
                    <div v-for="item in productosDestacados[categoriaActiva]" :key="item.id" class="swiper-slide">
                        <div
                            class="flex gap-4 border border-gray-400 bg-white px-4 rounded-xl hover:shadow-xl  transition-all duration-300 cursor-pointer ">
                            <div class="h-40 w-26 flex-shrink-0">
                                <!--"No importa cuánto espacio necesite el texto, vos quedate siempre de este tamaño-->
                                <img :src="item.img" alt="" class="w-full h-full object-contain">
                            </div>
                            <div class="flex flex-col justify-around">
                                <p>{{ item.nombre }}</p>
                                <p class="text-xl font-semibold">${{ item.precio.toLocaleString('es-AR') }}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </section>
    <!--BANNER-->
    <section>
        <div class="py-14 relative ">
            <div class="w-full aspect-video md:aspect-8/2">
                <img src="/img/bannerArmarPC.png" alt="" class="w-full h-full object-cover">
            </div>
            
            <!--INFORMACION-->
            <div
                class="absolute top-0 right-0 md:w-1/3 h-full flex flex-col justify-center md:items-center gap-4 px-4 lg:px-0 lg:pr-12 text-start">
                <p class="text-white text-3xl">Armá tu PC</p>
                <p class="text-white text-md lg:text-lg ">Configurá tu nueva PC sin errores de compatibilidad,
                    seleccionando todos
                    los componentes que deseás.</p>
                <p class="bg-orange-600 text-white px-4 py-2 w-fit rounded-md cursor-pointer">Ver más</p>
            </div>
        </div>
    </section>

    <!--GRID-->
    <section>
        <div class="px-4 md:px-20 lg:px-12">
            <p class="text-2xl pb-4">Explorá nuestras <b>categorías</b></p>
            <div class="flex flex-col md:flex-row gap-3 md:gap-2">
                <!-- CATEGORIA PRINCIPAL -->
                <div class="w-full md:w-1/3 relative cursor-pointer overflow-hidden rounded-xl">
                    <div class="w-full h-full lg:aspect-8/7">
                        <img src="/img/Principal.jpg" alt=""
                            class="w-full h-full object-cover hover:scale-110 transition-all duration-400">
                    </div>
                    <p
                        class="text-sm md:text-[11px] lg:text-[15px] absolute bottom-0 w-full justify-center text-white font-semibold text-center py-2">
                        PC DE
                        ESCRITORIO</p>
                </div>
                <!-- SWIPER -->
                <div class="swiper categorias w-full md:w-2/3">
                    <div class="swiper-wrapper">
                        <div v-for="item in categoriasGrid" :key="item.id" class="swiper-slide">
                            <div class="relative cursor-pointer overflow-hidden rounded-xl">
                                <div class="w-full aspect-video md:aspect-square lg:aspect-8/7">
                                    <img :src="item.img"
                                        class="w-full h-full object-cover hover:scale-110 transition-all duration-400">
                                </div>
                                <p
                                    class="text-[12px] md:text-[11px] lg:text-[15px] absolute bottom-0 w-full justify-center text-white font-semibold text-center py-2">
                                    {{ item.nombre }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </div>
    </section>

    <!--ULTIMAS NOVEDADES-->
    <section class="px-4 md:px-20 lg:px-12 pt-14">
        <p class="text-2xl pb-8">Conocé nuestras <b>últimas novedades</b></p>
        <div class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
            <!--Novedades-->
            <div v-for="item, index in ultimasNovedades" :key="item.id"
                class="flex gap-4 border border-gray-400 bg-white px-6 py-4 rounded-xl hover:shadow-xl  transition-all duration-300 cursor-pointer"
                :class="{ 'hidden lg:flex': index >= 4 }">
                <div class="md:w-1/2 lg:w-1/3">
                    <img :src="item.img" alt="" class="w-full h-full object-contain">
                </div>
                <div class="flex flex-col justify-between space-y-12">
                    <div class="space-y-2">
                        <p class="uppercase text-gray-500 text-[10px]">{{ item.title }}</p>
                        <p class="text-md font-semibold ">{{ item.description }}</p>
                    </div>
                    <p class="text-xl font-semibold">${{ item.precio.toLocaleString('es-AR') }}</p>
                </div>
            </div>
        </div>
    </section>

    <!--MEJORES MARCAS-->
    <section class="px-4 md:px-20 lg:px-12 pt-14">
        <p class="text-2xl pb-4">Descubrí las <b>mejores marcas</b></p>
        <!--navegacion de marcas-->
        <div class="swiper marcasLogos">
            <div class="swiper-wrapper flex gap-4">
                <div @click="marcaActiva = marca.toString()" v-for="(item, marca) in mejoresMarcas" :key="item.id"
                    class="swiper-slide !w-fit">
                    <div class="border cursor-pointer rounded-full px-4 py-2 transition-all duration-300"
                        :class="[marcaActiva === marca ? 'bg-orange-600 border-orange-600' : '']">
                        <div class="w-24 h-6" :class="[marcaActiva === marca ? 'invert' : '']">
                            <img :src="item.logo" alt="" class="w-full h-full object-contain">
                        </div>
                    </div>
                </div>
            </div>
            <!--Productos de la marca-->
            <div class="pt-4 flex flex-col md:flex-row gap-2 h-100">
                <div class="w-full md:w-1/2 lg:w-1/3 relative overflow-hidden rounded-xl ">
                    <img :src="mejoresMarcas[marcaActiva].banner" alt=""
                        class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105">
                    <div class="absolute bottom-0 w-full flex justify-center pb-4">
                        <p class="text-sm font-semibold text-white uppercase tracking-wider">
                            {{ mejoresMarcas[marcaActiva].bannerNombre }}
                        </p>
                    </div>
                </div>

                <div class="swiper marcas w-full h-full">
                    <div class="swiper-wrapper">
                        <div v-for="item in mejoresMarcas[marcaActiva].productos" :key="item.id"
                            class="swiper-slide border border-gray-400 bg-white px-4 py-6 rounded-xl cursor-pointer flex flex-col h-full hover:shadow-lg transition-shadow">

                            <div class="flex flex-col justify-between h-full">
                                <div class="flex flex-col gap-2">
                                    <div class="h-28 md:h-36 w-full flex-shrink-0">
                                        <img :src="item.img" alt="" class="w-full h-full object-contain">
                                    </div>
                                    <p class="text-md text-gray-800">
                                        {{ item.nombre }}
                                    </p>
                                </div>

                                <p class="text-xl font-semibold text-gray-900">
                                    ${{ item.precio.toLocaleString('es-AR') }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="paginationMarcas swiper-pagination"></div>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup lang="ts">
// VUE
import { onMounted, ref } from 'vue';

//SWIPER 
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination, Autoplay } from 'swiper/modules';

//DATA


const banner = [
    {
        id: 1,
        img: '/img/bannerCompra.jpg',
    },
    {
        id: 2,
        img: '/img/bannerCompra2.jpg',
    },
    {
        id: 3,
        img: '/img/bannerCompra3.jpg',
    },
    {
        id: 4,
        img: '/img/bannerCompra4.jpg',
    },
    {
        id: 5,
        img: '/img/bannerCompra5.jpg',
    },
    {
        id: 6,
        img: '/img/bannerCompra6.jpg',
    },
    {
        id: 7,
        img: '/img/bannerCompra7.jpg',
    }
]

const pagos = [
    {
        id: 1,
        img: '/img/card.svg',
        text: "Hasta 6 cuotas sin interés abonando con",
        img2: '/img/icbc.svg',
        img3: '/img/supervielle.svg',
        img4: '/img/yoy.svg',
    },
    {
        id: 2,
        img: '/img/truck.svg',
        text: "Envíos rápidos a todo el país.",
    },
    {
        id: 3,
        img: '/img/shield.svg',
        text: "Garantia oficial",
        text2: "de hasta 36 meses en todos los productos.",
    }
]

const productosDestacados = {
    Monitores: [
        { id: 1, nombre: 'Monitor Gamer Samsung Odyssey G4 25" FHD 240Hz 1ms', precio: 324810, img: '/img/monitor.jpg' },
        { id: 2, nombre: 'Monitor Gamer Acer Nitro 27" KG271 M3 FHD IPS 180Hz', precio: 267650, img: '/img/monitor.jpg' },
        { id: 3, nombre: 'Monitor Gamer AsRock Phantom 27" FHD IPS 180Hz', precio: 225600, img: '/img/monitor.jpg' },
        { id: 4, nombre: 'Monitor Gamer ViewSonic 24" FHD IPS 180Hz FreeSync', precio: 223900, img: '/img/monitor.jpg' },
        { id: 5, nombre: 'Monitor Gamer LG UltraGear 27" 180Hz G-Sync', precio: 327250, img: '/img/monitor.jpg' },
        { id: 6, nombre: 'Monitor Gamer Asus TUF 24" 180Hz IPS', precio: 251400, img: '/img/monitor.jpg' },
        { id: 7, nombre: 'Monitor Gamer Gigabyte 27" QHD 165Hz IPS', precio: 410000, img: '/img/monitor.jpg' },
        { id: 8, nombre: 'Monitor Gamer BenQ Zowie 24" 144Hz', precio: 315000, img: '/img/monitor.jpg' },
        { id: 9, nombre: 'Monitor Gamer MSI Optix 24" Curvo 144Hz', precio: 289000, img: '/img/monitor.jpg' },
        { id: 101, nombre: 'Monitor Gamer AOC Hero 24" 144Hz IPS', precio: 245000, img: '/img/monitor.jpg' },
        { id: 102, nombre: 'Monitor Philips 22" Full HD HDMI IPS', precio: 180000, img: '/img/monitor.jpg' },
        { id: 103, nombre: 'Monitor Gamer Xiaomi Mi Desktop 27" 75Hz', precio: 210000, img: '/img/monitor.jpg' }
    ],
    Procesadores: [
        { id: 10, nombre: 'Procesador Intel Core i5 12400F 4.4Ghz LGA1700', precio: 195000, img: '/img/ryzen5.jpg' },
        { id: 11, nombre: 'Procesador AMD Ryzen 5 5600G 4.4Ghz + Cooler', precio: 185000, img: '/img/ryzen5.jpg' },
        { id: 12, nombre: 'Procesador Intel Core i7 14700K 5.6Ghz Turbo', precio: 580000, img: '/img/ryzen5.jpg' },
        { id: 13, nombre: 'Procesador AMD Ryzen 7 5700G 4.6Ghz', precio: 245000, img: '/img/ryzen5.jpg' },
        { id: 14, nombre: 'Procesador Intel Core Ultra 7 265KF 5.5Ghz', precio: 526400, img: '/img/ryzen5.jpg' },
        { id: 15, nombre: 'Procesador AMD Ryzen 9 7900X 5.6Ghz AM5', precio: 610000, img: '/img/ryzen5.jpg' },
        { id: 16, nombre: 'Procesador Intel Core i9 14900K 6.0Ghz', precio: 750000, img: '/img/ryzen5.jpg' },
        { id: 17, nombre: 'Procesador AMD Ryzen 5 7600X 5.3Ghz AM5', precio: 320000, img: '/img/ryzen5.jpg' }
    ],
    PlacasVideo: [
        { id: 20, nombre: 'Placa de Video MSI GeForce RTX 4060 8GB Ventus', precio: 450000, img: '/img/rx9060.jpg' },
        { id: 21, nombre: 'Placa de Video XFX Radeon RX 6650 XT 8GB', precio: 390000, img: '/img/rx9060.jpg' },
        { id: 22, nombre: 'Placa de Video ASUS Dual RTX 3060 12GB OC', precio: 410000, img: '/img/rx9060.jpg' },
        { id: 23, nombre: 'Placa de Video Gigabyte RTX 4070 Super 12GB', precio: 950000, img: '/img/rx9060.jpg' },
        { id: 24, nombre: 'Placa de Video PowerColor Radeon RX 7800 XT 16GB', precio: 820000, img: '/img/rx9060.jpg' },
        { id: 25, nombre: 'Placa de Video EVGA RTX 3080 Ti 12GB FTW3', precio: 1100000, img: '/img/rx9060.jpg' },
        { id: 26, nombre: 'Placa de Video Sapphire Radeon RX 7900 GRE 16GB', precio: 980000, img: '/img/rx9060.jpg' }
    ],
    Conectividad: [
        { id: 30, nombre: 'Router Wi-Fi 6 TP-Link Archer AX12 Dual Band', precio: 65000, img: '/img/adaptador.jpg' },
        { id: 31, nombre: 'Placa de Red Wi-Fi TP-Link Archer TX50UH AX3000', precio: 46380, img: '/img/adaptador.jpg' },
        { id: 32, nombre: 'Extensor de Rango TP-Link RE305 AC1200', precio: 38000, img: '/img/adaptador.jpg' },
        { id: 33, nombre: 'Switch TP-Link 8 Puertos Gigabit Desktop', precio: 25000, img: '/img/adaptador.jpg' }
    ],
    Perifericos: [
        { id: 40, nombre: 'Teclado Mecánico Redragon Kumara K552 RGB', precio: 55000, img: '/img/periferico.jpg' },
        { id: 41, nombre: 'Mouse Logitech G305 Lightspeed Wireless Black', precio: 58000, img: '/img/periferico.jpg' },
        { id: 42, nombre: 'Auriculares HyperX Cloud Flight Wireless', precio: 120000, img: '/img/periferico.jpg' },
        { id: 43, nombre: 'Microfono Asus ROG STRIX Carnyx RGB USB-C', precio: 281000, img: '/img/periferico.jpg' },
        { id: 44, nombre: 'Pad Redragon P002 Archelon M', precio: 12000, img: '/img/periferico.jpg' },
        { id: 45, nombre: 'Mouse Razer Deathadder V3 Pro Wireless', precio: 165000, img: '/img/periferico.jpg' },
        { id: 46, nombre: 'Teclado Corsair K70 RGB MK2 Mecánico', precio: 210000, img: '/img/periferico.jpg' },
        { id: 47, nombre: 'Auriculares Logitech G733 K/DA Wireless', precio: 185000, img: '/img/periferico.jpg' },
        { id: 48, nombre: 'Webcam Logitech C922 Pro Stream Full HD', precio: 95000, img: '/img/periferico.jpg' }
    ],
    Gabinetes: [
        { id: 50, nombre: 'Gabinete Antec AX61 Elite 4x120mm ARGB Fans', precio: 85000, img: '/img/gabinete.jpg' },
        { id: 51, nombre: 'Gabinete Lian Li O11 Dynamic EVO Black', precio: 280000, img: '/img/gabinete.jpg' },
        { id: 52, nombre: 'Gabinete Corsair 4000D Airflow TG White', precio: 145000, img: '/img/gabinete.jpg' },
        { id: 53, nombre: 'Gabinete Cooler Master TD500 Mesh V2', precio: 130000, img: '/img/gabinete.jpg' }
    ],
    SillasGamers: [
        { id: 60, nombre: 'Silla Gamer Corsair T3 Rush Grey/White', precio: 450000, img: '/img/sillaGamer.jpg' },
        { id: 61, nombre: 'Silla Gamer Razer Enki X Essential Black', precio: 520000, img: '/img/sillaGamer.jpg' },
        { id: 62, nombre: 'Silla Gamer Redragon Capricornus C502-BR', precio: 290000, img: '/img/sillaGamer.jpg' },
        { id: 63, nombre: 'Silla Gamer Vertagear SL2000 Black/Red', precio: 380000, img: '/img/sillaGamer.jpg' }
    ]
} as any;

const categoriaActiva = ref('Monitores');

const categoriasGrid = [
    {
        id: 1, nombre: 'PLACAS DE VIDEO', img: '/img/placas.jpg'
    },
    {
        id: 2, nombre: 'MONITORES', img: '/img/monitores.jpg'
    },
    {
        id: 3, nombre: 'NOTEBOOKS', img: '/img/notebooks.jpg'
    },
    {
        id: 4, nombre: 'MEMORIAS RAM', img: '/img/ram.jpg'
    },
    {
        id: 5, nombre: 'MOTHER', img: '/img/mothers.jpg'
    },
    {
        id: 6, nombre: 'GABINETES', img: '/img/gabinetes.jpg'
    },
    {
        id: 7, nombre: 'CONECTIVIDAD', img: '/img/conectividad.jpg'
    },
    {
        id: 8, nombre: 'FUENTES', img: '/img/fuentes.jpg'
    },
    {
        id: 9, nombre: 'SILLAS GAMERS', img: '/img/sillasGamer.jpg'
    },
    {
        id: 10, nombre: 'PERIFERICOS', img: '/img/perifericos.jpg'
    },
    {
        id: 11, nombre: 'ALMACENAMIENTO', img: '/img/almacenamiento.jpg'
    },
    {
        id: 12, nombre: 'IMPRESORA E INSUMOS', img: '/img/impresoras.jpg'
    }
]

const ultimasNovedades = [
    {
        id: 1,
        img: '/img/xfxRadeon.jpg',
        title: 'Placas de video Radeon amd',
        description: 'RX 9070 XT 16GB Ultra Power',
        precio: 1187300
    },
    {
        id: 2,
        img: '/img/adaptadorDeRed.jpg',
        title: 'placas de red inalambricas',
        description: '  AX3000: Velocidad real',
        precio: 45800
    },
    {
        id: 3,
        img: '/img/monitorSamsung.jpg',
        title: 'Monitores y pantallas',
        description: '  Samsung G9 49" Potencia Total',
        precio: 1758600
    },
    {
        id: 4,
        img: '/img/notebookPro.jpg',
        title: 'Notebooks',
        description: 'Vivobook 15 R7 Potencia PRO',
        precio: 1372400
    },
    {
        id: 5,
        img: '/img/consolaXbox.jpg',
        title: 'Consolas',
        description: 'Juga donde quieras',
        precio: 1104990
    }
]

const mejoresMarcas = {
    "ASUS": {
        logo: '/img/marcas/asus.svg',
        banner: '/img/asusbanner.jpg',
        bannerNombre: 'ASUS',
        productos: [
            { id: 1, nombre: 'Mother ASUS PRIME Z890-P WIFI LGA1851 DDR5', precio: 415450, img: '/img/asusproducto.jpg' },
            { id: 2, nombre: 'Notebook ASUS TUF Gaming F16 16" Intel Core i7 14650HX 16GB DDR5 RTX 4060', precio: 3019000, img: '/img/asusproducto.jpg' },
            { id: 3, nombre: 'Notebook ASUS TUF Gaming A16 16" AMD Ryzen 7 7445HS 16GB DDR5 RTX 4050', precio: 2039650, img: '/img/asusproducto.jpg' },
            { id: 4, nombre: 'Placa de Video ASUS GeForce RTX 4070 SUPER 12GB GDDR6X Dual OC', precio: 985000, img: '/img/asusproducto.jpg' },
            { id: 5, nombre: 'Mother ASUS ROG STRIX B760-G GAMING WIFI DDR5', precio: 315000, img: '/img/asusproducto.jpg' },
            { id: 6, nombre: 'Monitor Gamer ASUS 27" TUF VG279Q3A 180Hz Fast IPS', precio: 345000, img: '/img/asusproducto.jpg' },
            { id: 7, nombre: 'Placa de Video ASUS Dual GeForce RTX 4060 Ti 8GB OC GDDR6', precio: 620000, img: '/img/asusproducto.jpg' },
            { id: 8, nombre: 'Notebook ASUS Vivobook 16" Intel Core i5 1235U 16GB SSD 512GB', precio: 950000, img: '/img/asusproducto.jpg' }
        ]
    },
    "AMD": {
        logo: '/img/marcas/amd.svg',
        banner: '/img/amdbanner.jpg',
        bannerNombre: 'AMD',
        productos: [
            { id: 1, nombre: 'Procesador AMD Ryzen 5 7600 5.1Ghz AM5', precio: 315000, img: '/img/amdproducto.jpg' },
            { id: 2, nombre: 'Procesador AMD Ryzen 7 7800X3D 5.0Ghz AM5', precio: 680000, img: '/img/amdproducto.jpg' },
            { id: 3, nombre: 'Placa de Video XFX Radeon RX 7900 XTX 24GB Speedster', precio: 1550000, img: '/img/amdproducto.jpg' },
            { id: 4, nombre: 'Procesador AMD Ryzen 5 5600G 4.4Ghz + Wraith Stealth Cooler', precio: 185900, img: '/img/amdproducto.jpg' },
            { id: 5, nombre: 'Placa de Video Sapphire Radeon RX 7800 XT 16GB Pulse', precio: 815000, img: '/img/amdproducto.jpg' },
            { id: 6, nombre: 'Procesador AMD Ryzen 9 7950X3D 5.7Ghz AM5', precio: 950000, img: '/img/amdproducto.jpg' },
            { id: 7, nombre: 'Placa de Video ASROCK Radeon RX 7600 8GB Challenger OC', precio: 395000, img: '/img/amdproducto.jpg' }
        ]
    },
    "ANTEC": {
        logo: '/img/marcas/antec.svg',
        banner: '/img/antecbanner.jpg',
        bannerNombre: 'ANTEC',
        productos: [
            { id: 1, nombre: 'Gabinete Antec AX61 Elite 4x120mm ARGB Fans', precio: 82000, img: '/img/antecproducto.jpg' },
            { id: 2, nombre: 'Fuente Antec 850W 80 Plus Gold NE850G Modular', precio: 165000, img: '/img/antecproducto.jpg' },
            { id: 3, nombre: 'Gabinete Antec Performance 1 FT Full Tower', precio: 245000, img: '/img/antecproducto.jpg' },
            { id: 4, nombre: 'Cooler CPU Antec Symphony 360 ARGB Liquid', precio: 135000, img: '/img/antecproducto.jpg' },
            { id: 5, nombre: 'Gabinete Antec NX200M Mesh RGB', precio: 58000, img: '/img/antecproducto.jpg' },
            { id: 6, nombre: 'Fuente Antec 750W 80 Plus Bronze Atom B750', precio: 95000, img: '/img/antecproducto.jpg' },
            { id: 7, nombre: 'Gabinete Antec C8 Constellation White Full Tower', precio: 195000, img: '/img/antecproducto.jpg' },
            { id: 8, nombre: 'Cooler Fan Antec Prizm 120mm RGB 3 in 1 pack', precio: 45000, img: '/img/antecproducto.jpg' },
            { id: 9, nombre: 'Fuente Antec 1000W 80 Plus Gold Signature Premium', precio: 285000, img: '/img/antecproducto.jpg' },
            { id: 10, nombre: 'Gabinete Antec Dark League DF700 Flux', precio: 115000, img: '/img/antecproducto.jpg' }
        ]
    },
    "ASROCK": {
        logo: '/img/marcas/asrock.svg',
        banner: '/img/asrockbanner.jpg',
        bannerNombre: 'ASROCK',
        productos: [
            { id: 1, nombre: 'Mother AsRock B760M-HDV/M.2 D4 LGA1700', precio: 145000, img: '/img/asrockproducto.jpg' },
            { id: 2, nombre: 'Placa de Video AsRock Radeon RX 6600 8GB Challenger D', precio: 315000, img: '/img/asrockproducto.jpg' },
            { id: 3, nombre: 'Mother AsRock Z790 PG Lightning DDR5 LGA1700', precio: 325000, img: '/img/asrockproducto.jpg' },
            { id: 4, nombre: 'Monitor Gamer AsRock 27" Phantom PG27FF1A 165Hz', precio: 245000, img: '/img/asrockproducto.jpg' },
            { id: 5, nombre: 'Mother AsRock B650M-H/M.2+ AM5 DDR5', precio: 175000, img: '/img/asrockproducto.jpg' },
            { id: 6, nombre: 'Placa de Video AsRock Radeon RX 7700 XT 12GB Steel Legend', precio: 685000, img: '/img/asrockproducto.jpg' },
            { id: 7, nombre: 'Mother AsRock A520M-HVS AM4', precio: 82000, img: '/img/asrockproducto.jpg' },
            { id: 8, nombre: 'Mother AsRock X670E Taichi AM5 E-ATX', precio: 780000, img: '/img/asrockproducto.jpg' },
            { id: 9, nombre: 'Placa de Video AsRock Intel Arc A750 Challenger 8GB', precio: 365000, img: '/img/asrockproducto.jpg' }
        ]
    },
    "INTEL": {
        logo: '/img/marcas/intel.svg',
        banner: '/img/intelbanner.jpg',
        bannerNombre: 'INTEL',
        productos: [
            { id: 1, nombre: 'Procesador Intel Core i5 12400F 4.4Ghz LGA1700', precio: 192000, img: '/img/intelproducto.jpg' },
            { id: 2, nombre: 'Procesador Intel Core i7 14700K 5.6Ghz Turbo LGA1700', precio: 585000, img: '/img/intelproducto.jpg' },
            { id: 3, nombre: 'Procesador Intel Core i9 14900K 6.0Ghz Turbo LGA1700', precio: 820000, img: '/img/intelproducto.jpg' },
            { id: 4, nombre: 'Procesador Intel Core i3 12100F 4.3Ghz LGA1700', precio: 115000, img: '/img/intelproducto.jpg' },
            { id: 5, nombre: 'Procesador Intel Core Ultra 7 265K 5.5Ghz LGA1851', precio: 545000, img: '/img/intelproducto.jpg' },
            { id: 6, nombre: 'Procesador Intel Core i5 14600K 5.3Ghz Turbo LGA1700', precio: 435000, img: '/img/intelproducto.jpg' },
            { id: 7, nombre: 'Mini PC Intel NUC 12 Pro Kit i5-1240P', precio: 650000, img: '/img/intelproducto.jpg' }
        ]
    },
    "CORSAIR": {
        logo: '/img/marcas/corsair.svg',
        banner: '/img/corsairbanner.jpg',
        bannerNombre: 'CORSAIR',
        productos: [
            { id: 1, nombre: 'Memoria Corsair DDR5 32GB (2x16GB) 6000MHz Vengeance RGB', precio: 195000, img: '/img/corsairproducto.jpg' },
            { id: 2, nombre: 'Fuente Corsair 750W 80 Plus Gold RM750e Modular', precio: 155000, img: '/img/corsairproducto.jpg' },
            { id: 3, nombre: 'Gabinete Corsair 4000D Airflow TG Black', precio: 142000, img: '/img/corsairproducto.jpg' },
            { id: 4, nombre: 'Auriculares Corsair HS80 RGB Wireless Carbon', precio: 185000, img: '/img/corsairproducto.jpg' },
            { id: 5, nombre: 'Cooler CPU Corsair iCUE H150i Elite Capellix XT', precio: 295000, img: '/img/corsairproducto.jpg' },
            { id: 6, nombre: 'Teclado Mecánico Corsair K70 RGB TKL Champion', precio: 165000, img: '/img/corsairproducto.jpg' }
        ]
    },
    "XYZ": {
        logo: '/img/marcas/xyz.svg',
        banner: '/img/xyzproducto.jpg',
        bannerNombre: 'XYZ',
        productos: [
            { id: 1, nombre: 'PC Armada Gamer Intel Core i5 12400F RTX 4060 16GB DDR4', precio: 1150000, img: '/img/xyzproducto.jpg' },
            { id: 2, nombre: 'PC Armada Office Intel i3 12100 8GB SSD 480GB', precio: 450000, img: '/img/xyzproducto.jpg' },
            { id: 3, nombre: 'PC Armada Gamer AMD Ryzen 5 5600G 16GB SSD 480GB', precio: 580000, img: '/img/xyzproducto.jpg' },
            { id: 4, nombre: 'PC Armada Gamer AMD Ryzen 7 5700X RTX 4070 32GB DDR4', precio: 1850000, img: '/img/xyzproducto.jpg' },
            { id: 5, nombre: 'PC Armada Pro Intel i7 14700K 32GB DDR5 SSD 1TB', precio: 1450000, img: '/img/xyzproducto.jpg' },
            { id: 6, nombre: 'PC Armada Gamer Intel i5 10400F GTX 1650 8GB', precio: 750000, img: '/img/xyzproducto.jpg' },
            { id: 7, nombre: 'PC Armada Streamer AMD Ryzen 9 7900X RTX 4080 64GB', precio: 3200000, img: '/img/xyzproducto.jpg' }
        ]
    }
} as any;

const marcaActiva = ref<string>('ASUS');

// Si usas Vue 3 con Script Setup:
//const marcaActiva = ref<keyof typeof mejoresMarcas>('ASUS');

// Ahora TypeScript sabe que marcaActiva solo puede ser "ASUS" | "AMD" | etc.
//const marcaSeleccionada = mejoresMarcas[marcaActiva.value]; // Sin errores

// LIFECYCLES
onMounted(() => {

    new Swiper(".pagos", {
        slidesPerView: 'auto', // Importante para que los botones rounded no se deformen
        spaceBetween: 0,      // Espacio entre logos en mobile
        freeMode: true,        // Permite deslizar libremente en mobile
        watchSlidesProgress: true,
        breakpoints: {
            1024: {
                spaceBetween: 0    // El gap lo maneja Tailwind con lg:gap-4
            }
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

    });

    new Swiper(".productosNombres", {
        slidesPerView: 'auto', // Importante para que los botones rounded no se deformen
        spaceBetween: 10,      // Espacio entre logos en mobile
        freeMode: true,        // Permite deslizar libremente en mobile
        watchSlidesProgress: true,
        breakpoints: {
            1024: {
                spaceBetween: 0    // El gap lo maneja Tailwind con lg:gap-4
            }
        },

    });


    new Swiper(".productosDestacados", {
        modules: [Grid, Pagination, Autoplay],
        breakpoints: {
            0: {
                slidesPerView: 1,
                grid: {
                    rows: 2,
                    fill: 'row'
                },
            },
            768: {
                slidesPerView: 2,
                grid: {
                    rows: 2,
                    fill: 'row'
                },
            },
            1024: {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                    fill: 'row'
                },

            },
        },
        spaceBetween: 10,

        // CLAVE: Estos dos hacen que el swiper se actualice solo 
        // cuando Vue cambia los productos del v-for
        observer: true,
        observeParents: true,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });


    new Swiper(".banner", {
        modules: [Pagination, Autoplay],

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        loop: true,
    });


    new Swiper(".categorias", {
        modules: [Grid, Pagination, Autoplay],
        slidesPerView: 4,
        breakpoints: {

            0: {
                slidesPerView: 2,
                grid: {
                    rows: 2,
                    fill: 'row'
                },
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                    fill: 'row'
                },
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 4,
                grid: {
                    rows: 2,
                    fill: 'row'
                },
            },
        },

        spaceBetween: 15,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },

    });

    new Swiper(".marcasLogos", {
        slidesPerView: 'auto', // Importante para que los botones rounded no se deformen
        spaceBetween: 10,      // Espacio entre logos en mobile
        freeMode: true,        // Permite deslizar libremente en mobile
        watchSlidesProgress: true,
        breakpoints: {
            1024: {
                spaceBetween: 0    // El gap lo maneja Tailwind con lg:gap-4
            }
        },
    });

    new Swiper(".marcas", {
        modules: [Grid, Pagination, Autoplay],
        slidesPerView: 3,
        spaceBetween: 10,

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },

        // CLAVE: Estos dos hacen que el swiper se actualice solo 
        // cuando Vue cambia los productos del v-for
        observer: true,
        observeParents: true,

        pagination: {
            el: ".paginationMarcas",
            clickable: true,
        },

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
});

</script>
