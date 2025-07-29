import { type EChartsOption } from "echarts";

export const pieOption: EChartsOption = {
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};

export const lineOption: EChartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    show: false,
    // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    // itemHeight: 5,
    orient: "vertical",
    type: "scroll",
    top: "center",
    // width: "auto",
    height: "50%",
    right: "center",
    formatter(name) {
      return `{name|${name}}  {value|121212}\n{test|测试}`;
    },
    textStyle: {
      rich: {
        name: {
          color: "red",
          fontSize: 10,
          // width: 100,
          // padding: [0, 112,2,3],
        },
        test: {
          color: "blue",
        },
      },
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      symbol: "circle",
      data: [
        {
          name: "120",
          value: 132,
        },
        132,
        101,
        134,
        90,
        230,
        210,
      ],
    },
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      symbol: "line",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      label: {
        show: true,
        position: "top",
      },
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

export const barOption: EChartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    show: false,
    // data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    itemHeight: 10,
    // right: '10%',
    // left: "center",
    // left: '10%',
    // width: 'atuo'
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Email",
      type: "bar",
      stack: "Total",
      emphasis: {
        focus: "series",
      },
      // symbol: 'circle',
      data: [235, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "bar",
      stack: "Total",

      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "bar",
      stack: "Total",

      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "bar",
      stack: "Total",

      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "bar",
      stack: "Total",
      label: {
        show: true,
        position: "top",
      },

      emphasis: {
        focus: "series",
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

export const echartsOptions: EChartsOption = {
  series: [
    {
      radius: ["50%", "33%"],
      center: ["center", "30%"],
    },
  ],
  legend: {
    show: false,
    orient: "horizontal",
    width: "90%",
    bottom: 0,
    left: "center",
    itemGap: 18,
    itemWidth: 16,
    itemHeight: 16,
    textStyle: {
      color: "#606266",
      padding: [10, 0, 5, 5],
      fontSize: 15, // 文本字体大小
      lineHeight: 20,
      rich: {
        name: {
          fontSize: 14,
          color: "#606266",
           width: 70,
          align: 'left',
        },
        value: {
          width: 70,
          fontWeight: 700,
          fontSize: 20,
          lineHeight: 24,
          color: "#303133",
          align: 'left',
        },
      },
    },
  },
  title: [
    {
      subtextStyle: {
        fontSize: 16,
        color: "#606266",
      },
      left: "48.5%",
      top: "24.5%",
      // textAlign: 'center'
    },
    {
      left: "48.5%",
      top: "31%",
    },
  ],
};
