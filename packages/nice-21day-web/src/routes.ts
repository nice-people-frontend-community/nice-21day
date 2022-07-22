import { MenuDataItem } from '@ant-design/pro-components';

export default [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    name: '管理员',
    path: '/admin',
    icon: 'user',
    hideChildrenInMenu: true,
    routes: [
      {
        name: '管理员',
        path: '/admin',
        icon: 'user',
        component: './Admin',
      },
      {
        name: '新建管理员',
        path: '/admin/create',
        component: './Admin/Create',
      },
      {
        name: '编辑管理员',
        path: '/admin/update',
        component: './Admin/Update',
      },
    ],
  },
  {
    name: '证书',
    path: '/certificate',
    icon: 'solution',
    component: './Certificate',
  },
  {
    name: '登录',
    path: '/login',
    component: './Login',
    hideInMenu: true,
  },
  {
    name: '注册',
    path: '/register',
    component: './register',
    hideInMenu: true,
  }
] as MenuDataItem[];
