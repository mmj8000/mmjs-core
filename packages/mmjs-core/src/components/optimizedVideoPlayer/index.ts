import OptimizedVideoPlayer from "./optimizedVideoPlayer.vue";
import { BANDWIDTH_PRESETS } from "./const";
export type OptimizedVideoPlayerInstanceType = InstanceType<
  typeof OptimizedVideoPlayer
>;

export { OptimizedVideoPlayer, BANDWIDTH_PRESETS };
export type {
  BandwidthPreset,
  BandwidthOption,
  ControlBarProps,
  VideoSource,
  PlayerOptions,
  BandwidthOptionRecord,
} from "./types";

/**
 * @deprecated ^0.11.0 版本后，OptimizedVideoPlayer 将来的某个版本弃用默认导出，使用具名导出 
 */
export default OptimizedVideoPlayer;
console.warn(
  " ^0.11.0 版本后，OptimizedVideoPlayer 将来的某个版本弃用默认导出，使用具名导出 "
);
