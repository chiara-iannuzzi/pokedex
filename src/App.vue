<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/pokedex">Pokedex</router-link>
    <router-link to="/favorites">Favorites</router-link>
  </div>
  <router-view v-slot="{ Component }">
        <component :is="Component"></component>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  position : fixed;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.route-enter-from{
  opacity : 0;
}
.route-enter-active{
  opacity : 1;
}
.route-leave-to{
  opacity : 0;
}
.route-leave-active{
  transition: .3s ease all;
}
</style>
