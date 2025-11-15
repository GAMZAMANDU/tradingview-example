import type { AreaPoint, CandlePoint, MarketSymbol, Timeframe } from '../types/chart'

type TimeframeSeries = Record<Timeframe, CandlePoint[]>

const btcDaily: CandlePoint[] = [
  { time: '2024-11-01', open: 67580, high: 68410, low: 67120, close: 68150, volume: 31250 },
  { time: '2024-11-04', open: 68120, high: 69250, low: 67800, close: 68940, volume: 35210 },
  { time: '2024-11-05', open: 68960, high: 69680, low: 68480, close: 69210, volume: 33110 },
  { time: '2024-11-06', open: 69220, high: 70330, low: 68850, close: 70110, volume: 36450 },
  { time: '2024-11-07', open: 70150, high: 70890, low: 69640, close: 69980, volume: 34220 },
  { time: '2024-11-08', open: 70010, high: 71230, low: 69710, close: 71050, volume: 37880 },
  { time: '2024-11-11', open: 71110, high: 72240, low: 70770, close: 71990, volume: 40210 },
  { time: '2024-11-12', open: 72050, high: 72880, low: 71520, close: 71830, volume: 35540 },
  { time: '2024-11-13', open: 71820, high: 72400, low: 70940, close: 71260, volume: 31050 },
  { time: '2024-11-14', open: 71290, high: 72130, low: 70820, close: 71910, volume: 29500 },
]

const btcWeekly: CandlePoint[] = [
  { time: '2024-10-07', open: 64010, high: 67230, low: 62820, close: 66540, volume: 152300 },
  { time: '2024-10-14', open: 66500, high: 68990, low: 65440, close: 68270, volume: 161420 },
  { time: '2024-10-21', open: 68210, high: 70580, low: 67500, close: 69960, volume: 172380 },
  { time: '2024-10-28', open: 69980, high: 71310, low: 68880, close: 70740, volume: 168110 },
  { time: '2024-11-04', open: 70730, high: 72940, low: 70120, close: 72250, volume: 179540 },
]

const btcMonthly: CandlePoint[] = [
  { time: '2024-08-01', open: 58600, high: 61200, low: 57510, close: 60310, volume: 542100 },
  { time: '2024-09-01', open: 60340, high: 64880, low: 59650, close: 64120, volume: 598400 },
  { time: '2024-10-01', open: 64100, high: 71350, low: 63330, close: 70580, volume: 672050 },
  { time: '2024-11-01', open: 70600, high: 74280, low: 69850, close: 72890, volume: 701230 },
]

const btcSeries: TimeframeSeries = {
  '1D': btcDaily,
  '1W': btcWeekly,
  '1M': btcMonthly,
}

const scaleSeries = (series: CandlePoint[], multiplier: number): CandlePoint[] =>
  series.map((point) => ({
    time: point.time,
    open: Number((point.open * multiplier).toFixed(2)),
    high: Number((point.high * multiplier).toFixed(2)),
    low: Number((point.low * multiplier).toFixed(2)),
    close: Number((point.close * multiplier).toFixed(2)),
    volume: Math.round(point.volume * multiplier * 1.12),
  }))

const cloneWithMultiplier = (map: TimeframeSeries, multiplier: number): TimeframeSeries =>
  Object.fromEntries(
    (Object.entries(map) as [Timeframe, CandlePoint[]][]).map(([timeframe, series]) => [
      timeframe,
      scaleSeries(series, multiplier),
    ]),
  ) as TimeframeSeries

const ethSeries = cloneWithMultiplier(btcSeries, 0.052)

export const candleSeriesBySymbol: Record<MarketSymbol, TimeframeSeries> = {
  BTCUSDT: btcSeries,
  ETHUSDT: ethSeries,
}

const buildArea = (map: TimeframeSeries): Record<Timeframe, AreaPoint[]> =>
  Object.fromEntries(
    (Object.entries(map) as [Timeframe, CandlePoint[]][]).map(([timeframe, series]) => [
      timeframe,
      series.map(({ time, close }) => ({ time, value: close })),
    ]),
  ) as Record<Timeframe, AreaPoint[]>

export const areaSeriesBySymbol: Record<MarketSymbol, Record<Timeframe, AreaPoint[]>> = {
  BTCUSDT: buildArea(btcSeries),
  ETHUSDT: buildArea(ethSeries),
}

export const MARKET_SYMBOLS = [
  { id: 'BTCUSDT', label: 'Bitcoin · Tether' },
  { id: 'ETHUSDT', label: 'Ethereum · Tether' },
] as const

