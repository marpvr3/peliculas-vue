<template>
  <header class="main-header">
    <nav class="navbar navbar-expand-lg navbar-dark px-3">

      <router-link to="/" class="navbar-brand logo">Movie love</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
        aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/peliculas" class="nav-link">Películas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/favoritos" class="nav-link">Favoritos</router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center mt-3 mt-lg-0">
          <div class="search-bar d-flex align-items-center">
            <input 
              type="text"
              placeholder="Search movie"
              v-model="search"
              @keyup.enter="buscar"
            >
            <i class="bi bi-search search-icon" @click="buscar"></i>
          </div>
        </div>

      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return { search: "" };
  },
  methods: {
    buscar() {
      this.$emit("buscar", this.search);
      this.$router.push(`/peliculas?search=${this.search}`);
    }
  }
}
</script>

<style scoped>
.main-header {
  padding: 10px 5%;
  position: absolute;
  width: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  color: #f7a900 ;
}

.nav-link {
  color: #E0F7FA ;
  opacity: 0.8;
  padding-bottom: 5px;
  transition: 0.3s;
}

.nav-link.active {
  opacity: 1;
  font-weight: bold;
  border-bottom: 3px solid #f7a900;
}

.nav-link:hover {
  color: #f7a900 !important;
  opacity: 1;
}

.search-bar {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 5px 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 180px;
}

.search-bar input {
  background: transparent;
  border: none;
  color: white;
  padding: 5px;
  outline: none;
  flex-grow: 1;
  font-size: 0.9em;
}

.search-icon {
  color: rgba(255, 255, 255, 0.7);
  margin-left: 5px;
  cursor: pointer;
  font-size: 1em;
}

.navbar-dark .navbar-toggler-icon {
  filter: invert(1);
}
</style>