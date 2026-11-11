import { useApp } from '../store.js'

export default function Ledger() {
  const { s, set, t, fmtDate } = useApp()

  function pay(id) {
    set(p => ({
      txs: p.txs.map(x => x.id === id ? { ...x, paid: true } : x)
    }))
  }

  function dispute(id) {
    if (s.disputes.some(d => d.txId === id)) return

    set(p => ({
      disputes: [
        ...p.disputes,
        { id: 'd' + Date.now(), txId: id, status: 'open' }
      ]
    }))
  }

  return (
    <div className="stack">
      <section className="card">
        <h2>{t('ledger')}</h2>
        <p className="muted">{t('receipt')} · {s.txs.length}</p>
      </section>

      {s.txs.length === 0 && (
        <section className="card">{t('empty')}</section>
      )}

      {s.txs.map(tx => {
        const isDisputed = s.disputes.some(
          d => d.txId === tx.id && d.status === 'open'
        )

        return (
          <section className="card" key={tx.id}>
            <div className="row">
              <b>{t('rate_' + tx.mat)}</b>
              <em className="tag">{tx.status === 'queued' ? t('queuedTag') : t('completed')}</em>
            </div>

            <div className="row">
              <span>{t('date')}</span>
              <b>{fmtDate(tx.date)}</b>
            </div>

            <div className="row">
              <span>{t('quantity')}</span>
              <b>{tx.kg} {t('kg')}</b>
            </div>

            <div className="row">
              <span>{t('buyer')}</span>
              <b>{tx.buyer}</b>
            </div>

            <div className="row">
              <span>{t('amount')}</span>
              <b>₹{tx.amt}</b>
            </div>

            <div className="row">
              <span>{t('paymentStatus')}</span>
              <em className={tx.paid ? 'tag' : 'tag warn'}>
                {tx.paid ? t('paid') : t('pending')}
              </em>
            </div>

            {tx.status === 'completed' && !tx.paid && (
              <button className="btn sm" onClick={() => pay(tx.id)}>
                {t('payUpi')}
              </button>
            )}

            <button
              className="btn ghost sm"
              disabled={isDisputed}
              onClick={() => dispute(tx.id)}
            >
              {isDisputed ? t('disputed') : t('dispute')}
            </button>
          </section>
        )
      })}
    </div>
  )
}
