import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './style.css'
import App from './App.vue'
import ProductTable from './views/ProductTable.vue'
import UserTable from './views/UserTable.vue'

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', name: 'products', component: ProductTable },
  { path: '/users', name: 'users', component: UserTable }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')