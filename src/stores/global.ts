import { defineStore } from 'pinia'

export const useGlobal = defineStore('global', {
	state: () => ({
		isHacked: false
	}),
	actions: {
		toggleHack() {
			this.isHacked = !this.isHacked
		},
		setHack(state: boolean) {
			this.isHacked = state
		}
	}
})
