import { defineStore } from 'pinia'
import { MusicPlayer, Point, Song } from '../services/types'
import { YouTubePlayer } from 'youtube-player/dist/types'

export const useMusicPlayer = defineStore('musicplayer', {
	state: () =>
		({
			player: null,
			isPlaying: false,
			index: 0,
			timeElapsed: 0,
			songs: [],
			position: {
				x: 0,
				y: 0
			},
			timeCounter: undefined
		} as MusicPlayer),
	actions: {
		toggle() {
			if (this.isPlaying) {
				this.player?.pauseVideo()
				this.stopTimeCounter()
			} else {
				this.player?.playVideo()
				this.startTimeCounter()
			}
			this.isPlaying = !this.isPlaying
		},
		next() {
			if (this.index < this.songs.length - 1) this.index++
			else this.resetIndex()

			this.loadSong()
		},
		previous() {
			if (this.index > 0) this.index--
			else this.setIndex(this.songs.length - 1)

			this.loadSong()
		},
		setSongs(songs: Song[]) {
			this.songs = songs
		},
		setPosition(position: Point) {
			this.position.x += position.x
			this.position.y += position.y
		},
		setIndex(index: number) {
			this.index = index
		},
		resetTime() {
			this.timeElapsed = 0
		},
		setTime(time: number) {
			this.timeElapsed = time
		},
		addToTime(seconds: number) {
			this.timeElapsed += seconds
		},
		resetIndex() {
			this.index = 0
		},
		setPlayer(player: YouTubePlayer) {
			this.player = player
		},
		initialize() {
			this.player?.loadVideoById(this.currentSong.id, 0, '144p')
			this.player?.pauseVideo()
		},
		loadSong() {
			this.resetTime()
			this.player?.loadVideoById(this.currentSong.id)
			if (!this.isPlaying) this.player?.pauseVideo()
		},
		startTimeCounter() {
			this.timeCounter = setInterval(() => {
				this.addToTime(1)
				if (this.progress == 100) this.next()
			}, 1000)
		},
		stopTimeCounter() {
			window.clearInterval(this.timeCounter)
		}
	},
	getters: {
		currentSong: (state) => state.songs[state.index],
		durationToString: (state) =>
			new Date(state.songs[state.index].duration * 1000).toISOString().substring(14, 19).toString(),
		timeElapsedToString: (state) => new Date(state.timeElapsed * 1000).toISOString().substring(14, 19).toString(),
		progress: (state) => {
			let percentage = (state.timeElapsed / state.songs[state.index].duration) * 100
			if (percentage > 100) percentage = 100

			return percentage
		}
	}
})
