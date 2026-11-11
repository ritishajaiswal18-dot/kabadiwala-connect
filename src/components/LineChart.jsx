export default function LineChart({ data = [] }) {
  const W = 500
  const H = 150
  const P = 16

  if (!data.length) return <p>No sales data yet.</p>

  const max = Math.max(...data, 1)

  const points = data.map((value, index) => {
    const x = P + index * (W - 2 * P) / Math.max(data.length - 1, 1)
    const y = H - P - value / max * (H - 2 * P)
    return [x, y]
  })

  const line = points.map(point => point.join(',')).join(' ')
  const area = `${P},${H-P} ${line} ${W-P},${H-P}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Sales trend">
      <polygon points={area} fill="rgba(31,122,76,.15)" />
      <polyline
        points={line}
        fill="none"
        stroke="#1f7a4c"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point[0]}
          cy={point[1]}
          r="4"
          fill="#1f7a4c"
        />
      ))}
    </svg>
  )
}
