import { RISKS } from '@/constants/risk.config'
import { Risk } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface RiskStore {
  risks: Risk[]
  editModalRisk: Risk | undefined
  setRisks: (risks: Risk[]) => void
  addRisk: (risk: Risk) => void
  removeRisk: (risk: Risk) => void
  updateRisk: (risk: Risk) => void
  editModalOpen: boolean
  setEditModalRisk: (risk?: Risk) => void
  setEditModalOpen: (open: boolean) => void
  getRiskById: (id: string) => Risk | undefined
}

export const riskStore = create<RiskStore>()(
  devtools(
    (set, get) => ({
      risks: RISKS,
      setRisks: (risks: Risk[]) => set((state) => ({ risks })),
      addRisk: (risk: Risk) => set((state) => ({ risks: [...state.risks, risk] })),
      removeRisk: (risk: Risk) => set((state) => ({ risks: state.risks.filter(r => r.id !== risk.id) })),
      updateRisk: (risk: Risk) => set((state) => ({ risks: state.risks.map(r => r.id === risk.id ? risk : r) })),
      editModalRisk: undefined,
      setEditModalRisk: (risk?: Risk) => set(() => ({ editModalRisk: risk })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      getRiskById: (id: string) => get().risks.find(r => r.id === id),
    })
  )
)