const allUnitsArr = [...document.querySelectorAll(`.one-unit`)]
// 单元拖拽时，阻止非添加单元样式切换的事件处理
let clickable = true;
let clickTimeId = 0

allUnitsArr.forEach(item => {
    item.addEventListener("click", handleClick)
})

function handleClick(event) {
    if (!clickable) {
        clickable = true;
        return
    }
    const target = event.currentTarget;
    if (!target.classList.contains('add-unit')) {
      const allUnitsArr = [...document.querySelectorAll(`.one-unit`)]
        allUnitsArr.forEach(item => {
            item.classList.remove('selected-unit')
        })
        target.classList.add('selected-unit');
    } else {
        const rootDiv = document.createElement("div");
        rootDiv.classList.add('one-unit');

        const span = document.createElement("span");
        span.classList.add("currency")
        span.innerHTML = "CNY"

        const div = document.createElement("div");
        const spanInner1 = document.createElement("span");
        spanInner1.classList.add("num");
        spanInner1.innerHTML = "75"
        const spanInner2 = document.createElement("span");
        spanInner2.classList.add("symbol");
        spanInner2.innerHTML = "%"
        const text = document.createTextNode("\n")
        div.appendChild(spanInner1);
        div.appendChild(text);
        div.appendChild(spanInner2);

        rootDiv.appendChild(span)
        rootDiv.appendChild(div)
        e.currentTarget.parentNode.insertBefore(rootDiv, e.currentTarget.parentNode.lastElementChild)
        // TODO:
        rootDiv.addEventListener("mousedown", handleMouseDown)
        rootDiv.addEventListener("click", handleClick)
        rootDiv.addEventListener("mouseup", handleMouseUp)
    }
}

// 容器移动
const wallet = document.querySelector('.container')
const moveBar = document.querySelector('.moveBar')
let isStarted = false
const startedPos = {
    x: 0,
    y: 0
}
const baseDis = {
    x: 0,
    y: 0
}
let disX = 0;
let disY = 0;
moveBar.addEventListener('mousedown', (e) => {
    isStarted = true
    startedPos.x = e.clientX
    startedPos.y = e.clientY
})
moveBar.addEventListener('mouseup', (e) => {
    isStarted = false
    baseDis.x = disX
    baseDis.y = disY
})
document.body.addEventListener('mousemove', (e) => {
    if (isStarted) {
        disX = baseDis.x + e.clientX - startedPos.x
        disY = baseDis.y + e.clientY - startedPos.y
    }
    wallet.style.transform = `translate(${disX}px, ${disY}px)`
})

/**
 * 单元拖拽
 */
let blockMoving = false;
const startedBlockPos = {
    x: 0,
    y: 0
}
let blockDisX = 0;
let blockDisY = 0;

// 目标单元的信息保存
let target = null
let targetIndex = 0
let blockWidth = 0
let gapWidth = 16

let currentPosIndex = 0;
let moveStep = 0;
let isDrag = false;

function handleMouseDown(e) {
    if (e.currentTarget.classList.contains("add-unit")) {
        return 
    }
    clickTimeId = setTimeout(() => {
        clickable = false;
    }, 200)
    const allUnits = [...document.querySelectorAll(`.one-unit`)]
    allUnits.forEach((item, index) => {
        if (item === e.currentTarget) {
            currentTarget = index
            targetIndex = index
        }
    })
    blockMoving = true
    startedBlockPos.x = e.clientX
    startedBlockPos.y = e.clientY

    target = e.currentTarget
    target.style.transition = 'none'
    target.style.zIndex = 10

    blockWidth = target.getBoundingClientRect().width
}

function handleMouseUp(e) {
    if (e.currentTarget.classList.contains("add-unit")) {
        return 
    }
    clearTimeout(clickTimeId)
    clickable = true;
    blockMoving = false

    const allUnits = [...document.querySelectorAll(`.one-unit`)]
    if (moveStep < 0 - targetIndex) {
        moveStep = -targetIndex
    } else if (moveStep > allUnits.length - targetIndex - 2) {
        moveStep = allUnits.length - targetIndex - 2
    }

    target.style.transition = "all 0.2s ease-in-out"
    target.style.zIndex = 0
    target.style.transform = `translateX(${moveStep * (blockWidth + gapWidth)}px)`
    // TODO:
}

/**
 * 目标单元移动
 * @param allUnits 所有单元节点
 * @param targetIndex 目标索引
 * @param disX 目标x轴位移
 * @param moveWidth 目标单元宽度 + 单元间距
 */
function changePos(allUnits, targetIndex, disX, moveWidth) {
    moveStep = parseInt(disX / moveWidth)
    currentPosIndex = targetIndex + moveStep
    for (let i = 0; i < allUnits.length; i++) {
        if (i !== targetIndex) {
            allUnits[i].style.transform = "translateX(0px)"
        }
    }
    
}

allUnitsArr.forEach(item => {
    item.addEventListener("mousedown", handleMouseDown)
})

document.body.addEventListener("mousemove", (e) => {
  if (blockMoving) {
    blockDisX = e.clientX - startedBlockPos.x
    blockDisY = e.clientY - startedBlockPos.y
    isDrag = true
    target.style.transform = `translate(${blockDisX}px, ${blockDisY}px)`

    //TODO: changePos

  }
})