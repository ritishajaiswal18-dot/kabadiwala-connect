import { createContext, useContext, useEffect, useState } from 'react'
import { RATES, SEED_TX } from './data.js'
import { dict } from './i18n.js'

const Ctx = createContext(null)
const KEY = 'kc-v1'

const initial = {
  lang: 'hi',
  role: 'collector',
  offline: false,
  rates: RATES,
  txs: SEED_TX,
  disputes: [],
  kyc: false,
  agent: false
}

function load() {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? { ...initial, ...JSON.parse(saved) } : initial
  } catch {
    return initial
  }
}

export function Provider({ children }) {
  const [s, setS] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s))
    } catch (error) {
      console.error('Storage error:', error)
    }
    document.documentElement.lang = s.lang
  }, [s])

  const set = (patch) => {
    setS(previous => ({
      ...previous,
      ...(typeof patch === 'function' ? patch(previous) : patch)
    }))
  }

  const t = (key) =>
    dict[s.lang]?.[key] ?? dict.en?.[key] ?? key

  const fmtDate = (date) =>
    new Date(date).toLocaleDateString(
      s.lang === 'hi' ? 'hi-IN' : 'en-IN',
      { day: 'numeric', month: 'short', year: 'numeric' }
    )

  return (
    <Ctx.Provider value={{ s, set, t, fmtDate }}>
      {children}
    </Ctx.Provider>
  )
}

export function useApp() {
  const context = useContext(Ctx)
  if (!context) throw new Error('useApp must be inside Provider')
  return context
}
