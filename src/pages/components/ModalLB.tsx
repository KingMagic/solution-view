import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { queryFakf } from '../service';
import { colorList } from '../utils';

type DataItem = {
  id: number;
  HangYe: string;
  FangAnName: string;
  JieDuan: string;
  JinDu: string;
  DI: string;
  ChengSuDu: number;
  Date: string;
};

const ModalLB = (props: any) => {
  const { onClose } = props;
  const [dataList, setDataList] = useState<DataItem[]>([]);

  useEffect(() => {
    queryFakf().then((res) => {
      setDataList(res);
    });
  }, []);

  const dom = (
    <div className="uc-alert uc-alert-progress uc-show">
      <div className="over-close" />
      <div className="box">
        <div className="title">
          <b>方案开发进展</b>{' '}
          <a onClick={onClose} className="btn-close">
            <i className="uc-font uc-close" />
          </a>
        </div>
        <div className="table" style={{ marginTop: '.2rem' }}>
          <table>
            <thead>
              <tr>
                <th>行业</th>
                <th>方案名称</th>
                <th>方案阶段</th>
                <th>测试进度</th>
                <th>DI值</th>
                <th>成熟度</th>
                <th>发布日期</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item) => (
                <tr>
                  <td>{item.HangYe}</td>
                  <td>{item.FangAnName}</td>
                  <td>{item.JieDuan}</td>
                  <td>{item.JinDu}</td>
                  <td>{item.DI}</td>
                  <td>{item.ChengSuDu}</td>
                  <td>{item.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(dom, document.body);
};

export default ModalLB;
