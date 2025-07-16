#  raf-polyfill requestAnimationFrame

# 用法
- ES or Commonjs
```ts
import { requestAnimationFrame, cancelAnimationFrame } from 'raf-polyfill-es';
// const { requestAnimationFrame, cancelAnimationFrame } = require('raf-polyfill-es');

const animationId = requestAnimationFrame((time) => {
  console.log('Animation frame at', time);
  // Animation logic here
});

// To cancel:
cancelAnimationFrame(animationId);
```

- Optionally add to window if it exists
```ts
// main file
import 'raf-polyfill-es';
```