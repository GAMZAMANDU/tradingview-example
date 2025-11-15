import { z } from 'zod'

import { areaSeriesBySymbol, candleSeriesBySymbol, MARKET_SYMBOLS } from '../data/market-data'
import type { ChartSnapshot, MarketSymbol, Timeframe } from '../types/chart'

const candleSchema = z.object({
  time: z.string(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number(),
})

const areaSchema = z.object({
  time: z.string(),
  value: z.number(),
})

const snapshotSchema = z.object({
  candles: z.array(candleSchema),
  area: z.array(areaSchema),
})

const simulateLatency = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

export const SYMBOL_OPTIONS = MARKET_SYMBOLS

export async function fetchMarketSnapshot(symbol: MarketSymbol, timeframe: Timeframe): Promise<ChartSnapshot> {
  const seriesByTimeframe = candleSeriesBySymbol[symbol]
  const areaByTimeframe = areaSeriesBySymbol[symbol]

  if (!seriesByTimeframe || !areaByTimeframe) {
    throw new Error('지원되지 않는 심볼입니다.')
  }

  const candles = seriesByTimeframe[timeframe]
  const area = areaByTimeframe[timeframe]

  const validated = snapshotSchema.parse({ candles, area })

  await simulateLatency()

  return {
    symbol,
    timeframe,
    candles: validated.candles,
    area: validated.area,
  }
}

