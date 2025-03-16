// 節流防抖函數：需要頻繁觸發的函數，出於優化性能在規定時間內，讓第1次(和每0.2s生效)和最後1次(0.3秒後)生效，中間不生效
// const throttleDebounceFn = throttleDebounce(windowScrollFn)
// window.addEventListener('scroll',throttleDebounceFn);
export const throttleDebounce = <T extends (...args:any[]) => void>(
  fn:T,
  throttleDelay:number = 200,
  debounceDelay:number = 400
):((...args:Parameters<T>) => void) => {
  let lastTime = 0; //上次執行時間
  let timer:ReturnType<typeof setTimeout> | null = null; //計時器
  return function(this:any, ...args:Parameters<T>):void {
    const nowTime = Date.now();
    if (nowTime - lastTime >= throttleDelay){ //節流：每隔throttleDelay生效一次
      fn.apply(this,args); //修正this指向並傳入參數
      lastTime = nowTime;
    }
    if (timer) clearTimeout(timer); //防抖：停止觸發debounceDelay後執行
    timer = setTimeout(() => fn.apply(this,args),debounceDelay); //修正 this 指向並傳入參數
  };
};