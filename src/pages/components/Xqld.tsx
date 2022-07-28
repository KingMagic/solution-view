import { useEffect, useRef, useState } from 'react';
import icon from '../../images/home-icon-1.png';
import { queryXqldzl } from '../service';
import ModalRB from './ModalRB';

type DataItem = {
  System: string;
  Version: string;
  demands: number;
  type: string;
};

function Xqld() {
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    queryXqldzl().then((res) => setDataList(res));
  }, []);

  return (
    <>
      <section className="box box11">
        <h2>需求规划落地汇总</h2>
        <ul className="list11">
          {dataList.map((item) => (
            <li key={item.System + item.Version}>
              <div
                className="left"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
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
        <div className="operate" style={{ position: 'relative', top: '.4rem' }}>
          <a onClick={() => setShowModal(true)} className="btn">
            <img src={icon} className="uc-icon16" alt="" />
            点击查看详情
          </a>
        </div>
      </section>
      {showModal && <ModalRB onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Xqld;
