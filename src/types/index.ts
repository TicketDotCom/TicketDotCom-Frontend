// 체험권 상태 (서비스 측)
export type TicketStatus = 'soon' | 'open' | 'near' | 'full' | 'ended'

// 신청 상태 (사용자 측)
export type ApplicationStatus = 'applied' | 'used' | 'canceled'

export type SortOption = '거리순' | '마감임박' | '최신순'

export interface Ticket {
  id: string
  title: string
  category: string
  distance: number       // km
  capacity: number       // 총 정원
  remaining: number      // 잔여 수량
  status: TicketStatus
  openAt: string         // ISO 8601
  closeAt: string        // ISO 8601
  address: string
  imageUrl: string
  description: string
}

export interface Application {
  id: string
  ticketId: string
  ticket: Ticket
  status: ApplicationStatus
  appliedAt: string
}

export interface User {
  email: string
  nickname: string
}

export interface UserLocation {
  lat: number
  lng: number
  label: string
}

export interface NearbySpot {
  id: string
  name: string
  distance: number       // km
  imageUrl: string
  mapUrl: string
}

export interface SearchFilters {
  category: string[]
  status: TicketStatus[]
  distance: number | null
}
