<template>
  <section>
    <h2>Orders</h2>

    <form class="form-row" @submit.prevent="submit">
      <input v-model.trim="sku" placeholder="sku e.g. SKU-1" />
      <input v-model.number="qty" type="number" min="1" style="width:120px" />
      <button :disabled="loading || !sku || qty<1">Create</button>
    </form>

    <p v-if="error" style="color:#b91c1c">{{ error }}</p>

    <table class="table" v-if="orders.length">
      <thead><tr><th>ID</th><th>SKU</th><th>Qty</th><th>CreatedAt</th></tr></thead>
      <tbody>
        <tr v-for="o in orders" :key="o.id">
          <td>{{ o.id }}</td>
          <td>{{ o.sku }}</td>
          <td>{{ o.qty }}</td>
          <td>{{ o.createdAt }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>暂无订单</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { listOrders, createOrder } from '../api'

const orders = ref<any[]>([])
const sku = ref('')
const qty = ref(1)
const loading = ref(false)
const error = ref('')

async function load(){ try{ orders.value = await listOrders(); error.value='' } catch(e:any){ error.value = e.message } }
async function submit(){
  if(!sku.value || qty.value<1) return
  loading.value = true
  try { await createOrder(sku.value, qty.value); sku.value=''; qty.value=1; await load() }
  catch(e:any){ error.value = e.message }
  finally { loading.value = false }
}
onMounted(load)
</script>