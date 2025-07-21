export * from './intersectionDraw'; // 先这样导出，下面也要重复导出组件，避免按需导出失败
export * from './optimizedVideoPlayer';

import IntersectionDraw from './intersectionDraw/intersectionDraw.vue';
import OptimizedVideoPlayer from './optimizedVideoPlayer/optimizedVideoPlayer.vue';
import {
    BANDWIDTH_PRESETS,
} from './optimizedVideoPlayer/const';

export {
    IntersectionDraw,
    OptimizedVideoPlayer,
    BANDWIDTH_PRESETS,
}