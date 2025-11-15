import { useQuery } from '@tanstack/react-query'

import { fetchMarketSnapshot } from '../lib/market-service'
import type { MarketSymbol, Timeframe } from '../types/chart'

export const marketQueryKeys = {
  all: ['market'] as const,
  detail: (symbol: MarketSymbol, timeframe: Timeframe) => ['market', symbol, timeframe] as const,
}

export const useChartData = (symbol: MarketSymbol, timeframe: Timeframe) =>
  useQuery({
    queryKey: marketQueryKeys.detail(symbol, timeframe),
    queryFn: () => fetchMarketSnapshot(symbol, timeframe),
    staleTime: 60 * 1000,
    retry: 1,
  })

