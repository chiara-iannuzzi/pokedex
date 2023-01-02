<template>
    <a :class="'type-' + type + '-gradient with-hover pokemon-list-item'" :href="'pokemon/' + id">
        <vue-load-image>
            <template v-slot:image>
                <img class="pokemon-list-item-img" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + id +'.png'">
            </template>
            <template v-slot:preloader>
                <img src="../../assets/loader/loader.gif" />
            </template>
            <template v-slot:error>Image load fails</template>
        </vue-load-image>
        <span :class="'type-' + type + '-color-darken'">{{ name }}</span>
    </a>
</template>

<script>

import VueLoadImage from 'vue-load-image';

export default {
    props: ['type', 'id', 'name'],
    name : 'Card',
    components: {
        'vue-load-image': VueLoadImage,
    },
}


</script>