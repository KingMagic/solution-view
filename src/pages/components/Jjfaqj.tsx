import { useEffect, useState } from 'react';
import { queryJjfaqj } from '../service';
import img61 from '../../images/home-icon-6-1.png';
import img62 from '../../images/home-icon-6-2.png';
import img63 from '../../images/home-icon-6-3.png';
import img64 from '../../images/home-icon-6-4.png';
import img65 from '../../images/home-icon-6-5.png';
import img66 from '../../images/home-icon-6-6.png';
import img67 from '../../images/home-icon-6-7.png';
import img68 from '../../images/home-icon-6-8.png';
import home61 from '../../images/home-img-6-1.png';
import homec61 from '../../images/home-c-6-1.png';
import homec62 from '../../images/home-c-6-2.png';
import homec63 from '../../images/home-c-6-3.png';

type DataItem = {
  ValueType: string;
  Value: number;
};

const Jjfaqj = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    queryJjfaqj().then((res) => setData(res));
  }, []);

  return (
    <section className="box box6">
      <div className="item i1">
        <img src={img61} alt="" className="uc-icon40" />
        <div className="con">
          <p>方案总数</p>
          <div
            className="number timer2"
            data-from="0"
            data-to="680"
            data-speed="5000"
            data-refresh-interval="50"
          >
            {data.find((item) => item.ValueType === '方案总数')?.Value}
          </div>
        </div>
      </div>
      <div className="item i2">
        <img src={img62} alt="" className="uc-icon40" />
        <div className="con">
          <p>已发布方案</p>
          <div
            className="number timer2"
            data-from="0"
            data-to="680"
            data-speed="5000"
            data-refresh-interval="50"
          >
            {data.find((item) => item.ValueType === '已发布方案')?.Value}
          </div>
        </div>
      </div>
      <div className="item i3">
        <img src={img63} alt="" className="uc-icon40" />
        <div className="con">
          <p>未发布方案</p>
          <div
            className="number timer2"
            data-from="0"
            data-to="120"
            data-speed="5000"
            data-refresh-interval="50"
          >
            {data.find((item) => item.ValueType === '未发布方案')?.Value}
          </div>
        </div>
      </div>
      <div className="item i4">
        <img src={img64} alt="" className="uc-icon40" />
        <div className="con">
          <p>需求总数</p>
          <div
            className="number timer2"
            data-from="0"
            data-to="120"
            data-speed="5000"
            data-refresh-interval="50"
          >
            {data.find((item) => item.ValueType === '需求总数')?.Value}
          </div>
        </div>
      </div>

      <div className="item i5">
        <div className="icon-box">
          <img src={img65} alt="" className="uc-icon40 icon" />
          <img src={home61} className="d" alt="" />
        </div>
        <div className="con">
          <p>需求总数</p>
          <div
            className="number timer2"
            data-from="0"
            data-to="680"
            data-speed="5000"
            data-refresh-interval="50"
          >
            {data.find((item) => item.ValueType === '需求总数')?.Value}
          </div>
        </div>
      </div>
      <div className="item i6">
        <div className="icon-box">
          <img src={img66} alt="" className="uc-icon40 icon" />
          <img src={home61} className="d" alt="" />
        </div>
        <div className="con">
          <p>销售项目数</p>
          <div
            className="number timer2"
            data-from="0"
            data-to="66080"
            data-speed="5000"
            data-refresh-interval="50"
          >
            {data.find((item) => item.ValueType === '销售项目数')?.Value}
          </div>
        </div>
      </div>
      <div className="item i7">
        <div className="icon-box">
          <img src={img67} alt="" className="uc-icon40 icon" />
          <img src={home61} className="d" alt="" />
        </div>
        <div className="con">
          <p>伙伴总数</p>
          <div
            className="number timer2"
            data-from="0"
            data-to="680"
            data-speed="5000"
            data-refresh-interval="50"
          >
            {data.find((item) => item.ValueType === '伙伴总数')?.Value}
          </div>
        </div>
      </div>
      <div className="item i8">
        <div className="icon-box">
          <img src={img68} alt="" className="uc-icon40 icon" />
          <img src={home61} className="d" alt="" />
        </div>
        <div className="con">
          <p>销售大屏数</p>
          <div
            className="number timer2"
            data-from="0"
            data-to="66080"
            data-speed="5000"
            data-refresh-interval="50"
          >
            {data.find((item) => item.ValueType === '销售大屏数')?.Value}
          </div>
        </div>
      </div>
      <div className="center">
        <img src={homec61} alt="" className="c c1" />
        <img src={homec62} alt="" className="c c2" />
        <img src={homec63} alt="" className="c c3" />
        <div className="txt">
          解决方案
          <br />
          <b>全景</b>
        </div>
      </div>
    </section>
  );
};

export default Jjfaqj;
