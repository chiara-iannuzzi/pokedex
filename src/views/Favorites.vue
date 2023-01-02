<template>
<section class="row">
    <div v-if="pokemonsSort.length" class="pokemon-list">
        <div v-for="(pokemon, index) in pokemonsSort" :key="index" :class="'pokemon-list-wrapper'" :data-id=" pokemon.id">
            <Card v-if="pokemon" :type="pokemon.types[0].type.name" :id="pokemon.id" :name="pokemon.name"/>
        </div>
    </div>
    <div v-else class="pokemon-list-empty">
        <p>No pokemon found in your favorites !</p>
        <p>Go back to the pokedex and click on the ❤️ to add a pokemon to your favorites</p>
    </div>
    </section>
</template>

<script>

import axios from 'axios';
import Card from '../components/Card/Card.vue'

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
    if(this.pokemonsId.length){
        this.pokemonsId[0].forEach((element) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${element}`)
            .then((result) => {
            this.pokemons.push(result.data)
            })
        })
    }
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
        Card
    },
    
}
</script>