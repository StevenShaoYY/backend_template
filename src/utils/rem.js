const baseSize = 192
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920
  // const scale = document.documentElement.clientHeight / 1080
  let cal2 = 0.5625 / (document.documentElement.clientHeight/document.documentElement.clientWidth)
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * scale /cal2+ 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}
