import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/seekerInfo',
    component: () => import('@/views/userInfo/seeker'),
    hidden: true
  },
  {
    path: '/hrInfo',
    component: () => import('@/views/userInfo/hr'),
    hidden: true
  },
  //
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },
  //
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },
  //
  // {
  //   path: '/recommend',
  //   component: Layout,
  //   redirect: '/recommend/seekerRecom',
  //   name: 'Recommend',
  //   meta: { title: '推荐系统', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'seekerRecom',
  //       name: 'SeekerRecom',
  //       component: () => import('@/views/recommend/seekerRecom'),
  //       meta: { title: '职位推荐', icon: 'deploymentunit' }
  //     },
  //     {
  //       path: 'hRecom',
  //       name: 'HRecom',
  //       component: () => import('@/views/recommend/hRecom'),
  //       meta: { title: '人才推荐', icon: 'reconciliation' }
  //     },
  //     {
  //       path: 'seekerEval',
  //       name: 'SeekerEval',
  //       component: () => import('@/views/recommend/seekerEval'),
  //       meta: { title: '能力评估', icon: 'contacts' }
  //     }
  //   ]
  // },
  // {
  //   path: '/jobInfo',
  //   component: Layout,
  //   redirect: '/jobInfo/jobInfo',
  //   name: 'JobInfo',
  //   meta: { title: '职位信息', icon: 'info-circle' },
  //   children: [
  //     {
  //       path: 'jobInfo',
  //       name: 'JobInfo',
  //       component: () => import('@/views/jobInfo/jobInfo'),
  //       meta: { title: '职位信息', icon: 'info-circle-fill' }
  //     },
  //     {
  //       path: 'jobAdd',
  //       name: 'JobAdd',
  //       component: () => import('@/views/jobInfo/jobAdd'),
  //       meta: { title: '添加职位', icon: 'addteam' }
  //     },
  //     {
  //       path: 'employGuide',
  //       name: 'EmployGuide',
  //       component: () => import('@/views/jobInfo/employGuide'),
  //       meta: { title: '招聘指南', icon: 'guide' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
