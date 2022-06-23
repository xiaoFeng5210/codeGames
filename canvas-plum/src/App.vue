<script setup lang="ts">
const el = ref<HTMLCanvasElement>()
const ctx = $computed(() => el.value!.getContext('2d')!)
const WIDTH = 600
const HEIGHT = 600

interface Point {
  x: number
  y: number
}
interface Line {
  start: Point
  length: number
  theta: number
}
function lineTo(p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
}

function line(l: Line) {
  const { start, length, theta } = l
  const end = { x: start.x + length * Math.cos(theta), y: start.y + length * Math.sin(theta) }
  lineTo(start, end)
}

function init() {
  ctx.strokeStyle = 'white'
  const startPoint = { x: WIDTH / 2, y: HEIGHT }
  const endPoint = { x: WIDTH / 2, y: HEIGHT / 2 }
  lineTo(startPoint, endPoint)
  lineTo(endPoint, { x: WIDTH / 2 + 50, y: 10 })
}

onMounted(() => {
  init()
})
</script>
<template>
  <canvas ref="el" width="600" height="600" border />
  <Footer />
</template>
