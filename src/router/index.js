import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import BasinPage from '@/pages/GangaBasin/BasinPage.vue'

const routes = [
  { path : '/', name : 'HomePage', component : HomePage,  },
  { path : '/about', name : 'AboutPage', component : AboutPage,  },
  { path : '/basin', name : 'BasinPage', component : BasinPage,  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router;
