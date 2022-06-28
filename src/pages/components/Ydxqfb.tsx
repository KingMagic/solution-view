import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { queryHyjjfafb, queryYdxqfb } from '../service';
import styles from '../index.less';

type DataItem = {
  ValueType: string;
  Value: number;
};

const Ydxqfb = () => {
  const [options, setOptions] = useState<Highcharts.Options>();
  const [dataList, setDataList] = useState<DataItem[]>([]);

  useEffect(() => {
    queryYdxqfb().then((res) => setDataList(res));
  }, []);

  useEffect(() => {
    if (dataList.length > 0) {
      setOptions({
        title: {
          text: undefined,
        },
        chart: {
          backgroundColor: 'rgba(0,0,0,0)',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          categories: dataList.map((item) => item.ValueType),
        },
        series: [
          {
            type: 'area',
            name: '月度需求分布',
            data: dataList.map((item) => item.Value),
            dataLabels: {
              enabled: false,
            },
          },
        ],
      });
    }
  }, [dataList]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Ydxqfb;
