import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserLocation } from '@/types'

// 위치 비허용 시 기본값 (역삼 멀티캠퍼스)
const DEFAULT_LOCATION: UserLocation = {
  lat: 37.5033,
  lng: 127.0440,
  label: '역삼 멀티캠퍼스'
}

export const useLocationStore = defineStore('location', () => {
  const userLocation = ref<UserLocation>(DEFAULT_LOCATION)
  const permissionGranted = ref<boolean | null>(null) // null = 아직 요청 전

  function setLocation(location: UserLocation) {
    userLocation.value = location
    permissionGranted.value = true
  }

  function useFallback() {
    userLocation.value = DEFAULT_LOCATION
    permissionGranted.value = false
  }

  return { userLocation, permissionGranted, setLocation, useFallback }
})
