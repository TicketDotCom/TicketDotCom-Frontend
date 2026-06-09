import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SearchFilters, SortOption, TicketStatus } from '@/types'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const sort = ref<SortOption>('거리순')
  const filters = ref<SearchFilters>({
    category: [],
    status: [] as TicketStatus[],
    distance: null
  })
  const page = ref(1)

  function reset() {
    query.value = ''
    sort.value = '거리순'
    filters.value = { category: [], status: [], distance: null }
    page.value = 1
  }

  return { query, sort, filters, page, reset }
})
