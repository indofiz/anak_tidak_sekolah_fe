import { create } from 'zustand'

interface FilterState {
    page: number
    per_page: number
    parameter: string
    is_old: 0 | 1
    is_all: 0 | 1
    setFilter: (filter: Partial<FilterState>) => void
}

const useFilterAnak = create<FilterState>((set) => ({
    page: 1,
    per_page: 10,
    parameter: '',
    is_old: 0,
    is_all: 0,
    setFilter: (filter) => set((state) => ({ ...state, ...filter })),
}))

export default useFilterAnak
