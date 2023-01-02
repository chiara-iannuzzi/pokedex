<template>
    <div class="loader-wrapper" v-bind:class=" { 'is-visible' : isLoading }"></div>
    <div class="loader" v-bind:class=" { 'is-visible' : isLoading }">
        <p>loading...</p>
    </div>
</template>

<script>

export default {
    data() {
        
    },
    props: ['isLoading'],
    name : 'Loader',
}

</script>