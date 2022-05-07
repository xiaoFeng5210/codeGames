<script setup lang="ts">
interface BlockState {
  x: number;
  y: number;
  // 是否翻开
  revealed?: boolean;
  // 是否是炸弹
  mine?: boolean;
  flagged?: boolean;
  // 提示炸弹的格子
  adjacentMines?: number;
}
const WIDTH = 10;
const HEIGHT = 10;
const state = reactive(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from(
      { length: WIDTH },
      (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
      })
    )
  )
);

// 生成炸弹
function generateMines() {
  for (const row of state) {
    for (const block of row) {
      block.mine = Math.random() < 0.2;
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
  [0, 1],
];
const numberColors = [
  "text-transparent",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-orange-500",
  "text-red-500",
  "text-purple-500",
  "text-pink-500",
];
// 更新格子的显示
function updateNumbers() {
  state.forEach((row, y) => {
    row.forEach((block: BlockState, x) => {
      if (block.mine) return;
      block.adjacentMines = 0;
      directions.forEach(([dx, dy]) => {
        const x2 = x + dx;
        const y2 = y + dy;
        // 边界就不考虑了
        if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) return;
        if (state[y2][x2].mine) {
          block.adjacentMines! += 1;
        }
      });
    });
  });
}
function onClick(block: BlockState) {
  block.revealed = true;
}
function getBlockClass(block: BlockState) {
  if (!block.revealed) return "";
  return block.mine ? "text-red" : numberColors[block.adjacentMines!];
}
generateMines();
updateNumbers();
</script>

<template>
  <div>
    <div>
      Minesweeper
      <div flex="~" items-center justify-center v-for="(row, y) in state" :key="y">
        <button
          v-for="(block, x) in row"
          :key="x"
          flex="~"
          items-center
          justify-center
          w-10
          h-10
          m="0.5"
          hover="bg-gray/10"
          border="1 gray-400/10"
          :class="getBlockClass(block)"
          @click="onClick(block)"
        >
          <div v-if="block.mine" i-mdi:mine></div>
          <div v-else>{{ block.adjacentMines }}</div>
        </button>
      </div>
    </div>
  </div>
</template>
