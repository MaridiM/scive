import { z } from 'zod'

import { TMaxWords, TTonality } from '@/shared/types'

export const generateComposeFormSchema = z.object({
    prompt: z.string().min(1),
    max_words: z.number().default(0),
    tonality: z.number().default(0)
})

export type TGenerateComposeFormSchema = z.infer<typeof generateComposeFormSchema>

export const tonality: TTonality[] = ['FRIENDLY', 'NEUTRAL', 'PROFESSIONAL', 'FORMAL']
export const maxWords: TMaxWords[] = [50, 150, 300, 500]
