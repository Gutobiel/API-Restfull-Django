<template>
  <div>
    <h2>Novo Funcionário</h2>
    <form @submit.prevent="createEmployee">
      <label>Nome:</label>
      <input v-model="employee.name" required />

      <label>Cargo:</label>
      <input v-model="employee.role" required />

      <label>Salário:</label>
      <input type="number" v-model="employee.salary" required />

      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import api from '../axios';

export default {
  name: 'EmployeeForm',
  data() {
    return {
      employee: {
        name: '',
        role: '',
        salary: ''
      }
    };
  },
  methods: {
    async createEmployee() {
      try {
        await api.post('/employees/', this.employee);
        alert('Funcionário criado com sucesso!');
        this.$router.push('/employees');
      } catch (error) {
        console.error('Erro ao criar funcionário', error);
      }
    }
  }
};
</script>
