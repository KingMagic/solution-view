import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { queryXqldxq } from '../service';
import arrow from '../../images/alert-total-arrow.png';
import moment from 'moment';

type DataItem = {
  id: number;
  Action: string;
  MilestoneDate: string;
  System: string;
  Version: string;
  demands: number;
};

const ModalRB = (props: any) => {
  const { onClose } = props;
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [unikeyList, setUnikeyList] = useState<string[]>([]);

  useEffect(() => {
    queryXqldxq().then((res) => {
      const unikey = [
        ...new Set(
          res.map((item: DataItem) => item.System + '$$' + item.Version),
        ),
      ];
      setDataList(res);
      setUnikeyList(unikey as string[]);
    });
  }, []);

  const dom = (
    <div className="uc-alert uc-alert-total uc-show">
      <div className="over-close"></div>
      <div className="box">
        <div className="title">
          <b>需求规划落地汇总</b>
          <a onClick={onClose} className="btn-close">
            <i className="uc-font uc-close"></i>
          </a>
        </div>
        <div className="main">
          <h3>版本共落地需求：</h3>
          <ul className="list">
            {unikeyList.map((key) => {
              const [system, version] = key.split('$$');
              const filterData = dataList
                .filter(
                  (data) => data.System === system && data.Version === version,
                )
                .filter((data) => data.demands && data.demands > 0);
              // const dateList = filterData.map(data => moment(data.MilestoneDate).valueOf())
              return (
                <li key={key}>
                  <div className="left">
                    <p>{system}</p>
                    <p>{version}</p>
                  </div>
                  <div className="right" style={{ width: '7.45rem' }}>
                    {filterData.map((data) => (
                      <div className="item" key={data.MilestoneDate}>
                        <p>
                          <time>{data.MilestoneDate}</time>
                        </p>
                        <h4 style={{ color: '#ffffff' }}>{data.Action}</h4>
                        <img src={arrow} className="icon" alt="" />
                        <div className="btm">
                          接纳需求：
                          <b style={{ color: '#ffad1e' }}>{data.demands}</b>
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(dom, document.body);
};

export default ModalRB;
