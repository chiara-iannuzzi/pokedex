<template>
  <section class="row">
    <div class="pokemon-list">
        <div v-for="(pokemon, index) in pokemons" :key="index" :class="'pokemon-list-wrapper'" :data-id=" pokemon.id">
            <p class="pokemon-list-favorite">    <Heart/></p>
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
    <div v-if="!finished">
        <img src="../assets/loader/loader.gif" />
    </div>
</template>

<script>
import axios from 'axios';
import VueLoadImage from 'vue-load-image';
import Heart from '../components/Heart/heart.vue';

export default {
    data: function() {
        return {
            pokemonsId : [],
            pokemons: [],
            count : 21,
            promises : [],
            promisesId : [],
            favorites : [],
            finished : false,
        };
    },

    methods:{

        getFavorites(favorites, addButton){
                addButton.forEach((element) => {
                    if(favorites.indexOf(element.parentElement.getAttribute('data-id')) !== -1) {
                        element.classList.add("is-favorite");
                    }
                    element.addEventListener('click', function() {
                        console.log(element)
                        if(favorites.indexOf(element.parentElement.getAttribute('data-id')) === -1) {
                            favorites.push(element.parentElement.getAttribute('data-id'));
                            localStorage.setItem('myFavorites', JSON.stringify(favorites));
                            element.classList.add('is-favorite')
                        }
                        else{
                            favorites.splice(favorites.indexOf(element.parentElement.getAttribute('data-id')), 1);
                            localStorage.setItem('myFavorites', JSON.stringify(favorites));
                            element.classList.remove('is-favorite')
                        }
                    })
            })
            
        },

        getId : async(i) => {
            const request = axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${i}`)
            request
            .then((result) => {
               result.data
            })
            return await request
        },

        getData : async(i) => {
            const request = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            request
            .then((result) => {
               result.data
            })
            .catch(() => {
                console.clear
            })
            return request
        },

        getInitialPokemon() {

            let i = 1;
            if (localStorage.getItem('pokemonsArray') !== null) {
                this.count = parseInt(localStorage.getItem("pokemonsArray"));
            }
            let total = this.count
            while (i < total) {
                this.promises.push(this.getData(i));
                i++;
            }
            let promisesId = []
            let u = 0;
            while (u < 1126) {
                promisesId.push(this.getId(u));
                u++;
            }
            Promise.all(promisesId).then((values) => {
                values.forEach((data) => {
                    const id = data.data.results[0].url.split('/').filter(function(part) { return !!part }).pop();
                    this.pokemonsId.push(id);
                })
            });

            Promise.all(this.promises).then((values) => {
                values.forEach((data) => {
                    this.pokemons.push(data.data);
                })
            });

            setTimeout(() => {
                let favorites = localStorage.getItem('myFavorites') ? JSON.parse(localStorage.getItem('myFavorites')) : [];
                let addToFavorites = document.querySelectorAll(".pokemon-list-favorite");
                this.getFavorites(favorites, addToFavorites);
            }, 1000)
            
        },

        getNextPokemon() {
            window.onscroll = () => {
                let bottomOfWindow = (window.innerHeight + window.scrollY) >= document.body.offsetHeight -1;
                if (bottomOfWindow) {
                    let total = this.count + 20
                    let i = this.count;

                    while (i < total && i<=899 ) {
                        this.promises.push(this.getData(this.pokemonsId[i - 1]));
                        i++;
                        if (i === 899){
                            this.finished = true;
                            break;
                        }
                    }
                    if(i<=899){
                        Promise.all(this.promises).then((values) => {
                            values.forEach((data) => {
                                if (data.data.id > i - 21 && i <= 881){
                                    this.pokemons.push(data.data);
                                }
                                else if (data.data.id > i - 19){
                                    this.pokemons.push(data.data);
                                }
                            })
                        });
                    }
                        if(i > 861){
                            localStorage.setItem('pokemonsArray', 861);
                        }
                        else{
                            localStorage.setItem('pokemonsArray', i);
                        }
                        
                    // else{
                    //     if ( i > parseInt(localStorage.getItem('pokemonsArray'))){
                    //         if(i > 861){
                    //             console.log('stopping');
                    //             localStorage.setItem('pokemonsArray', 861);
                    //         }
                    //         else{
                    //             localStorage.setItem('pokemonsArray', i)
                    //             console.log('keep adding i')
                    //         }
                            
                    //     }
                    // }
                    
                    this.count = this.count + 20

                    setTimeout(() => {
                        let favorites = localStorage.getItem('myFavorites') ? JSON.parse(localStorage.getItem('myFavorites')) : [];
                        let addToFavorites = document.querySelectorAll(".pokemon-list-favorite");
                        this.getFavorites(favorites, addToFavorites);
                    }, 500)
                }
            }
        }
    },
    
    beforeMount() {
        this.getInitialPokemon();
    },
    mounted() {
        this.getNextPokemon();
    },
    components: {
        'vue-load-image': VueLoadImage,
        Heart
    },
}
</script>