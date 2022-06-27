<script setup lang="ts">
const el = ref<HTMLCanvasElement>()
const ctx = $computed(() => el.value!.getContext('2d')!)
const WIDTH = 600
const HEIGHT = 600

interface Point {
  x: number
  y: number
}
interface Branch {
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

function getEndPoint(b: Branch) {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta),
  }
}

function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b))
}

function step(b: Branch) {
  const end = getEndPoint(b)
  drawBranch(b)
  if (Math.random() < 0.5) {
    step({
      start: end,
      length: 100,
      theta: b.theta - 0.2,
    })
  }
  if (Math.random() < 0.5) {
    step({
      start: end,
      length: 100,
      theta: b.theta + 0.2,
    })
  }
}

function init() {
  ctx.strokeStyle = 'white'
  step({
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 100,
    theta: -Math.PI / 2,
  })
}

onMounted(() => {
  init()
})
</script>
<template>
  <canvas ref="el" width="600" height="600" border />
  <Footer />
</template>
