<template>
  <section>
    <h2>Welcome</h2>
    <p>这是一个极简的前端，用于对接你本地的 Spring Boot 网关（/api）。</p>
    <ul>
      <li>Users：创建/查看用户</li>
      <li>Inventory：查看/调整库存</li>
      <li>Orders：创建/查看订单</li>
    </ul>
    <p>API Base: <code>{{ base }}</code></p>
  </section>
</template>

<script setup lang="ts">
const base = import.meta.env.VITE_API_BASE || '/api';
</script>