import { useEffect, useState } from 'react';
import { queryJjfaqj } from '../service';

const Jjfaqj = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    queryJjfaqj().then((res) => setData(res));
  }, []);

  return (
    <>
      {data.map((item) => (
        <div>{item.Value}</div>
      ))}
    </>
  );
};

export default Jjfaqj;
