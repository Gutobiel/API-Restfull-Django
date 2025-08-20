<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title">Novo Funcionário</h2>
      <p class="card-text">Preencha os dados do novo funcionário:</p>
      <form @submit.prevent="createEmployee">
        <div class="d-flex mb-3">
          <label class="col-sm-3 text-left">Nome:</label>
          <input v-model="employee.name" required class="vTextField" style="width: 100%;"/>
        </div>
        <div class="d-flex mb-3">
          <label class="col-sm-3 text-left">CPF:</label>
          <input v-model="employee.cpf" class="vTextField" style="width: 100%;" />
        </div> 
        <div class="d-flex mb-3"> 
          <label class="col-sm-3 text-left">Cargo:</label>
          <input v-model="employee.position" required class="vTextField" style="width: 100%;"/>
        </div>  
        <div class="d-flex mb-3">
          <label class="col-sm-3 text-left">Salário:</label>
          <input type="number" v-model="employee.wage" required style="width: 100%;"/>
        </div>
        
        <input class="btn btn-success form-control" style="margin: 10px;"  type="submit" value="Salvar">
        <input class="btn btn-primary form-control" style="margin: 10px;"  type="submit" value="Salvar e adicionar outro(a)" name="saveAndAddAnother">
        <input class="btn btn-primary form-control" style="margin: 10px;" type="submit" value="Salvar e continuar editando" name="saveAndContinue">
      </form>
    </div>
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
        if (error.response && error.response.status === 401) {
          alert('Erro de autenticação. Por favor, faça login novamente.');
          this.$router.push('/login');
        } else {
          alert('Erro ao criar funcionário.');
        }
      }
    }
  }
};
</script>
