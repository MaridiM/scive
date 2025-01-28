'use client'

import { useState } from 'react'

import { Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

import { DIGEST_TAGS } from '@/enitites/api'

export function DigestTags() {
    const [selectedDigestTag, setSelectedDigestTag] = useState('all')

    function digestTagsHandler(key: string) {
        setSelectedDigestTag(key)
    }
    return (
        <ul className='flex flex-wrap gap-1.5'>
            {DIGEST_TAGS.map(tag => {
                const selected = selectedDigestTag === tag.key
                return (
                    <li
                        key={tag.key}
                        onClick={() => digestTagsHandler(tag.key)}
                        className={cn('flex h-8 cursor-pointer items-center justify-center rounded-lg bg-white px-2', {
                            'bg-black': selected
                        })}
                    >
                        <Typography
                            variant='body'
                            className={cn('!text-base-body font-normal leading-7', {
                                'text-white': selected
                            })}
                        >
                            {tag.title}
                        </Typography>
                    </li>
                )
            })}
        </ul>
    )
}
