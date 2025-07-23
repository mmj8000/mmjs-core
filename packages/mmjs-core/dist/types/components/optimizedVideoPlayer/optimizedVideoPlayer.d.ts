import { PropType } from 'vue';
import { default as Player } from 'video.js/dist/types/player';
import { BandwidthPreset, ControlBarProps, VideoSource, PlayerOptions, BandwidthOptionRecord } from './types';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    src: {
        type: PropType<string | VideoSource>;
        required: true;
    };
    controlBar: {
        type: PropType<ControlBarProps>;
        default: () => {};
    };
    options: {
        type: PropType<PlayerOptions>;
        default: () => {};
    };
    playerId: {
        type: StringConstructor;
        default: () => string;
    };
    bandwidthOptionProps: {
        type: PropType<BandwidthOptionRecord>;
        default: () => {
            minimum: {
                value: number;
                label: string;
                description: string;
            };
            veryLow: {
                value: number;
                label: string;
                description: string;
            };
            low: {
                value: number;
                label: string;
                description: string;
            };
            medium: {
                value: number;
                label: string;
                description: string;
            };
            high: {
                value: number;
                label: string;
                description: string;
            };
            ultra: {
                value: number;
                label: string;
                description: string;
            };
            hd: {
                value: number;
                label: string;
                description: string;
            };
            fullHd: {
                value: number;
                label: string;
                description: string;
            };
            ultraHd: {
                value: number;
                label: string;
                description: string;
            };
            maximum: {
                value: number;
                label: string;
                description: string;
            };
        };
    };
    poster: {
        type: StringConstructor;
        default: string;
    };
    intersectionThreshold: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    bandwidthPreset: {
        type: PropType<BandwidthPreset>;
        default: string;
    };
    bandwidthLimit: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    showControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    showBandwidthSelector: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    play: () => Promise<any>;
    pause: () => void | undefined;
    dispose: () => void;
    getPlayer: () => Player | null;
    setBandwidth: (preset: BandwidthPreset | number) => void;
    toggleControls: (show?: boolean) => void;
    showBandwidthDialog: () => void;
    hideBandwidthDialog: () => void;
    containerRef: import('vue').ShallowRef<HTMLElement | null, HTMLElement | null>;
    popupRef: import('vue').ShallowRef<HTMLElement | null, HTMLElement | null>;
    isShowBandwidthDialog: import('vue').ShallowRef<boolean, boolean>;
    currentBandwidthPreset: import('vue').ShallowRef<string | number, string | number>;
    bandwidthOptions: import('vue').ComputedRef<{
        [x: string]: import('./types').BandwidthOption;
    }>;
    toggleBandwidthDialog: () => void;
    selectBandwidth: (preset: BandwidthPreset | string | number) => void;
    popupBlur: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("pause" | "ready" | "play" | "ended" | "error" | "bandwidth-change")[], "pause" | "ready" | "play" | "ended" | "error" | "bandwidth-change", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    src: {
        type: PropType<string | VideoSource>;
        required: true;
    };
    controlBar: {
        type: PropType<ControlBarProps>;
        default: () => {};
    };
    options: {
        type: PropType<PlayerOptions>;
        default: () => {};
    };
    playerId: {
        type: StringConstructor;
        default: () => string;
    };
    bandwidthOptionProps: {
        type: PropType<BandwidthOptionRecord>;
        default: () => {
            minimum: {
                value: number;
                label: string;
                description: string;
            };
            veryLow: {
                value: number;
                label: string;
                description: string;
            };
            low: {
                value: number;
                label: string;
                description: string;
            };
            medium: {
                value: number;
                label: string;
                description: string;
            };
            high: {
                value: number;
                label: string;
                description: string;
            };
            ultra: {
                value: number;
                label: string;
                description: string;
            };
            hd: {
                value: number;
                label: string;
                description: string;
            };
            fullHd: {
                value: number;
                label: string;
                description: string;
            };
            ultraHd: {
                value: number;
                label: string;
                description: string;
            };
            maximum: {
                value: number;
                label: string;
                description: string;
            };
        };
    };
    poster: {
        type: StringConstructor;
        default: string;
    };
    intersectionThreshold: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    bandwidthPreset: {
        type: PropType<BandwidthPreset>;
        default: string;
    };
    bandwidthLimit: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    showControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    showBandwidthSelector: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onError?: ((...args: any[]) => any) | undefined;
    onEnded?: ((...args: any[]) => any) | undefined;
    onPause?: ((...args: any[]) => any) | undefined;
    onPlay?: ((...args: any[]) => any) | undefined;
    onReady?: ((...args: any[]) => any) | undefined;
    "onBandwidth-change"?: ((...args: any[]) => any) | undefined;
}>, {
    options: PlayerOptions;
    poster: string;
    controlBar: ControlBarProps;
    playerId: string;
    bandwidthOptionProps: BandwidthOptionRecord;
    intersectionThreshold: number;
    bandwidthPreset: BandwidthPreset;
    bandwidthLimit: number;
    showControls: boolean;
    showBandwidthSelector: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
