const e = {
  // 比低质量(150kbps)更低的选项
  minimum: {
    value: 75e3,
    // 75kbps
    label: "最低质量",
    description: "75kbps (极低带宽)"
  },
  veryLow: {
    value: 1e5,
    // 100kbps
    label: "极低质量",
    description: "100kbps (弱网络)"
  },
  // 原有低质量选项
  low: {
    value: 15e4,
    // 150kbps
    label: "低质量",
    description: "150kbps (移动网络)"
  },
  // 中等质量选项
  medium: {
    value: 3e5,
    // 300kbps
    label: "中等质量",
    description: "300kbps (标清)"
  },
  high: {
    value: 75e4,
    // 750kbps
    label: "高质量",
    description: "750kbps (高清)"
  },
  // 超高质量选项
  ultra: {
    value: 15e5,
    // 1.5Mbps
    label: "超高质量",
    description: "1.5Mbps (超清)"
  },
  // 比超高质量(1.5Mbps)更高的选项
  hd: {
    value: 25e5,
    // 2.5Mbps
    label: "HD质量",
    description: "2.5Mbps (高清增强)"
  },
  fullHd: {
    value: 5e6,
    // 5Mbps
    label: "Full HD",
    description: "5Mbps (全高清)"
  },
  ultraHd: {
    value: 1e7,
    // 10Mbps
    label: "Ultra HD",
    description: "10Mbps (4K超高清)"
  },
  maximum: {
    value: 2e7,
    // 20Mbps
    label: "最高质量",
    description: "20Mbps (8K极清)"
  }
};
export {
  e as BANDWIDTH_PRESETS
};
