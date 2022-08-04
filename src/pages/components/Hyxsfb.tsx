import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryFaxsqj, queryHangYeXiaoShou } from '../service';
import { colorList, defaultOptions } from '../utils';
import PieChart from './PieChart';

function Hyxsfb() {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTab((tab + 1) % 4), 45 * 1000);
    return () => clearInterval(interval);
  }, [tab]);

  return (
    <section className="box box7">
      <div className="box7-1">
        <h2>行业销售分布</h2>
        <PieChart
          layout="right"
          query={queryHangYeXiaoShou}
          seriesName="项目数"
          width="2.4rem"
          height="2.4rem"
          margin="0rem 0rem"
        />
      </div>
      <div className="box7-2">
        <h2>解决方案销售分布</h2>
        <div className="uc-flex">
          <div className="g-filterBD flex">
            <div
              className="tab-con"
              style={{ display: tab === 0 ? 'block' : 'none' }}
            >
              <PieChart
                layout="right"
                query={() => queryFaxsqj('方案销售全景')}
                seriesName="项目数"
                width="2.4rem"
                height="2.4rem"
                margin="0rem 0rem"
              />
            </div>
            <div
              className="tab-con"
              style={{ display: tab === 1 ? 'block' : 'none' }}
            >
              <PieChart
                layout="right"
                query={() => queryFaxsqj('行业宝')}
                seriesName="项目数"
                width="2.4rem"
                height="2.4rem"
                margin="0rem 0rem"
              />
            </div>
            <div
              className="tab-con"
              style={{ display: tab === 2 ? 'block' : 'none' }}
            >
              <PieChart
                layout="right"
                query={() => queryFaxsqj('智慧教室')}
                seriesName="项目数"
                width="2.4rem"
                height="2.4rem"
                margin="0rem 0rem"
              />
            </div>
            <div
              className="tab-con"
              style={{ display: tab === 3 ? 'block' : 'none' }}
            >
              <PieChart
                layout="right"
                query={() => queryFaxsqj('办公宝')}
                seriesName="项目数"
                width="2.4rem"
                height="2.4rem"
                margin="0rem 0rem"
              />
            </div>
          </div>

          <div className="g-filter style2">
            <a
              onClick={() => setTab(0)}
              className={`item ${tab === 0 ? 'on' : undefined}`}
            >
              解决方案销售全景
            </a>
            <a
              onClick={() => setTab(1)}
              className={`item ${tab === 1 ? 'on' : undefined}`}
            >
              行业宝方案销售全景
            </a>
            <a
              onClick={() => setTab(2)}
              className={`item ${tab === 2 ? 'on' : undefined}`}
            >
              智慧教室方案销售全景
            </a>
            <a
              onClick={() => setTab(3)}
              className={`item line-two ${tab === 3 ? 'on' : undefined}`}
            >
              商业市场数字化办公
              <br />
              方案销售全景
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hyxsfb;
