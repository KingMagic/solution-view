import { useEffect, useRef, useState } from 'react';
import icon from '../../images/home-icon-1.png';
import { queryXqldzl } from '../service';

type DataItem = {
  System: string;
  Version: string;
  demands: number;
  type: string;
};

const Xqld = () => {
  const [dataList, setDataList] = useState<DataItem[]>([]);

  useEffect(() => {
    queryXqldzl().then((res) => setDataList(res));
  }, []);

  return (
    <section className="box box11">
      <h2>需求规划落地汇总</h2>
      <ul className="list11">
        {dataList.map((item) => (
          <li>
            <div className="left">
              <p>
                <b>{item.System}</b>
              </p>
              <p>{item.Version}</p>
            </div>
            <div className="right">
              <p>落地需求数</p>
              <p className="time">{item.demands}</p>
            </div>
          </li>
        ))}
      </ul>
      <div
        className="operate"
        style={{ position: 'relative', bottom: '.1rem' }}
      >
        <a className="btn">
          <img src={icon} className="uc-icon16" alt="" />
          点击查看详情
        </a>
      </div>
    </section>
  );
};

export default Xqld;
