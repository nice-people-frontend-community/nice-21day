import { defineConfig } from '@umijs/max';
import routes from './src/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '训练营',
  },
  routes,
  base: process.env.NODE_ENV === 'production' ? '/nice-21day/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/nice-21day/' : '/',
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      target: 'http://114.116.122.42',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
});
