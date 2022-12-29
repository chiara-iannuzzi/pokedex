import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokedex',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonList.vue')
  },
  {
    path: '/pokemon/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonDetail.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import(/* webpackChunkName: "about" */ '../views/Favorites.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
