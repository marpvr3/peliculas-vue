<template>
  <section 
    class="hero-section" 
    :style="{ backgroundImage: 'url(' + activeSlide.url + ')' }"
  >
    <div class="overlay"></div>
    <div class="hero-content">
      <h1 class="title">{{ activeSlide.title }}</h1>
      <p class="subtitle">Una búsqueda para salvar su mundo. Mar, 03, 2021 USA.</p>

      <div class="rating">
        <span v-for="n in 5" :key="n" class="star">⭐</span>
        <span>8.0 RATING</span>
      </div>

      <p class="description">{{ activeSlide.desc }}</p>

      <div class="actions">
        <button class="play-button">▶ PLAY</button>
        <button class="add-button">+</button>
      </div>
    </div>

    <div class="thumbnail-slider">
      <div 
        v-for="slide in slides" 
        :key="slide.id" 
        class="thumbnail-item"
        :class="{ 'active': slide.id === activeSlide.id }"
        @click="setActiveSlide(slide)"
      >
        <img :src="slide.url" :alt="slide.title">
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// IMPORTAMOS LAS IMÁGENES
import duneHero from '../assets/dune.hero.jpg'
import hero1 from '../assets/HERO1.jpeg'
import hero2 from '../assets/HERO2.jpeg'
import hero3 from '../assets/HERO3.jpeg'

const slides = [
  { 
    id: 1, 
    title: 'DUNE: PARTE DOS', 
    desc: 'Tras unirse a Chani y a los Fremen, Paul Atreides busca vengarse de quienes destruyeron a su familia mientras se enfrenta a un futuro oscuro.', 
    url: duneHero
  },
  { 
    id: 2, 
    title: 'LA BATALLA DE ARRAKIS', 
    desc: 'La confrontación final por el control de Arrakis y la especia.', 
    url: hero1
  },
  { 
    id: 3, 
    title: 'EL DESIERTO PROFUNDO', 
    desc: 'Paul y Jessica navegando por el corazón del planeta desértico.', 
    url: hero2
  },
  { 
    id: 4, 
    title: 'FREMEN: EL DESPERTAR', 
    desc: 'Chani lidera el entrenamiento del nuevo ejército Fremen.', 
    url: hero3
  },
]

const activeSlide = ref(slides[0])

function setActiveSlide(slide) {
  activeSlide.value = slide
}
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 95vh; 
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end; 
  padding: 0 5%;
  color: white;
  overflow: hidden; 
  box-sizing: border-box;
  transition: background-image 0.5s ease-in-out; 
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%), 
              linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
  z-index: 1;
}

.hero-content {
  z-index: 2;
  margin-bottom: 160px;
  max-width: 600px;
}

.title {
  font-size: 4em;
  margin: 0 0 10px 0;
  font-weight: 800;
  line-height: 1.1;
  text-transform: uppercase;
}

.subtitle {
  font-size: 1.1em;
  color: #f7a900; 
  margin-bottom: 15px;
}

.description {
  line-height: 1.6;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
}

.rating span {
  color: #f7a900; 
  font-size: 1.2em;
}

.actions {
  display: flex;
  gap: 15px;
}

.play-button {
  background-color: #f7a900; 
  color: black;
  padding: 15px 30px;
  font-size: 1.2em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-button {
  background-color: rgba(255, 255, 255, 0.2); 
  color: white;
  width: 50px; 
  height: 50px; 
  border: none;
  border-radius: 50%;
  font-size: 1.8em;
  cursor: pointer;
  font-weight: bold;
}

.thumbnail-slider {
  position: absolute;
  bottom: 50px; 
  left: 50%;
  transform: translateX(-50%); 
  display: flex;
  gap: 15px; 
  z-index: 3;
  padding: 10px 0;
}

.thumbnail-item {
  width: 140px; 
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: border-color 0.3s, transform 0.3s;
}

.thumbnail-item.active {
  border-color: #f7a900; 
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>