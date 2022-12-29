<template>
<section class="row">
    <div class="pokemon-list">
        <div v-for="(pokemon, index) in pokemonsSort" :key="index" :class="'pokemon-list-wrapper'" :data-id=" pokemon.id">
            <a :class="'type-' + pokemon.types[0].type.name + '-gradient pokemon-list-item'" :href="'pokemon/' + pokemon.id">
            <vue-load-image>
                <template v-slot:image>
                    <img class="pokemon-list-item-img" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + pokemon.id +'.png'">
                </template>
                <template v-slot:preloader>
                    <img src="../assets/loader/loader.gif" />
                </template>
                <template v-slot:error>Image load fails</template>
            </vue-load-image>
            <span :class="'type-' + pokemon.types[0].type.name + '-color-darken'">{{ pokemon.name }}</span>
            </a>
        </div>
    </div>
    </section>
</template>

<script>

import axios from 'axios';
import VueLoadImage from 'vue-load-image'

export default {
  data: function() {
      return {
          pokemonsId : [],
          pokemons : [],
          pokemonsSort : []
      };
  },
  beforeMount() {
    let favorites = JSON.parse(localStorage.getItem('myFavorites'));
    this.pokemonsId.push(favorites);
    this.pokemonsId[0].forEach((element) => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${element}`)
        .then((result) => {
          this.pokemons.push(result.data)
        })
    })

    console.log(this.pokemons);
  },
  mounted(){

      setTimeout( () => {
          let comparison = 0;
    function compare( a, b ) {
        if ( a.id < b.id ){
            comparison = -1;
        }
        if ( a.id > b.id ){
            comparison = 1;
        }
        return comparison;
    }
    this.pokemonsSort = this.pokemons.sort( compare );
    console.log(this.pokemonsSort);
      }, 500)
  },
  components: {
        'vue-load-image': VueLoadImage
    },
    
}
</script>