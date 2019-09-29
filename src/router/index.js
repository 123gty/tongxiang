import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/layout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: layout,
      children: [
        // {
        //   path: '/peopleAgree',
        //   name: '村规民约',
        //   component: () => import('@/views/peopleArgue/peopleAgree/index')
        // },
        // {
        //   path: '/peopleProceed',
        //   name: '百姓议事会',
        //   component: () => import('@/views/peopleArgue/peopleProceed/index')
        // },
        // {
        //   path: '/peopleCounselor',
        //   name: '乡贤参事会',
        //   component: () => import('@/views/peopleArgue/peopleCounselor/index')
        // },
        // // 服务村民
        // {
        //   path: '/serviceTeam',
        //   name: '百事服务团',
        //   component: () => import('@/views/peopleService/serviceTeam/index')
        // },
        // {
        //   path: '/leagTeam',
        //   name: '法律团队',
        //   component: () => import('@/views/peopleService/leagServiceTeam/leagTeam/index')
        // },
        // {
        //   path: '/commonProblem',
        //   name: '居民常见问题',
        //   component: () => import('@/views/peopleService/leagServiceTeam/commonProblem/index')
        // },
        // {
        //   path: '/leagAdvice',
        //   name: '法律咨询',
        //   component: () => import('@/views/peopleService/leagServiceTeam/leagAdvice/index')
        // },
        // {
        //   path: '/moralJudgment',
        //   name: '道德评判团',
        //   component: () => import('@/views/peopleService/moralJudgment/index')
        // },
        // // 村治管理
        {
          path: '/peopleTalk',
          name: '村民说事',
          component: () => import('@/views/peopleCommand/peopleTalk/index')
        },
        {
          path: '/peopleSupervision',
          name: '村务监督',
          component: () => import('@/views/peopleCommand/peopleSupervision/index')
        },
        {
          path: '/commitment',
          name: '承诺书',
          component: () => import('@/views/peopleCommand/civilization/commitment/index')
        },
        {
          path: '/goodAtmosphere',
          name: '文明乡风',
          component: () => import('@/views/peopleCommand/civilization/goodAtmosphere/index')
        },
        {
          path: '/badAtmosphere',
          name: '不良乡风',
          component: () => import('@/views/peopleCommand/civilization/badAtmosphere/index')
        },
        {
          path: '/peopleReward',
          name: '奖励村民',
          component: () => import('@/views/peopleCommand/peopleReward/index')
        }
      ]
    }
  ]
})
