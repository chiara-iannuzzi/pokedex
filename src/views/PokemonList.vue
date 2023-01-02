<template>
    <Loader :isLoading="loading"></Loader>
    <main class="background-pokeball">
        <section class="row">
            <div class="input">
                <input :disabled="loading" @input="debounceMethod" v-model="search" placeholder="search..."/>
            </div>
            <div class="pokemon-list">
                <div v-for="(pokemon, index) in pokemons" :key="index" :class="'pokemon-list-wrapper'" :data-id=" pokemon.id">
                    <p class="pokemon-list-favorite"><Heart/></p>
                    <Card v-if="pokemon" :type="pokemon.types[0].type.name" :id="pokemon.id" :name="pokemon.name"/>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import axios from 'axios';
import Heart from '../components/Heart/heart.vue';
import Card from '../components/Card/Card.vue';
import Loader from '../components/Loader/loader.vue';
import _ from 'lodash'

export default {
    data: () => {
        return {
            pokemonsId : [],
            pokemons: [],
            allPokemons : [],
            count : 21,
            promises : [],
            promisesId : [],
            favorites : [],
            finished : false,
            loading : false,
            searching : false,
        };
    },

    methods:{

        getId : async(i) => {
            const request = axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${i}`)
            request
            .then((result) => {
               result.data
            })
            return await request
        },

        getAllPokemon : async() => {
            const request = axios.get('https://pokeapi.co/api/v2/pokemon?limit=899&offset=0')
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

        filteredList (array, value) {
            return array.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(value.toLowerCase())
            );
        },

        debounceMethod: _.debounce(async function(e) { 
            this.allPokemons = []
            this.pokemons = []
            this.pokemonsId = []
            this.promises = []
            this.promisesId = []
            if(e.target.value === ''){
                this.getInitialPokemon()
                this.searching = false
            }
            else{
                try{
                    this.searching = true
                    let i = 1;
                    let promise = [];
                    let promiseId = []
                    let u = 0;
                    this.loading = true
                    while (i < 899) {
                        promise.push(this.getData(i));
                        i++;
                    }
                    while (u < 899) {
                        promiseId.push(this.getId(u));
                        u++;
                    }
                    await Promise.all(promiseId).then((values) => {
                        values.forEach((data) => {
                            const id = data.data.results[0].url.split('/').filter(function(part) { return !!part }).pop();
                            this.pokemonsId.push(id);
                        })
                    });

                    await Promise.all(promise).then((values) => {
                        values.forEach((data) => {
                            this.allPokemons.push(data.data)
                        })
                    });
                    this.pokemons = await this.filteredList(this.allPokemons, e.target.value)
                }
                catch(e){
                    console.log(e)
                }
                finally{
                    this.loading = false
                    setTimeout( function() {
                        this.displayFavorite()
                    }.bind(this),10)
                }
            }
        }, 400),

        getFavorites(favorites, addButton){
            addButton.forEach((element) => {
                if(favorites.indexOf(element.parentElement.getAttribute('data-id')) !== -1) {
                    element.classList.add("is-favorite");
                }
                else{
                    element.classList.remove("is-favorite");
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

        displayFavorite(){
            let favorites = localStorage.getItem('myFavorites') ? JSON.parse(localStorage.getItem('myFavorites')) : [];
            let addToFavorites = document.querySelectorAll(".pokemon-list-favorite");
            this.getFavorites(favorites, addToFavorites);
        },

        async getInitialPokemon() {
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
            try{
                this.isLoading = true
                console.log(this.isLoading)
                await Promise.all(promisesId).then((values) => {
                values.forEach((data) => {
                    const id = data.data.results[0].url.split('/').filter(function(part) { return !!part }).pop();
                    this.pokemonsId.push(id);
                })
            });

            await Promise.all(this.promises).then((values) => {
                values.forEach((data) => {
                    this.pokemons.push(data.data);
                })
            });
            }
            catch(e){
                console.log(e)
            }
            finally{
                this.isLoading = false
            }

            this.displayFavorite();
        },

        async getNextPokemon() {
            window.onscroll = async() => {
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
                        try{
                            this.loading = true
                            document.body.classList.add('no-overflow')
                            await Promise.all(this.promises).then((values) => {
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
                        catch(e){
                            console.log(e)
                        }
                        finally{
                            this.loading = false
                            document.body.classList.remove('no-overflow')
                        }
                    }
                        if(i > 861){
                            localStorage.setItem('pokemonsArray', 861);
                        }
                        else{
                            localStorage.setItem('pokemonsArray', i);
                        }
                    
                    this.count = this.count + 20
                    this.displayFavorite()
                }
            }
        }
    },
    
    beforeMount() {
        this.getInitialPokemon();
    },
    mounted() {
        if(!this.searching){
            this.getNextPokemon();
        }
        
    },
    components: {
        Heart,
        Card,
        Loader
    },
}
</script>