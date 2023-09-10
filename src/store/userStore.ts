import { USERS_MOCK } from '@/mock'
import { User } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserStore {
  users: User[]
  addUser: (user: User) => void
  removeUser: (user: User) => void
  updateUser: (user: User) => void
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalUser?: User
  setEditModalUser: (user?: User) => void
}

const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      users: USERS_MOCK,
      addUser: (user: User) => set((state) => ({ users: [...state.users, user] })),
      removeUser: (user: User) => set((state) => ({ users: state.users.filter(t => t.id !== user.id) })),
      updateUser: (user: User) => set((state) => ({ users: state.users.map(t => t.id === user.id ? user : t) })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalUser: undefined,
      setEditModalUser: (user?: User) => set(() => ({ editModalUser: user })),
    }),
  )
)

export default useUserStore;