<template>
  <section>
    <h2>Inventory</h2>

    <!-- 查询 / 选择 SKU -->
    <div class="form-row">
      <input v-model.trim="sku" placeholder="sku e.g. SKU-1" />
      <button @click="loadOne" :disabled="!sku || loading">Query</button>
      <button @click="reload" :disabled="loading">Reload List</button>
    </div>

    <!-- 列表 -->
    <table class="table" v-if="items.length">
      <thead>
        <tr><th>SKU</th><th style="width:120px">Stock</th><th style="width:140px">Action</th></tr>
      </thead>
      <tbody>
        <tr v-for="it in items" :key="it.sku"
            :style="it.sku===sku ? 'background:#fef3c7' : ''">
          <td>
            <a href="" @click.prevent="selectSku(it.sku)">{{ it.sku }}</a>
          </td>
          <td>{{ it.stock }}</td>
          <td>
            <button @click="adjust(it.sku, -1)" :disabled="loading">-1</button>
            <button @click="adjust(it.sku,  1)" :disabled="loading" style="margin-left:6px">+1</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>暂无库存项</p>

    <!-- 详情 / 调整 -->
    <div v-if="info" style="margin-top:12px">
      <p><b>Selected SKU:</b> {{ info.sku }} &nbsp; <b>Stock:</b> {{ info.stock }}</p>
      <form class="form-row" @submit.prevent="applyDelta">
        <label>Delta:</label>
        <input v-model.number="delta" type="number" style="width:120px" />
        <button :disabled="loading">Apply</button>
      </form>
    </div>

    <p v-if="error" style="color:#b91c1c">{{ error }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { listInventory, getInventory, updateInventory } from '../api'

type Item = { sku: string; stock: number }

const items = ref<Item[]>([])
const sku = ref('')
const info = ref<Item | null>(null)
const delta = ref(1)
const loading = ref(false)
const error = ref('')

function selectSku(s: string){
  sku.value = s
  loadOne()
}

async function reload(){
  loading.value = true
  try {
    items.value = await listInventory()
    error.value = ''
    // 若当前选择的 sku 在列表里，刷新详情；否则清空详情
    if (sku.value) {
      const exist = items.value.find(i => i.sku === sku.value)
      info.value = exist ? { ...exist } : null
    }
  } catch (e:any) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}

async function loadOne(){
  if(!sku.value) return
  loading.value = true
  try {
    info.value = await getInventory(sku.value)
    // 若详情在列表中不存在，则补入或更新
    const idx = items.value.findIndex(i => i.sku === info.value!.sku)
    if (idx >= 0) items.value[idx] = info.value!
    else items.value.unshift(info.value!)
    error.value = ''
  } catch (e:any) {
    // 兼容 404：清空 info，但保留提示
    info.value = null
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}

async function adjust(theSku: string, d: number){
  loading.value = true
  try {
    const updated = await updateInventory(theSku, d)
    // 更新列表
    const idx = items.value.findIndex(i => i.sku === updated.sku)
    if (idx >= 0) items.value[idx] = updated
    else items.value.unshift(updated)
    // 如果当前选中的是这个 sku，同步详情
    if (info.value && info.value.sku === updated.sku) info.value = updated
    error.value = ''
  } catch (e:any) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}

async function applyDelta(){
  if(!info.value) return
  await adjust(info.value.sku, Number(delta.value || 0))
}

onMounted(reload)
</script>