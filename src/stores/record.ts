import { StatusEnum } from '@/shared/enums'
import { defineStore } from 'pinia'

/**
 * Stores the currently selected record.
 */
export const useRecordStore = defineStore({
  id: 'record',

  state: () => ({
    record: {} as Record<string, any>,
  }),

  getters: {
    lockedStatus: (state): boolean => {
      return state?.record?.status?.includes(StatusEnum.LOCKED) ?? false
    },
    favoritedStatus: (state): boolean => {
      return state?.record?.status?.includes(StatusEnum.FAVORITED) ?? false
    },
    hiddenStatus: (state): boolean => {
      return state?.record?.status?.includes(StatusEnum.HIDDEN) ?? false
    },
  },
})
