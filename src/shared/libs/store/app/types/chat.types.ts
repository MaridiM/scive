export type TChatComposeSize = 'min' | 'max'

export interface IChatSlice {
    showChatCompose: TChatComposeSize

    setShowChatCompose: (showChatCompose: TChatComposeSize) => void
}
