<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, watch } from 'vue'
import YoutubePlayer from 'youtube-player'
import { Point, Song } from '../services/types'
import interact from 'interactjs'
import { useMusicPlayer } from '../stores/musicplayer'
import { storeToRefs } from 'pinia'

const player = useMusicPlayer()
const { progress } = storeToRefs(player)

player.setSongs([
	{
		title: 'Little Dark Age (RMX)',
		author: 'MGMT',
		id: 'Djd4C64yYzU',
		duration: 158
	},
	{
		title: 'Resonance',
		author: 'Home',
		id: '8GW6sLrK40k',
		duration: 212
	},
	{
		title: 'Messages from the Stars',
		author: 'Rah Band',
		id: 'j_Di18kwjKk',
		duration: 255
	},
	{
		title: 'INVASION',
		author: 'borgawr',
		id: 'LSvoBvNVmT0',
		duration: 167
	}
] as Song[])

onMounted(() => {
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
	renderer.setClearColor(0x000000, 0)
	renderer.setSize(120, 120)
	document.querySelector('.player-animation')?.appendChild(renderer.domElement)
	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
	const lights = [new THREE.DirectionalLight(0xffffff, 10), new THREE.DirectionalLight(0xffffff, 10)]
	lights[0].position.set(0, 0, 1)
	lights[1].position.set(0, 0, -1)
	scene.add(...lights)
	const geometry = new THREE.IcosahedronGeometry(1.5, 2)
	const material = new THREE.MeshStandardMaterial({
		color: 0xe443de,
		roughness: 0,
		metalness: 0.9,
		wireframe: true
	})
	const object = new THREE.Mesh(geometry, material)
	scene.add(object)
	camera.position.z = 3

	function animate() {
		if (player.isPlaying) {
			object.rotation.x += 0.1
			object.rotation.y += 0.1
			document.querySelector('.player-animation')?.classList.add('playing')
		} else {
			object.rotation.x += 0.01
			object.rotation.y += 0.01
			document.querySelector('.player-animation')?.classList.remove('playing')
		}
		requestAnimationFrame(animate)
		renderer.render(scene, camera)
	}

	animate()
	attachKeybinds()

	player.setPlayer(
		YoutubePlayer('video-player', {
			width: 10,
			height: 10,
			playerVars: {
				autoplay: 0
			}
		})
	)
	player.initialize()

	interact('.musicplayer-wrapper').draggable({
		allowFrom: '.musicplayer-wrapper',
		listeners: {
			move(ev) {
				const pos: Point = { x: ev.dx, y: ev.dy }
				player.setPosition(pos)
				ev.target.style.transform = `translate(${player.position.x}px, ${player.position.y}px)`
			}
		}
	})
})

watch(progress, async (state) => {
	//@ts-ignore
	document.querySelector('.progress-bar-fill').style.width = `${state}%`
})

function attachKeybinds() {
	document.addEventListener('keydown', (ev: KeyboardEvent) => {
		if (ev.target && (ev.target as HTMLElement).tagName.toLowerCase() == 'textarea') return

		switch (ev.key) {
			case ' ':
				player.toggle()
				break
			case 'ArrowRight':
				player.next()
				break
			case 'ArrowLeft':
				player.previous()
				break
			default:
				return
		}
	})
}
</script>

<template>
	<div class="musicplayer-wrapper">
		<div class="player-wrapper">
			<div class="song-container">
				<div class="controls-container">
					<div class="song-info">
						<h2 id="title">{{ player.currentSong.title }}</h2>
						<h3 id="author">{{ player.currentSong.author }}</h3>
					</div>
					<div class="controls">
						<button>
							<v-icon @click="player.previous" name="fa-backward" :scale="1.2" />
						</button>
						<button>
							<v-icon
								id="play"
								@click="player.toggle()"
								name="fa-play"
								v-show="!player.isPlaying"
								:scale="1.2"
							/>
							<v-icon
								id="pause"
								@click="player.toggle()"
								name="fa-pause"
								v-show="player.isPlaying"
								:scale="1.2"
							/>
						</button>
						<button>
							<v-icon @click="player.next" name="fa-forward" :scale="1.2" />
						</button>
					</div>
				</div>
				<div class="player-animation"></div>
			</div>
			<div class="time">
				<span id="timeElapsed">{{ player.timeElapsedToString }}</span>
				<div class="progress-bar">
					<div class="progress-bar-fill"></div>
				</div>
				<span id="timeTotal">{{ player.durationToString }}</span>
			</div>
			<div id="video-player"></div>
		</div>
		<div class="keybinds">
			<ul class="keys">
				<li>
					[Space] <br />
					<v-icon name="fa-play" scale="0.9" /> /
					<v-icon name="fa-pause" scale="0.9" />
				</li>
				<li>
					[←]
					<br />
					<v-icon name="fa-backward" />
				</li>
				<li>
					[→]
					<br />
					<v-icon name="fa-forward" />
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.musicplayer-wrapper {
	position: absolute;
	display: flex;
	bottom: 1rem;
	left: 1rem;
}

.player-wrapper {
	background: url('../assets/images/musicplayer-background.webp') no-repeat;
	background-size: cover;
	width: 20rem;
	height: 10rem;
	color: #fff;
	font-size: 1rem;
	font-weight: 700;
	border-radius: 5px;
	border: 3px solid #e443de;
	opacity: 0.95;
	padding: 5px;
	overflow: hidden;
}

.controls-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: left;
}

.controls {
	width: max-content;
	text-align: center;
	background: #e443de40;
	border-radius: 5px;
	padding: 0.3rem;
}

.controls button {
	border: none;
	background: transparent;
	border-radius: 5px;
	color: #fff;
	font-size: 1.3rem;
	cursor: pointer;
}

.controls button:hover {
	transform: scale(1.1);
	color: #e443de;
	transition: 0.3s;
}

.player-animation {
	width: 150px;
	height: 120px;
	border-radius: 10px;
	filter: drop-shadow(0 0 1px #5900ff);
}

.playing {
	animation: pulse 0.8s linear infinite;
}

.song-info {
	width: 100%;
	height: 60%;
	filter: drop-shadow(0 0 2px #000);
	border-radius: 5px;
}

.song-info h1,
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

#title {
	color: #e443de;
	font-size: 1.3rem;
}

#author {
	color: #fff;
}

.song-container {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.time {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin: auto;
	font-size: 1.2rem;
	transition: 0.3s;
}

.progress-bar {
	width: 100%;
	height: 0.5rem;
	background: #e443de;
	margin: 1rem;
	border-radius: 5px;
}

.progress-bar-fill {
	transition: 0.3s;
	width: 0%;
	height: 100%;
	background: #5900ff;
	box-shadow: 0 0 5px 1px #5900ff;
	border-radius: 5px;
}

.keybinds {
	margin-left: 10px;
	padding: 5px;
	text-align: center;
	width: 15%;
	height: 100%;
	background: #0005;
	border-radius: 8px;
	backdrop-filter: blur(3px);
}

.keys {
	padding: 0;
	list-style-type: none;
	font-size: 1.1rem;
}

.keys li {
	margin: 5px;
}

@keyframes pulse {
	0% {
		transform: scale(0.9);
	}

	50% {
		transform: scale(1.1);
	}

	100% {
		transform: scale(0.9);
	}
}

@media screen and (max-width: 1300px) {
	.musicplayer-wrapper {
		transform: scale(0.9);
		left: 0;
		bottom: 0;
	}
}

@media screen and (max-width: 800px) {
	.musicplayer-wrapper {
		display: none;
	}
}
</style>
