import create from 'zustand'

type StatusState = { status: 'ONLINE' | 'OFFLINE' | 'UNKNOWN' }

type StatusHandlers = {
  setStatus: (state: 'ONLINE' | 'OFFLINE' | 'UNKNOWN') => void
}

type StatusStore = StatusState & StatusHandlers

export const useStatusStore = create<StatusStore>((set) => ({
  status: 'UNKNOWN',
  setStatus: (status: 'ONLINE' | 'OFFLINE' | 'UNKNOWN') => {
    set({ status })
  },
}))
