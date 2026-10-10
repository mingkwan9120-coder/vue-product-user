<script setup>
import { computed, onMounted, ref } from 'vue'

const users = ref([])
const loading = ref(false)
const errorMessage = ref('')
const searchText = ref('')
const API_URL = 'https://dummyjson.com/users?limit=30'

const filteredUsers = computed(() => {
  const keyword = searchText.value.trim().toLowerCase()
  if (!keyword) return users.value
  return users.value.filter(user =>
    [user.name, user.username, user.email, user.company?.name, user.address?.city]
      .some(value => String(value ?? '').toLowerCase().includes(keyword))
  )
})

async function fetchUsers() {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    users.value = data.users.map(user => ({
      ...user,
      name: `${user.firstName} ${user.lastName}`,
      address: { city: user.address?.city },
      company: { name: user.company?.name }
    }))
  } catch (error) {
    console.error(error)
    errorMessage.value = 'โหลดข้อมูลผู้ใช้ไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่'
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)
</script>

<template>
  <section class="data-card">
    <div class="card-heading">
      <div class="heading-icon user-icon">♙</div>
      <div class="heading-copy">
        <div class="eyebrow">USER DIRECTORY</div>
        <h2>ตารางข้อมูลผู้ใช้</h2>
        <p>ข้อมูลผู้ใช้จาก JSONPlaceholder API</p>
      </div>
      <div class="count-badge">{{ filteredUsers.length }} <small>รายการ</small></div>
    </div>

    <div class="toolbar no-print">
      <div class="search-box">
        <span>⌕</span>
        <input v-model="searchText" type="search" placeholder="ค้นหาชื่อ อีเมล บริษัท หรือเมือง..." />
      </div>
      <button class="btn-action" @click="fetchUsers" :disabled="loading">
        <span>↻</span> {{ loading ? 'กำลังโหลด...' : 'โหลดข้อมูลใหม่' }}
      </button>
      <button class="btn-print" @click="printPage">บันทึก PDF / พิมพ์</button>
    </div>

    <div v-if="loading" class="state-box"><div class="spinner-border text-primary" role="status"></div><p>กำลังดึงข้อมูลผู้ใช้จาก API...</p></div>
    <div v-else-if="errorMessage" class="alert alert-warning">{{ errorMessage }} <button class="btn btn-sm btn-outline-dark ms-2" @click="fetchUsers">ลองใหม่</button></div>

    <div v-else class="table-responsive">
      <table class="table data-table user-table align-middle">
        <thead><tr><th class="id-col">รหัส</th><th>ชื่อ-นามสกุล</th><th>ชื่อผู้ใช้</th><th>อีเมล</th><th>เมือง</th><th>บริษัท</th></tr></thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td><span class="id-chip">#{{ user.id }}</span></td>
            <td><div class="user-cell"><div class="avatar">{{ user.name?.charAt(0) }}</div><div class="user-name">{{ user.name }}</div></div></td>
            <td><span class="username">@{{ user.username }}</span></td>
            <td><a class="email-link" :href="`mailto:${user.email}`">{{ user.email }}</a></td>
            <td>{{ user.address?.city }}</td>
            <td><span class="company-chip">{{ user.company?.name }}</span></td>
          </tr>
          <tr v-if="filteredUsers.length === 0"><td colspan="6" class="empty-row">ไม่พบผู้ใช้ที่ค้นหา</td></tr>
        </tbody>
      </table>
    </div>

    <div class="table-bottom"><span>แหล่งข้อมูล: dummyjson.com/users</span><span>แสดง {{ filteredUsers.length }} รายการ</span></div>
  </section>
</template>

<script>
export default {
  methods: {
    printPage() {
      window.print()
    }
  }
}
</script>