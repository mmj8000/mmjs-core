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
