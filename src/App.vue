<script setup lang="ts">
//@ts-ignore
import VueMatrixRaindrop from 'vue-matrix-digit-rain'
import ShakeDetector from 'shake-detector'
import Navbar from './components/Navbar.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import Terminal from './components/Terminal.vue'
import RetrowaveScene from './components/RetrowaveScene.vue'
import { onBeforeMount, ref } from 'vue'
import { useGlobal } from './stores/global'
const global = useGlobal()
const refresher = ref(0)

new ShakeDetector({
	threshold: 5,
	debounceDelay: 800
})
	.confirmPermissionGranted()
	.subscribe(() => {
		if (global.isHacked) {
			;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '0'

			setTimeout(() => {
				;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'none'
			}, 1000)

			global.setHack(false)
		} else {
			;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'block'
			setTimeout(() => {
				;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '.5'
			}, 100)

			global.setHack(true)
		}
	})
	.start()

document.addEventListener('DOMContentLoaded', () => {
	window.retrowave.prepareScene(false, true)
})

onBeforeMount(() => {
	adjustSize()
})

window.addEventListener('resize', adjustSize)

let viewportSize = {
	width: window.innerWidth,
	height: window.innerHeight
}

function adjustSize() {
	viewportSize.width = window.innerWidth
	viewportSize.height = window.innerHeight
	refresher.value++
	if (global.isHacked) {
		;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'block'
		setTimeout(() => {
			;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '.5'
		}, 100)
	}
}
</script>

<template>
	<Navbar />
	<transition name="slide">
		<router-view v-slot="{ Component, route }">
			<component :key="route" :is="Component" />
		</router-view>
	</transition>
	<MusicPlayer />
	<Terminal />
	<VueMatrixRaindrop
		class="matrix"
		:key="refresher"
		:backgroundColor="'rgba(0,0,0,0.1)'"
		:fontFamily="'Hack'"
		:speed="2"
		:canvasWidth="viewportSize.width"
		:canvasHeight="viewportSize.height"
		:textColor="'#e443de'"
		:textContent="'ァィゥェォカキクケコサシスセソタチツテトナニヌネノパビピプペポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ'"
	/>
	<RetrowaveScene />
</template>

<style>
@import 'https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap';

* {
	font-family: 'Play', sans-serif;
}

body {
	margin: 0;
	padding: 0;
	background-color: #01001e;
	color: #fff;
	cursor: url('@/assets/images/cursor.webp'), auto;
	overflow: hidden;
}

::-webkit-scrollbar {
	width: 5px;
}

::-webkit-scrollbar-track {
	background: transparent;
}

::-webkit-scrollbar-thumb {
	background: #e443de;
	border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
	background: #5900ff;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
	margin-inline-start: 0;
	margin-inline-end: 0;
	padding-inline-start: 0;
	padding-inline-end: 0;
}

#vue-matrix-raindrop {
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	z-index: -1;
	transition: 1s;
}

#retrowaveScene {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -2;
	opacity: 0.9;
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.25s;
}

.slide-enter-from {
	transform: scale(0%);
}

.slide-enter-to {
	transform: scale(100%);
}

.slide-leave-from {
	transform: scale(100%);
}

.slide-leave-to {
	transform: scale(0%);
}

/* prevent laptop scaling */

@media (-webkit-device-pixel-ratio: 1.25) {
	* {
		zoom: 0.8;
	}
}
</style>
