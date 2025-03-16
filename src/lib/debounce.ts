// 防抖函數：需要頻繁觸發的函數，在規定時間內，只讓最後1次(0.3秒後)生效，前面不生效
// debounce(functionName,delayTime)
// $btn.onclick = debounce(throwBall,300)
// const debounceFn = debounce(windowResizeFn,300)
// window.addEventListener('resize',debounceFn);
// export const debounce = (fn,delay) => {
//   let timeoutId = null;
//   return () => {
//     if(timeoutId) clearTimeout(timeoutId); // 清除上次延時
//     timeoutId = setTimeout(() => {
//       // fn().apply(this); //修正this指向問題
//       fn();
//     },delay);
//   };
// };
export function debounce<T extends (...args:any[]) => any>(func:T,delay:number):(...args:Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function(this:any, ...args:Parameters<T>){
    const effect = () => {
      timeout = null;
      func.apply(this,args); //正確綁定`this`並傳遞參數
    };
    if(timeout) clearTimeout(timeout); //清除已有的計時器
    timeout = setTimeout(effect,delay); //設置新的計時器
  };
}
// export default 私有變數輸出;
