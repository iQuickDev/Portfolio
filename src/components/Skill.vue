<script setup lang="ts">
defineProps({
  icon: String,
  name: String,
  textColor: String,
  animation: String,
});
</script>

<template>
  <div class="skill-wrapper">
    <div class="icon-wrapper">
      <v-icon :name="icon" :scale="2" :fill="textColor" :animation="animation" speed="slow"></v-icon>
    </div>
    <div class="skill-name-container">
      <h3 class="skill-name" :style="{color: textColor}">{{ name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.skill-wrapper {
    border-radius: 50px;
    width: max-content;
    display: flex;
    padding-right: 10px;
    margin: 5px;
    background: #222a;
    border: 2px solid #e443de;
}

.icon-wrapper {
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    padding: 8px;
}


.skill-name-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
