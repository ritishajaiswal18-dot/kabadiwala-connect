import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

const STORAGE_KEY = "kabadiwala_connect_v2";

const locations = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Hisar", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali", "Solan"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  Manipur: ["Imphal", "Thoubal"],
  Meghalaya: ["Shillong", "Tura"],
  Mizoram: ["Aizawl", "Lunglei"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  Sikkim: ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  Tripura: ["Agartala", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Agra", "Varanasi", "Prayagraj", "Gorakhpur", "Bareilly", "Meerut"],
  Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag"],
  Ladakh: ["Leh", "Kargil"],
  "Chandigarh": ["Chandigarh"],
  "Puducherry": ["Puducherry", "Karaikal"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa", "Diu"],
  "Lakshadweep": ["Kavaratti"]
};

const initialPrices = {
  "Newspaper": 12,
  "Cardboard": 8,
  "Iron": 28,
  "Steel": 32,
  "Aluminium": 105,
  "Copper": 550,
  "Plastic": 12,
  "Brass": 350,
  "E-waste": 35,
  "Other": 10
};

const materials = Object.keys(initialPrices);

const initialData = {
  sales: [],
  prices: initialPrices,
  profile: {
    name: "Collector",
    state: "Uttar Pradesh",
    city: "Lucknow",
    phone: ""
  }
};

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialData;
    const parsed = JSON.parse(saved);
    return {
      ...initialData,
      ...parsed,
      prices: { ...initialPrices, ...(parsed.prices || {}) },
      profile: { ...initialData.profile, ...(parsed.profile || {}) },
      sales: Array.isArray(parsed.sales) ? parsed.sales : []
    };
  } catch {
    return initialData;
  }
}

const money = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);

const dateLabel = value =>
  new Date(value + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

const today = () => new Date().toISOString().slice(0, 10);
const monthKey = date => String(date || "").slice(0, 7);

function Icon({ name }) {
  const paths = {
    home: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    sell: <><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/></>,
    ledger: <><path d="M5 3h14v18H5z"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
    chart: <><path d="M3 3v18h18"/><path d="m7 14 4-4 4 3 6-7"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 1.7Z"/></>,
    leaf: <><path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16Z"/><path d="M4 21c3-6 7-9 13-12"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>
  };
  return <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.home}</svg>;
}

function App() {
  const [data, setData] = useState(loadData);
  const [role, setRole] = useState("collector");
  const [page, setPage] = useState("dashboard");
  const [language, setLanguage] = useState("en");
  const [notice, setNotice] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sale, setSale] = useState({
    material: "Newspaper",
    quantity: "",
    price: String(initialPrices.Newspaper),
    buyer: "",
    date: today(),
    payment: "Paid",
    note: ""
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  const t = (en, hi) => language === "en" ? en : hi;

  const allSales = data.sales.slice().sort((a, b) => b.date.localeCompare(a.date));
  const filteredSales = allSales.filter(s => {
    if (filterMonth && monthKey(s.date) !== filterMonth) return false;
    if (fromDate && s.date < fromDate) return false;
    if (toDate && s.date > toDate) return false;
    return true;
  });

  const totalRevenue = filteredSales.reduce((sum, s) => sum + s.total, 0);
  const totalQuantity = filteredSales.reduce((sum, s) => sum + s.quantity, 0);
  const paidRevenue = filteredSales.filter(s => s.payment === "Paid").reduce((sum, s) => sum + s.total, 0);
  const pendingRevenue = totalRevenue - paidRevenue;
  const averagePrice = totalQuantity ? totalRevenue / totalQuantity : 0;

  const currentMonth = today().slice(0, 7);
  const previousMonthDate = new Date();
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
  const previousMonth = previousMonthDate.toISOString().slice(0, 7);
  const currentYear = today().slice(0, 4);
  const previousYear = String(Number(currentYear) - 1);

  const sumFor = (sales, predicate, field = "total") =>
    sales.filter(predicate).reduce((sum, s) => sum + (Number(s[field]) || 0), 0);

  const thisMonthRevenue = sumFor(allSales, s => monthKey(s.date) === currentMonth);
  const lastMonthRevenue = sumFor(allSales, s => monthKey(s.date) === previousMonth);
  const thisYearRevenue = sumFor(allSales, s => s.date.startsWith(currentYear));
  const lastYearRevenue = sumFor(allSales, s => s.date.startsWith(previousYear));

  const growth = (current, previous) =>
    previous ? ((current - previous) / previous) * 100 : null;

  const materialTotals = materials.map(material => ({
    material,
    quantity: sumFor(filteredSales, s => s.material === material, "quantity"),
    revenue: sumFor(filteredSales, s => s.material === material)
  })).filter(x => x.quantity > 0);

  const monthlyTotals = useMemo(() => {
    const result = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      const key = d.toISOString().slice(0, 7);
      result.push({
        key,
        label: d.toLocaleDateString("en-IN", { month: "short" }),
        revenue: sumFor(allSales, s => monthKey(s.date) === key),
        quantity: sumFor(allSales, s => monthKey(s.date) === key, "quantity")
      });
    }
    return result;
  }, [allSales]);

  function updateProfile(field, value) {
    setData(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
  }

  function chooseMaterial(value) {
    setSale(prev => ({
      ...prev,
      material: value,
      price: String(data.prices[value] ?? 0)
    }));
  }

  function recordSale(event) {
    event.preventDefault();
    const quantity = Number(sale.quantity);
    const price = Number(sale.price);
    if (!quantity || quantity <= 0 || !Number.isFinite(quantity)) {
      setNotice("Please enter a valid quantity.");
      return;
    }
    if (!price || price < 0 || !Number.isFinite(price)) {
      setNotice("Please enter a valid price.");
      return;
    }
    if (!sale.date) {
      setNotice("Please select a sale date.");
      return;
    }

    const entry = {
      id: `KC-${Date.now()}`,
      material: sale.material,
      quantity,
      price,
      total: Math.round(quantity * price * 100) / 100,
      buyer: sale.buyer.trim() || "Walk-in buyer",
      date: sale.date,
      payment: sale.payment,
      note: sale.note.trim(),
      createdAt: new Date().toISOString()
    };

    setData(prev => ({ ...prev, sales: [entry, ...prev.sales] }));
    setSale(prev => ({ ...prev, quantity: "", buyer: "", note: "", date: today() }));
    setNotice("Sale recorded successfully. Ledger and dashboard updated.");
    setPage("ledger");
  }

  function updatePayment(id, payment) {
    setData(prev => ({
      ...prev,
      sales: prev.sales.map(s => s.id === id ? { ...s, payment } : s)
    }));
    setNotice("Payment status updated.");
  }

  function updatePrice(material, value) {
    setData(prev => ({
      ...prev,
      prices: { ...prev.prices, [material]: Number(value) || 0 }
    }));
  }

  function exportCSV() {
    const rows = [
      ["Sale ID", "Date", "Material", "Quantity (kg)", "Price per kg", "Total", "Buyer", "Payment", "Notes"],
      ...filteredSales.map(s => [s.id, s.date, s.material, s.quantity, s.price, s.total, s.buyer, s.payment, s.note])
    ];
    const csv = rows.map(row => row.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "kabadiwala-sales-ledger.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const navItems = role === "collector"
    ? [
        ["dashboard", "Dashboard", "home"],
        ["sell", "Sell scrap", "sell"],
        ["ledger", "My ledger", "ledger"],
        ["profile", "My profile", "settings"]
      ]
    : [
        ["dashboard", "Overview", "home"],
        ["analytics", "Analytics", "chart"],
        ["ledger", "All transactions", "ledger"],
        ["prices", "Material prices", "settings"]
      ];

  const pageTitle = {
    dashboard: role === "admin" ? "Admin overview" : "Your collection overview",
    sell: "Record a scrap sale",
    ledger: role === "admin" ? "Transaction records" : "Your sales ledger",
    profile: "Your profile",
    analytics: "Sales analytics",
    prices: "Manage material prices"
  };

  function Stat({ label, value, detail, icon }) {
    return (
      <div className="stat-card">
        <div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon name={icon}/></span></div>
        <div className="stat-value">{value}</div>
        {detail && <div className="stat-detail">{detail}</div>}
      </div>
    );
  }

  function Chart({ data: points, field, color = "green", format = "money" }) {
    const max = Math.max(...points.map(p => p[field]), 1);
    return (
      <div className="bar-chart">
        {points.map(p => (
          <div className="bar-column" key={p.key}>
            <div className="bar-value">{p[field] ? (format === "money" ? money(p[field]) : `${p[field].toFixed(1)} kg`) : "—"}</div>
            <div className="bar-track">
              <div className={`bar-fill ${color}`} style={{ height: `${Math.max(p[field] ? (p[field] / max) * 100 : 0, p[field] ? 4 : 0)}%` }}/>
            </div>
            <div className="bar-label">{p.label}</div>
          </div>
        ))}
      </div>
    );
  }

  function Empty({ title = "No sales recorded yet", description = "Your real transactions will appear here after you record your first sale." }) {
    return (
      <div className="empty-state">
        <div className="empty-art"><Icon name="leaf"/></div>
        <h3>{title}</h3>
        <p>{description}</p>
        {role === "collector" && <button className="primary-btn" onClick={() => setPage("sell")}>Record your first sale</button>}
      </div>
    );
  }

  function SalesTable({ rows }) {
    if (!rows.length) return <Empty title="No matching transactions" description="Try changing your date filters, or record a new sale." />;
    return (
      <div className="table-wrap">
        <table>
          <thead><tr>
            <th>Date</th><th>Material</th><th>Quantity</th><th>Rate / kg</th><th>Total</th><th>Buyer</th><th>Payment</th>
          </tr></thead>
          <tbody>
            {rows.map(s => (
              <tr key={s.id}>
                <td><strong>{dateLabel(s.date)}</strong><small>{s.id}</small></td>
                <td>{s.material}</td>
                <td>{s.quantity.toLocaleString("en-IN")} kg</td>
                <td>{money(s.price)}</td>
                <td className="amount">{money(s.total)}</td>
                <td>{s.buyer}</td>
                <td>
                  {role === "admin" ? (
                    <select className={`payment-select ${s.payment.toLowerCase()}`} value={s.payment} onChange={e => updatePayment(s.id, e.target.value)}>
                      <option>Paid</option><option>Pending</option><option>Partially paid</option>
                    </select>
                  ) : <span className={`status ${s.payment.toLowerCase().replace(" ", "-")}`}>{s.payment}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Icon name="leaf"/></div>
          <div><strong>Kabadiwala<span>Connect</span></strong><small>SMART SCRAP MANAGEMENT</small></div>
        </div>
        <div className="role-switch">
          <button className={role === "collector" ? "active" : ""} onClick={() => { setRole("collector"); setPage("dashboard"); }}>Collector</button>
          <button className={role === "admin" ? "active" : ""} onClick={() => { setRole("admin"); setPage("dashboard"); }}>Admin</button>
        </div>
        <div className="nav-caption">WORKSPACE</div>
        <nav>
          {navItems.map(([id, label, icon]) => (
            <button key={id} className={`nav-link ${page === id ? "selected" : ""}`} onClick={() => setPage(id)}>
              <Icon name={icon}/><span>{label}</span>{page === id && <i/>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="location-mini"><span className="location-dot"/> {data.profile.city}, {data.profile.state}</div>
          <div className="user-mini"><div className="avatar">{(data.profile.name || "C").charAt(0).toUpperCase()}</div><div><strong>{data.profile.name || "Collector"}</strong><small>{role === "admin" ? "Administrator" : "Collection partner"}</small></div></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div><div className="eyebrow">KABADIWALA CONNECT / {role.toUpperCase()}</div><h1>{pageTitle[page]}</h1></div>
          <div className="top-actions">
            <button className="language-btn" onClick={() => setLanguage(language === "en" ? "hi" : "en")}>{language === "en" ? "हिन्दी" : "English"}</button>
            <div className="top-avatar">{(data.profile.name || "C").charAt(0).toUpperCase()}</div>
          </div>
        </header>

        {notice && <div className="toast"><span>✓</span>{notice}<button onClick={() => setNotice("")}>×</button></div>}

        {page === "dashboard" && (
          <>
            <section className="welcome-row">
              <div><div className="eyebrow">{t("YOUR BUSINESS AT A GLANCE", "आपके व्यवसाय की झलक")}</div><h2>{t("Good to see you", "आपका स्वागत है")}, {data.profile.name || "there"}.</h2><p>{t("Keep your collection records clear, accurate and up to date.", "अपने संग्रह का रिकॉर्ड सही और अपडेट रखें।")}</p></div>
              {role === "collector" && <button className="primary-btn" onClick={() => setPage("sell")}><Icon name="sell"/> Record a sale</button>}
            </section>

            <section className="stats-grid">
              <Stat label="Total sales revenue" value={money(totalRevenue)} detail={`${filteredSales.length} recorded transactions`} icon="chart"/>
              <Stat label="Total collected" value={`${totalQuantity.toLocaleString("en-IN")} kg`} detail="Across selected records" icon="leaf"/>
              <Stat label="Average price / kg" value={money(averagePrice)} detail="Weighted average rate" icon="sell"/>
              <Stat label="Payments pending" value={money(pendingRevenue)} detail={`${filteredSales.filter(s => s.payment !== "Paid").length} unpaid / partial`} icon="ledger"/>
            </section>

            {allSales.length > 0 ? (
              <>
                <section className="panel">
                  <div className="panel-heading"><div><div className="eyebrow">PERFORMANCE</div><h3>Sales over time</h3><p>Based only on transactions you have recorded.</p></div><span className="live-tag"><i/> REAL ENTRIES</span></div>
                  <div className="chart-heading"><strong>Monthly revenue</strong><span>Last 6 months · INR</span></div>
                  <Chart data={monthlyTotals} field="revenue"/>
                  <div className="chart-heading second-chart"><strong>Monthly quantity</strong><span>Last 6 months · kg</span></div>
                  <Chart data={monthlyTotals} field="quantity" color="orange" format="quantity"/>
                </section>
                <section className="two-col">
                  <div className="panel">
                    <div className="panel-heading"><div><div className="eyebrow">MATERIAL MIX</div><h3>What you collect</h3></div></div>
                    {materialTotals.length ? materialTotals.map(m => (
                      <div className="material-row" key={m.material}><div><strong>{m.material}</strong><span>{m.quantity} kg · {money(m.revenue)}</span></div><div className="material-meter"><i style={{ width: `${totalQuantity ? m.quantity / totalQuantity * 100 : 0}%` }}/></div></div>
                    )) : <p className="muted">No material records yet.</p>}
                  </div>
                  <div className="panel">
                    <div className="panel-heading"><div><div className="eyebrow">GROWTH</div><h3>Business progress</h3></div></div>
                    <Growth label="Month on month" value={growth(thisMonthRevenue, lastMonthRevenue)} />
                    <Growth label="Year on year" value={growth(thisYearRevenue, lastYearRevenue)} />
                    <div className="growth-note">Growth compares recorded revenue for the current calendar period with the previous period. A comparison appears once previous-period sales exist.</div>
                  </div>
                </section>
              </>
            ) : (
              <section className="panel"><Empty /></section>
            )}

            {allSales.length > 0 && <section className="panel"><div className="panel-heading"><div><div className="eyebrow">LATEST ACTIVITY</div><h3>Recent transactions</h3></div><button className="text-btn" onClick={() => setPage("ledger")}>View ledger →</button></div><SalesTable rows={allSales.slice(0, 5)}/></section>}
          </>
        )}

        {page === "sell" && (
          <section className="form-layout">
            <div className="panel sale-panel">
              <div className="eyebrow">NEW TRANSACTION</div><h2>Record a scrap sale</h2><p className="muted">Enter the details of the material you've actually collected and sold.</p>
              <form onSubmit={recordSale}>
                <div className="form-grid">
                  <label>Material<select value={sale.material} onChange={e => chooseMaterial(e.target.value)}>{materials.map(m => <option key={m}>{m}</option>)}</select></label>
                  <label>Sale date<input type="date" value={sale.date} max={today()} onChange={e => setSale({ ...sale, date: e.target.value })}/></label>
                  <label>Quantity (kg)<input type="number" min="0.01" step="0.01" placeholder="e.g. 12.5" value={sale.quantity} onChange={e => setSale({ ...sale, quantity: e.target.value })} required/></label>
                  <label>Price per kg (₹)<input type="number" min="0" step="0.01" value={sale.price} onChange={e => setSale({ ...sale, price: e.target.value })} required/></label>
                  <label className="full-field">Buyer name<input type="text" placeholder="Enter buyer or shop name" value={sale.buyer} onChange={e => setSale({ ...sale, buyer: e.target.value })}/></label>
                  <label>Payment status<select value={sale.payment} onChange={e => setSale({ ...sale, payment: e.target.value })}><option>Paid</option><option>Pending</option><option>Partially paid</option></select></label>
                  <label>Notes (optional)<input type="text" placeholder="Any additional details" value={sale.note} onChange={e => setSale({ ...sale, note: e.target.value })}/></label>
                </div>
                <div className="sale-total"><div><span>Estimated transaction value</span><strong>{money((Number(sale.quantity) || 0) * (Number(sale.price) || 0))}</strong></div><small>Calculated from quantity × price per kg.</small></div>
                <button className="primary-btn submit-btn" type="submit">Save sale to ledger <span>→</span></button>
              </form>
            </div>
            <div className="side-note"><div className="note-icon"><Icon name="leaf"/></div><h3>Every entry counts.</h3><p>Your sale will immediately update your ledger, dashboard and analytics. Only the information you enter is recorded.</p><div className="note-rule"/><strong>Current location</strong><p>{data.profile.city}, {data.profile.state}</p><button className="text-btn" onClick={() => setPage("profile")}>Edit profile location →</button></div>
          </section>
        )}

        {page === "ledger" && (
          <section className="panel">
            <div className="panel-heading"><div><div className="eyebrow">YOUR RECORD BOOK</div><h3>Transaction ledger</h3><p>All entries are transactions recorded in this app.</p></div><button className="outline-btn" onClick={exportCSV}>↓ Export CSV</button></div>
            <div className="filter-row">
              <label>Month<input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)}/></label>
              <label>From<input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}/></label>
              <label>To<input type="date" value={toDate} onChange={e => setToDate(e.target.value)}/></label>
              <button className="text-btn clear-btn" onClick={() => { setFilterMonth(""); setFromDate(""); setToDate(""); }}>Clear filters</button>
            </div>
            <div className="ledger-summary"><span><strong>{filteredSales.length}</strong> transactions</span><span><strong>{money(totalRevenue)}</strong> total value</span><span><strong>{totalQuantity.toLocaleString("en-IN")} kg</strong> collected</span></div>
            <SalesTable rows={filteredSales}/>
          </section>
        )}

        {page === "analytics" && (
          <section>
            {allSales.length ? <>
              <section className="stats-grid">
                <Stat label="This month" value={money(thisMonthRevenue)} detail={`${currentMonth}`} icon="chart"/>
                <Stat label="Last month" value={money(lastMonthRevenue)} detail={previousMonth} icon="ledger"/>
                <Stat label="This year" value={money(thisYearRevenue)} detail={currentYear} icon="leaf"/>
                <Stat label="Last year" value={money(lastYearRevenue)} detail={previousYear} icon="chart"/>
              </section>
              <section className="two-col">
                <div className="panel"><div className="eyebrow">MONTHLY REVENUE</div><h3>Revenue trend</h3><Chart data={monthlyTotals} field="revenue"/></div>
                <div className="panel"><div className="eyebrow">MONTHLY COLLECTION</div><h3>Quantity trend</h3><Chart data={monthlyTotals} field="quantity" color="orange" format="quantity"/></div>
              </section>
              <section className="panel"><div className="eyebrow">PERIOD COMPARISON</div><h3>Growth analysis</h3><div className="growth-grid"><Growth label="Month-on-month revenue" value={growth(thisMonthRevenue, lastMonthRevenue)}/><Growth label="Year-on-year revenue" value={growth(thisYearRevenue, lastYearRevenue)}/></div></section>
              <section className="panel"><div className="eyebrow">MATERIAL PERFORMANCE</div><h3>Revenue by material</h3>{materialTotals.length ? materialTotals.map(m => <div className="material-row" key={m.material}><div><strong>{m.material}</strong><span>{m.quantity} kg · {money(m.revenue)}</span></div><div className="material-meter"><i style={{ width: `${totalRevenue ? m.revenue / totalRevenue * 100 : 0}%` }}/></div></div>) : <p className="muted">No data available.</p>}</section>
            </> : <section className="panel"><Empty title="Analytics will appear after your first sale" description="Record a real transaction to start building your monthly and yearly reports."/></section>}
          </section>
        )}

        {page === "prices" && (
          <section className="panel">
            <div className="eyebrow">PRICE MANAGEMENT</div><h2>Material rates</h2><p className="muted">Set your local reference rates. Changing a rate here does not change previously recorded transactions.</p>
            <div className="price-grid">{materials.map(m => <label key={m}>{m}<div className="price-input"><span>₹</span><input type="number" min="0" step="0.5" value={data.prices[m]} onChange={e => updatePrice(m, e.target.value)}/><small>/ kg</small></div></label>)}</div>
            <p className="muted footnote">These are editable starting reference values, not live market quotes.</p>
          </section>
        )}

        {page === "profile" && (
          <section className="panel profile-panel">
            <div className="eyebrow">ACCOUNT DETAILS</div><h2>Your profile</h2><p className="muted">Keep your contact and collection location details up to date.</p>
            <div className="form-grid">
              <label>Full name<input value={data.profile.name} onChange={e => updateProfile("name", e.target.value)} placeholder="Your name"/></label>
              <label>Phone number<input value={data.profile.phone} onChange={e => updateProfile("phone", e.target.value)} placeholder="Your phone number"/></label>
              <label>State<select value={data.profile.state} onChange={e => updateProfile("state", e.target.value)}>{Object.keys(locations).sort().map(s => <option key={s}>{s}</option>)}</select></label>
              <label>City<select value={locations[data.profile.state] && locations[data.profile.state].includes(data.profile.city) ? data.profile.city : ""} onChange={e => updateProfile("city", e.target.value)}><option value="">Select city</option>{(locations[data.profile.state] || []).map(c => <option key={c}>{c}</option>)}</select></label>
            </div>
            <div className="profile-save"><span>Changes save automatically on this device.</span><span className="saved-label">✓ Saved locally</span></div>
          </section>
        )}

        <footer className="footer"><span>© {new Date().getFullYear()} Kabadiwala Connect</span><span>Built for a cleaner, more connected tomorrow <Icon name="leaf"/></span></footer>
      </main>
    </div>
  );
}

function Growth({ label, value }) {
  return (
    <div className="growth-item">
      <span>{label}</span>
      {value === null ? <strong className="growth-na">Not enough comparison data</strong> :
        <strong className={value >= 0 ? "growth-up" : "growth-down"}>{value >= 0 ? "↗" : "↘"} {Math.abs(value).toFixed(1)}%</strong>}
    </div>
  );
}

export default App;
