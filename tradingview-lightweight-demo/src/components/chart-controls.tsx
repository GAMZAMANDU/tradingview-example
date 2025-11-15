import { useQueryClient } from '@tanstack/react-query'
import { RefreshCw, SunMedium, Moon } from 'lucide-react'

import { marketQueryKeys } from '../hooks/use-chart-data'
import { SYMBOL_OPTIONS } from '../lib/market-service'
import { useChartStore } from '../store/chart-store'
import { CHART_TYPES, TIMEFRAMES, type ChartType, type MarketSymbol, type Timeframe } from '../types/chart'

const getButtonClasses = (isActive: boolean) =>
  [
    'rounded-2xl border px-4 py-2 text-sm font-medium transition',
    isActive
      ? 'border-primary/60 bg-primary/10 text-primary shadow-inner shadow-primary/30'
      : 'border-white/10 text-slate-300 hover:border-primary/40 hover:text-primary',
  ].join(' ')

const ChartControls = () => {
  const queryClient = useQueryClient()
  const { symbol, selectedTimeframe, chartType, theme, setSymbol, setTimeframe, setChartType, toggleTheme } = useChartStore()

  const handleRefresh = () =>
    queryClient.invalidateQueries({
      queryKey: marketQueryKeys.detail(symbol, selectedTimeframe),
    })

  const renderTimeframeButton = (timeframe: Timeframe) => (
    <button
      key={timeframe}
      type="button"
      className={getButtonClasses(selectedTimeframe === timeframe)}
      onClick={() => setTimeframe(timeframe)}
      aria-pressed={selectedTimeframe === timeframe}
    >
      {timeframe}
    </button>
  )

  const renderChartTypeButton = (type: ChartType) => (
    <button
      key={type}
      type="button"
      className={getButtonClasses(chartType === type)}
      onClick={() => setChartType(type)}
      aria-pressed={chartType === type}
    >
      {type === 'candlestick' ? 'Candlestick' : 'Area'}
    </button>
  )

  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-slate-900/60 p-4 shadow-card backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Symbol</p>
          <select
            value={symbol}
            onChange={(event) => setSymbol(event.target.value as MarketSymbol)}
            className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm font-medium text-white focus:border-primary focus:outline-none"
          >
            {SYMBOL_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-primary/60 hover:text-primary"
            aria-label="테마 전환"
          >
            {theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? '라이트 모드' : '다크 모드'}
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-primary/60 hover:text-primary"
          >
            <RefreshCw size={16} />
            새로고침
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Timeframes</p>
          <div className="flex flex-wrap gap-2">{TIMEFRAMES.map(renderTimeframeButton)}</div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Chart Type</p>
          <div className="flex flex-wrap gap-2">{CHART_TYPES.map(renderChartTypeButton)}</div>
        </div>
      </div>
    </section>
  )
}

export default ChartControls

