import { useEffect, useState } from 'react';
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

function Zjztzl() {
  const [dataList, setDataList] = useState<DataItem[]>();

  const query = () => queryZhenji().then((res) => setDataList(res));

  useEffect(() => {
    query();
    const interval = setInterval(query, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="box box3">
      <h2>真机状态总览</h2>
      <div className="table" style={{ height: '1.6rem', overflow: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>地点</th>
              <th>NO</th>
              <th>上线状态</th>
              <th>对接伙伴</th>
            </tr>
          </thead>
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
