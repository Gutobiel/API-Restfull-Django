import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/LoginPage.vue'
import Home from './pages/HomePage.vue'
import EmployeeList from './pages/EmployeeList.vue'
import EmployeeEdit from './pages/EmployeeEdit.vue'
import EmployeeNew from './pages/EmployeeNew.vue'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee',
    component: EmployeeList,
    meta: { requiresAuth: true }
  },
    {
    path: '/employee/new',
    component: EmployeeNew,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee/edit/:id',
    component: EmployeeEdit,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* // Guard de autenticação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
}) */

export default router