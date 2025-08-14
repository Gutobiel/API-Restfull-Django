import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import EmployeeList from './pages/EmployeeList.vue';
import EmployeeForm from './pages/EmployeeForm.vue';
import EmployeeEdit from './pages/EmployeeEdit.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/funcionarios', component: EmployeeList },
    { path: '/funcionarios/novo', component: EmployeeForm },
    { path: '/funcionarios/:id/editar', component: EmployeeEdit, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
