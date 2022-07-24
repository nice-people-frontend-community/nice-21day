import { MenuDataItem } from '@ant-design/pro-components';

export default [
  {
    name: '登录',
    path: '/login',
    component: './Login',
    hideInMenu: true,
    layout: false,
  },
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
    name: '打卡记录',
    path: '/attendance',
    icon: 'solution',
    component: './Attendance',
  },
  {
    name: '训练营成员',
    path: '/member',
    icon: 'skin',
    component: './Member',
  },
  {
    name: '证书',
    path: '/certificate',
    icon: 'solution',
    component: './Certificate',
  },
] as MenuDataItem[];
