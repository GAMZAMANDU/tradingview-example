import { create } from 'zustand'

import type { ChartType, MarketSymbol, ThemeMode, Timeframe } from '../types/chart'

interface ChartState {
  symbol: MarketSymbol
  selectedTimeframe: Timeframe
  chartType: ChartType
  theme: ThemeMode
  setSymbol: (symbol: MarketSymbol) => void
  setTimeframe: (timeframe: Timeframe) => void
  setChartType: (chartType: ChartType) => void
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

export const useChartStore = create<ChartState>((set) => ({
  symbol: 'BTCUSDT',
  selectedTimeframe: '1D',
  chartType: 'candlestick',
  theme: 'dark',
  setSymbol: (symbol) => set({ symbol }),
  setTimeframe: (selectedTimeframe) => set({ selectedTimeframe }),
  setChartType: (chartType) => set({ chartType }),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
}))

