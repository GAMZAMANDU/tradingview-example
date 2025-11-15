export const TIMEFRAMES = ['1D', '1W', '1M'] as const
export type Timeframe = (typeof TIMEFRAMES)[number]

export const CHART_TYPES = ['candlestick', 'area'] as const
export type ChartType = (typeof CHART_TYPES)[number]

export const THEMES = ['dark', 'light'] as const
export type ThemeMode = (typeof THEMES)[number]

export type MarketSymbol = 'BTCUSDT' | 'ETHUSDT'

export interface CandlePoint {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface AreaPoint {
  time: string
  value: number
}

export interface ChartSnapshot {
  symbol: MarketSymbol
  timeframe: Timeframe
  candles: CandlePoint[]
  area: AreaPoint[]
}

