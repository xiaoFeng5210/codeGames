<script setup lang="ts">
</script>

<template>
  <div>
    <div>
      Minesweeper

      <div v-for="y in 10"> 
        <button v-for="x in 10" w-5 h-5 border>{{x}}</button>
      </div>
    </div>
  </div>
</template>
