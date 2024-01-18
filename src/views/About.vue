<script setup lang="ts">
import HorizontalDivider from '../components/HorizontalDivider.vue'
import Skill from '../components/Skill.vue'
import pfp from '../assets/images/pfp.jpg'
import discord from '../assets/images/discord.webp'
import github from '../assets/images/github.webp'
import telegram from '../assets/images/telegram.webp'
import instagram from '../assets/images/instagram.webp'
import linkedin from '../assets/images/linkedin.webp'

//@ts-ignore
let age: string = (
	Math.abs(new Date('2004-09-10T00:00:00+0100').getTime() - new Date().getTime()) /
	(1000 * 3600 * 24 * 365)
).toFixed(0)
</script>

<template>
	<div class="about-wrapper">
		<div class="personal container">
			<h1>Personal</h1>
			<HorizontalDivider />
			<img class="pfp" :src="pfp" />
			<div class="data">
				<p class="description">
					Hi, my name is Leonardo and i am a {{ age }} years old Full Stack Developer based in Italy.
					Programming has been my passion since 2019 and i'm pursuing it by making lots of personal projects
					as well as school ones. I really enjoy exploring open source software like Linux and GNU, i think
					that FOSS gives a lot of benefits to the community and the developers to build better software with
					the help from all over the world. Take a look at my skills on the panel to the right and my social
					networks right below this panel.
				</p>
			</div>
			<div class="contacts">
				<a href="https://github.com/iQuickDev" target="_target"><img id="github" :src="github" /></a>
				<a href="https://discordlookup.com/user/295310535107280908" target="_target"
					><img id="discord" :src="discord"
				/></a>
				<a href="https://t.me/iQuickDev" target="_target"
					><img id="telegram" :src="telegram"
				/></a>
				<a href="https://instagram.com/iquickdev" target="_target"><img id="instagram" :src="instagram" /></a>
				<a href="https://www.linkedin.com/in/iquickdev" target="_target"
					><img id="linkedin" :src="linkedin"
				/></a>
			</div>
			<p class="email">Send emails to <a href="mailto: root@iquick.dev">root@iquick.dev</a></p>
		</div>
		<div class="info container">
			<h1>Programming Experience</h1>
			<div class="introduction">
				<h2>How I started</h2>
				<p>
					I ventured into programming in 2019, and my first language was C#. I delved into the .NET Framework
					and WinForms to create applications for Windows 10 like
					<a href="https://github.com/iQuickDev/OTCLoader" target="_blank">OTCLoader</a>,
					<a href="https://github.com/iQuickDev/MCClientManager" target="_blank">MCClientManager</a>, and
					<a href="https://github.com/iQuickDev/DiscordTotalCallTime" target="_blank">DiscordTotalCallTime</a
					>. These projects were my first introduction to Object Oriented Programming.
				</p>
				<h2>Talking about school</h2>
				<p>
					My school introduced me to the basics of C++, Java, PHP (which I dislike like everyone else) and
					even included some training for WordPress, which I used to build
					<a href="https://lorenzovanninicartoon.it" target="_blank">this website</a>
					for an Italian illustrator. In addition to that, i also learned some networking concepts such as
					subnetting and supernetting, setting up DHCP, SSH, VLANs, VPN servers and configuring routers and
					switches. I graduated with a score of 87/100 and am now seeking a job in IT.
				</p>
				<h2>Where my passion has brought me</h2>
				<p>
					Most of my knowledge comes from self-teaching. I have acquired a lot of concepts by myself and
					implemented them in personal projects such as
					<a href="https://github.com/iQuickDev/WhatsappBOT" target="_blank">WhatsappBOT</a>,
					<a href="https://github.com/iQuickDev/OmegleInterceptor" target="_blank">OmegleInterceptor</a>, and
					<a href="https://github.com/iQuickDev/OpenCloud" target="_blank">OpenCloud</a>. As you can see, all
					these projects were written in JavaScript, which is the language I am most proficient in. When it
					comes to the frontend, I prefer using the Vue framework to build web applications, just like this
					one. In terms of databases, I taught myself how to use MongoDB and learned about relational
					databases in school, where I gained experience choosing between SQL and NoSQL based on the use case.
					Right now, I'm working on my home lab which consists of a Raspberry Pi handling many services such
					as Home Assistant, PiHole and Nextcloud. I've learned a lot of things from this experience and will
					continue to configure and install new services.
				</p>
			</div>
			<HorizontalDivider />
			<h1>Programming Skills & Knowledge</h1>
			<div class="skills-container">
				<Skill icon="vi-file-type-js" name="JavaScript" textColor="#FF0" />
				<Skill icon="vi-file-type-typescript" name="TypeScript" textColor="#3178C6" />
				<Skill icon="vi-file-type-rust" name="Rust" textColor="#A04F12" />
				<Skill icon="vi-file-type-php3" name="PHP" textColor="#8993BE" />
				<Skill icon="vi-file-type-csharp" name=".NET C#" textColor="#348231" />
				<Skill icon="vi-file-type-jar" name="Java" textColor="#B96A06" />
				<Skill icon="vi-file-type-mysql" name="MySQL" textColor="#00758F" />
				<Skill icon="vi-file-type-mongo" name="MongoDB" textColor="#4FA94C" />
				<Skill icon="vi-file-type-html" name="HTML" textColor="#E44F26" />
				<Skill icon="vi-file-type-css" name="CSS" textColor="#33A9DC" />
				<Skill icon="vi-file-type-vue" name="Vue" textColor="#41B883" />
				<Skill icon="fc-linux" name="Linux" textColor="#F1C007" />
				<Skill icon="vi-file-type-docker2" name="Docker" textColor="#0096E6" />
				<Skill icon="si-socketdotio" name="Socket.io" textColor="#FFF" />
				<Skill icon="si-fastify" name="Fastify" textColor="#FFF" />
				<Skill icon="si-webrtc" name="WebRTC" textColor="#FFF" />
				<Skill icon="si-cloudflare" name="Cloudflare" textColor="#F6821F" />
				<Skill icon="si-bootstrap" name="Bootstrap" textColor="#6F2CF4" />
			</div>
			<HorizontalDivider />
			<h1>Non-Tech Skills</h1>
			<div class="skills-container">
				<Skill icon="gi-world" name="Italian (Native)" textColor="#41B883" animation="spin" />
				<Skill icon="gi-world" name="English (Proficient)" textColor="#0096E6" animation="spin" />
				<Skill icon="fa-handshake" name="Teamworking" textColor="#F1C007" animation="float" />
				<Skill icon="gi-light-bulb" name="Problem Solving" textColor="#F1C007" animation="ring" />
			</div>
		</div>
	</div>
</template>

<style scoped>
a {
	color: #e443de;
	text-decoration: none;
	font-weight: 600;
}

a:hover {
	text-shadow: 0 0 5px #9c43e4;
	transition: 0.25s;
}
.about-wrapper {
	height: 93vh;
}

.container {
	border: 2px solid #e443de;
	border-radius: 10px;
	backdrop-filter: blur(3px);
	padding: 5px;
	background: #0007;
	overflow: auto;
}

.skills-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 10px;
	padding: 10px;
}

.introduction {
	margin: auto;
	width: 95%;
	text-align: justify;
}

.personal {
	position: absolute;
	width: 22%;
	height: 60vh;
	left: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	overflow: auto;
}

.personal h1 {
	text-align: center;
	padding: 5px;
}

.info {
	left: 25vw;
	position: absolute;
	width: 70%;
	height: 80vh;
	margin: auto;
	font-size: 1.1rem;
	text-align: center;
	letter-spacing: 0.2px;
}

.info h1 {
	margin-top: 10px;
}

.info p {
	margin: 0;
	padding: 5px;
	margin: auto;
}

.info h2 {
	margin-top: 5px;
	text-align: center;
}

.description {
	margin: auto;
	width: 90%;
	text-align: justify;
	text-shadow: 0 0 1px #fff;
}

.pfp {
	border: 2px solid #e443de;
	border-radius: 50%;
	width: 120px;
	height: 120px;
	margin-bottom: 5px;
}

.contacts {
	width: 100%;
}

.contacts img {
	width: 20%;
	transition: 0.5s;
}

.contacts img:hover {
	transform: translateY(-5px);
	transition: 0.5s;
}

#discord:hover {
	filter: drop-shadow(-5px -5px 0px #4444dd);
}

#github:hover {
	filter: drop-shadow(-5px -5px 0px #151515);
}

#telegram:hover {
	filter: drop-shadow(-5px -5px 0px #4444dd);
}

#instagram:hover {
	filter: drop-shadow(-5px -5px 0px #e443de);
}

#linkedin:hover {
	filter: drop-shadow(-5px -5px 0px #4444dd);
}

.email {
	margin-top: 0;
	font-size: 1.1rem;
}

@media screen and (max-width: 1400px) {
	.pfp {
		width: 90px;
		height: 90px;
	}

	.info {
		left: 35vw;
		width: 60%;
	}

	.personal {
		width: 30%;
	}

	.contacts {
		width: 90%;
		text-align: center;
	}
}

@media screen and (max-width: 1000px) {
	.about-wrapper {
		overflow: auto;
	}

	.container {
		margin: auto;
		position: initial;
		width: 90%;
		height: max-content;
		margin-bottom: 15px;
	}

	.contacts {
		margin-top: 10px;
		width: 90%;
		text-align: center;
	}

	.contacts img {
		width: 12%;
		transition: 0.5s;
		margin-left: 10px;
		margin-right: 10px;
	}
	.pfp {
		width: 100px;
		height: 100px;
	}
}

@media screen and (max-width: 800px) {
	.contacts {
		margin-top: 10px;
		width: 90%;
		text-align: center;
	}

	.contacts img {
		width: 15%;
		transition: 0.5s;
		margin-left: 10px;
		margin-right: 10px;
	}
}

@media screen and (max-width: 600px) {
	.contacts {
		margin-top: 10px;
		width: 90%;
		text-align: center;
	}

	.contacts img {
		width: 20%;
		transition: 0.5s;
		margin-left: 0;
		margin-right: 0;
	}
}
</style>
