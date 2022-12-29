<template>
    <div :class="'stats-container type-' + type + '-lighten'" >
        <div :class="'stats-item type-' + type" :style="{width: percentageSize + '%'}"></div>
    </div>
</template>

<script>

export default {
    data() {
        let dataSize = (2 * this.size) * 0.9 + 5;
        console.log(this.size);
        console.log(dataSize);
        let percentageSize = 100 / this.maxSize * this.size;
        console.log(percentageSize);
        return {
            percentageSize
        }
    },
    props: ['type', 'size', 'maxSize', 'yo', 'isHp'],
    name : 'stats',
}

</script>