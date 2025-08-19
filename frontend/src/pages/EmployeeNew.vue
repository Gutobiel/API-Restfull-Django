<template>
  <div class="form-group">
    <h2>Novo Funcionário</h2>
    <form @submit.prevent="createEmployee">
      <label>Nome:</label>
      <input v-model="employee.name" required />

      <label>CPF:</label>
      <input v-model="employee.cpf"  />

      <label>Cargo:</label>
      <input v-model="employee.position" required />

      <label>Salário:</label>
      <input type="number" v-model="employee.wage" required />

      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import api from '../axios';

export default {
  name: 'EmployeeNew',
  data() {
    return {
      employee: {
        name: '',
        cpf: '',
        position: '',
        wage: '',
        exit_time: null,
        created_at: null,
        updated_at: null
        
      }
    };
  },
  methods: {
    async createEmployee() {
      try {
        await api.post('/api/v1/crud/', this.employee);
        alert('Funcionário criado com sucesso!');
        this.$router.push('/employee');
      } catch (error) {
        alert('Erro ao criar funcionário');
        console.error('Erro ao criar funcionário', error);
      }
    }
  }
};
</script>
