import { coreStore } from '../libs'

export function useTextSize() {
    const { textSize, setTextSize } = coreStore()

    const large = () => setTextSize('large')
    const small = () => setTextSize('small')

    return {
        textSize,
        large,
        small
    }
}
