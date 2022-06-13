<template>
  <section class="row">
    <div class="pokemon-list">
        <a :href="'pokemon/' + pokemon.id" class="pokemon-list-item" v-for="(pokemon, index) in pokemons" :key="index">
            <vue-load-image>
                <template v-slot:image>
                    <img class="pokemon-list-item-img" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + pokemon.id +'.png'">
                </template>
                <template v-slot:preloader>
                    <img src="../assets/loader/loader.gif" />
                </template>
                <template v-slot:error>Image load fails</template>
            </vue-load-image>
            {{ pokemon.name }}
        </a>
    </div>
    </section>
</template>

<script>
import axios from 'axios';
import VueLoadImage from 'vue-load-image'

export default {
    data: () => ({
        pokemons: [],
    }),
    created() {
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=50`)
        .then((result) => {
            this.pokemons = [] ;
            result.data.results.forEach(pokemon => {
              pokemon.id = pokemon.url.split('/').filter(function(part) { return !!part }).pop();
              this.pokemons.push(pokemon);
            });
        })
    },
    components: {
        'vue-load-image': VueLoadImage
    },
}
</script>