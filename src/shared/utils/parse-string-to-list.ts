export function parseStringToList(str: any) {
    const lines = str.split(/\r?\n/).map((line: string) => line.trim()) // Разделяем по строкам

    return lines.map((line: string, index: number) => {
        if (line.startsWith('*')) {
            // Если строка начинается с "*", форматируем её как элемент списка
            return `\u2022 ${line.slice(1).trim()}`
        }

        if (line) {
            // Если это обычный текст, отображаем его как параграф
            return line
        }

        return null // Пропускаем пустые строки
    })
}
