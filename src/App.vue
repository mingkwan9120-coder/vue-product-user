<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="site-shell">
    <header class="topbar no-print">
      <div class="brand-mark">V</div>
      <div class="brand-copy">
        <div class="brand-title">Vue Data Portal</div>
        <div class="brand-subtitle">แบบฝึกหัดที่ 17 · ICT12267</div>
      </div>
      <span class="live-pill"><span></span> API CONNECTED</span>
    </header>

    <section class="page-hero no-print">
      <div class="hero-kicker">VUE.JS + REST API</div>
      <h1>ระบบแสดงข้อมูลสินค้าและผู้ใช้</h1>
      <p>ดึงข้อมูลจาก API และแสดงผลในรูปแบบตาราง</p>
      <div class="hero-decoration">✦</div>
    </section>

    <nav class="main-nav no-print">
      <RouterLink to="/products" class="nav-item" :class="{ selected: route.path === '/products' }">
        <span class="nav-symbol">▦</span> ข้อมูลสินค้า
      </RouterLink>
      <RouterLink to="/users" class="nav-item" :class="{ selected: route.path === '/users' }">
        <span class="nav-symbol">♙</span> ข้อมูลผู้ใช้
      </RouterLink>
    </nav>

    <main class="content-area">
      <RouterView />
    </main>

    <footer class="footer no-print">
      <span>แบบฝึกหัดที่ 17 · Vue.js</span>
      <span>แสดงข้อมูลผ่าน API</span>
    </footer>
  </div>
</template>