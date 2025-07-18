<template>
  <div class="video-player-wrapper">
    <div class="video-container" ref="containerRef">
      <video
        :id="playerId"
        class="video-js"
        :poster="poster"
        preload="auto"
        :controls="showControls"
        playsinline="true"
      ></video>
    </div>
    <div
      v-if="isShowBandwidthDialog"
      tabindex="-1"
      autofocus
      @blur="popupBlur"
      class="bandwidth-dialog"
      ref="popupRef"
    >
      <div class="dialog-content">
        <h3>选择视频质量</h3>
        <div class="bandwidth-options">
          <button
            v-for="(option, key) in bandwidthOptions"
            :key="key"
            :class="{ active: currentBandwidthPreset === key }"
            @click="selectBandwidth(key)"
          >
            {{ option.label }} ({{ option.description }})
          </button>
        </div>
      </div>
    </div>
    <div class="floating-controls" v-if="currentBandwidthPreset !== 'custom'">
      <button
        @click="toggleBandwidthDialog"
        class="control-btn"
        title="切换质量"
      >
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            fill="currentColor"
            d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  shallowRef,
  onMounted,
  onBeforeUnmount,
  watch,
  computed,
  nextTick,
  PropType,
} from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import type Player from "video.js/dist/types/player";
import { BANDWIDTH_PRESETS } from "./const";
import type {
  BandwidthPreset,
  ControlBarProps,
  VideoSource,
  PlayerOptions,
  BandwidthOptionRecord,
} from "./types";
import { merge } from "lodash-es";

export default defineComponent({
  name: "OptimizedVideoPlayer",
  props: {
    src: {
      type: [String, Object] as PropType<string | VideoSource>,
      required: true,
    },
    controlBar: {
      type: Object as PropType<ControlBarProps>,
      default: () => ({}),
    },
    options: {
      type: Object as PropType<PlayerOptions>,
      default: () => ({}),
    },
    playerId: {
      type: String,
      default: () =>
        `video-player-${Math.random().toString(36).substring(2, 9)}`,
    },
    bandwidthOptionProps: {
      type: Object as PropType<BandwidthOptionRecord>,
      default: () => BANDWIDTH_PRESETS,
    },
    poster: {
      type: String,
      default: "",
    },
    intersectionThreshold: {
      type: Number,
      default: 0.5,
      validator: (value: number) => value >= 0 && value <= 1,
    },
    bandwidthPreset: {
      type: String as PropType<BandwidthPreset>,
      default: "custom",
    },
    bandwidthLimit: {
      type: Number,
      default: 300000,
      validator: (value: number) => value >= 100000,
    },
    showControls: {
      type: Boolean,
      default: true,
    },
    showBandwidthSelector: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["ready", "play", "pause", "ended", "error", "bandwidth-change"],
  setup(props, { emit, expose }) {
    const player = shallowRef<Player | null>(null);
    const containerRef = shallowRef<HTMLElement | null>(null);
    const popupRef = shallowRef<HTMLElement | null>(null);
    const isShowBandwidthDialog = shallowRef(false);
    const currentBandwidthPreset = shallowRef<
      BandwidthPreset | string | number
    >(props.bandwidthPreset);
    let intersectionObserver: IntersectionObserver | null = null;

    // 计算带宽选项
    const bandwidthOptions = computed(() => {
      const options = { ...props.bandwidthOptionProps };
      if (props.bandwidthPreset !== "custom") {
        delete options.custom;
      }
      return options;
    });

    // 计算实际带宽限制
    const currentBandwidth = computed(() => {
      return currentBandwidthPreset.value === "custom"
        ? props.bandwidthLimit
        : bandwidthOptions.value[currentBandwidthPreset.value]?.value;
    });

    // 合并默认选项和传入的选项
    const playerOptions = computed(() =>
      merge(
        {
          autoplay: true,
          controls: props.showControls,
          muted: true,
          fluid: true,
          preload: "auto",
          liveui: false,
          controlBar: props.controlBar,
          html5: {
            nativeControlsForTouch: false,
            vhs: {
              overrideNative: true,
              bandwidth: currentBandwidth.value,
              enableLowInitialPlaylist: true,
              limitRenditionByPlayerDimensions: false,
            },
          },
        },
        props.options
      )
    );

    // 初始化播放器
    const initPlayer = () => {
      if (player.value) return;

      const videoElement = document.getElementById(props.playerId);
      if (!videoElement) return;

      player.value = videojs(videoElement, playerOptions.value, () => {
        emit("ready", player.value);
      });

      setupEventListeners();
      setupIntersectionObserver();
      setupVisibilityListener();
      setSource(props.src);
    };

    // 设置视频源
    const setSource = (source: string | VideoSource) => {
      if (!player.value) return;

      if (typeof source === "string") {
        player.value.src({ src: source, type: "application/x-mpegURL" });
      } else {
        player.value.src(source);
      }
    };

    // 设置事件监听
    const setupEventListeners = () => {
      if (!player.value) return;

      player.value.on("play", () => emit("play"));
      player.value.on("pause", () => emit("pause"));
      player.value.on("ended", () => emit("ended"));
      player.value.on("error", () => emit("error"));
    };

    // 设置交叉观察器
    const setupIntersectionObserver = () => {
      if (!player.value || !containerRef.value) return;

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!player.value) return;

            if (!entry.isIntersecting) {
              player.value.pause();
              emit("pause");
            } else if (!document.hidden && player.value.autoplay()) {
              player.value!.play()?.catch((e) => {
                console.log("播放被阻止:", e);
                emit("error", e);
              });
            }
          });
        },
        {
          threshold: props.intersectionThreshold,
          root: null,
        }
      );

      intersectionObserver.observe(containerRef.value);
    };

    // 设置页面可见性监听
    const setupVisibilityListener = () => {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    };

    const handleVisibilityChange = () => {
      if (!player.value) return;

      if (document.hidden) {
        player.value.pause();
        emit("pause");
      } else if (
        containerRef.value &&
        isElementInViewport(containerRef.value)
      ) {
        player.value!.play()?.catch((e) => {
          console.log("播放被阻止:", e);
          emit("error", e);
        });
      }
    };

    // 检查元素是否在视口中
    const isElementInViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // 更新带宽限制
    const updateBandwidthLimit = (newLimit: number) => {
      if (player.value?.tech_?.vhs) {
        player.value.tech_.vhs.bandwidth = newLimit;
        player.value.tech_.vhs.throughput = newLimit;
        emit("bandwidth-change", newLimit);
      }
    };

    // 选择带宽预设
    const selectBandwidth = (preset: BandwidthPreset | string | number) => {
      if (currentBandwidthPreset.value !== preset) {
        currentBandwidthPreset.value = preset;
      }

      isShowBandwidthDialog.value = false;
    };

    function popupBlur() {
      setTimeout(() => {
        isShowBandwidthDialog.value = false;
      }, 100);
    }

    // 切换带宽选择对话框
    const toggleBandwidthDialog = () => {
      isShowBandwidthDialog.value = !isShowBandwidthDialog.value;
      if (isShowBandwidthDialog.value) {
        nextTick(() => {
          popupRef.value?.focus();
        });
      }
    };

    // 清理
    const disposePlayer = () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect();
        intersectionObserver = null;
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (player.value) {
        player.value.dispose();
        player.value = null;
      }
    };

    // 响应式更新
    watch(
      () => props.src,
      (newSrc) => setSource(newSrc)
    );

    watch(currentBandwidth, (newLimit) => updateBandwidthLimit(newLimit));

    watch(
      () => props.showControls,
      (newVal) => {
        if (player.value) player.value.controls(newVal);
      }
    );

    watch(
      () => props.bandwidthPreset,
      (newPreset) => {
        currentBandwidthPreset.value = newPreset as BandwidthPreset;
      }
    );

    onMounted(initPlayer);
    onBeforeUnmount(disposePlayer);

    // 暴露给父组件的方法
    const exposeMethods = {
      play: () =>
        player.value?.play() || Promise.reject("Player not initialized"),
      pause: () => player.value?.pause(),
      dispose: disposePlayer,
      getPlayer: () => player.value,
      setBandwidth: (preset: BandwidthPreset | number) => {
        if (typeof preset === "string") {
          currentBandwidthPreset.value = preset;
        } else {
          currentBandwidthPreset.value = "custom";
          updateBandwidthLimit(preset);
        }
      },
      toggleControls: (show?: boolean) => {
        if (player.value) {
          const newState =
            typeof show === "boolean" ? show : !player.value.controls();
          player.value.controls(newState);
        }
      },
      showBandwidthDialog: () => {
        isShowBandwidthDialog.value = true;
        nextTick(() => {
          popupRef.value?.focus();
        });
      },
      hideBandwidthDialog: () => {
        popupRef.value?.blur();
        isShowBandwidthDialog.value = false;
      },
    };

    expose(exposeMethods);

    return {
      containerRef,
      popupRef,
      isShowBandwidthDialog,
      currentBandwidthPreset,
      bandwidthOptions,
      toggleBandwidthDialog,
      selectBandwidth,
      popupBlur,
      ...exposeMethods,
    };
  },
});
</script>

<style scoped>
.video-player-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.video-container {
  width: 100%;
  height: 100%;
}

.video-js {
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
  background-color: #000;
  padding-top: 0 !important;
  height: 100% !important;
}

/* 带宽选择弹窗 */
.bandwidth-dialog {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 20px;
  overflow: auto;
}

.dialog-content {
  background-color: #2d2d2d;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  color: white;
}

.dialog-content h3 {
  margin-top: 0;
  text-align: center;
}

.bandwidth-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
}

.bandwidth-options button {
  padding: 10px;
  border: 1px solid #444;
  background: #333;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
}

.bandwidth-options button:hover {
  background: #444;
}

.bandwidth-options button.active {
  background: #1976d2;
  border-color: #1976d2;
}

/* 浮动控制按钮 */
.floating-controls {
  position: absolute;
  bottom: 35px;
  right: 11px;
  z-index: 100;
  mix-blend-mode: difference;
}

.floating-controls .control-btn {
  border-radius: 50%;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.5;
}

.floating-controls .control-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}
</style>
