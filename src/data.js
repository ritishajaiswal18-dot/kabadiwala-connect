// Indicative Lucknow-area rates (INR/kg). Replace after field interviews.
export const RATES = [
  { id: 'newspaper', icon: '📰', min: 12, max: 12 },
  { id: 'books', icon: '📚', min: 10, max: 10 },
  { id: 'cardboard', icon: '📦', min: 8, max: 8 },
  { id: 'plastic', icon: '🧴', min: 12, max: 13 },
  { id: 'iron', icon: '🔩', min: 22, max: 38 },
  { id: 'copper', icon: '🟠', min: 610, max: 620 },
]

// DEMO buyers: distances, factors and minimums are assumptions, not real businesses.
export const BUYERS = [
  { id: 'b1', name: 'GreenCycle Recyclers', dist: 2.1, factor: 1.0, minKg: 25, verified: true },
  { id: 'b2', name: 'EcoTrade Pvt. Ltd.', dist: 3.5, factor: 0.97, minKg: 10, verified: true },
  { id: 'b3', name: 'Lucknow Scrap Hub', dist: 4.0, factor: 0.92, minKg: 5, verified: true },
  { id: 'b4', name: 'Local Kabadiwala (Demo)', dist: 0.5, factor: 0.85, minKg: 1, verified: false },
]

export const SEED_TX = [
  { id: 't3', mat: 'iron', kg: 6, amt: 180, date: '2026-06-26T10:00:00', status: 'completed', paid: false, buyer: 'EcoTrade Pvt. Ltd.' },
  { id: 't2', mat: 'plastic', kg: 8, amt: 104, date: '2026-06-25T11:30:00', status: 'completed', paid: true, buyer: 'Lucknow Scrap Hub' },
  { id: 't1', mat: 'cardboard', kg: 12, amt: 96, date: '2026-06-27T13:15:00', status: 'completed', paid: true, buyer: 'GreenCycle Recyclers' },
  { id: 't0', mat: 'newspaper', kg: 5, amt: 60, date: '2026-06-28T16:20:00', status: 'completed', paid: true, buyer: 'Local Kabadiwala (Demo)' },
]

// Placeholder CO2 factor (kg CO2 saved per kg recycled). NOT sourced yet.
export const CO2_FACTOR = 0.34
