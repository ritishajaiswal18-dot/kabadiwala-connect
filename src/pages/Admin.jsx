import { useApp } from '../store.jsx'

const RECYCLERS = [
  { id: 'r1', name: 'Recycler Demo A', category: 'Paper and cardboard', verified: true },
  { id: 'r2', name: 'Recycler Demo B', category: 'Plastic', verified: false },
  { id: 'r3', name: 'Recycler Demo C', category: 'Metal', verified: false }
]

export default function Admin() {
  const { s, set, t } = useApp()

  const total = s.txs.reduce((a, x) => a + Number(x.amt), 0)
  const kg = s.txs.reduce((a, x) => a + Number(x.kg), 0)
  const unpaid = s.txs.filter(x => !x.paid).reduce((a, x) => a + Number(x.amt), 0)
  const open = s.disputes.filter(x => x.status === 'open')

  function updateRate(id, field, value) {
    set(p => ({
      rates: p.rates.map(r =>
        r.id === id ? { ...r, [field]: Math.max(0, Number(value)) } : r
      )
    }))
  }

  function resolve(id) {
    set(p => ({
      disputes: p.disputes.map(d =>
        d.id === id ? { ...d, status: 'resolved' } : d
      )
    }))
  }

  return (
    <div className="stack">
      <section className="card hero">
        <h2>🛡 {t('overview')}</h2>
        <p>{t('appName')} · {t('city')}</p>
      </section>

      <section className="card">
        <h3>{t('overview')}</h3>
        <div className="kpis">
          <div><b>{s.txs.length}</b><small>{t('transactions')}</small></div>
          <div><b>{kg} kg</b><small>{t('totalKg')}</small></div>
          <div><b>₹{total}</b><small>{t('totalEarn')}</small></div>
          <div><b>{open.length}</b><small>{t('openDisputes')}</small></div>
        </div>
        <p className="muted">{t('unpaid')}: ₹{unpaid}</p>
      </section>

      <section className="card">
        <h3>💰 {t('prices')}</h3>
        {s.rates.map(rate => (
          <div className="row wrap" key={rate.id}>
            <b>{t('rate_' + rate.id)}</b>
            <label>
              Min ₹
              <input
                className="num"
                type="number"
                value={rate.min}
                onChange={e => updateRate(rate.id, 'min', e.target.value)}
              />
            </label>
            <label>
              Max ₹
              <input
                className="num"
                type="number"
                value={rate.max}
                onChange={e => updateRate(rate.id, 'max', e.target.value)}
              />
            </label>
          </div>
        ))}
      </section>

      <section className="card">
        <h3>♻ {t('recyclers')}</h3>
        <p className="muted">
          Demo recycler records. These are not confirmed CPCB/UPPCB authorisations.
        </p>
        {RECYCLERS.map(r => (
          <div className="row" key={r.id}>
            <span>
              <b>{r.name}</b>
              <small>{r.category}</small>
            </span>
            <em className={r.verified ? 'tag' : 'tag warn'}>
              {r.verified ? t('verified') : t('demo')}
            </em>
          </div>
        ))}
      </section>

      <section className="card">
        <h3>⚠ {t('disputes')}</h3>
        {open.length === 0 && <p>{t('noDisputes')}</p>}
        {open.map(d => (
          <div className="row" key={d.id}>
            <span>Transaction #{d.txId}</span>
            <button className="btn sm" onClick={() => resolve(d.id)}>
              {t('resolve')}
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}
