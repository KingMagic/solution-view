import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import logo from '../images/logo.png';
import Bzwtzl from './components/Bzwtzl';
import Csrwzl from './components/Csrwzl';
import Hyjjfafb from './components/Hyjjfafb';
import Hyxsfb from './components/Hyxsfb';
import Jjfaqj from './components/Jjfaqj';
import Sthzywzl from './components/Sthzywzl';
import Xqhz from './components/Xqhz';
import Xqld from './components/Xqld';
import Xsqkzl from './components/Xsqkzl';
import Ydxqfb from './components/Ydxqfb';
import Zjztzl from './components/Zjztzl';
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
            <b />
          </span>
          <time>{current.format('YYYY-MM-DD HH:mm:ss dddd')}</time>
          <span className="week" />
        </div>
      </header>

      <div className="main-left">
        <Xsqkzl />
        <Bzwtzl />
        <Zjztzl />
        <Csrwzl />
      </div>
      <div className="main-center">
        <Hyjjfafb />
        <Jjfaqj />
        <Hyxsfb />
      </div>
      <div className="main-right">
        <Sthzywzl />
        <Xqhz />
        <Ydxqfb />
        <Xqld />
      </div>
    </div>
  );
}
