// 函數節流：需要頻繁觸發的函數，出於優化性能，只讓函數觸發的第1次(和delayTime後)生效，後面不生效
// throttle(function,delayTime)
// st-1
// const throttleFn = throttle(throwBall,500)
// button.addEventListener('click',throttleFn)
// button.removeEventListener('click',throttleFn)
// st-2
// if(true) throttleFn(e.offsetY,e.offsetX);
// throttleFn = throttle((Y,X) => {
//   imgTag.value.style.cssText = `top:${Y}px;left:${X}px;`;
// },50)
export function throttle<T extends (...args:any[]) => void>(func:T,duration:number):(...args:Parameters<T>) => void {
  let shouldWait = false;
  return function(this:any,...args:Parameters<T>) {
    if (!shouldWait) {
      func.apply(this, args); // 修正this指向問題
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, duration);
    }
  };
}
// export default 私有變數輸出;
