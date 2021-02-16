import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import store from "@/store/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: "Login"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,

      },
      {
        path: '/escalation',
        name: 'Escalation',
        component: () => import(/* webpackChunkName: "about" */ '../views/Escalation.vue')
      },
      {
        path: '/consultation',
        name: 'Consultation',
        component: () => import(/* webpackChunkName: "about" */ '../views/Consultation.vue'),
        props: true
      },
      {
        path: '/time',
        name: 'Time',
        component: () => import(/* webpackChunkName: "about" */ '../views/TimeData.vue'),
        props: true
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  try {
    const hasPermission = store.getters.isLoggedIn;
    if (hasPermission || to.name === 'Login' || localStorage.getItem('isLoggedIn')) {
      next()
    } else {
      next({
        name: "Login"
      })
    }
  } catch (e) {
    console.log(e)
  }
});

export default router
