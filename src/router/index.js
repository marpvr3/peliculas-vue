import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Peliculas from "../views/Peliculas.vue"
import Favoritos from "../views/Favoritos.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/peliculas", component: Peliculas },
  { path: "/favoritos", component: Favoritos },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router