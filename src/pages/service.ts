import { request } from 'umi';

const preUrl = 'http://qctk.nat300.top/api';

const queryHangYeXiaoShou = () => {
  return request(preUrl + '/HangYeXiaoShouFenBu');
};

const queryFangAnXiaoShou = () => {
  return request(preUrl + '/FangAnXiaoShouFenBu');
};

const queryHangYeJiaoFu = () => {
  return request(preUrl + '/HangYeJiaoFuHuiZong');
};

const queryHyjjfafb = () => {
  return request(preUrl + '/HangYeJieJueFangAnFenBu');
};

const queryHyjjfafbx = () => {
  return request(preUrl + '/HangYeJieJueFangAnFau');
};

const queryHeZuo = (TableType: string) => {
  return request(preUrl + '/ShengTaiHeZuo', {
    params: {
      TableType,
    },
  });
};

const queryBzwtzl = (TableType: string) => {
  return request(preUrl + '/BenZhouWenTiZongLan', {
    params: {
      TableType,
    },
  });
};

const queryZhenji = () => {
  return request(preUrl + '/ZhenJi');
};

const queryHyxq = (TableType: string) => {
  return request(preUrl + '/HangYeXuQiu', {
    params: {
      TableType,
    },
  });
};

const queryYdxqfb = () => {
  return request(preUrl + '/YueDuXuQiu');
};

const queryCszl = (TableType: string) => {
  return request(preUrl + '/CeShiZongLan', {
    params: {
      TableType,
    },
  });
};

const queryFakf = () => {
  return request(preUrl + '/FangAnKaifa');
};

const queryFaxsqj = (TableType: string) => {
  return request(preUrl + '/FangAnXiaoShouQuanJing', {
    params: {
      TableType,
    },
  });
};

const queryJjfaqj = () => {
  return request(preUrl + '/FangAnQuanJing');
};

export {
  queryHangYeXiaoShou,
  queryFangAnXiaoShou,
  queryHangYeJiaoFu,
  queryHyjjfafb,
  queryHyjjfafbx,
  queryHeZuo,
  queryBzwtzl,
  queryZhenji,
  queryHyxq,
  queryYdxqfb,
  queryCszl,
  queryFakf,
  queryFaxsqj,
  queryJjfaqj,
};
