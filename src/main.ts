import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { createPinia } from 'pinia'
import {
	GiLightBulb,
	FaHandshake,
	GiWorld,
	FaPlay,
	FaPause,
	FaForward,
	FaBackward,
	ViFileTypeDocker2,
	ViFileTypeJs,
	ViFileTypeTypescript,
	ViFileTypeMysql,
	ViFileTypeVue,
	ViFileTypeRust,
	SiSocketdotio,
	SiFastify,
	FcLinux,
	SiWebrtc,
	ViFileTypePhp3,
	SiCloudflare,
	SiBootstrap,
	ViFileTypeCss,
	ViFileTypeHtml,
	ViFileTypeJar,
	ViFileTypeCsharp,
	ViFileTypeMongo
} from 'oh-vue-icons/icons'
addIcons(
	GiLightBulb,
	FaHandshake,
	GiWorld,
	FaPlay,
	FaPause,
	FaForward,
	FaBackward,
	ViFileTypeDocker2,
	ViFileTypeJs,
	ViFileTypeTypescript,
	ViFileTypeMysql,
	ViFileTypeVue,
	ViFileTypeRust,
	SiSocketdotio,
	SiFastify,
	FcLinux,
	SiWebrtc,
	ViFileTypePhp3,
	SiCloudflare,
	SiBootstrap,
	ViFileTypeCss,
	ViFileTypeHtml,
	ViFileTypeJar,
	ViFileTypeCsharp,
	ViFileTypeMongo
)
const pinia = createPinia()
createApp(App).use(router).use(pinia).component('v-icon', OhVueIcon).mount('#app')
