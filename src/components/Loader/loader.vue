<template>
    <div v-if="!isLoaded">
        <img src="../assets/loader/loader.gif" />
    </div>
</template>

<script>

export default {
    data() {
        
    },
    props: ['type', 'size', 'maxSize', 'yo', 'isHp'],
    name : 'stats',
}

</script>