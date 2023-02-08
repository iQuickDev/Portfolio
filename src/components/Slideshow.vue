<script setup lang="ts">
//@ts-ignore
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import chatbridgerImg from '../assets/images/project_chatbridger.jpg'
import illustratorImg from '../assets/images/project_illustrator.jpg'
import mcserverscannerImg from '../assets/images/project_mcserverscanner.jpg'
import opencloudImg from '../assets/images/project_opencloud.jpg'
import safeImg from '../assets/images/project_safe.jpg'
import javachatImg from '../assets/images/project_javachat.jpg'
import { onMounted, ref } from 'vue'

const currentSlide = ref(0)

const projects = [
    {
        name: 'Safe',
        image: safeImg,
        link: 'https://github.com/iquickdev/safe',
        description: 'a project i made for my personal needs to manage encrypted archives'
    },
    {
        name: 'Lorenzo Vannini',
        image: illustratorImg,
        link: 'https://www.lorenzovannini.it',
        description: 'i got to work with three companies at once thanks to my school, collaborating with 3 other students to make this website for the Italian artist "Lorenzo Vannini"'
    },
    {
        name: 'MCServerScanner',
        image: mcserverscannerImg,
        link: 'https://github.com/iquickdev/mcserverscanner',
        description: 'small project to scan the internet for minecraft servers, really fun to visit random people\'s servers'
    },
    {
        name: 'ChatBridger',
        image: chatbridgerImg,
        link: 'https://github.com/iquickdev/chatbridger',
        description: 'quick solution to bridge three chats together: WhatsApp, Telegram and Discord'
    },
    {
        name: 'OpenCloud',
        image: opencloudImg,
        link: 'https://github.com/iquickdev/opencloud',
        description: 'big project i developed with a friend of mine, got to learn Vue with it and it works as a cloud'
    },
    {
        name: 'Java Chat',
        image: javachatImg,
        link: 'https://github.com/dicarlo-meucci/java-chat',
        description: 'TCP based chatroom we made in school'
    }
]

onMounted(() => {
    document.querySelectorAll('.vueperslides__arrow svg')
        .forEach(e => {
            //@ts-ignore
            e.style.stroke = '#e443de'
            //@ts-ignore
            e.style.strokeWidth = '2'
        })
})

function changeSlide(slide : any) {
    currentSlide.value = slide.currentSlide.index
}

</script>

<template>
    <div class="slideshow-container">
        <div class="slideshow-wrapper">
            <vueper-slides @slide="changeSlide" class="no-shadow" :visible-slides="1" :arrows="true" :bullets="false"
                :slide-ratio="1080 / 1920">
                <vueper-slide v-for="project of projects" :key="project.name" :infinite="true" :image="project.image" />
            </vueper-slides>
        </div>
        <div class="slide-description">
            <a :href="projects[currentSlide].link">
                <h1>{{ projects[currentSlide].name }}</h1>
            </a>
            <p>{{ projects[currentSlide].description }}</p>
        </div>
    </div>
</template>

<style scoped>
.slideshow-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
}
.vueperslides__arrow svg {
    stroke: red;
}

.slide-description {
    position: absolute;
    right: 50%;
    bottom: 2%;
    transform-origin: bottom;
    transform: translate(50%);
    width: 500px;
    text-align: center;
    margin: auto;
    background: #0005;
    padding: 10px;
    border-radius: 5px;
    backdrop-filter: blur(3px);
    transition: .5s;
}

.slideshow-wrapper {
    margin: auto;
    width: 60%;
    opacity: .98;
    overflow: hidden;
    border-radius: 20px;
    transform: rotate3d(4, -5, 1, 20deg);
    animation: spin 5s linear infinite;
    border: 3px solid #e443de;
    box-shadow: 0 0 15px 2px #e443de;
    image-rendering: optimizeQuality;
}


a {
    color: #e443de;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
}

a:hover {
    text-shadow: 0 0 5px #9c43e4;
    transition: .25s;
}

@media screen and (min-width: 3840px) and (min-height: 2160px) {
    .slideshow-container {
        height: 80vh;
    }
}

@media screen and (max-width: 1600px) {
    .slideshow-wrapper {
        width: 80%;
    }

    .slide-description {
        width: 400px;
    }
}

@media screen and (max-width: 1250px) {
    .slide-description {
        width: 250px;
    }
}

@media screen and (max-width: 1100px) {
    .slide-description {
        width: 400px;
        bottom: 20%;
    }
}


@media screen and (max-width: 600px) {
    .slideshow-wrapper {
        width: 90%;
    }
}
</style>