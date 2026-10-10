<script setup>
import { computed, onMounted, ref } from 'vue'

const products = ref([])
const loading = ref(false)
const errorMessage = ref('')
const searchText = ref('')
const API_URL = 'https://dummyjson.com/products?limit=30'

const filteredProducts = computed(() => {
  const keyword = searchText.value.trim().toLowerCase()
  if (!keyword) return products.value
  return products.value.filter(product =>
    String(product.title).toLowerCase().includes(keyword) ||
    String(product.category).toLowerCase().includes(keyword)
  )
})

async function fetchProducts() {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    products.value = data.products
  } catch (error) {
    console.error(error)
    errorMessage.value = 'โหลดข้อมูลสินค้าไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่'
  } finally {
    loading.value = false
  }
}

function printPage() {
  window.print()
}

function formatPrice(price) {
  return Number(price).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(fetchProducts)
</script>

<template>
  <section class="data-card">
    <div class="card-heading">
      <div class="heading-icon product-icon">▦</div>
      <div class="heading-copy">
        <div class="eyebrow">PRODUCT DATABASE</div>
        <h2>ตารางข้อมูลสินค้า</h2>
        <p>ข้อมูลสินค้าจาก Fake Store API</p>
      </div>
      <div class="count-badge">{{ filteredProducts.length }} <small>รายการ</small></div>
    </div>

    <div class="toolbar no-print">
      <div class="search-box">
        <span>⌕</span>
        <input v-model="searchText" type="search" placeholder="ค้นหาชื่อสินค้าหรือหมวดหมู่..." />
      </div>
      <button class="btn-action" @click="fetchProducts" :disabled="loading">
        <span>↻</span> {{ loading ? 'กำลังโหลด...' : 'โหลดข้อมูลใหม่' }}
      </button>
      <button class="btn-print" @click="printPage">บันทึก PDF / พิมพ์</button>
    </div>

    <div v-if="loading" class="state-box"><div class="spinner-border text-primary" role="status"></div><p>กำลังดึงข้อมูลสินค้าจาก API...</p></div>
    <div v-else-if="errorMessage" class="alert alert-warning">{{ errorMessage }} <button class="btn btn-sm btn-outline-dark ms-2" @click="fetchProducts">ลองใหม่</button></div>

    <div v-else class="table-responsive">
      <table class="table data-table align-middle">
        <thead><tr><th class="id-col">รหัส</th><th>รูปสินค้า</th><th>ชื่อสินค้า</th><th>หมวดหมู่</th><th class="text-end">ราคา</th><th class="text-center">คะแนน</th></tr></thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td><span class="id-chip">#{{ product.id }}</span></td>
            <td><div class="product-thumb"><img :src="product.thumbnail" :alt="product.title" loading="lazy" /></div></td>
            <td><div class="product-name">{{ product.title }}</div><div class="product-desc">{{ product.description }}</div></td>
            <td><span class="category-chip">{{ product.category }}</span></td>
            <td class="text-end price-cell">฿{{ formatPrice(product.price) }}</td>
            <td class="text-center"><span class="rating">★ {{ product.rating?.rate ?? '-' }}</span><small class="rating-count">({{ product.rating?.count ?? 0 }})</small></td>
          </tr>
          <tr v-if="filteredProducts.length === 0"><td colspan="6" class="empty-row">ไม่พบสินค้าที่ค้นหา</td></tr>
        </tbody>
      </table>
    </div>

    <div class="table-bottom"><span>แหล่งข้อมูล: dummyjson.com/products</span><span>แสดง {{ filteredProducts.length }} รายการ</span></div>
  </section>
</template>

<script>
export default {
  methods: {
    // ทำให้ปุ่มพิมพ์เรียกหน้าต่างพิมพ์ของเบราว์เซอร์ เพื่อเลือก Save as PDF ได้
  }
}
</script>