import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryBzwtzl } from '../service';
import {
  defaultOptions,
  refreshTime,
  tabChangeTime,
  itemChangeTime,
} from '../utils';
import PieChart from './PieChart';

function Bzwtzl() {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTab((tab + 1) % 2), tabChangeTime);
    return () => clearInterval(interval);
  }, [tab]);

  return (
    <section className="box box2">
      <h2>本周问题总览</h2>
      <div className="g-filter">
        <a
          onClick={() => setTab(0)}
          className={`item w45 ${tab === 0 ? 'on' : undefined}`}
        >
          本周处理问题
        </a>
        <a
          onClick={() => setTab(1)}
          className={`item w45 ${tab === 1 ? 'on' : undefined}`}
        >
          负向改进进展
        </a>
      </div>

      <div className="g-filterBD">
        <div
          className="tab-con"
          style={{ display: tab === 0 ? 'block' : 'none' }}
        >
          <PieChart
            query={() => queryBzwtzl('本周处理问题')}
            seriesName="问题数"
          />
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 1 ? 'block' : 'none' }}
        >
          <PieChart query={() => queryBzwtzl('负向改进')} seriesName="问题数" />
        </div>
      </div>
    </section>
  );
}

export default Bzwtzl;
