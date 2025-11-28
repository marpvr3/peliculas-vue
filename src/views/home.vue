<template>
  <div class="app-container">

  
    <TheHeader />

    
    <HeroSection
      title="DUNE: PART TWO"
      description="Paul Atreides busca vengarse mientras se enfrenta a un futuro oscuro."
      imageUrl="/src/assets/dune.hero.jpg"
    />

  
    <MovieCard
      :peliculas="peliculasHome"
      :favoritos="favoritos"
      @toggle-favorito="toggleFavorito"
    />

    <BannerSection />
    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import TheHeader from "../components/TheHeader.vue"
import HeroSection from "../components/hero.vue"
import BannerSection from "../components/banner.vue"
import FooterSection from "../components/footer.vue"
import MovieCard from "../components/movie-card.vue"

const API_KEY = "8a98a17434f1bc9090f77811562d337d"
const URL_POPULARES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`

const peliculasHome = ref([])
const favoritos = ref([])

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

async function cargarAPI() {
  try {
    const res = await fetch(URL_POPULARES)
    peliculasHome.value = (await res.json()).results || []
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  cargarFavoritos()
  cargarAPI()
})
</script>

<style>
.app-container {
  width: 100%;
  min-height: 100vh;
}
</style>

