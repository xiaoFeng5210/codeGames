<script setup lang="ts">
import { workTest } from "../utils/test";
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
function getSiblings(block: BlockState) {
  return directions
    .map(([dx, dy]) => {
      const x2 = block.x + dx;
      const y2 = block.y + dy;
      // 边界就不考虑了
      if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) return undefined;
      return state[y2][x2];
    })
    .filter(Boolean) as BlockState[];
}
// 更新格子的显示
function updateNumbers() {
  state.forEach((row, y) => {
    row.forEach((block: BlockState, x) => {
      if (block.mine) return;
      block.adjacentMines = 0;
      getSiblings(block).forEach((v) => {
        if (v?.mine) {
          block.adjacentMines += 1;
        }
      });
    });
  });
}
// 生成炸弹
function generateMines(initial: BlockState) {
  for (const row of state) {
    for (const block of row) {
      if (Math.abs(initial.x - block.x) < 1) continue;
      if (Math.abs(initial.y - block.y) < 1) continue;
      block.mine = Math.random() < 0.2;
    }
  }
  updateNumbers();
}

function expandZero(block: BlockState) {
  if (block.adjacentMines) return;
}
let mineGenerated = false;
function onClick(block: BlockState) {
  if (!mineGenerated) {
    generateMines(block);
    mineGenerated = true;
  }
  block.revealed = true;
}
function getBlockClass(block: BlockState) {
  if (!block.revealed) return "bg-gray-500/10";
  return block.mine ? "text-red" : numberColors[block.adjacentMines!];
}

workTest();
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
          <template v-if="block.revealed">
            <div>
              <div v-if="block.mine" i-mdi:mine></div>
              <div v-else>{{ block.adjacentMines }}</div>
            </div>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>
