<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: 'Popular Ahora'
  },
  peliculas: Array,
  favoritos: Array
})

const emit = defineEmits(["toggle-favorito"])
const sliderRef = ref(null)
const modalMovie = ref(null)
const router = useRouter()

function abrirModal(movie) {
  modalMovie.value = movie
}
function cerrarModal() {
  modalMovie.value = null
}

function esFavorito(id) {
  return props.favoritos.some(f => f.id === id)
}

function next() {
  sliderRef.value.scrollBy({ left: 320, behavior: "smooth" }) 
}
function prev() {
  sliderRef.value.scrollBy({ left: -320, behavior: "smooth" })
}

function verMas() {
  router.push('/peliculas') 
}
</script>

<template>
  <section class="slider-section-container">

    <div class="d-flex justify-content-between align-items-center mb-3 px-3 px-md-5">
      <h2 class="section-title">{{ title }}</h2>
      <button class="btn btn-outline-primary btn-ver-mas" @click="verMas">
        VER MÁS <i class="bi bi-arrow-right"></i>
      </button>
    </div>

    <div class="slider-wrapper position-relative px-3 px-md-5">
      <div class="d-flex flex-row flex-nowrap overflow-auto slider" ref="sliderRef">
        <div 
          v-for="p in peliculas" 
          :key="p.id" 
          class="card-sci me-3 position-relative"
        >
          <button class="fav-btn"
            @click.stop="emit('toggle-favorito', p)">
            <i :class="esFavorito(p.id) ? 'bi bi-heart-fill fav-active' : 'bi bi-heart fav-inactive'"></i>
          </button>

          <img 
            class="poster img-fluid"
            :src="'https://image.tmdb.org/t/p/w500' + p.poster_path"
            @click="abrirModal(p)"
          >

          <h4 class="title mt-2 text-center">{{ p.title }}</h4>
        </div>
      </div>

      <!-- Flechas (desktop) -->
      <button @click="prev" class="ctrl-btn d-none d-md-flex position-absolute start-0 top-50 translate-middle-y">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button @click="next" class="ctrl-btn d-none d-md-flex position-absolute end-0 top-50 translate-middle-y">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </section>

  <!-- Modal -->
  <div v-if="modalMovie" class="modal fade show d-block" tabindex="-1" @click.self="cerrarModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-light">
        <div class="modal-header border-0">
          <h5 class="modal-title">{{ modalMovie.title }}</h5>
          <button type="button" class="btn-close btn-close-white" @click="cerrarModal"></button>
        </div>
        <div class="modal-body text-center">
          <img class="img-fluid rounded mb-3" :src="'https://image.tmdb.org/t/p/w500' + modalMovie.poster_path">
          <p>{{ modalMovie.overview }}</p>
          <p><i class="bi bi-star-fill text-warning"></i> {{ modalMovie.vote_average }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider-section-container {
    padding: 20px 0 50px;
    background: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 20%, #0A0A0A 80%, #000000 100%);
}

.section-title {
  color: #E0F7FA;
  font-weight: 700;
  text-transform: uppercase;
}

.btn-ver-mas {
  border-color: #00D9FF;
  color: #00D9FF;
}
.btn-ver-mas:hover {
  background-color: #00D9FF;
  color: #0A0A0A;
}

.slider {
  scroll-behavior: smooth;
  gap: 20px;
  padding-bottom: 10px;
}

.card-sci {
  min-width: 200px;
  background: #1A1A1A;
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.15);
  border: 1px solid rgba(0, 217, 255, 0.05);
}

.card-sci:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(0, 217, 255, 0.4);
}

.poster {
  width: 100%;
  border-radius: 8px;
}

.title {
  font-size: 0.95rem;
  color: #E0F7FA;
  font-weight: 600;
}

.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.6);
  border: none;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
}

.fav-btn:hover {
  background: rgba(0, 217, 255, 0.3);
}

.fav-active {
  color: #00D9FF !important;
}

.fav-inactive {
  color: rgba(255, 255, 255, 0.7) ;
}

.ctrl-btn {
  background: rgba(0, 217, 255, 0.2);
  border: 1px solid rgba(0, 217, 255, 0.5);
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  color: #00D9FF;
  backdrop-filter: blur(4px);
  transition: 0.2s;
}
.ctrl-btn:hover {
  background: rgba(0, 217, 255, 0.4);
}

.modal-content {
  background: #080808;
  border: 3px solid #00D9FF;
  box-shadow: 0 0 40px rgba(0, 217, 255, 0.6);
}
</style>