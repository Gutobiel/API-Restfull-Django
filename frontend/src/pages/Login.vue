<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <label>Usuário:</label>
      <input v-model="username" required />

      <label>Senha:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')

const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/authentication/token/', {
      username: username.value,
      password: password.value
    })

    const token = response.data.access
    alert(`Token recebido: ${token}`)  // exibe token no alert
    // Aqui você poderia salvar no localStorage para usar nas requisições futuras:
    // localStorage.setItem('access', token)
  } catch (error) {
    alert('Erro no login: usuário ou senha inválidos')
    console.error(error)
  }
}
</script>
