import { useEffect, useRef, useState } from 'react';
import easyScroll from 'easy-scroll';
import { queryZhenji } from '../service';
import green from '../../images/status-green.png';
import red from '../../images/status-red.png';

type DataItem = {
  id: number;
  No: string;
  DiDian: string;
  Status: boolean;
  YiWanCheng: string;
};

let scrollFlag = true;
let side = false;
function Zjztzl() {
  const [dataList, setDataList] = useState<DataItem[]>();
  const ref = useRef(null);

  const query = () => queryZhenji().then((res) => setDataList(res));

  useEffect(() => {
    query();
    const interval = setInterval(query, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (temp: boolean) => {
    easyScroll({
      scrollableDomEle: ref.current,
      direction: side ? 'top' : 'bottom',
      duration: side ? 1000 : 5000,
      easingPreset: 'easeInQuad',
      onRefUpdateCallback: (id) => {
        if (!scrollFlag) {
          window.cancelAnimationFrame(id);
        }
      },
      onAnimationCompleteCallback: () => {
        side = !temp;
        scrollTo(side);
      },
    });
  };

  useEffect(() => {
    if (ref.current) {
      scrollTo(side);
    }
  }, [ref.current]);

  const mouseEnter = () => {
    scrollFlag = false;
  };

  const mouseLeave = () => {
    scrollFlag = true;
    scrollTo(side);
  };

  return (
    <section className="box box3">
      <h2>真机状态总览</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>地点</th>
              <th>NO</th>
              <th>上线状态</th>
              <th>对接伙伴</th>
            </tr>
          </thead>
        </table>
      </div>
      <div
        ref={ref}
        className="table"
        style={{ height: '1.5rem', overflow: 'auto' }}
      >
        <table onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
          <tbody>
            {dataList?.map((item) => (
              <tr key={item.No}>
                <td>{item.DiDian}</td>
                <td>{item.No}</td>
                <td>
                  <img
                    src={item.Status ? green : red}
                    className="uc-icon16"
                    alt=""
                  />
                </td>
                <td>{item.YiWanCheng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Zjztzl;
