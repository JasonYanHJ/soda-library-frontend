import { ConfigProvider, Empty, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

type Architecture = {
  nameS: string;
  type: string;
  uri: string;
  address: string;
  des: string;
};
type HistoryEvent = {
  title: string;
  dateLabel: string;
  uri: string;
  description: string;
};

const LoadingSkeleton = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Skeleton: {
            gradientFromColor: "rgba(180,180,180,0.6)",
            gradientToColor: "rgba(180,180,180,0.8)",
            titleHeight: 24,
            paragraphLiHeight: 34,
          },
        },
      }}
    >
      <Skeleton active />
      <br />
      <Skeleton active />
    </ConfigProvider>
  );
};

const AreaInfo = ({ area }: { area: string }) => {
  const [architectures, setArchitectures] = useState<
    Architecture[] | undefined
  >(undefined);
  useEffect(() => {
    fetch(`http://49.235.130.150:8090/api/architecture?freetext=${area}`)
      .then((res) => res.json())
      .then((res) => setArchitectures(res.data ?? []));
  }, [area]);

  const [historyEvents, setHistoryEvents] = useState<
    HistoryEvent[] | undefined
  >(undefined);
  useEffect(() => {
    fetch(
      `http://49.235.130.150:8090/api/eventListByText?eventFreeText=${area}`
    )
      .then((res) => res.json())
      .then((res) => setHistoryEvents(res.data ?? []));
  }, [area]);

  const loading = !architectures || !historyEvents;
  const noData = !loading && !architectures.length && !historyEvents.length;

  return (
    <div
      className={`h-full bg-[url(https://jlm-1321383016.cos.ap-shanghai.myqcloud.com/map/%E4%B8%8A%E6%B5%B723.jpg)] bg-cover bg-center rounded-lg`}
    >
      <div className="h-full overflow-y-auto bg-white/65 p-4 md:px-8 md:py-6 font-bold text-blue-500 md:text-base">
        {loading ? (
          <LoadingSkeleton />
        ) : noData ? (
          <Empty className="mt-20" description="暂无数据" />
        ) : (
          <div className="flex flex-col gap-4">
            {historyEvents.length > 0 && (
              <>
                <div className="text-gray-700 text-base md:text-lg">
                  相关事件：
                </div>
                <Space wrap size={16}>
                  {historyEvents.map((e, index) => (
                    <button
                      key={index}
                      className="px-2 py-1 border border-blue-400 rounded-md hover:bg-blue-500 hover:text-white hover:cursor-pointer"
                    >
                      <Balancer>{e.title}</Balancer>
                    </button>
                  ))}
                </Space>
              </>
            )}
            {architectures.length > 0 && (
              <>
                <div className="text-gray-700 text-base md:text-lg">
                  著名建筑：
                </div>
                <Space wrap size={16}>
                  {architectures.map((a, index) => (
                    <button
                      key={index}
                      className="px-2 py-1 border border-blue-400 rounded-md hover:bg-blue-500 hover:text-white hover:cursor-pointer"
                    >
                      <Balancer>{a.nameS}</Balancer>
                    </button>
                  ))}
                </Space>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaInfo;
