# TradingView Lightweight Charts Demo

TradingView Lightweight Charts 공식 문서를 참고하여 만든 Vite + React(Typescript) 기반 체험용 대시보드입니다. 심볼, 타임프레임, 차트 타입, 테마를 바꿔가며 라이브러리 옵션을 빠르게 확인할 수 있습니다.

## 주요 기술
- **Vite + React 19 + TypeScript**: 모던 프론트엔드 개발 환경
- **Tailwind CSS**: 반응형 UI와 글래스모피즘 스타일
- **lightweight-charts**: TradingView가 제공하는 초경량 차트 엔진
- **Zustand + TanStack Query + Zod**: 글로벌 상태, 데이터 패칭, 데이터 스키마 검증

## 빠른 시작

```bash
pnpm install   # 또는 npm install / yarn
pnpm dev       # http://localhost:5173
```

### 주요 스크립트
- `pnpm dev`: 개발 서버 실행 (HMR)
- `pnpm build`: 타입 검사 후 프로덕션 번들 생성
- `pnpm preview`: 번들 결과 미리보기
- `pnpm lint`: ESLint 검사

## 폴더 구조
```
src/
 ├─ components/      # 차트 컨트롤/뷰
 ├─ data/            # 샘플 OHLC 데이터
 ├─ hooks/           # React Query 훅
 ├─ lib/             # 데이터 서비스 + 유틸
 ├─ store/           # Zustand 전역 상태
 ├─ types/           # 공용 타입 정의
 └─ App.tsx          # 페이지 구성
```

## 기능 설명
- **ChartControls**: 심볼 선택, 타임프레임 전환, 차트 타입 변경, 테마 토글, 데이터 리프레시
- **ChartView**: TradingView Lightweight Charts로 캔들/에어리어 차트 렌더링, 가격 변화율 계산, 오류/로딩 상태 처리
- **React Query + Zod**: 차트 데이터를 비동기로 로드하고 스키마를 검증해 잘못된 데이터를 초기에 차단
- **Zustand Store**: URL 없이도 손쉽게 상태를 공유하도록 chartType/timeframe/theme/symbol 관리

## 문서 참고
- [TradingView Lightweight Charts Docs](https://tradingview.github.io/lightweight-charts/docs)
  - 시리즈 타입, 스타일 옵션, 상호작용 API 등을 더 살펴보고 싶은 경우 위 링크를 확인하세요.

## 주의사항
- 데이터는 데모용으로 하드코딩된 값이며 시장 가격과 다를 수 있습니다.
- 브라우저 창 크기를 조정하면 `ResizeObserver`를 통해 차트가 자동으로 리사이즈됩니다.

필요한 기능을 자유롭게 확장해 보세요. 예를 들어 원본 API 연동, 보조 지표 추가, WebSocket 스트리밍 등을 손쉽게 붙여볼 수 있습니다.
