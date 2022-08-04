import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryCszl } from '../service';
import icon4 from '../../images/home-icon-4.png';
import ModalLB from './ModalLB';
import PieChart from './PieChart';

function Csrwzl() {
  const [tab, setTab] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTab((tab + 1) % 3), 45 * 1000);
    return () => clearInterval(interval);
  }, [tab]);

  return (
    <>
      <section className="box box4">
        <h2>测试任务总览</h2>
        <div className="g-filter">
          <a
            onClick={() => setTab(0)}
            className={`item ${tab === 0 ? 'on' : undefined}`}
          >
            基线
          </a>
          <a
            onClick={() => setTab(1)}
            className={`item ${tab === 1 ? 'on' : undefined}`}
          >
            生态集成验证
          </a>
          <a
            onClick={() => setTab(2)}
            className={`item ${tab === 2 ? 'on' : undefined}`}
          >
            场景化需求
          </a>
        </div>

        <div className="g-filterBD">
          <div
            className="tab-con"
            style={{ display: tab === 0 ? 'block' : 'none' }}
          >
            <PieChart query={() => queryCszl('基线')} seriesName="任务数" />
            <div className="operate">
              <a onClick={() => setShowModal(true)} className="btn">
                <img src={icon4} className="uc-icon16" alt="" />
                方案开发进展
              </a>
            </div>
          </div>
          <div
            className="tab-con"
            style={{ display: tab === 1 ? 'block' : 'none' }}
          >
            <PieChart
              query={() => queryCszl('生态继承验证')}
              seriesName="任务数"
            />
          </div>
          <div
            className="tab-con"
            style={{ display: tab === 2 ? 'block' : 'none' }}
          >
            <PieChart
              query={() => queryCszl('场景化需求')}
              seriesName="任务数"
            />
          </div>
        </div>
      </section>
      {showModal && <ModalLB onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Csrwzl;
