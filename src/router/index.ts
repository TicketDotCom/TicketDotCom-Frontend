import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // 홈
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    // 검색, 탐색
    {
      path: '/browse',
      name: 'browse',
      component: () => import('@/views/BrowseView.vue')
    },
    // 상세
    {
      path: '/ticket/:id',
      name: 'detail',
      component: () => import('@/views/DetailView.vue')
    },
    // 인증
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue')
    },
    {
      path: '/find-password',
      name: 'find-password',
      component: () => import('@/views/auth/FindPasswordView.vue')
    },
    // 마이페이지 (로그인 필요)
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('@/views/mypage/MypageView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage/applications',
      name: 'applications',
      component: () => import('@/views/mypage/ApplicationListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage/edit',
      name: 'edit-profile',
      component: () => import('@/views/mypage/EditProfileView.vue'),
      meta: { requiresAuth: true }
    },
    // 기타
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/misc/TermsView.vue')
    },
    {
      path: '/service-info',
      name: 'service-info',
      component: () => import('@/views/misc/ServiceInfoView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/misc/MapView.vue')
    }
  ]
})

// 로그인 필요 페이지 가드
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    auth.redirectAfterLogin = to.fullPath
    return { name: 'login' }
  }
})

export default router
