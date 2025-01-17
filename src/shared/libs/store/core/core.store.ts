import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { ICoreStore, TTextSize } from './core.types'

export const coreStore = create(
    persist<ICoreStore>(
        set => ({
            textSize: 'large',
            setTextSize: (value: TTextSize) => set({ textSize: value })
        }),
        {
            name: 'core',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
