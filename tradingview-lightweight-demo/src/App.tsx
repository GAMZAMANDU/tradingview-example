import { Suspense, lazy } from 'react'

import ChartControls from './components/chart-controls'

const ChartView = lazy(() => import('./components/chart-view'))

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <header className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/50 p-6 shadow-card backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-primary/80">
            TradingView Lightweight Charts
          </p>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight">실시간 느낌을 주는 크립토 차트 실습</h1>
            <p className="max-w-3xl text-base text-slate-300">
              TradingView Lightweight Charts 공식 문서를 토대로 인터랙티브 차트를 구성했습니다. 타임프레임과
              차트 타입, 테마를 전환하며 API가 제공하는 옵션을 체험하세요.
            </p>
          </div>
          <a
            href="https://tradingview.github.io/lightweight-charts/docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-2xl border border-primary/40 px-5 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
          >
            공식 문서 열기
          </a>
        </header>

        <ChartControls />

        <section className="flex-1 rounded-3xl border border-white/5 bg-slate-900/40 p-4 shadow-card backdrop-blur">
          <Suspense
            fallback={
              <div className="flex h-[520px] items-center justify-center text-sm text-slate-400">
                차트 모듈을 불러오는 중입니다...
              </div>
            }
          >
            <ChartView />
          </Suspense>
        </section>

        <footer className="pb-6 text-xs text-slate-500">
          가상 데이터셋은 학습용으로만 제공되며 실제 시세와 다를 수 있습니다.
        </footer>
      </main>
    </div>
  )
}

export default App
