<script setup lang="ts">
import GlitchedWriter from 'vue-glitched-writer'
import profilePicture from '../assets/images/vapor.webp'

const subtitles: string[] = [
	'Fullstack Developer',
	'Arch Linux User',
	'TypeScript Lover',
	'Terminal Elitist',
	'Coffee Abuser',
	'Open Source Enthusiast'
]
</script>

<template>
	<div class="home-wrapper">
		<div class="mainpanel-wrapper">
			<div class="romboid"></div>
			<img :src="profilePicture"/>
			<div class="name-container">
				<h1>iQuick</h1>
				<glitched-writer
					class="subtitle"
					:text="subtitles"
					:queue="{ interval: 3000, loop: true }"
					:options="{ letterize: true, delay: [50, 100] }"
					appear
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.home-wrapper {
	width: 100%;
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.mainpanel-wrapper {
	position: relative;
	width: 15rem;
	height: 15rem;
	font-weight: 700;
	border: none;
	padding: 5rem;
	text-align: center;
	font-size: 1.4rem;
}

.romboid {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 90%;
	height: 90%;
	transform: translate(-50%, -50%) rotate(45deg);
	border: 4px solid #e443de;
	border-radius: 10px;
}

.name-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #e443de;
	filter: drop-shadow(0 0 2px #000);
}

.subtitle {
	font-size: 1.5rem;
}

.name-container * {
	margin: 0.5rem;
}

img {
	margin-top: -15%;
	width: 75%;
	height: 75%;
	object-fit: cover;
	user-select: none;
	filter: drop-shadow(0 0 5px #637fef);
	transition: all .3s;
	animation: pic-animation 4s linear infinite;
}

@keyframes pic-animation {
	0% {
		filter: drop-shadow(0 0 5px #637fef);
	}

	50% {
		filter: drop-shadow(-8px 0px 5px #DA56CB) drop-shadow(8px 0px 5px #1AFAEF);
	}

	60% {
		filter: drop-shadow(0 0 5px #637fef);
	}

	70% {
		filter: drop-shadow(-8px 0px 5px #DA56CB) drop-shadow(8px 0px 5px #1AFAEF);
	}

	80% {
		filter: drop-shadow(0 0 5px #637fef);
	}
}

@media screen and (max-width: 600px) {
	.romboid {
		display: none;
	}
}
</style>
