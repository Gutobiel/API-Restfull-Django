<template>
  <div>
    <h2>Editar Funcionário</h2>
    <form @submit.prevent="updateEmployee">
      <label>Nome:</label>
      <input v-model="employee.name" required />

      <label>CPF:</label>
      <input v-model="employee.cpf" required />

      <label>Cargo:</label>
      <input v-model="employee.position" required />

      <label>Salário:</label>
      <input type="number" v-model="employee.wage" required />
      
      <label>Demitir</label>
      <input type="checkbox" v-model="demitir" />

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
        cpf: '',
        position: '',
        wage: '',
        exit_time: null
      },
      demitir: false
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const res = await api.get(`/api/v1/crud/${id}/`);
      this.employee = res.data;
      // Se já tem exit_time, marca a checkbox
      this.demitir = !!this.employee.exit_time;
    } catch (error) {
      console.error('Erro ao carregar funcionário', error);
    }
  },
  methods: {
    async updateEmployee() {
      const id = this.$route.params.id;
      // Se demitir está marcado, registra a data de saída
      if (this.demitir) {
        this.employee.exit_time = new Date().toISOString().substring(0, 10);
      } else {
        this.employee.exit_time = null;
      }
      
      const updatedEmployee = {
        ...this.employee,
        updated_at: new Date().toISOString()
      }
      try {
        await api.put(`/api/v1/crud/${id}/`, updatedEmployee);
        alert('Funcionário atualizado com sucesso!');
        this.$router.push('/employee');
      } catch (error) {
        console.error('Erro ao atualizar funcionário', error);
      }
    }
  }
};
</script>
