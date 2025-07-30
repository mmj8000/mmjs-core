import { color, type EChartsOption } from "echarts";

export const pieOption: EChartsOption = {
  tooltip: {
    trigger: "item",
  },
  legend: [
    {
      show: false,
      top: "5%",
      left: "center",
      // align: 'right',
      // width: '100%',
      textStyle: {
        fontSize: 15,
        height: 15,
        lineHeight: 15,
        overflow: "breakAll",
      },
      type: "scroll",
      data: [
        {
          name: "Search Engine",
          // 强制设置图形为圆。
          icon: "image:///setting.jpg",
          // // 设置文本为红色
          textStyle: {
            fontSize: 22,
            color: "red",
          },
        },
        "Direct",
        {
          name: "Email",
          icon: "triangle",
          itemStyle: {
            color: "blue",
          },
        },
        {
          name: "Union Ads",
          itemStyle: {
            color: "red",
          },
        },
      ],
      icon: "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",
      itemStyle: {
        // color: "red",
        borderColor: "red",
        borderWidth: 1,
      },
      formatter(name) {
        return name + "-11";
      },
    },
    {
      show: false,
      bottom: "10px",
      right: "center",
      orient: "vertical",
      itemWidth: 20,
      itemStyle: {
        borderColor: "yellow",
      },
      icon: "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",
    },
  ],
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
        // color: 'red',
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
      // stack: "Total",
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
      // stack: "Total",
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
      // stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      // stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "line",
      // stack: "Total",
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
    // width: 'atuo',
    left: "center",
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
      // stack: "Total",
      emphasis: {
        focus: "series",
      },
      // symbol: 'circle',
      data: [235, 132, 101, 134, 90, 230, 210],
      itemStyle: {
        color() {
          return  "red"
        },
      },
    },
    {
      name: "Union Ads",
      type: "bar",
      // stack: "Total",

      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "bar",
      // stack: "Total",
      itemStyle: {
        color: {
          type: "pattern",
          image: "/setting.jpg",
          imageHeight: 100,
          imageWidth: 100,
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "bar",
      // stack: "Total",
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            {
              color: "red",
              offset: 0,
            },
            {
              color: "blue",
              offset: 1,
            },
          ],
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "bar",
      // stack: "Total",
      label: {
        show: true,
        position: "top",
      },
      itemStyle: {
        color: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [
            {
              color: "red",
              offset: 0,
            },
            {
              color: "blue",
              offset: 1,
            },
          ],
        },
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
          align: "left",
        },
        value: {
          width: 70,
          fontWeight: 700,
          fontSize: 20,
          lineHeight: 24,
          color: "#303133",
          align: "left",
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
