<template>
<main :class="'main-detail type-' + types[0].type.name + '-lighten'">
  <section class="row" :style="{ backgroundImage: 'url(' + require('@/assets/bg/pokeball.svg') + ')' }">
    <div class="pokemon-wrapper">
      <div>
        <img class="" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + this.$route.params.id +'.png'">
      </div>
      <div class="detail">
        <div class="detail-name">
          <div :class="'detail-name-sprites type-' + types[0].type.name">
            <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ this.$route.params.id +'.png'">
            <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + this.$route.params.id + '.png'">
            <p>No°{{ pokemonNumber }}</p>
          </div>
          <h1 class="no-margin">{{ pokemon.species.name }}</h1>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button :class="'active nav-link type-' + types[0].type.name + '-color-darken'" id="home-tab" data-bs-toggle="tab" data-bs-target="#desc" type="button" role="tab" aria-controls="desc" aria-selected="true">Description</button>
          </li>
          <li class="nav-item" role="presentation">
            <button :class="'nav-link type-' + types[0].type.name + '-color-darken'" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="false">Stats</button>
          </li>
          <li class="nav-item" role="presentation">
            <button :class="'nav-link type-' + types[0].type.name + '-color-darken'" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Moves</button>
          </li>
          <li class="nav-item" role="presentation">
            <button :class="'nav-link type-' + types[0].type.name + '-color-darken'" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Evolution</button>
          </li>
        </ul>
        <div class="detail-description tab-content" id="myTabContent">
          <div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
            <p>HP</p>
            <p>Attack</p>
            <stats :size='stats[1].base_stat' :type="types[0].type.name"></stats>
            <p>Defense</p>
            <stats :size='stats[2].base_stat' :type="types[0].type.name"></stats>
            <p>Special Attack</p>
            <stats :size='stats[3].base_stat' :type="types[0].type.name"></stats>
            <p>Special Defense</p>
            <stats :size='stats[4].base_stat' :type="types[0].type.name"></stats>
            <p>Speed</p>
            <stats :size='stats[5].base_stat' :type="types[0].type.name"></stats>
          </div>
          <div class="tab-pane fade show active" id="desc" role="tabpanel" aria-labelledby="profile-tab">
            <p>{{ pokemonDescriptionFirst }}</p>
            <p>{{ pokemonDescriptionSecond }}</p>
            <div class="type-container">
              <p>Type :</p>
              <p v-for="(type, index) in types" :key="index" :class="'type-item type-' + type.type.name"><img class="type-item-image" :src="getImgUrl(type.type.name)" /><span class="type-item-name">{{ type.type.name }}</span></p>
            </div>
            <p>Height : {{ pokemon.height / 10 }}m</p>
            <p>Weight : {{ pokemon.weight / 10 }}kg</p>
          </div>
          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div v-if="pokemonMoves.length">
              <div class="d-flex justify-content-between" v-for="(move, index) in pokemonMoves" :key="index"><span>{{ move.move.name }}</span> <span>Learned at level {{ move.version_group_details[0].level_learned_at }}, by {{ move.version_group_details[0].move_learn_method.name }}</span></div>
            </div>
            <div v-else>
              <p>No moves registered, sorry ! Let's wait for an update :)</p>
            </div>
          </div>
          <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">tab13</div>
        </div>
      </div>
    </div>
  </section>
  </main>
</template>

<script>

import axios from 'axios';
import Stats from './../components/Stats.vue'

export default {
  components : {
    Stats
  },
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