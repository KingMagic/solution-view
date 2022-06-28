import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { queryHangYeXiaoShou } from '../service';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const Hyxsfb = () => {
  const [hyxsOptions, setHyxsOptions] = useState<Highcharts.Options>(); // 行业销售情况
  const [hyxsDataList, setHyxsDatalist] = useState<DataItem[]>([]);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setClock((pre) => pre + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    queryHangYeXiaoShou().then((res) => setHyxsDatalist(res));
  }, []);

  useEffect(() => {
    if (hyxsDataList.length > 0) {
      setHyxsOptions({
        title: {
          text: undefined,
        },
        chart: {
          backgroundColor: 'rgba(0,0,0,0)',
        },
        colors: ['#00E284', '#06479C', '#682CEA', '#ED7D31', '#A5A5A5'],
        credits: {
          enabled: false,
        },
        legend: {
          align: 'left',
          layout: 'vertical',
          verticalAlign: 'middle',
          itemDistance: 48,
        },
        series: [
          {
            type: 'pie',
            data: hyxsDataList.map((item, index) => ({
              name: item.ValueType,
              y: item.Value,
              sliced: clock % hyxsDataList.length === index,
            })),
            dataLabels: {
              enabled: false,
            },
            innerSize: '40%',
            showInLegend: true,
          },
        ],
      });
    }
  }, [hyxsDataList]);

  return (
    <div>
      <div>title</div>
      <HighchartsReact highcharts={Highcharts} options={hyxsOptions} />
    </div>
  );
};

export default Hyxsfb;
