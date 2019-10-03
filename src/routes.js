import Dashboard from './pages/Dashbroad.page';
import ListProject from './pages/ListProject.page';
import ProjectDetail from './pages/ProjectDetail.page';
import ProjectMemberHistory from './pages/ProjectMemberHistory.page';
import LoginPage from './pages/Login.page';
import RegisterPage from './pages/Register.page';
import ListMemberPage from './pages/ListMember.page';

export default [
  {
    component: Dashboard,
    exact: true,
    path: '/'
  },
  {
    component: ListProject,
    exact: false,
    path: '/project/list'
  },
  {
    component: ProjectDetail,
    exact: false,
    path: '/project/detail/:id'
  },
  {
    component: ProjectMemberHistory,
    exact: false,
    path: '/project/memberHistory/:id'
  },
  {
    component: LoginPage,
    exact: false,
    path: '/login'
  },
  {
    component: RegisterPage,
    exact: false,
    path: '/register'
  },
  {
    component: ListMemberPage,
    exact: false,
    path: '/member/list'
  },
];
