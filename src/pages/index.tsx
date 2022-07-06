import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import logo from '../images/logo.png';
import Bzwtzl from './components/Bzwtzl';
import Xsqkzl from './components/Xsqkzl';
import './index.less';

moment.locale('zh-cn');

export default function IndexPage() {
  const [current, setCurrent] = useState<Moment>(moment());

  useEffect(() => {
    const clock = setInterval(() => setCurrent(moment()), 1000);
    return () => clearInterval(clock);
  }, []);

  return (
    <div className="uc-wrap uc-home">
      <header>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="g-clock date">
          <span className="day">
            <b></b>
          </span>
          <time>{current.format('YYYY-MM-DD HH:mm:ss dddd')}</time>
          <span className="week"></span>
        </div>
      </header>

      <div className="main-left">
        <Xsqkzl />
        <Bzwtzl />
      </div>
    </div>
  );
}
