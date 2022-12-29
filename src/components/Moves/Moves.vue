<template>
    <div class="moves-container">
        <div :class="'type-' + type + '-darken moves-title'">
            <div class="moves-name">Name</div>
            <div class="moves-type">Type</div>
            <div class="moves-category">Category</div>
            <div class="moves-power">Power</div>
            <div class="moves-pp">PP</div>
            <div class="moves-accuracy">Accuracy</div>
            <div class="moves-priority">Priority</div>
            <div class="moves-generation">Generation</div>
        </div>
        <div class="moves-wrapper">
            <div :class="'type-' + type + '-lighten moves-item'" v-for="(move, index) in moves" :key="index">
                <div class="moves-name">{{ move.name }}</div>
                <div class="moves-type"><span :class="'type-item type-' + move.type.name + '-shadow type-' + move.type.name"><img class="type-item-image" :src="getType(move.type.name)" /></span></div>
                <div class="moves-category"><img class="type-item-image" :src="getCategory(move.damage_class.name)" /></div>
                <div class="moves-power">{{ move.power }}</div>
                <div class="moves-pp">{{ move.pp }}</div>
                <div class="moves-accuracy">{{ move.accuracy }}</div>
                <div class="moves-priority">{{ move.priority }}</div>
                <div class="moves-generation">{{ move.generation.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
       
    },
    methods: {
      getType(pic) {
        return require('../../assets/icons/type/'+ pic +'.svg')
      },
       getCategory(pic) {
        return require('../../assets/icons/attack-category/'+ pic +'.png')
      },
    },
    props: ['moves', 'type'],
    name : 'moves',
}

</script>