import { BANDWIDTH_PRESETS } from "./const";

// 带宽限制预设类型
export type BandwidthPreset = keyof typeof BANDWIDTH_PRESETS | 'custom'; 

export interface BandwidthOption {
    value: number;
    label: string;
    description: string;
}
export type ControlBarProps = {
    playToggle?: boolean;
    volumePanel?: boolean | { inline?: boolean };
    currentTimeDisplay?: boolean;
    timeDivider?: boolean;
    durationDisplay?: boolean;
    remainingTimeDisplay?: boolean;
    progressControl?: boolean;
    liveDisplay?: boolean;
    seekToLive?: boolean;
    fullscreenToggle?: boolean;
    pictureInPictureToggle?: boolean;
    playbackRateMenuButton?: boolean;
    chaptersButton?: boolean;
    descriptionsButton?: boolean;
    subsCapsButton?: boolean;
    audioTrackButton?: boolean;
    customControlSpacer?: boolean;
    // 可以添加更多控制项
    [key: string]: any;
};

export type VideoSource = {
    src: string;
    type: string;
};

export type PlayerOptions = {
    autoplay?: boolean;
    controls?: boolean;
    muted?: boolean;
    fluid?: boolean;
    preload?: string;
    poster?: string;
    liveui?: boolean;
    [key: string]: any;
};

export type BandwidthOptionRecord = Record<string, BandwidthOption>;