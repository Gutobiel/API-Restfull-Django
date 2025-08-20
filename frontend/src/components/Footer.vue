<template>
    <footer class="footer d-flex align-items-center">
        <p><strong>Copyright © 2025 Dnit - Departamento Nacional de Infraestrutura de Transportes - 2025. </strong> All rights reserved.</p>
            <div class=" d-sm-inline">
            <b>Crud version</b> 1.0.0
        </div>
    </footer>
</template>

<style scoped>
.footer {
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 10px;
    font-size: 14px;
    border-top: 1px solid #e0e0e0;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
}
</style>

<script>
export default {
  name: 'Footer'
}
</script>