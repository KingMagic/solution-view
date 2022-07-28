import { request } from 'umi';

const preUrl = 'http://qctk.nat300.top/api';

const queryHangYeXiaoShou = () => request(`${preUrl}/HangYeXiaoShouFenBu`);

const queryFangAnXiaoShou = () => request(`${preUrl}/FangAnXiaoShouFenBu`);

const queryHangYeJiaoFu = () => request(`${preUrl}/HangYeJiaoFuHuiZong`);

const queryHyjjfafb = () => request(`${preUrl}/HangYeJieJueFangAnFenBu`);

const queryHyjjfafbx = () => request(`${preUrl}/HangYeJieJueFangAnFau`);

const queryHeZuo = (TableType: string) =>
  request(`${preUrl}/ShengTaiHeZuo`, {
    params: {
      TableType,
    },
  });

const queryBzwtzl = (TableType: string) =>
  request(`${preUrl}/BenZhouWenTiZongLan`, {
    params: {
      TableType,
    },
  });

const queryZhenji = () => request(`${preUrl}/ZhenJi`);

const queryHyxq = (TableType: string) =>
  request(`${preUrl}/HangYeXuQiu`, {
    params: {
      TableType,
    },
  });

const queryYdxqfb = () => request(`${preUrl}/YueDuXuQiu`);

const queryCszl = (TableType: string) =>
  request(`${preUrl}/CeShiZongLan`, {
    params: {
      TableType,
    },
  });

const queryFakf = () => request(`${preUrl}/FangAnKaifa`);

const queryFaxsqj = (TableType: string) =>
  request(`${preUrl}/FangAnXiaoShouQuanJing`, {
    params: {
      TableType,
    },
  });

const queryJjfaqj = () => request(`${preUrl}/FangAnQuanJing`);

const queryHyxszb = () => request(`${preUrl}/HangYeXiaoShouZhanBi`);

const queryXqldzl = () => request(`${preUrl}/XuQiuLuoDiZongLan`);

const queryXqldxq = () => request(`${preUrl}/XuQiuLuoDi`);

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
  queryHyxszb,
  queryXqldzl,
  queryXqldxq,
};
