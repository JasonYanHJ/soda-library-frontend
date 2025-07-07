import { useEffect, useState } from "react";
import ECharts3DMap, { MapData } from "./components/ECharts3DMap";

const mapName = "shanghai";
const option = {
  backgroundColor: "rgba(0,0,0,0)",
  series: [
    {
      type: "map3D",
      map: mapName,
      itemStyle: {
        color: "#1e90ff",
        borderWidth: 1,
        borderColor: "#fff",
      },
      emphasis: {
        itemStyle: {
          color: "rgba(255, 127, 80, 1)",
        },
      },
      zlevel: 1,

      // 用于鼠标的旋转，缩放等视角控制。
      viewControl: {
        projection: "orthographic", // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
        damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
        panMouseButton: "left", // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
        rotateMouseButton: "right", // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

        orthographicSize: 100, // 正交投影的大小。在 projection 为'orthographic'的时候有效。
        minOrthographicSize: 20, // 正交投影缩放的最小值。在 projection 为'orthographic'的时候有效。
        maxOrthographicSize: 300, // 正交投影缩放的最大值。在 projection 为'orthographic'的时候有效。

        alpha: 40, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
        beta: 15, // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
        minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
        maxAlpha: 90, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
        minBeta: -Infinity, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
        maxBeta: Infinity, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]

        animation: false, // 是否开启动画。[ default: true ]
      },
    },
  ],
};

const Shanghai3DMap = () => {
  const [mapData, setMapData] = useState<MapData | undefined>(undefined);
  useEffect(() => {
    fetch("https://jlm-1321383016.cos.ap-shanghai.myqcloud.com/map/data.json")
      .then((res) => res.json())
      .then((res) => setMapData(res));
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <ECharts3DMap mapName={mapName} option={option} mapData={mapData} />
    </div>
  );
};

export default Shanghai3DMap;
