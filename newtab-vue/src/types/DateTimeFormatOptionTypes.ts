export type DateStyleType = 'short' | 'full' | 'long' | 'medium' | undefined
export type TimeStyleType = 'short' | 'full' | 'long' | 'medium' | undefined
export type Hour12Type = boolean | undefined

export function isTimeStyleType(str: string | undefined): boolean {
    return (['short', 'full', 'long', 'medium', undefined] as const).includes(str as TimeStyleType)
}

export function isDateStyleType(str: string | undefined): boolean {
    return (['short', 'full', 'long', 'medium', undefined] as const).includes(str as DateStyleType)
}