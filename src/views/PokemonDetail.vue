<template>
  <div class="detail">
    <h1>{{ $route.params.id }}</h1>
    <p>{{ pokemon.species.name }}</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    data: () => ({
        pokemon: null
    }),
    created() {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
        .then((result) => {
            this.pokemon = result.data;
        })
    }
}
</script>