<script setup lang="ts">
import Slideshow from '../components/Slideshow.vue'
</script>

<template>
  <div class="projects-wrapper">
    <Slideshow></Slideshow>
  </div>
</template>

<style scoped>

.placeholder {
    position: absolute;
    width: max-content;
    max-width: 90%;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: #FFF;
    text-shadow: 0 0 3px #000;
    padding: 10px;
    border-radius: 10px;
    backdrop-filter: blur(3px);
    border: 2px solid #e443de;
}
</style>