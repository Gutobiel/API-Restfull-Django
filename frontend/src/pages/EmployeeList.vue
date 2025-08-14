<template>
  <div>
    <h2>Funcionários</h2>
    <button @click="$router.push('/employees/new')">Novo Funcionário</button>

    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Cargo</th>
          <th>Salário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.role }}</td>
          <td>{{ employee.salary }}</td>
          <td>
            <button @click="$router.push(`/employees/${employee.id}/edit`)">Editar</button>
            <button @click="deleteEmployee(employee.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../axios';

export default {
  name: 'EmployeeList',
  data() {
    return {
      employees: []
    };
  },
  async mounted() {
    await this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const res = await api.get('/api/v1/crud/');
        this.employees = res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // token inválido ou expirado
          this.$router.push('/login');
        }
      }
    },
    async deleteEmployee(id) {
      if (confirm('Tem certeza que deseja excluir este funcionário?')) {
        try {
          await api.delete(`/employees/${id}/`);
          this.fetchEmployees();
        } catch (error) {
          console.error('Erro ao excluir funcionário', error);
        }
      }
    }
  }
};
</script>
