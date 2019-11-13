import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RouteNormal from './hocs/RouteNormal';
import RouteWithManager from './hocs/RouteWithManager';
import RouteWithAdmin from './hocs/RouteWithAdmin';

import Dashboard from './pages/Dashbroad.page';
import ProjectPage from './pages/Projects.page';
import ProjectDetail from './pages/ProjectDetail.page';
import ProjectMemberHistory from './pages/ProjectMemberHistory.page';
import LoginPage from './pages/Login.page';
import ListMemberPage from './pages/ListMember.page';
import Customerpage from './pages/Customers.page';
import NotFound from './pages/NotFound';
import CallbackOAuth from './pages/CallbackOAuth';

import UsersPage from './pages/User.page';

// export default [
//   {
//     component: Dashboard,
//     exact: true,
//     path: '/'
//   },
//   {
//     component: ProjectPage,
//     exact: false,
//     path: '/project/list'
//   },
//   {
//     component: ProjectDetail,
//     exact: false,
//     path: '/project/detail/:id'
//   },
//   {
//     component: ProjectMemberHistory,
//     exact: false,
//     path: '/project/memberHistory/:id'
//   },
//   {
//     component: LoginPage,
//     exact: false,
//     path: '/login'
//   },
//   {
//     component: Customerpage,
//     exact: false,
//     path: '/customers'
//   },
//   {
//     component: ListMemberPage,
//     exact: false,
//     path: '/member/list'
//   }
// ];

function AppRoutes() {
  return (
    <Switch>
      <Route component={LoginPage} path="/login"></Route>
      <Route component={CallbackOAuth} path="/callback" />

      <RouteWithAdmin component={Dashboard} path="/" exact></RouteWithAdmin>

      <RouteNormal component={ProjectPage} path="/project" exact></RouteNormal>
      <RouteNormal component={ProjectDetail} path="/project/detail/:id"></RouteNormal>
      <RouteNormal component={ProjectMemberHistory} path="/project/memberHistory/:id"></RouteNormal>

      <RouteWithManager component={Customerpage} path="/customers" exact></RouteWithManager>

      <RouteWithManager component={ListMemberPage} path="/member/list" exact></RouteWithManager>

      <RouteWithManager component={ListMemberPage} path="/users" exact></RouteWithManager>

      <RouteNormal component={NotFound} />
    </Switch>
  );
}

export default AppRoutes;
