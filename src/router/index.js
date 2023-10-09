import {createRouter, createWebHistory} from "vue-router";
import SideMenu from "../layouts/side-menu/Main.vue";
import TopMenu from "../layouts/top-menu/Main.vue";
import DashboardOverview1 from "../views/dashboard-overview-1/Main.vue";
import {isEmpty} from 'lodash';
import Login from "../views/login/Main.vue";
import Register from "../views/register/Main.vue";
import ErrorPage from "../views/error-page/Main.vue";
import ListEvaluationUser from "@/views/user/Main.vue";
import CreateJudgement from "@/views/user/CreateJudgement.vue";
import ListEvaluation from "@/views/admin/list-evaluated/ListEvaluation.vue";
import DetailEvaluationAdmin from "@/views/admin/list-evaluated/DetailEvaluateAdmin.vue";
import TrackingStatus from "@/views/admin/list-evaluated/TrackingStatus.vue";
import {AuthUtils} from "@/utils/localStorageUtils";
import store from "@/stores";
const routes = [
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path: "dashboard-overview-1",
        name: "side-menu-dashboard-overview-1",
        component: DashboardOverview1,
      }
    ],
  },
  // {
  //   path: "/top-menu",
  //   component: TopMenu,
  //   children: [
  //     {
  //       path: "dashboard-overview-1",
  //       name: "top-menu-dashboard-overview-1",
  //       component: DashboardOverview1,
  //     }]
  // },
  {
    path: '/techport',
    component: TopMenu,
    children: [
      {
        path: 'admin',
        name: 'base-menu',
        component: ListEvaluation,
        meta: {
          id: 0,
          requiresAuth: true
        }
      },
      {
        path: 'admin/detail',
        name: 'detail-evaluate-admin',
        component: DetailEvaluationAdmin,
        meta: {
          id: 0,
          requiresAuth: true
        }
      },
      {
        path: 'admin/tracking',
        name: 'tracking-status',
        component: TrackingStatus,
        meta: {
          id: 0,
          requiresAuth: true
        }
      },
      {
        path: '',
        name: 'list-evaluation-user',
        component: ListEvaluationUser,
        meta: {
          id: 0,
          requiresAuth: true
        }
      },
      {
        path: '',
        children: [
          {
            path: 'create',
            name: 'create-judgement',
            component: CreateJudgement,
            meta: {
              id: 0,
              requiresAuth: true
            }
          },
        ]
      }
    ]
  },

  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {left: 0, top: 0};
  },
});

router.beforeEach(async (to, from, next) => {
  let token =  AuthUtils.getTokenFromCookies()
  let user = store.state.auth.user

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (token) {
    await store.dispatch('auth/getAuthInfo', token)
    user = store.state.auth.user
  }

  if (!isEmpty(user)) {
    const privileges = user?.privileges
    const permissions = ['buy', 'approve'];

    const hasAllPermissions = permissions.some(permission =>
        privileges.includes(permission.toLowerCase())
    );

    if (!hasAllPermissions && to.path.startsWith('/admin')) {
      next({
        path: '/permission-page'
      });
      return;
    }
  }


  let checkMenu = true

  if (token && (to.path === '/login' || to.path === '/') && !isEmpty(user) && checkMenu) {
    next()
  } else if (!token && requiresAuth) {
    next({
      path: '/login'
    })
  } else if (token && requiresAuth && !checkMenu) {
    next({
      path: '/permission-page'
    })
  } else {
    next()
  }
})

export default router;
