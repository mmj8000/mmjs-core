# mmjs-share utils

- Install
  ```shell
  pnpm add mmjs-share
  ```

- tsconfig.json
  - （如果用 Vite/Webpack 等打包工具）
  ```json
  {
    "moduleResolution": "Bundler"
  }
  ```

## 近期更新

- Share
  1. memoize (`包含过期时间`)
  2. throttle （`主动cancel`)
  3. isObject
  4. isPlainObject

## Share

1. throttle
   - Custom Cancel
   ```ts
   const throttledFn = throttle(() => {
   console.log("Throttled function");
   }, 500);
   
   // 手动取消节流
   setTimeout(() => {
    throttledFn.cancel();
   }, 2000);
   ```
2. memoize
   - TTL 
   ```ts
   const add = (a: number, b: number): number => {
   console.log("Calculating...");
   return a + b;
   };
   const memoizedAdd = memoize(add);
   console.log(memoizedAdd(1, 2)); // 输出计算日志
   console.log(memoizedAdd(1, 2)); // 从缓存读取
   ```
3. isObject
    - 不要问我为什么不用lodash
    ```ts
    isObject({}) // true
    isObject([]) // true
    ```
4. isPlainObject
    ```ts
    isPlainObject({}) // true
    isPlainObject([]) // false
    ```