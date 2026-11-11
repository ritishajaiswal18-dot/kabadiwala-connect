import { useState } from 'react'
import { useApp } from '../store.jsx'
import { BUYERS } from '../data.js'

export default function Sell() {
  const { s, set, t } = useApp()
  const [mat, setMat] = useState('newspaper')
  const [kg, setKg] = useState(5)
  const [msg, setMsg] = useState('')
  const [proof, setProof] = useState('')

  const rate = s.rates.find(x => x.id === mat) || s.rates[0]
  const mid = (Number(rate.min) + Number(rate.max)) / 2

  const buyers = BUYERS
    .filter(b => Number(kg) >= b.minKg)
    .map(b => ({
      ...b,
      net: Math.max(0, Math.round(mid * Number(kg) * b.factor - b.dist * 3))
    }))
    .sort((a, b) => b.net - a.net)

  function sell(buyer) {
    if (!Number.isFinite(Number(kg)) || Number(kg) < 1) {
      setMsg('Please enter at least 1 kg.')
      return
    }

    const tx = {
      id: 't' + Date.now(),
      mat,
      kg: Number(kg),
      amt: buyer.net,
      date: new Date().toISOString(),
      buyer: buyer.name,
      status: s.offline ? 'queued' : 'completed',
      paid: false,
      proof
    }

    set(p => ({ txs: [tx, ...p.txs] }))
    setMsg(t('saved'))
  }

  function syncSales() {
    set(p => ({
      offline: false,
      txs: p.txs.map(x =>
        x.status === 'queued'
          ? { ...x, status: 'completed' }
          : x
      )
    }))
    setMsg(t('syncNow') + ' ✓')
  }

  return (
    <div className="stack">
      <section className="card">
        <h2>{t('sell')}</h2>

        <label className="toggle">
          <input
            type="checkbox"
            checked={s.offline}
            onChange={e => set({ offline: e.target.checked })}
          />
          {t('offlineMode')}
        </label>

        <div className="form">
          <label>
            {t('material')}
            <select value={mat} onChange={e => setMat(e.target.value)}>
              {s.rates.map(x => (
                <option key={x.id} value={x.id}>
                  {x.icon} {t('rate_' + x.id)}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t('quantity')}
            <input
              type="number"
              min="1"
              value={kg}
              onChange={e => setKg(Math.max(1, Number(e.target.value)))}
            />
          </label>
        </div>

        <p>
          {t('fairPrice')}:
          <b> ₹{rate.min}{rate.max !== rate.min ? `–${rate.max}` : ''}{t('perKg')}</b>
        </p>

        <div className="actions">
          <button className="btn ghost" onClick={() => setMsg(t('voice'))}>
            {t('voice')}
          </button>
          <button className="btn ghost" onClick={() => setMsg(t('photo'))}>
            {t('photo')}
          </button>
        </div>

        <label>
          {t('scale')}
          <input
            type="file"
            accept="image/*"
            onChange={e => setProof(e.target.files?.[0]?.name || '')}
          />
        </label>

        {proof && <p className="muted">Selected: {proof}</p>}
      </section>

      <section className="card">
        <h3>{t('matchedBuyers')}</h3>
        <p className="muted">{t('pooling')}</p>

        {buyers.length === 0 && <p>{t('noBuyers')}</p>}

        {buyers.map((buyer, index) => (
          <div className="row wrap" key={buyer.id}>
            <span>
              <b>{buyer.name}</b>
              <small>
                {buyer.dist} km · {t('minQty')} {buyer.minKg} kg
              </small>
            </span>

            <span>
              <b>₹{buyer.net}</b>
              <small>{t('net')}</small>
            </span>

            <button className="btn sm" onClick={() => sell(buyer)}>
              {t('sellNow')}
            </button>
          </div>
        ))}
      </section>

      {msg && <section className="card ok">{msg}</section>}

      {s.txs.some(x => x.status === 'queued') && (
        <section className="card">
          <p>{t('queued')}: {s.txs.filter(x => x.status === 'queued').length}</p>
          <button className="btn" onClick={syncSales}>{t('syncNow')}</button>
        </section>
      )}
    </div>
  )
}
