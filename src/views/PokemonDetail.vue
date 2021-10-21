<template>
  <section class="row">
    <div class="pokemon-wrapper">
      <div>
        <img class="" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + this.$route.params.id +'.png'">
      </div>
      <div class="detail">
        <div class="detail-name">
          <div class="detail-name-sprites">
            <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ this.$route.params.id +'.png'">
            <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + this.$route.params.id + '.png'">
            <p>No°{{ pokemonNumber }}</p>
          </div>
          <h1 class="no-margin">{{ pokemon.species.name }}</h1>
        </div>
        <div class="detail-description">
              <div class="type-container">
                <p>Type :</p>
                <p v-for="(type, index) in types" :key="index" :class="'type-item type-' + type.type.name"><img class="type-item-image" :src="getImgUrl(type.type.name)" /><span class="type-item-name">{{ type.type.name }}</span></p>
              </div>
              <p v-for="(stat, index) in stats" :key="index">{{ stat.stat.name }} : {{ stat.base_stat }}</p>
              <p v-for="(move, index) in pokemonMoves" :key="index">{{ move.move.name }}</p>
          </div>
        <div class="detail-description">
          <p>{{ pokemonDescriptionFirst }}</p>
          <p>{{ pokemonDescriptionSecond }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import axios from 'axios';

export default {
    data: () => ({
        pokemon: null,
        stats : [],
        types: [],
        pokemonDescriptionFirst: null,
        pokemonDescriptionSecond: null,
        pokemonNumber : null,
        pokemonMoves : [],
    }),
    methods: {
      getImgUrl(pic) {
        return require('../assets/icons/'+ pic +'.svg')
      }
    },
    created() {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
        .then((result) => {
            this.pokemon = result.data;
            //Get stats of pokemon
            this.stats = [];
            result.data.stats.forEach(stat => {
              this.stats.push(stat);
            });
            //Get types of pokemon
            this.types = [];
            result.data.types.forEach(type => {
              this.types.push(type);
            });
            this.pokemonMoves = result.data.moves;
            //fetch url to get new infos
            axios.get(this.pokemon.species.url)
            .then((data) => {
              this.pokemonDescriptionFirst = data.data.flavor_text_entries[14].flavor_text;
              this.pokemonDescriptionSecond = data.data.flavor_text_entries[15].flavor_text;
              this.pokemonNumber = data.data.pokedex_numbers[0].entry_number;
            })
        })
    }
}
</script>