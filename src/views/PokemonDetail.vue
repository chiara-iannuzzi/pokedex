<template>
<main :class="'main-detail type-' + types[0].type.name + '-gradient'">
  <section class="row">
    <div class="pokemon-wrapper">
      <div class="detail-image">
        <img class="" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + this.$route.params.id +'.png'">
      </div>
      <div class="detail">
        <div class="detail-name">
          <div :class="'detail-name-sprites type-' + types[0].type.name">
            <div class="detail-name-sprites-container-normal">
              <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ this.$route.params.id +'.png'">
              <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + this.$route.params.id + '.png'">
            </div>
            <div class="detail-name-sprites-container-shiny">
              <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'+ this.$route.params.id +'.png'">
              <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/' + this.$route.params.id + '.png'">
            </div>
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
            <stats :maxSize='maxSize' :size='stats[1]' :type="types[0].type.name"></stats>
            <p>Defense</p>
            <stats :maxSize='maxSize' :size='stats[2]' :type="types[0].type.name"></stats>
            <p>Special Attack</p>
            <stats :maxSize='maxSize' :size='stats[3]' :type="types[0].type.name"></stats>
            <p>Special Defense</p>
            <stats :maxSize='maxSize' :size='stats[4]' :type="types[0].type.name"></stats>
            <p>Speed</p>
            <stats :maxSize='maxSize' :size='stats[5]' :type="types[0].type.name"></stats>
          </div>
          <div class="tab-pane fade show active" id="desc" role="tabpanel" aria-labelledby="profile-tab">
            <p>{{ pokemonDescriptionFirst }}</p>
            <p>{{ pokemonDescriptionSecond }}</p>
            <div class="type-container">
              <p>Type :</p>
              <p v-for="(type, index) in types" :key="index" :class="'type-item type-' + type.type.name + ' type-' + type.type.name + '-shadow'"><img class="type-item-image" :src="getType(type.type.name)" />{{ type.type.name }}</p>
            </div>
            <p>Height : {{ pokemon.height / 10 }}m</p>
            <p>Weight : {{ pokemon.weight / 10 }}kg</p>
            <p>Shape : <img :src="getShape(this.pokemonShape)" ></p>
            <div class="d-flex"><p v-for="(ability, index) in abilities" :key="index">{{ ability }} |&nbsp;</p></div>
          </div>
          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div v-if="pokemonMoves.length">
              <moves :type="types[0].type.name" :moves="pokemonMoves" ></moves>
              <!-- <div class="d-flex justify-content-between" v-for="(move, index) in pokemonMoves" :key="index"><span>{{ move.move.name }}</span> <span>Learned at level {{ move.version_group_details[0].level_learned_at }}, by {{ move.version_group_details[0].move_learn_method.name }}</span></div> -->
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
import Stats from '../components/Stats/Stats.vue';
import Moves from '../components/Moves/Moves.vue'

export default {
  components : {
    Stats, Moves
  },
    data: () => ({
        pokemon: null,
        stats : [],
        types: [],
        pokemonDescriptionFirst: null,
        pokemonDescriptionSecond: null,
        pokemonNumber : null,
        pokemonMovesUrl : [],
        pokemonMoves : [],
        maxSize : null,
    }),
    methods: {
      getType(pic) {
        return require('../assets/icons/type/'+ pic +'.svg')
      },
      getShape(pic) {
        return require('../assets/icons/forms/'+ pic +'.png')
      }
    },
    created() {

        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
        .then((result) => {
            this.pokemon = result.data;

            console.log(this.pokemon);

            //Get Abilities
            this.abilities = [];
            this.pokemon.abilities.forEach(ability => {
              this.abilities.push(ability.ability.name);
            });

            //Get stats of pokemon
            this.stats = [];
            result.data.stats.forEach(stat => {
              this.stats.push(stat.base_stat);
            });
            this.maxSize = Math.max(...this.stats);

            //Get types of pokemon
            this.types = [];
            result.data.types.forEach(type => {
              this.types.push(type);
            });

            //Get moves of pokemon
            this.pokemonMovesUrl = result.data.moves;
            this.pokemonMovesUrl.forEach((move) => {
              let url = move.move.url;
              axios.get(url)
              .then((result) => {
                result.data.generation.name = result.data.generation.name.split('-')[1];
                this.pokemonMoves.push(result.data);
              })
            })

            //fetch url to get new infos in species
            axios.get(this.pokemon.species.url)
            .then((data) => {
              console.log( data.data);
              this.pokemonDescriptionFirst = data.data.flavor_text_entries[14].flavor_text;
              this.pokemonDescriptionSecond = data.data.flavor_text_entries[15].flavor_text;
              this.pokemonNumber = data.data.pokedex_numbers[0].entry_number;
              this.pokemonShape = data.data.shape.name;
              this.pokemonGrowth = data.data.growth_rate.name;
              this.pokemonRate = data.data.capture_rate;

              // const rate = this.pokemon.speciesDetails['GeR'];
              // switch (rate) {
              //   case -1:
              //     return '<span class="' + this.pokemon.color + '-text"' + '>Genderless <i class="fa fa-genderless"></i></span>';
              //   case 0:
              //     return '<span class="gender-male">100% <i class="fa fa-mars"></i></span>,<span class="gender-female"> 0% <i class="fa fa-venus"></i></span>';
              //   case 1:
              //     return '<span class="gender-male">87.5% <i class="fa fa-mars"></i></span>,<span class="gender-female">  12.5% <i class="fa fa-venus"></i></span>';
              //   case 2:
              //     return '<span class="gender-male">75% <i class="fa fa-mars"></i></span>,<span class="gender-female">  25% <i class="fa fa-venus"></i></span>';
              //   case 3:
              //     return '<span class="gender-male">62.5% <i class="fa fa-mars"></i></span>,<span class="gender-female">  37.5% <i class="fa fa-venus"></i></span>';
              //   case 4:
              //     return '<span class="gender-male">50% <i class="fa fa-mars"></i></span>,<span class="gender-female">  50% <i class="fa fa-venus"></i></span>';
              //   case 5:
              //     return '<span class="gender-male">37.5% <i class="fa fa-mars"></i></span>,<span class="gender-female">  62.5% <i class="fa fa-venus"></i></span>';
              //   case 6:
              //     return '<span class="gender-male">25% <i class="fa fa-mars"></i></span>,<span class="gender-female">  75% <i class="fa fa-venus"></i></span>';
              //   case 7:
              //     return '<span class="gender-male">12.5% <i class="fa fa-mars"></i></span>,<span class="gender-female">  87.5% <i class="fa fa-venus"></i></span>';
              //   case 8:
              //     return '<span class="gender-male">0% <i class="fa fa-mars"></i></span>,<span class="gender-female">  100% <i class="fa fa-venus"></i></span>';
              // }

              axios.get(data.data.evolution_chain.url)
              .then((data) => {
                console.log(data.data.chain);
                
              })

            })
        })
    }
}
</script>