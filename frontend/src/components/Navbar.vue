<template>
  <nav>
    <router-link to="/employees">Funcionários</router-link> |
    <router-link to="/employees/new">Novo Funcionário</router-link> |
    <a href="#" @click.prevent="logoutUser">Sair</a>
  </nav>
</template>

<script>
import { logout } from '../auth';

export default {
  name: 'Navbar',
  methods: {
    logoutUser() {
      logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
nav {
  background: #eee;
  padding: 10px;
}
a {
  margin: 0 5px;
}
</style>
