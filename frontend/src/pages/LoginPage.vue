<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <label></label>
      <input type="text" name="username" placeholder="Usuário" v-model="username" required />
      <br>
      <label></label>
      <input type="password" name="password" placeholder="Senha" v-model="password" required />
      <br />
      <button class="btn btn-primary" type="submit">
        <i class="bi bi-door-open-fill"></i>
        Entrar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')

const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/authentication/token/', {
      username: username.value,
      password: password.value
    })

    if (response.status !== 200) {
      throw new Error('Login failed')
    }

    const token = response.data.access
    localStorage.setItem('token', response.data.access)
    router.push('/home')          

  } catch (error) {
    alert('Erro no login: usuário ou senha inválidos')
    console.error(error)
  }
}
</script>
