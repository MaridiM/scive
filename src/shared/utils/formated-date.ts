import { format, isToday, parseISO } from 'date-fns'

export const formattedDate = (date: string): string => {
    const dateObj = parseISO(date)

    if (isToday(dateObj)) {
        return format(dateObj, 'hh:mm a')
    }

    return format(dateObj, 'd MMM')
}
