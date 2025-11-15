import { useEffect, useMemo, useRef } from 'react'
import { AreaSeries, CandlestickSeries, ColorType, CrosshairMode, createChart } from 'lightweight-charts'

import { useChartData } from '../hooks/use-chart-data'
import { useChartStore } from '../store/chart-store'

const formatCurrency = (value?: number) =>
  typeof value === 'number' ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '--'

const ChartView = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { chartType, selectedTimeframe, theme, symbol } = useChartStore()
  const { data, isLoading, isError, refetch, error } = useChartData(symbol, selectedTimeframe)

  const priceInsight = useMemo(() => {
    if (!data?.candles.length) {
      return { latestClose: undefined, change: 0, changePct: 0 }
    }

    const latest = data.candles.at(-1)!
    const previous = data.candles.at(-2) ?? latest
    const change = latest.close - previous.close
    const changePct = previous.close ? (change / previous.close) * 100 : 0

    return { latestClose: latest.close, change, changePct }
  }, [data])

  useEffect(() => {
    if (!containerRef.current || !data) {
      return
    }

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: theme === 'dark' ? '#020617' : '#ffffff' },
        textColor: theme === 'dark' ? '#cbd5f5' : '#0f172a',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      grid: {
        vertLines: { color: theme === 'dark' ? 'rgba(148,163,184,0.12)' : 'rgba(15,23,42,0.08)' },
        horzLines: { color: theme === 'dark' ? 'rgba(148,163,184,0.12)' : 'rgba(15,23,42,0.08)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(148, 163, 184, 0.25)',
      },
      timeScale: {
        borderColor: 'rgba(148, 163, 184, 0.25)',
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
      },
      localization: {
        priceFormatter: (price: number) => `$${price.toFixed(2)}`,
      },
    })

    if (chartType === 'candlestick') {
      const series = chart.addSeries(CandlestickSeries, {
        upColor: '#22c55e',
        downColor: '#ef4444',
        wickDownColor: '#ef4444',
        wickUpColor: '#22c55e',
        borderDownColor: '#ef4444',
        borderUpColor: '#22c55e',
      })
      series.setData(data.candles)
    } else {
      const series = chart.addSeries(AreaSeries, {
        lineColor: '#38bdf8',
        topColor: 'rgba(56, 189, 248, 0.35)',
        bottomColor: 'rgba(15, 23, 42, 0.05)',
        lineWidth: 3,
      })
      series.setData(data.area)
    }

    chart.timeScale().fitContent()

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      chart.applyOptions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
      chart.timeScale().fitContent()
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [chartType, data, theme])

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-3xl border border-white/5 bg-slate-950/60 p-5 text-slate-100">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
              {symbol} · {selectedTimeframe}
            </p>
            <div className="mt-2 flex items-end gap-4">
              <p className="text-4xl font-semibold">{formatCurrency(priceInsight.latestClose)}</p>
              <p
                className={`text-sm font-semibold ${
                  priceInsight.change >= 0 ? 'text-primary' : 'text-danger'
                }`}
              >
                {priceInsight.change >= 0 ? '+' : ''}
                {priceInsight.change.toFixed(2)} ({priceInsight.changePct.toFixed(2)}%)
              </p>
            </div>
          </div>
          {isError && (
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-2xl border border-danger/40 px-4 py-2 text-sm font-semibold text-danger transition hover:border-danger hover:bg-danger/10"
            >
              다시 불러오기
            </button>
          )}
        </div>
        {isError && (
          <p className="mt-3 text-sm text-danger/80">
            {(error as Error)?.message ?? '데이터를 불러오지 못했습니다.'}
          </p>
        )}
      </div>

      <div className="relative h-[420px] w-full rounded-3xl border border-white/5 bg-slate-950/40 md:h-[520px]">
        <div ref={containerRef} className="absolute inset-0 rounded-3xl" />
        {(isLoading || !data) && (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-slate-400">
            차트를 초기화하는 중입니다...
          </div>
        )}
      </div>
    </div>
  )
}

export default ChartView

