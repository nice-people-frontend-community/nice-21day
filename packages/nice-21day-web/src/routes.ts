export default [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    name: '管理员',
    path: '/admin',
    icon: 'user',
    component: './Admin',
  },
  {
    name: '证书',
    path: '/certificate',
    icon: 'solution',
    component: './Certificate',
  },
];
