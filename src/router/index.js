import Vue from 'vue'
import Router from 'vue-router'
import { getUserType } from '@/api/user'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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

  {
    path: '/recommend',
    component: Layout,
    redirect: '/recommend/seekerRecom',
    name: 'Recommend',
    hidden: true,
    meta: { title: '推荐系统', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'seekerRecom',
        name: 'SeekerRecom',
        hidden: true,
        component: () => import('@/views/recommend/seekerRecom'),
        meta: { title: '职位推荐', icon: 'deploymentunit', userType: 1 }
      },
      {
        path: 'hRecom',
        name: 'HRecom',
        hidden: true,
        component: () => import('@/views/recommend/hRecom'),
        meta: { title: '人才推荐', icon: 'reconciliation', userType: 2 }
      },
      {
        path: 'seekerEval',
        name: 'SeekerEval',
        hidden: true,
        component: () => import('@/views/recommend/seekerEval'),
        meta: { title: '能力评估', icon: 'contacts', userType: 1 }
      }
    ]
  },
  {
    path: '/jobInfo',
    component: Layout,
    redirect: '/jobInfo/jobInfo',
    name: 'JobInfo',
    hidden: true,
    meta: { title: '职位信息', icon: 'info-circle' },
    children: [
      {
        path: 'jobInfo',
        name: 'JobInfo',
        hidden: true,
        component: () => import('@/views/jobInfo/jobInfo'),
        meta: { title: '职位信息', icon: 'info-circle-fill', userType: 1 }
      },
      {
        path: 'jobAdd',
        name: 'JobAdd',
        hidden: true,
        component: () => import('@/views/jobInfo/jobAdd'),
        meta: { title: '添加职位', icon: 'addteam', userType: 2 }
      },
      {
        path: 'employGuide',
        name: 'EmployGuide',
        hidden: true,
        component: () => import('@/views/jobInfo/employGuide'),
        meta: { title: '个人简历', icon: 'guide', userType: 1 }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 导航守卫
// router.beforeEach(async(to, from, next) => {
//   const userType = await getUserType() // 获取用户类型
//   if (to.meta && to.meta.userType && userType !== to.meta.userType) {
//     // 如果访问的路由只能由特定用户类型访问，但当前用户类型不符合要求，则跳转到特定页面，比如 404 页面或者首页
//     next('/') // 这里可以根据实际情况修改跳转的页面
//   } else {
//     next() // 否则允许访问
//   }
// })
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
