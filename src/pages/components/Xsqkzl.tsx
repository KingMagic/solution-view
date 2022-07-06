import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import {
  queryFangAnXiaoShou,
  queryHangYeJiaoFu,
  queryHangYeXiaoShou,
} from '../service';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const optionPie1_1 = {
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    top: '0%',
    containLabel: true,
  },
  color: ['#682cea', '#2a7bf3', '#00e284', '#fd8c04', '#a5a5a5'],
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '80%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
          fontWeight: 'bold',
          color: '#fff',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 20,
          name: '医疗',
        },
        {
          value: 30,
          name: '商业市场',
        },
        {
          value: 20,
          name: '金融',
        },
        {
          value: 20,
          name: '教育',
        },
        {
          value: 20,
          name: '智能制造',
        },
      ],
    },
  ],
};

const Xsqkzl = () => {
  const [clock, setClock] = useState(0);
  const [options, setOptions] = useState<echarts.EChartsOption>();

  useEffect(() => {
    const interval = setInterval(() => setClock((pre) => pre + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    var dom = document.getElementById('containerPie1_1');
    var myChart = echarts.init(dom);
    myChart.setOption(optionPie1_1, true);
  }, []);

  useEffect(() => {
    queryFangAnXiaoShou().then((res) => console.log(res));
  }, []);

  return (
    <section className="box box1">
      <h2>销售情况总览</h2>
      <div className="g-filter">
        <a href="" className="item w45 on">
          行业已销售情况
        </a>
        <a href="" className="item w45">
          已售项目情况
        </a>
      </div>

      <div className="g-filterBD">
        <div className="tab-con">
          <div className="uc-flex">
            <div className="g-legend flex uc-ml80 uc-mb20">
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#682cea' }}></i>
                交付中
              </div>
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#00e284' }}></i>
                已交付
              </div>
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#a5a5a5' }}></i>
                待交付
              </div>
            </div>
            <div
              id="containerPie1_1"
              style={{ width: '1.5rem', height: '1.5rem', margin: '0 .4rem' }}
            ></div>
          </div>
          <div className="operate">
            <a href="" className="btn">
              <img src="images/home-icon-1.png" className="uc-icon16" alt="" />
              已中标项目类型占比
            </a>
          </div>
        </div>
        <div className="tab-con">
          <div className="uc-flex">
            <div className="g-legend flex uc-ml80 uc-mb20">
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#682cea' }}></i>
                行业宝
              </div>
              <div className="item">
                <i className="dot" style={{ backgroundColor: '#00e284' }}></i>
                数字化办公
              </div>
            </div>
            <div
              id="containerPie1_2"
              style={{ width: '1.5rem', height: '1.5rem', margin: '0 .4rem' }}
            ></div>
          </div>
          <div className="operate">
            <a href="" className="btn">
              <img src="images/home-icon-1.png" className="uc-icon16" alt="" />
              行业线项目数
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Xsqkzl;
