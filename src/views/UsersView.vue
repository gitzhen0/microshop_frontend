<template>
  <section>
    <h2>Users</h2>

    <form class="form-row" @submit.prevent="submit">
      <input v-model.trim="name" placeholder="name" />
      <button :disabled="loading || !name">Create</button>
    </form>

    <p v-if="error" style="color:#b91c1c">{{ error }}</p>

    <table class="table" v-if="users.length">
      <thead><tr><th>ID</th><th>Name</th></tr></thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.id }}</td><td>{{ u.name }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>暂无用户</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { listUsers, createUser } from '../api'

const users = ref<any[]>([])
const name = ref('')
const loading = ref(false)
const error = ref('')

async function load() {
  try { users.value = await listUsers(); error.value = '' }
  catch (e:any) { error.value = e.message }
}
async function submit() {
  if (!name.value) return
  loading.value = true
  try { await createUser(name.value); name.value=''; await load() }
  catch (e:any) { error.value = e.message }
  finally { loading.value = false }
}
onMounted(load)
</script>