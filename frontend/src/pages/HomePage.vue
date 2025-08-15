<template>
  <div class="home-page">
    <h1>Bem-vindo ao FabDnit</h1>
    <p>Esta é a página inicial do sistema.</p>
    <button @click="logoutUser">Sair</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logoutUser = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 16px;
}

p {
  color: #555;
  font-size: 18px;
}
</style>