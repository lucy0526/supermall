export function // 防抖动
debounce(func, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    // 重新计时，并执行函数
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}
