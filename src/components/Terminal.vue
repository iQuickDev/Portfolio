<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Terminal } from 'xterm'
import router from '../router/router'
import interact from 'interactjs'
import { Command, Point } from '../services/types'
import { gsap } from 'gsap'
import { useTerminal } from '../stores/terminal'
import { useGlobal } from '../stores/global'
import { storeToRefs } from 'pinia'

let term: Terminal
let termStore = useTerminal()
let globalStore = useGlobal()

const { isVisible } = storeToRefs(termStore)

watch(isVisible, async (state) => {
	let terminal = document.querySelector('.terminal-wrapper') as HTMLElement
	let hint = document.querySelector('.terminal-hint') as HTMLElement
	if (state) {
		gsap.fromTo(
			terminal,
			{
				opacity: 0,
				x: +300
			},
			{
				duration: 0.75,
				ease: 'back.out(1.7)',
				opacity: 1,
				x: 0,
				display: 'block'
			}
		)

		gsap.fromTo(
			hint,
			{
				opacity: 1,
				x: 0
			},
			{
				duration: 0.5,
				ease: 'back.out(1.7)',
				opacity: 0,
				x: +300,
				display: 'none'
			}
		)
	} else {
		gsap.fromTo(
			terminal,
			{
				opacity: 1,
				x: 0
			},
			{
				duration: 0.75,
				ease: 'back.out(1.7)',
				opacity: 0,
				x: +300,
				display: 'none'
			}
		)

		gsap.fromTo(
			hint,
			{
				opacity: 0,
				x: +300
			},
			{
				duration: 0.5,
				ease: 'back.out(1.7)',
				opacity: 1,
				x: 0,
				display: 'block'
			}
		)
	}
})

const colors = {
	grey: '\x1b[1;30m',
	red: '\x1b[1;31m',
	green: '\x1b[1;32m',
	yellow: '\x1b[1;33m',
	blue: '\x1b[1;34m',
	magenta: '\x1b[1;35m',
	aqua: '\x1b[1;36m',
	white: '\x1b[1;37m',
	reset: '\x1b[0m'
}

const commands: Command[] = [
	{
		name: 'hostname',
		description: "Change the machine's name",
		usage: 'hostname <value> : string',
		execute: (args: string[]) => {
			if (!args[0]) return `${colors.red}Error: No hostname specified`
			if (args[0].length <= 16) {
				termStore.setHostname(args[0])
				return `${colors.blue}Hostname set to ${colors.magenta}${args[0]}`
			}
			return `${colors.red}Error: hostname too long`
		}
	},
	{
		name: 'username',
		description: "Change the user's name",
		usage: 'username <value> : string',
		execute: (args: string[]) => {
			if (!args[0]) return `${colors.red}Error: No username specified`
			if (args[0].length <= 16) {
				termStore.setUsername(args[0])
				return `${colors.blue}Username set to ${colors.magenta}${args[0]}`
			}
			return `${colors.red}Error: username too long`
		}
	},
	{
		name: 'navigate',
		description: 'Navigate to a different page',
		usage: 'navigate <name> : string',
		execute: (args: string[]) => {
			if (args.length > 0) {
				if (args[0].toLowerCase() == 'home') {
					router.push('/')
				} else router.push(args[0])

				return `${colors.blue}Now viewing ${colors.magenta}${args[0]}`
			} else {
				return `${colors.red}Error: No page specified`
			}
		}
	},
	{
		name: 'clear',
		description: 'Clear the terminal',
		usage: 'clear',
		execute: (args: string[]) => {
			term.clear()
			return `${colors.green}Cleared the terminal`
		}
	},
	{
		name: 'setanimationspeed',
		description: 'Set the speed of the animation in the background',
		usage: 'setanimationspeed <value> : float',
		execute: (args: string[]) => {
			//@ts-ignore
			if (isNaN(args[0])) return `${colors.red}Error: The value must be a float (eg. 0.8)`
			//@ts-ignore
			window.retrowave.setAnimationSpeed(args[0])
			return `${colors.blue}The animation speed has been set to ${colors.magenta}${args[0]}`
		}
	},
	{
		name: 'hack',
		description: 'Hack the page',
		usage: 'hack',
		execute: (args: string[]) => {
			if (globalStore.isHacked) return `${colors.red}Error: The page has been hacked already` as string
			;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'block'
			setTimeout(() => {
				;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '.5'
			}, 100)

			globalStore.setHack(true)

			return `${colors.blue}Successfully hacked the page`
		}
	},
	{
		name: 'unhack',
		description: 'Removes any traces of hacking',
		usage: 'unhack',
		execute: (args: string[]) => {
			if (!globalStore.isHacked) return `${colors.red}Error: The page has not been hacked (yet)` as string
			;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '0'

			setTimeout(() => {
				;(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'none'
			}, 1000)

			globalStore.setHack(false)

			return `${colors.blue}Page unhacked, the cops won't be after you anymore`
		}
	},
	{
		name: 'history',
		description: 'View commands history',
		usage: 'history',
		execute: (args: string[]) => {
			if (termStore.history.length == 1) return `${colors.red}The commands history is empty`

			let output = ''

			for (let i = 0; i < termStore.history.length - 1; i++) {
				output += `${i + 1}. ${termStore.history[i]}\n\r`
			}

			return output
		}
	},
	{
		name: 'help',
		description: 'Show this help',
		usage: 'help <command> : string',
		execute: (args: string[]) => {
			let output = ''
			if (args.length) {
				let command = commands.find((c) => c.name === args[0])
				if (command) output += `${colors.aqua}${command?.usage}\n\r${colors.reset}${command?.description}`
				else output += `${colors.red}Error: The command ${colors.aqua}${args[0]}${colors.red} doesn't exist`
			} else {
				output = `${colors.green}Available commands:\n\r`
				commands.forEach((c) => {
					output += `${colors.blue}${c.name}${colors.reset}\n\r${c.description}\n\r\n`
				})

				output = output.substring(0, output.length - 2)
			}
			return output
		}
	},
	{
		name: 'exit',
		description: 'Toggle the terminal',
		usage: 'exit',
		execute: (args: string[]) => {
			document.documentElement.focus()
			document.dispatchEvent(new KeyboardEvent('keydown', { key: 't' }))
			return `${colors.red}The terminal has been toggled off`
		}
	}
]

function printWelcomeMessage(term: Terminal) {
	term.write(colors.blue)
	term.writeln('  __    __        _                               ')
	term.writeln(' / / /\\ \\ \\  ___ | |  ___   ___   _ __ ___    ___ ')
	term.writeln(" \\ \\/  \\/ / / _ \\| | / __| / _ \\ | '_ \\` _ \\ / _ \\")
	term.writeln('  \\  /\\  / |  __/| || (__ | (_) || | | | | ||  __/')
	term.writeln('   \\/  \\/   \\___||_| \\___| \\___/ |_| |_| |_| \\___|')
	term.writeln('                                                  ')
	term.writeln(`          Type ${colors.red}help${colors.blue} for a list of commands ${colors.reset}\n\r`)
}

onMounted(() => {
	term = new Terminal({
		cols: 60,
		rows: 24,
		fontFamily: 'Hack',
		fontSize: 14,
		allowTransparency: true,
		theme: {
			background: '#0008'
		},
		cursorBlink: true,
		cursorStyle: 'underline',
		windowsMode: false,
		scrollSensitivity: 2
	})
	term.open(document.querySelector('#shell') as HTMLElement)
	printWelcomeMessage(term)
	term.write(termStore.prompt)
	term.onData((char) => {
		if (char.match('[A-Za-z0-9-. ]+')) {
			/* allow letters, digits, spaces, dashes and periods */
			if (char == '\u001b[A' || char == '\u001b[B' || char == '\u001b[C' || char == '\u001b[D')
				// disable arrow keys
				return
			termStore.currentLine += char
			term.write(char)
		}
	})

	term.onKey((event) => {
		switch (event.key) {
			case '\u007f' /* delete key */:
				termStore.setCurrentLine(termStore.currentLine.substring(0, termStore.currentLine.length - 1))
				term.write('\x1b[2K\r' + termStore.prompt + termStore.currentLine) // \x1b[2K\r -> deletion character
				break
			case '\r' /* enter key */:
				if (termStore.currentLine == '') break
				termStore.addToHistory(termStore.currentLine)
				termStore.selectedHistoryIndex = termStore.history.length
				let args = termStore.currentLine.split(' ')
				let cmd = args.shift()
				term.write('\r\n')
				let output = commands.find((c) => c.name === cmd)?.execute(args)
				if (output) term.write(output)
				else
					term.write(
						`${colors.red}Command not found, type ${colors.aqua}help${colors.red} for a list of commands`
					)
				termStore.setCurrentLine('')
				term.write(colors.reset + '\r\n' + termStore.prompt)
				break
			case '\u001b[A' /* arrow up */:
				if (termStore.selectedHistoryIndex > 0) {
					termStore.setIndex(termStore.selectedHistoryIndex - 1)
					termStore.setCurrentLine(termStore.history[termStore.selectedHistoryIndex])
					term.write('\x1b[2K\r' + termStore.prompt + termStore.currentLine)
				}
				break
			case '\u001b[B' /* arrow down */:
				if (termStore.selectedHistoryIndex < termStore.history.length - 1) {
					termStore.setIndex(termStore.selectedHistoryIndex + 1)
					termStore.currentLine = termStore.history[termStore.selectedHistoryIndex]
					term.write('\x1b[2K\r' + termStore.prompt + termStore.currentLine)
				}
				break
		}
	})

	interact('.terminal-wrapper').draggable({
		allowFrom: '.drag-handle',
		listeners: {
			move(ev) {
				const pos: Point = { x: ev.dx, y: ev.dy }
				termStore.setPosition(pos)
				ev.target.style.transform = `translate(${termStore.position.x}px, ${termStore.position.y}px)`
			}
		}
	})

	document.addEventListener('keydown', (e) => {
		if (e.key.toLowerCase() == 't') {
			termStore.toggle()
			if (termStore.isVisible) {
				setTimeout(() => {
					term.focus()
				}, 100)
			}
		}
	})
})
</script>

<template>
	<div class="terminal-wrapper">
		<div class="drag-handle"></div>
		<div id="shell"></div>
	</div>

	<div class="terminal-hint">
		<h4>Press [T] to toggle the Terminal</h4>
	</div>
</template>

<style>
.terminal-hint {
	position: absolute;
	bottom: 2%;
	right: 1%;
	background: #0005;
	width: max-content;
	padding: 5px;
	border-radius: 5px;
	backdrop-filter: blur(3px);
	transition: 0.5s;
}

.terminal-wrapper {
	position: absolute;
	bottom: 2%;
	right: 1%;
	border: 2px solid #e443de;
	border-radius: 5px;
	width: max-content;
	height: max-content;
	backdrop-filter: blur(3px);
	opacity: 0;
	display: none;
}

.drag-handle {
	background: #e443de;
	width: 100%;
	height: 8px;
}

#shell {
	width: max-content;
	height: max-content;
}

.xterm-viewport {
	scroll-behavior: smooth;
}

.xterm-viewport::-webkit-scrollbar {
	display: none !important;
}

@media screen and (max-width: 1300px) {
	.terminal-wrapper {
		transform: scale(0.9);
		bottom: 0;
		right: 0;
	}
}

@media screen and (max-width: 600px) {
	.terminal-wrapper {
		display: none;
	}

	.terminal-hint {
		display: none;
	}
}
</style>
