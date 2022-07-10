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



// 目标单元的信息保存
let target = null
let targetIndex = 0
let blockWidth = 0
// TODO:
function handleMouseDown(e) {
    if (e.currentTarget.classList.contains("add-unit")) {
        return 
    }
    clickTImeId = setTimeout(() => {
        clickable = false;
    }, 200)
    const allUnits = [...document.querySelectorAll(`.one-unit`)]
    allUnits.forEach((item, index) => {
        if (item === e.currentTarget) {
            target = item
            targetIndex = index
        }
    })
}