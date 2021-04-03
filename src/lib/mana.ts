const TELO_SYMBOL = '⏣'

export function addSymbol(num: number) {
  return num > 0 ? `${TELO_SYMBOL} ${num.toString()}` : ''
}
