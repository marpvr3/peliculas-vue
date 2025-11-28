<template>
  <div class="container my-5">
    <div class="card movie-info-card p-4">

      <div class="row g-3 align-items-start">

        <!-- Imagen -->
        <div class="col-md-4 text-center">
          <img :src="bannerImg" alt="Sweet Home" class="img-fluid rounded movie-banner">
        </div>

        <!-- Texto -->
        <div class="col-md-8">
          <div class="genre-trending d-flex justify-content-between mb-2">
            <span class="genre-tag">HORROR MOVIE</span>
            <span class="trending-tag">TOP TRENDING</span>
          </div>

          <h1 class="movie-title">SWEET HOME</h1>
          <p class="movie-meta">Año de Lanzamiento: 2020 Calificación IMDb: 7.3</p>

          <div class="description-section mb-3">
            <h3 class="description-heading">BREVE DESCRIPCIÓN</h3>
            <p class="description-text">
              Un estudiante de secundaria llamado Hyun, que perdió a su familia en un horrible accidente, se ve obligado a abandonar su hogar. 
              Como resultado, Hyun debe luchar contra una nueva realidad mientras se esfuerza por salvar lo que queda de la humanidad antes de que sea demasiado tarde.
            </p>
          </div>

          <div class="d-flex flex-wrap align-items-center gap-3">
            <div class="player-controls d-flex gap-2">
              <button class="player-btn"><i class="bi bi-caret-left-fill"></i></button>
              <button class="player-btn"><i class="bi bi-pause-fill"></i></button>
              <button class="player-btn"><i class="bi bi-caret-right-fill"></i></button>
            </div>

            <div class="info-buttons d-flex gap-2">
              <button class="btn-read-more">LEER MÁS</button>
              <button class="btn-watch-now">VER AHORA</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerImg from '../assets/banner-img.jpeg'

export default {
  name: 'MovieInfoCard',
  data() {
    return {
      bannerImg: BannerImg
    }
  }
}
</script>

<style scoped>
.movie-info-card {
  background-color: #1C2B3A;
  color: #E0F7FA;
  border-radius: 15px;
  border: 1px solid #0A1C2C;
  box-shadow: 0 10px 30px rgba(0, 217, 255, 0.2);
}

.movie-banner {
  max-width: 100%;
  object-fit: cover;
}

.genre-tag, .trending-tag {
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
}

.genre-tag {
  background-color: rgba(0, 217, 255, 0.1);
  color: #00D9FF;
}

.trending-tag {
  background-color: #3A66FF;
  color: #E0F7FA;
}

.movie-title {
  font-size: 2.2em;
  font-weight: 800;
  margin: 0.2em 0;
  color: #E0F7FA;
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
}

.movie-meta {
  color: rgba(224, 247, 250, 0.7);
  margin-bottom: 1em;
}

.description-heading {
  font-size: 1.1em;
  color: #00D9FF;
  margin-bottom: 0.5em;
  border-bottom: 1px solid rgba(0, 217, 255, 0.2);
  padding-bottom: 3px;
}

.description-text {
  font-size: 0.95em;
  line-height: 1.5;
}

.player-btn {
  background: transparent;
  border: none;
  color: #00D9FF;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.3s;
}

.player-btn:hover {
  background-color: rgba(0, 217, 255, 0.2);
  color: #E0F7FA;
}

.btn-read-more {
  background-color: rgba(0, 217, 255, 0.15);
  color: #00D9FF;
  border: 1px solid #00D9FF;
  border-radius: 8px;
  padding: 8px 20px;
  font-weight: bold;
}

.btn-read-more:hover {
  background-color: #00D9FF;
  color: #1C2B3A;
}

.btn-watch-now {
  background-color: #3A66FF;
  border-radius: 8px;
  padding: 8px 20px;
  color: #E0F7FA;
}

.btn-watch-now:hover {
  background-color: #5A86FF;
}
</style>