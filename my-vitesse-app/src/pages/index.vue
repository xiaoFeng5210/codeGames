<script setup lang="ts">

interface BlockState {
  x: number,
  y: number,
  // 是否翻开
  revealed?: boolean
  // 是否是炸弹
  mine?: boolean
  flagged?: boolean
  // 提示炸弹的格子
  adjacentMines?: number
}
const WIDTH = 10
const HEIGHT = 10
const state = reactive(Array.from({ length: HEIGHT },
  (_, y) => Array.from({ length: WIDTH },
    (_, x): BlockState => ({
      x,
      y,
      adjacentMines: 0
    })
  )))

generateMines()
function onClick(x: number, y: number) {

}
// 生成炸弹
function generateMines() {
  for (const row of state) {
    for (const block of row) {
      block.mine = Math.random() < 0.1
    }
  }
}

const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1]
]
// 更新格子的显示
function updateNumbers() {
  state.forEach((row, y) => {
    row.forEach((block: BlockState, x) => {
      if (block.mine) return
      block.adjacentMines = 0
      directions.forEach(([dx, dy]) => {
        const x2 = x + dx
        const y2 = y + dy
        // 边界就不考虑了
        if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) return;
        if (state[y2][x2].mine) {
          block.adjacentMines! += 1
        }
      })
    })
  })
}
updateNumbers()
</script>

<template>
  <div>
    <div>
      Minesweeper
      <div v-for="row, y in state" :key="y">
        <button
          v-for="item, x in row"
          :key="x"
          w-10
          h-10
          hover:bg-gray
          border
          @click="onClick(x, y)"
        >{{ item.mine ? 'x' : item.adjacentMines }}</button>
      </div>
    </div>
  </div>
</template>
