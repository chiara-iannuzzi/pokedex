<template>
<svg class="heart-svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 471.7 471.7" style="enable-background:new 0 0 471.7 471.7;" xml:space="preserve">
<g>
	<path d="M433.6,64.3c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3L236,77.3l-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4
		c-34.8,0-67.6,13.6-92.2,38.2C13.5,88.7-0.1,121.5,0,156.4c0,34.9,13.7,67.6,38.4,92.3l187.8,187.8c2.6,2.6,6.1,4,9.5,4
		s6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4C471.8,121.8,458.3,89,433.6,64.3z"/>
</g>
</svg>
</template>

<script>
export default {
   name: 'Heart'
}
</script>

<style scoped>
.heart-svg path{
	transition : .3s ease all;
}
.is-favorite path{
    fill : #fb3b1e;
}
</style>