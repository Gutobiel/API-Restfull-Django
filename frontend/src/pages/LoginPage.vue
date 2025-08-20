<template>
  <div class="login-page" >
    <h1>
      <img src="../assets/logoFab.png" alt="logoFabDnit" class="navbar-logo"><img/>
    </h1>
    <div class="login-logo">

    </div>
    <div class="card">
      <div class="card-body">
        <p class="login-box-msg">Bem-vindo ao FabDnit</p>
        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <input type="text" name="username" placeholder="Usuário" v-model="username" required />
            <label><i class="bi bi-person-fill"></i></label>
          </div>
          <div>
            <input type="password" name="password" placeholder="Senha" v-model="password" required />
            <label><i class="bi bi-lock-fill"></i></label>
          </div>
          <button class="btn btn-primary" style="margin: 10px;" type="submit">
            <i class="bi bi-door-open-fill"></i>
            Acessar
          </button>
        </form>
      </div>
    </div>
  </div>


</template>

<style>
  .navbar-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 8px;
    background: #fff;
  }
  </style>

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
