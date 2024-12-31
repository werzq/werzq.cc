import { create } from 'zustand'

type State = {
  currentPage: string
  isLoading: boolean
  setCurrentPage: (page: string) => void
  setIsLoading: (loading: boolean) => void
}

export const useStore = create<State>((set) => ({
  currentPage: 'home',
  isLoading: true,
  setCurrentPage: (page) => set({ currentPage: page }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
