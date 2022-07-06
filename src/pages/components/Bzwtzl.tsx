import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { queryBzwtzl } from '../service';
import styles from '../index.less';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const Bzwtzl = () => {
  const [options, setOptions] = useState<Highcharts.Options>(); // 行业销售情况
  const [dataList, setDatalist] = useState<DataItem[]>([]);
  const [optionsA, setOptionsA] = useState<Highcharts.Options>(); // 方案销售情况
  const [dataListA, setDataListA] = useState<DataItem[]>([]);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setClock((pre) => pre + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    queryBzwtzl('本周处理问题').then((res) => setDatalist(res));
    queryBzwtzl('负向改进').then((res) => setDataListA(res));
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
        colors: ['#00E284', '#06479C', '#682CEA', '#ED7D31', '#A5A5A5'],
        credits: {
          enabled: false,
        },
        legend: {
          align: 'left',
          layout: 'vertical',
          verticalAlign: 'middle',
          itemStyle: {
            color: '#ffffff',
            fontSize: '16px',
          },
          x: 100,
        },
        series: [
          {
            type: 'pie',
            data: dataList.map((item, index) => ({
              name: item.ValueType,
              y: item.Value,
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
  }, [dataList]);

  useEffect(() => {
    if (dataListA.length > 0) {
      setOptionsA({
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
          itemStyle: {
            color: '#ffffff',
            fontSize: '16px',
          },
          x: 100,
        },
        tooltip: {
          enabled: false,
        },
        series: [
          {
            type: 'pie',
            data: dataListA.map((item, index) => ({
              name: item.ValueType,
              y: item.Value,
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
  }, [dataListA]);

  return (
    <section className="box box2">
      <h2>本周问题总览</h2>
      <div className="g-filter">
        <a href="" className="item w45 on">
          本周处理问题
        </a>
        <a href="" className="item w45">
          负向改进进展
        </a>
      </div>

      <div className="g-filterBD">
        <div className="tab-con">
          <div className="uc-flex">
            <div className="g-legend flex uc-ml20">
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#682cea' }}></i>
                体验类问题
              </div>
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#00e284' }}></i>
                质量问题
              </div>
            </div>
            <div
              id="containerPie2_1"
              style={{ width: '1.5rem', height: '1.5rem', margin: '0 .4rem' }}
            ></div>
          </div>
        </div>
        <div className="tab-con">
          <div className="uc-flex">
            <div className="g-legend flex uc-ml20">
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#682cea' }}></i>
                已接纳并落地
              </div>
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#2a7bf3' }}></i>
                已接纳但未排进版本
              </div>
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#a5a5a5' }}></i>
                退回
              </div>
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#00e284' }}></i>
                待处理
              </div>
            </div>
            <div
              id="containerPie2_2"
              style={{ width: '1.5rem', height: '1.5rem', margin: '0 .4rem' }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bzwtzl;
