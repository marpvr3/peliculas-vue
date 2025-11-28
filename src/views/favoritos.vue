<script setup>
import { ref, onMounted } from "vue"
import TheHeader from "../components/TheHeader.vue"
import FooterSection from "../components/footer.vue"
import HeroImg from '../assets/Favoritos-hero.jpeg'

const favoritos = ref([])
const modalMovie = ref(null)

function cargarFavoritos() {
  const data = localStorage.getItem("favoritos")
  favoritos.value = data ? JSON.parse(data) : []
}

function eliminarFavorito(movie) {
  favoritos.value = favoritos.value.filter(f => f.id !== movie.id)
  localStorage.setItem("favoritos", JSON.stringify(favoritos.value))
}

function abrirModal(movie) {
  modalMovie.value = movie
}

function cerrarModal() {
  modalMovie.value = null
}

onMounted(() => {
  cargarFavoritos()
})
</script>

<template>
  <div class="favoritos-page">

    <TheHeader />

    <section class="hero-section text-center position-relative mb-5">
      <img :src="HeroImg" class="img-fluid hero-img" alt="Favoritos Hero">
      <div class="hero-overlay position-absolute top-50 start-50 translate-middle text-light">
        <h1>Mis Favoritos</h1>
        <p>Las películas que guardaste para ver más tarde</p>
      </div>
    </section>

    <div v-if="favoritos.length === 0" class="empty-msg text-center py-5">
      <p>No tienes películas guardadas todavía.</p>
    </div>

    <div class="container" v-else>
      <div class="row g-4">
        <div class="col-6 col-md-4 col-lg-3" v-for="m in favoritos" :key="m.id">
          <div class="movie position-relative text-center bg-dark p-3 rounded shadow-sm h-100">
            <button class="fav-btn" @click="eliminarFavorito(m)">×</button>
            <img 
              :src="'https://image.tmdb.org/t/p/w500' + m.poster_path" 
              class="img-fluid rounded mb-3"
              @click="abrirModal(m)"
            />
            <p class="mb-0 text-light fw-semibold">{{ m.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="modalMovie" class="modal-back" @click.self="cerrarModal">
      <div class="modal-content">
        <button class="close" @click="cerrarModal">×</button>
        <img :src="'https://image.tmdb.org/t/p/w500' + modalMovie.poster_path" class="img-fluid mb-3" />
        <h2>{{ modalMovie.title }}</h2>
        <p>{{ modalMovie.overview }}</p>
        <p class="rating">
          <i class="bi bi-star-fill star-icon"></i> {{ modalMovie.vote_average }}
        </p>
      </div>
    </div>

    <FooterSection />
  </div>
</template>

<style scoped>
.favoritos-page {
  background: #0A0A0A;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #E0F7FA;
}

.hero-section {
  position: relative;
}
.hero-img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  max-height: 400px; 
}
.hero-overlay h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #00D9FF;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.hero-overlay p {
  font-size: 1.2rem;
  opacity: 0.85;
  margin-top: 10px;
}

.movie {
  background: #1A1A1A;
  box-shadow: 0 0 25px rgba(0, 217, 255, 0.25);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  padding: 15px; 
}
.movie:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
}

.fav-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 0, 0, 0.8);
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: background 0.3s;
}
.fav-btn:hover {
  background: red;
}

.modal-back {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
}

.modal-content {
  background: #080808;
  width: 450px;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  color: white;
  position: relative;
  border: 3px solid #00D9FF;
  box-shadow: 0 0 50px rgba(0, 217, 255, 0.6);
}

.close {
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 30px;
  border: none;
  background: none;
  color: #00D9FF;
  cursor: pointer;
}

.rating {
  margin-top: 12px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.star-icon {
  font-size: 1.5rem;
  color: #00D9FF;
}
</style>