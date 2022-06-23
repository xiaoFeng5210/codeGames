<script setup lang="ts">
const el = ref<HTMLCanvasElement>()
const ctx = $computed(() => el.value!.getContext('2d')!)
const WIDTH = 600
const HEIGHT = 600
function line(x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

function init() {
  ctx.strokeStyle = 'white'
  line(WIDTH / 2, HEIGHT, WIDTH / 2, HEIGHT / 2)
}

onMounted(() => {
  init()
})
</script>
<template>
  <canvas ref="el" width="600" height="600" border />
  <Footer />
</template>
