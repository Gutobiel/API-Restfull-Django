<template>
  <div>
    <h2>Editar Funcionário</h2>
    <form @submit.prevent="updateEmployee">
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
  name: 'EmployeeEdit',
  data() {
    return {
      employee: {
        name: '',
        role: '',
        salary: ''
      }
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const res = await api.get(`/employees/${id}/`);
      this.employee = res.data;
    } catch (error) {
      console.error('Erro ao carregar funcionário', error);
    }
  },
  methods: {
    async updateEmployee() {
      const id = this.$route.params.id;
      try {
        await api.put(`/employees/${id}/`, this.employee);
        alert('Funcionário atualizado com sucesso!');
        this.$router.push('/employees');
      } catch (error) {
        console.error('Erro ao atualizar funcionário', error);
      }
    }
  }
};
</script>
