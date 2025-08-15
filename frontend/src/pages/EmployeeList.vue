<template>
  <div>
    <h2>Funcionários</h2>
    <button @click="$router.push('/employee/new')">Novo Funcionário</button>

    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Cargo</th>
          <th>Salário</th>
          <th>Data de Contratação</th>
          <th>Ultima Alteração</th>
          <th>Data de Saída</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ formatCPF(employee.cpf) }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ formatWage(employee.wage) }}</td>
          <td>{{ employee.created_at ? employee.created_at.substring(0, 10) : '' }}</td>
          <td>{{ employee.updated_at ? employee.updated_at.substring(0, 10) : '' }}</td>
          <td>{{ employee.exit_time ? employee.exit_time.substring(0, 10) : '' }}</td>

          <td>
            <router-link :to="`/employee/edit/${employee.id}`">
              <button @click="$router.push(`/employee/edit/${employee.id}`)">Editar</button>
            </router-link>
            <button @click="deleteEmployee(employee.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../axios'

export default {
  name: 'EmployeeList',
  data() {
    return {
      employees: []
    }
  },
  async mounted() {
    await this.fetchEmployees()
  },
  methods: {
    formatCPF(cpf) {
      if (!cpf) return ''
      return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
    },
    formatWage(wage) {
      if (wage == null) return ''
      return Number(wage).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
    async fetchEmployees() {
      try {
        const res = await api.get('/api/v1/crud/')
        this.employees = res.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$router.push('/login')
        }
      }
    },
    async deleteEmployee(id) {
      if (confirm('Tem certeza que deseja excluir este funcionário?')) {
        try {
          // Atualiza o campo exit_time antes de excluir
          const exitTime = new Date().toISOString().substring(0, 10) // formato YYYY-MM-DD
          await api.patch(`/api/v1/crud/${id}/`, { exit_time: exitTime })
          // Agora exclui o funcionário
          await api.delete(`/api/v1/crud/${id}/`)
          this.fetchEmployees()
        } catch (error) {
          console.error('Erro ao excluir funcionário', error)
        }
      }
    }
  }
}
</script>