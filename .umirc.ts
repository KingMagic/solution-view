import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  routes: [{ path: '/', component: '@/pages/index' }],
  scripts: [
    `var html = document.querySelector('html');html.style.fontSize = html.offsetWidth / 19.2 + "px";`,
  ],
  fastRefresh: {},
});
