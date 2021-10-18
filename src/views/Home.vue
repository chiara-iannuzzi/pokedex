<template>
  <section>
    <ul class="lists">
        <li v-for="(pokemon, index) in pokemons" :key="index">{{ pokemon.name }}<img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + pokemon.id +'.png'"><a :href="'pokemon/' + pokemon.id">Voir le pokemon</a></li>
      </ul>
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
            this.pokemons = result.data.results;
            console.log(result.data.results);
            result.data.results.forEach(pokemon => {
              pokemon.id = pokemon.url.split('/')
                .filter(function(part) { return !!part }).pop();
              this.pokemons.push(pokemon);
            });
        })
    }
}
</script>