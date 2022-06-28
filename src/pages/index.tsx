import Bzwtzl from './components/Bzwtzl';
import Csrwzl from './components/Csrwzl';
import Faxsqj from './components/Faxsqj';
import Hyjjfafb from './components/Hyjjfafb';
import Hyjjfafbx from './components/Hyjjfafbx';
import Hyxsfb from './components/Hyxsfb';
import Jjfaqj from './components/Jjfaqj';
import SalesOverview from './components/SalesOverview';
import Sthzywzl from './components/Sthzywzl';
import Xqhz from './components/Xqhz';
import Ydxqfb from './components/Ydxqfb';
import Zjztzl from './components/Zjztzl';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div className={styles.app}>
      <div className={styles.header}></div>
      <div className={styles.container}>
        <SalesOverview />
        <Hyjjfafb />
        <Hyjjfafbx />
        <Sthzywzl />
        <Bzwtzl />
        <div className={styles.SolutionView}>
          <Jjfaqj />
        </div>
        <Xqhz />
        <Zjztzl />
        <Ydxqfb />
        <Csrwzl />
        <Hyxsfb />
        <Faxsqj />
      </div>
    </div>
  );
}
