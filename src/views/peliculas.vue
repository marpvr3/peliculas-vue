<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import TheHeader from "../components/TheHeader.vue"
import HeroImg from '../assets/hero-peliculas.jpeg'

const API_KEY = "8a98a17434f1bc9090f77811562d337d"
const URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`
const URL_GENEROS = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-ES`
const URL_BUSCAR = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=`

const peliculas = ref([])
const generos = ref([])
const favoritos = ref([])
const generoSeleccionado = ref("")
const modalMovie = ref(null)
const search = ref("")

const route = useRoute()
const router = useRouter()

function cargarFavoritos() {
  const data = localStorage.getItem("favoritos")
  favoritos.value = data ? JSON.parse(data) : []
}

function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos.value))
}

function toggleFavorito(movie) {
  const existe = favoritos.value.find(f => f.id === movie.id)
  if (existe) {
    favoritos.value = favoritos.value.filter(f => f.id !== movie.id)
  } else {
    favoritos.value.push(movie)
  }
  guardarFavoritos()
}

function esFavorito(id) {
  return favoritos.value.some(f => f.id === id)
}

function abrirModal(movie) {
  modalMovie.value = movie
}

function cerrarModal() {
  modalMovie.value = null
}

async function cargarGeneros() {
  try {
    const res = await fetch(URL_GENEROS)
    const data = await res.json()
    generos.value = data.genres || []
  } catch (err) {
    console.error("Error al cargar géneros:", err)
  }
}

async function cargarPeliculas(query = "") {
  const url = query ? URL_BUSCAR + encodeURIComponent(query) : URL_POPULARES
  try {
    const res = await fetch(url)
    const data = await res.json()
    peliculas.value = data.results || []
  } catch (err) {
    console.error("Error al cargar películas:", err)
  }
}

function buscarPeliculas() {
  router.push({ path: "/peliculas", query: { search: search.value } })
}

onMounted(() => {
  cargarFavoritos()
  cargarGeneros()
  search.value = route.query.search || ""
  cargarPeliculas(search.value)
})

watch(
  () => route.query.search,
  (newSearch) => {
    search.value = newSearch || ""
    cargarPeliculas(newSearch || "")
  }
)

const peliculasFiltradas = computed(() => {
  let filtradas = peliculas.value
  if (generoSeleccionado.value) {
    filtradas = filtradas.filter(p => p.genre_ids.includes(Number(generoSeleccionado.value)))
  }
  return filtradas
})
</script>

<template>
  <div class="peliculas-container">
    <TheHeader />

    <section class="hero-section text-center position-relative mb-5">
      <img :src="HeroImg" class="img-fluid hero-img rounded" alt="Películas Hero">
      <div class="hero-overlay position-absolute top-50 start-50 translate-middle text-light">
        <h1>Películas</h1>
        <p>Explora todas las películas disponibles y añade tus favoritas</p>
      </div>
    </section>

    <!-- FILTRO + BUSCADOR -->
    <section class="filtros text-center mb-4 d-flex justify-content-center align-items-center gap-3 flex-wrap">
      <div>
        <label class="text-light me-2">Filtrar por género:</label>
        <select v-model="generoSeleccionado" class="form-select d-inline w-auto">
          <option value="">Todos</option>
          <option v-for="g in generos" :key="g.id" :value="g.id">{{ g.name }}</option>
        </select>
      </div>

      <div class="search-bar d-flex align-items-center">
        <input 
          type="text"
          placeholder="Buscar película..."
          v-model="search"
          @keyup.enter="buscarPeliculas"
        />
        <i class="bi bi-search search-icon" @click="buscarPeliculas"></i>
      </div>
    </section>

    <!-- CARDS -->
    <div class="container">
      <div class="row g-4">
        <div class="col-6 col-md-4 col-lg-3" v-for="p in peliculasFiltradas" :key="p.id">
          <div class="card-sci position-relative text-center bg-dark p-3 rounded shadow-sm h-100" @click="abrirModal(p)">
            <button class="fav-btn" @click.stop="toggleFavorito(p)">
              <i :class="esFavorito(p.id) ? 'bi bi-heart-fill fav-active' : 'bi bi-heart fav-inactive'"></i>
            </button>
            <img :src="'https://image.tmdb.org/t/p/w500' + p.poster_path" class="img-fluid rounded mb-2">
            <h4 class="title mb-1">{{ p.title }}</h4>
            <p class="rating mb-0">
              <i class="bi bi-star-fill star-icon"></i> {{ p.vote_average }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div v-if="modalMovie" class="modal-back" @click.self="cerrarModal">
      <div class="modal-content">
        <button class="close" @click="cerrarModal">×</button>
        <img :src="'https://image.tmdb.org/t/p/w500' + modalMovie.poster_path" class="img-fluid mb-3" />
        <h2>{{ modalMovie.title }}</h2>
        <p class="overview">{{ modalMovie.overview }}</p>
        <p class="rating">
          <i class="bi bi-star-fill star-icon"></i> {{ modalMovie.vote_average }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.peliculas-container { 
  background: #0A0A0A; 
  color: #E0F7FA; 
  min-height: 100vh; 
  font-family: Arial, sans-serif; 
  padding-bottom: 100px; 
}

.hero-section { position: relative; }
.hero-img { width: 100%; max-height: 400px; object-fit: cover; }
.hero-overlay h1 { font-size: 2.5rem; font-weight: 700; color: #00D9FF; text-transform: uppercase; letter-spacing: 2px; }
.hero-overlay p { font-size: 1.2rem; opacity: 0.85; margin-top: 10px; }

.filtros { display: flex; justify-content: center; align-items: center; gap: 15px; flex-wrap: wrap; margin-bottom: 20px; }
.filtros select { padding: 6px 12px; border-radius: 20px; border: 1px solid #00D9FF; background: #1A1A1A; color: #E0F7FA; font-weight: 500; cursor: pointer; transition: 0.3s; }
.filtros select:hover { background: #111; border-color: #00FFFF; }

.search-bar { display: inline-flex; background-color: rgba(255,255,255,0.1); border-radius: 20px; padding: 5px 12px; border: 1px solid rgba(255,255,255,0.2); }
.search-bar input { background: transparent; border: none; color: white; outline: none; padding: 5px; min-width: 150px; }
.search-icon { color: rgba(255,255,255,0.7); margin-left: 5px; cursor: pointer; font-size: 1em; }

.card-sci { 
  background: #1A1A1A; 
  box-shadow: 0 0 25px rgba(0,217,255,0.25); 
  transition: transform 0.3s, box-shadow 0.3s; 
  cursor: pointer; 
  padding: 15px; 
  overflow: hidden;
}
.card-sci:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(0,217,255,0.5); }
.poster { width: 100%; border-radius: 8px; margin-bottom: 8px; }
.title { font-size: 0.95rem; font-weight: 600; color: #E0F7FA; }
.rating { font-size: 0.9rem; margin-top: 5px; color: #E0F7FA; display: flex; justify-content: center; align-items: center; gap: 5px; }
.star-icon { color: #00D9FF; }

.fav-btn { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); border: none; padding: 7px; border-radius: 50%; cursor: pointer; transition: 0.3s; }
.fav-btn:hover { background: rgba(0,217,255,0.3); }
.fav-active { color: #00D9FF !important; }
.fav-inactive { color: rgba(255,255,255,0.7) !important; }

.modal-back { position: fixed; inset: 0; background: rgba(0,0,0,0.95); display: flex; justify-content: center; align-items: center; z-index: 3000; }
.modal-content { background: #080808; width: 450px; padding: 30px; border-radius: 20px; text-align: center; color: white; position: relative; border: 3px solid #00D9FF; box-shadow: 0 0 50px rgba(0,217,255,0.6); }
.close { position: absolute; top: 12px; right: 18px; font-size: 30px; border: none; background: none; color: #00D9FF; cursor: pointer; }
.overview { margin-top: 12px; font-size: .95rem; opacity: .75; }
</style>