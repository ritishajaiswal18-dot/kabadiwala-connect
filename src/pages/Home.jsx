import { useApp } from '../store.js'
import { BUYERS, CO2_FACTOR } from '../data.js'
import LineChart from '../components/LineChart.jsx'

export default function Home({ go }) {
  const { s, t, fmtDate } = useApp()

  const done = s.txs.filter(x => x.status === 'completed')
  const total = done.reduce((a, x) => a + Number(x.amt), 0)
  const pending = done.filter(x => !x.paid).reduce((a, x) => a + Number(x.amt), 0)
  const queued = s.txs.filter(x => x.status === 'queued').length
  const kg = done.reduce((a, x) => a + Number(x.kg), 0)

  const trend = [...done]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(x => Number(x.amt))

  return (
    <div className="grid">
      <section className="hero card span2">
        <h2>{t('greet')}, {t('user')}! 👋</h2>
        <p>{t('heroTitle')}</p>
        <button className="btn" onClick={() => go('sell')}>
          {t('viewRates')} →
        </button>
      </section>

      <section className="card impact">
        <h4>🌍 {t('impact')}</h4>
        <div className="two">
          <div>
            <b>{kg} {t('kg')}</b>
            <small>{t('diverted')}</small>
          </div>
          <div>
            <b>~{(kg * CO2_FACTOR).toFixed(1)}</b>
            <small>{t('co2')}</small>
          </div>
        </div>
      </section>

      <section className="card stat">
        <span>👛</span>
        <div><b>₹{total.toLocaleString('en-IN')}</b><small>{t('totalEarn')}</small></div>
      </section>

      <section className="card stat">
        <span>🕒</span>
        <div><b>₹{pending.toLocaleString('en-IN')}</b><small>{t('pendingUpi')}</small></div>
      </section>

      <section className="card stat">
        <span>📦</span>
        <div><b>{queued}</b><small>{t('queued')}</small></div>
      </section>

      <section className="card span2">
        <h4>📊 {t('rateBoard')}</h4>
        <div className="rates">
          {s.rates.map(rate => (
            <div key={rate.id} className="rate">
              <span>{rate.icon}</span>
              <small>{t('rate_' + rate.id)}</small>
              <b>
                ₹{rate.min === rate.max
                  ? rate.min
                  : `${rate.min}–${rate.max}`}{t('perKg')}
              </b>
            </div>
          ))}
        </div>
        <p className="muted">{t('note')}</p>
      </section>

      <section className="card span2">
        <h4>📈 {t('trend')}</h4>
        <LineChart data={trend} />
      </section>

      <section className="card span2">
        <h4>{t('recent')}</h4>
        {done.length === 0 && <p>{t('empty')}</p>}
        {done.slice(0, 4).map(x => (
          <div className="row" key={x.id}>
            <span>
              {t('rate_' + x.mat)} · {x.kg} {t('kg')}
              <small>{fmtDate(x.date)}</small>
            </span>
            <b>₹{x.amt}</b>
            <em className="tag">{t('completed')}</em>
          </div>
        ))}
      </section>

      <section className="card span2">
        <h4>🤝 {t('nearby')}</h4>
        {BUYERS.slice(0, 4).map((buyer, index) => (
          <div className="row" key={buyer.id}>
            <span>
              {buyer.name}
              <small>{buyer.dist} km · {t('minQty')} {buyer.minKg} kg</small>
            </span>
            <em className="tag">{index === 0 ? t('bestPrice') : t('demo')}</em>
          </div>
        ))}
      </section>
    </div>
  )
}
