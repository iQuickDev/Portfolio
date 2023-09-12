import { YouTubePlayer } from 'youtube-player/dist/types'

export type Command = {
	name: string
	description: string
	usage: string
	execute: (args: string[]) => void
}

export type Point = {
	x: number
	y: number
}

export type TerminalData = {
	username: string
	hostname: string
	shellprompt: string
	currentLine: string
	isVisible: boolean
	history: string[]
	selectedHistoryIndex: number
	position: Point
}

export type MusicPlayer = {
	player: YouTubePlayer | null
	isPlaying: boolean
	index: number
	timeElapsed: number
	songs: Song[]
	position: Point
	timeCounter: number | undefined
}

export type Song = {
	title: string
	author: string
	id: string
	duration: number
}

declare global {
	interface Window {
		retrowave: any
	}
}
