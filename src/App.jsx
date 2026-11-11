import { useState } from 'react'
import { useApp } from './store.jsx'
import Home from './pages/Home.jsx'
import Sell from './pages/Sell.jsx'
import Ledger from './pages/Ledger.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'

const TABS = [
  { id: 'home', icon: '⌂' },
  { id: 'sell', icon: '♻' },
  { id: 'ledger', icon: '▤' },
  { id: 'profile', icon: '♙' }
]

export default function App() {
  const { s, set, t } = useApp()
  const [tab, setTab] = useState('home')
  const isAdmin = s.role === 'admin'

  const pages = {
    home: <Home go={setTab} />,
    sell: <Sell />,
    ledger: <Ledger />,
    profile: <Profile />
  }

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          <span className="logo">♻</span>
          <div>
            <b>{t('appName')}</b>
            <small>{t('tagline')}</small>
          </div>
        </div>

        <div className="chip">📍 {t('city')}</div>

        <div className="switch">
          <button
            className={!isAdmin ? 'on' : ''}
            onClick={() => set({ role: 'collector' })}
          >
            👤 {t('collector')}
          </button>
          <button
            className={isAdmin ? 'on' : ''}
            onClick={() => set({ role: 'admin' })}
          >
            🛡 {t('admin')}
          </button>
        </div>

        <button
          className="lang"
          onClick={() => set({ lang: s.lang === 'hi' ? 'en' : 'hi' })}
        >
          🌐 {t('language')}
        </button>
      </header>

      <div className="body">
        {!isAdmin && (
          <nav className="side">
            {TABS.map(item => (
              <button
                key={item.id}
                className={tab === item.id ? 'on' : ''}
                onClick={() => setTab(item.id)}
              >
                <span>{item.icon}</span>
                {t(item.id)}
              </button>
            ))}
            <p className="slogan">🌿 {t('together')}</p>
          </nav>
        )}

        <main className="main">
          {isAdmin ? <Admin /> : pages[tab]}
        </main>
      </div>

      {!isAdmin && (
        <nav className="bottom">
          {TABS.map(item => (
            <button
              key={item.id}
              className={tab === item.id ? 'on' : ''}
              onClick={() => setTab(item.id)}
            >
              <span>{item.icon}</span>
              {t(item.id)}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
