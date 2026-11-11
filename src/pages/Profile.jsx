import { useState } from 'react'
import { useApp } from '../store.js'

export default function Profile() {
  const { s, set, t } = useApp()
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')

  function verify() {
    if (otp === '1234') {
      set({ kyc: true })
      setMessage(t('kycDone'))
    } else {
      setMessage(t('kycBad'))
    }
  }

  return (
    <div className="stack">
      <section className="card">
        <h2>{t('profile')}</h2>
        <h3>{t('user')}</h3>
        <p className="muted">{t('city')}, Uttar Pradesh</p>
      </section>

      <section className="card">
        <h3>📱 {t('phone')}</h3>
        <input
          type="tel"
          placeholder="+91 XXXXX XXXXX"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <h3 style={{ marginTop: 14 }}>🔐 OTP Verification</h3>
        <input
          type="text"
          inputMode="numeric"
          placeholder={t('otp')}
          value={otp}
          onChange={e => setOtp(e.target.value)}
        />

        <button className="btn" style={{ marginTop: 12 }} onClick={verify}>
          {t('verify')}
        </button>

        {message && <p className="ok">{message}</p>}
        {s.kyc && <p className="ok">{t('kycDone')} ✓</p>}
        <p className="muted">Demo only. Use OTP 1234.</p>
      </section>

      <section className="card">
        <label className="toggle">
          <input
            type="checkbox"
            checked={Boolean(s.agent)}
            onChange={e => set({ agent: e.target.checked })}
          />
          {t('agent')}
        </label>

        <p>{t('whatsapp')}</p>
      </section>

      <section className="card">
        <h3>🌐 {t('appName')}</h3>
        <button
          className="btn ghost"
          onClick={() => set({ lang: s.lang === 'hi' ? 'en' : 'hi' })}
        >
          {t('language')}
        </button>
      </section>
    </div>
  )
}
