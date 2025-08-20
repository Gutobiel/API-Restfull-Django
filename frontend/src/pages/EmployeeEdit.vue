<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title">Atualizar Funcionário</h2>
      <p class="card-text">Preencha os dados do funcionário:</p>
      <form @submit.prevent="updateEmployee">
        <div class="d-flex mb-3">
          <label class="col-sm-2 text-left">Nome:</label>
          <input v-model="employee.name" required style="width: 100%;"/>
        </div>
        <div class="d-flex mb-3">
          <label class="col-sm-2 text-left">CPF:</label>
          <input v-model="employee.cpf" required style="width: 100%;"/>
        </div>
        <div class="d-flex mb-3">
          <label class="col-sm-2 text-left">Cargo:</label>
          <input v-model="employee.position" required style="width: 100%;"/>
        </div>
        <div class="d-flex mb-3">
          <label class="col-sm-2 text-left">Salário:</label>
          <input type="number" v-model="employee.wage" required style="width: 100%;"/>
        </div>
        <div class="d-flex mb-3">
          <label class="col-sm-5 text-left">Registrar Saída</label>
          <input type="checkbox" v-model="demitir" />
          
        </div>
        <input class="btn btn-success form-control" type="submit" value="Salvar">
      </form>
    </div>
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
        if (error.response && error.response.status === 401) {
          alert('Erro de autenticação. Por favor, faça login novamente.');
          this.$router.push('/login');
        } else {
          alert('Erro ao atualizar funcionário.');
        }
        console.error('Erro ao atualizar funcionário', error);
      }
    }
  }
};
</script>
