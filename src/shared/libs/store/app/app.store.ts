import { create } from 'zustand'

import { chatSlice } from './slices'
import { IChatSlice } from './types'

type TBoundStore = IChatSlice

export const useStore = create<TBoundStore>()((...args) => ({
    ...chatSlice(...args)
}))
