<template>
    <div class="stats-container">
        <div :class="'stats-item type-' + type" :style="{width: percentageSize + '%'}"></div>
    </div>
</template>

<script>

export default {
    data() {
        let dataSize = (2 * this.size) * 0.9 + 5;
        console.log(this.size);
        console.log(dataSize);
        let percentageSize = (this.size/dataSize) * 100;
        console.log(percentageSize);
        return {
            percentageSize
        }
    },
    props: ['type', 'size', 'isHp'],
    name : 'stats',
}

</script>