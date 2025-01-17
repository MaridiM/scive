export type TTextSize = 'large' | 'small'

export interface ICoreStore {
    textSize: TTextSize
    setTextSize: (value: TTextSize) => void
}
