<template>
  <div class="layout">
    <header>
      <h1>Microshop</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/users">Users</router-link>
        <router-link to="/orders">Orders</router-link>
        <router-link to="/inventory">Inventory</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>© Microshop</footer>
  </div>
</template>

<style>
.layout { max-width: 960px; margin: 0 auto; padding: 16px; font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; }
header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
nav a { margin-right: 12px; text-decoration: none; color: #2b6cb0; }
nav a.router-link-active { font-weight: 700; color: #1a202c; }
main { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
footer { margin-top: 16px; color: #6b7280; font-size: 12px; }
</style>
