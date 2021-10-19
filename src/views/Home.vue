<template>
  <section class="row">
    <div class="pokemon-list">
        <a :href="'pokemon/' + pokemon.id" class="pokemon-list-item" v-for="(pokemon, index) in pokemons" :key="index">
            <img class="pokemon-list-item-img" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + pokemon.id +'.png'">
            {{ pokemon.name }}
        </a>
    </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        pokemons: [],
    }),
    created() {
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000`)
        .then((result) => {
            this.pokemons = [] ;
            result.data.results.forEach(pokemon => {
              pokemon.id = pokemon.url.split('/').filter(function(part) { return !!part }).pop();
              console.log(pokemon)
              this.pokemons.push(pokemon);
            });
        })
    }
}
</script>