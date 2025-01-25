import { StateCreator } from 'zustand'

import { IChatSlice, TChatComposeSize } from '../types'

export const chatSlice: StateCreator<IChatSlice> = set => ({
    showChatCompose: 'min',

    setShowChatCompose: (showChatCompose: TChatComposeSize) => set({ showChatCompose })
})
