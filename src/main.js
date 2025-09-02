import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import UsersView from './views/UsersView.vue'
import OrdersView from './views/OrdersView.vue'
import InventoryView from './views/InventoryView.vue'
import './style.css'

const routes = [
  { path: '/', component: HomeView },
  { path: '/users', component: UsersView },
  { path: '/orders', component: OrdersView },
  { path: '/inventory', component: InventoryView }
]

const router = createRouter({ history: createWebHistory(), routes })

createApp(App).use(router).mount('#app')