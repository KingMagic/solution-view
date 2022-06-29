import { useEffect, useState } from 'react';
import { queryJjfaqj } from '../service';
import styles from '../index.less';

const Jjfaqj = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    queryJjfaqj().then((res) => setData(res));
  }, []);

  return <div className={styles.jjfaqj}>123</div>;
};

export default Jjfaqj;
