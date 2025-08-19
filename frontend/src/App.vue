<template>

  <div id="app">
    <Header v-if="!$route.meta.hideNavbar" />
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style>
@import './style.css';
</style>
