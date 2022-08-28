export class TimerTools {
  public static debounce(func: any, wait: number) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }
}
