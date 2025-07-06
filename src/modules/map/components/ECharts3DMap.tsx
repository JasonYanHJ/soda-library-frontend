import { useCallback, useEffect, useRef, useState } from "react";
import { init, registerMap, use as echartUse } from "echarts";
import { Lines3DChart, Map3DChart } from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";
import useResizeObserver from "use-resize-observer";
import { ECBasicOption } from "echarts/types/src/util/types.js";
import { LoadingOutlined } from "@ant-design/icons";

echartUse([Map3DChart, Lines3DChart, Grid3DComponent]);

export type MapData = Parameters<typeof registerMap>[1];

const ECharts3DMap = ({
  mapName,
  option,
  mapData,
}: {
  mapName: string | undefined;
  option: ECBasicOption | undefined;
  mapData: MapData | undefined;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chartRef.current || !mapName || !option || !mapData) return;

    // 初始化图表
    const myChart = init(chartRef.current);
    setChart(myChart);

    // 注册地图
    registerMap(mapName, mapData);
    // 设置配置项
    myChart.setOption(option);

    setLoading(false);

    // 清理函数
    return () => {
      myChart.dispose();
    };
  }, [mapData, mapName, option]);

  const handleResize = useCallback(() => {
    if (!chart) return;
    chart.resize();
  }, [chart]);
  useResizeObserver<HTMLDivElement>({
    ref: chartRef,
    onResize: handleResize,
  });

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white gap-2">
          <div className="text-lg">地图加载中</div>
          <LoadingOutlined />
        </div>
      )}
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default ECharts3DMap;
