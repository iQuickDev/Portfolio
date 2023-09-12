import { defineStore } from 'pinia'
import { TerminalData, Point } from '../services/types'

export const useTerminal = defineStore('terminal', {
	state: () =>
		({
			username: 'user',
			hostname: 'Portfolio',
			shellprompt: '',
			currentLine: '',
			isVisible: false,
			history: [],
			selectedHistoryIndex: -1,
			position: {
				x: 0,
				y: 0
			}
		} as TerminalData),
	getters: {
		prompt: (state) => `[${state.username}@${state.hostname} ~] `
	},
	actions: {
		setCurrentLine(line: string) {
			this.currentLine = line
		},
		setPrompt(prompt: string) {
			this.shellprompt = prompt
		},
		setUsername(username: string) {
			this.username = username
		},
		setHostname(hostname: string) {
			this.hostname = hostname
		},
		setIndex(index: number) {
			this.selectedHistoryIndex = index
		},
		setPosition(position: Point) {
			this.position.x += position.x
			this.position.y += position.y
		},
		addToHistory(item: string) {
			this.history.push(item)
		},
		toggle() {
			this.isVisible = !this.isVisible
			this.resetPosition()
		},
		resetPosition() {
			this.position.x = 0
			this.position.y = 0
		}
	}
})
