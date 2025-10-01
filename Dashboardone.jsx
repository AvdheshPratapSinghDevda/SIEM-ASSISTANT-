import React from "react";

// Single-file React component for a dark-themed ISRO SIEM dashboard.
// This is intentionally self-contained and uses inline styles so you can
// drop it into a Vite/CRA project without Tailwind.

export default function ISROSIEMDashboard() {
  const styles = {
    page: {
      background: '#0b0f12',
      color: '#e6eef8',
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      display: 'flex'
    },
    sidebar: {
      width: 260,
      background: 'linear-gradient(180deg,#071017,#0e1416)',
      padding: 20,
      boxSizing: 'border-box',
      borderRight: '1px solid rgba(255,255,255,0.03)'
    },
    brand: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 },
    logo: { width: 40, height: 40, borderRadius: 6, background: '#0ea5a4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 },
    navItem: { padding: '10px 8px', borderRadius: 8, color: '#cfe7ff', marginBottom: 6, cursor: 'pointer' },
    navItemActive: { background: 'rgba(255,255,255,0.03)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' },
    main: { flex: 1, padding: 24 },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
    kpiRow: { display: 'flex', gap: 12, marginBottom: 18 },
    kpi: { flex: 1, background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', padding: 16, borderRadius: 10, border: '1px solid rgba(255,255,255,0.03)' },
    panel: { background: '#071018', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 10, padding: 12 },
    grid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 },
    threatCard: { background: '#08131a', padding: 12, borderRadius: 8, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    button: { padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }
  };

  // small helper for color based on severity
  const severityColor = (s) => {
    if (s === 'Critical') return '#ff4d4f';
    if (s === 'Warning') return '#ffb020';
    return '#60a5fa';
  };

  // dummy data
  const kpis = [
    { name: 'Active Threats', value: 7, trend: [2,3,4,6,7] },
    { name: 'Incidents Resolved', value: 142, trend: [10,18,25,40,142] },
    { name: 'Network Events', value: '12.4k', trend: [2000,3000,4000,5500,12400] },
    { name: 'System Health', value: '98%', trend: [95,96,97,98,98] }
  ];

  const threats = [
    { id: 'T-001', title: 'Unusual login pattern', src: '10.10.5.6', time: '4m ago', severity: 'Critical' },
    { id: 'T-002', title: 'Data exfiltration anomaly', src: '10.10.2.1', time: '12m ago', severity: 'Warning' },
    { id: 'T-003', title: 'Port scan detected', src: '192.168.0.45', time: '20m ago', severity: 'Info' }
  ];

  // small inline sparkline SVG
  const Sparkline = ({ data = [] }) => {
    const w = 80, h = 24; 
    const max = Math.max(...data, 1);
    const points = data.map((v,i) => `${(i/(data.length-1))*w},${h - (v/max)*h}`).join(' ');
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <polyline fill="none" stroke="#60a5fa" strokeWidth="2" points={points} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <div style={styles.logo}>IS</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>ISRO SIEM</div>
            <div style={{ fontSize: 11, color: '#9fb4d4' }}>SecOps Dashboard</div>
          </div>
        </div>

        <nav>
          <div style={{ ...styles.navItem, ...styles.navItemActive }}>Dashboard</div>
          <div style={styles.navItem}>Threats</div>
          <div style={styles.navItem}>Investigation</div>
          <div style={styles.navItem}>Reports</div>
          <div style={styles.navItem}>Logs</div>
          <div style={styles.navItem}>Compliance</div>
        </nav>

        <div style={{ marginTop: 18 }} className="profile">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, background: '#123b4a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
            <div>
              <div style={{ fontWeight: 700 }}>Analyst</div>
              <div style={{ fontSize: 12, color: '#9fb4d4' }}>isro.gov</div>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <button style={{ ...styles.button, background: '#0ea5a4', color: '#041014', width: '100%' }}>Profile</button>
          </div>
        </div>

      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h2 style={{ margin: 0 }}>ISRO SIEM — Dashboard</h2>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Conversational SIEM Assistant • Dark theme • Demo data</div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input placeholder="Search threats, logs, reports..." style={{ padding: '8px 12px', borderRadius: 8, background: '#06121a', border: '1px solid rgba(255,255,255,0.03)', color: '#dbeafe' }} />
            <button style={{ ...styles.button, background: '#25334a', color: '#e6eef8' }}>Time range</button>
            <button style={{ ...styles.button, background: '#0ea5a4', color: '#041014' }}>AI Assistant</button>
          </div>
        </header>

        <section style={styles.kpiRow}>
          {kpis.map((k) => (
            <div key={k.name} style={styles.kpi}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#9fb4d4', fontSize: 12 }}>{k.name}</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{k.value}</div>
                </div>
                <Sparkline data={k.trend} />
              </div>
            </div>
          ))}
        </section>

        <section style={styles.grid}>
          <div>
            <div style={{ ...styles.panel, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontWeight: 700 }}>Active Threats</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ ...styles.button, background: '#12232a', color: '#9fb4d4' }}>Filter</button>
                  <button style={{ ...styles.button, background: '#12232a', color: '#9fb4d4' }}>Sort</button>
                </div>
              </div>

              {threats.map(t => (
                <div key={t.id} style={styles.threatCard}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{t.title}</div>
                    <div style={{ color: '#8aa0b8', fontSize: 12 }}>{t.src} • {t.time}</div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: severityColor(t.severity) }} />
                    <div style={{ color: '#bcd7ff', fontWeight: 700 }}>{t.severity}</div>
                    <button style={{ ...styles.button, background: '#0ea5a4', color: '#041014' }}>Investigate</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.panel}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Triage Timeline</div>
              <div style={{ color: '#9fb4d4', fontSize: 13 }}>One-click acknowledge and assign</div>

              <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: '#ff4d4f' }} />
                  <div style={{ flex: 1 }}>T-001 acknowledged by Analyst</div>
                  <div style={{ fontSize: 12, color: '#8aa0b8' }}>3m</div>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: '#ffb020' }} />
                  <div style={{ flex: 1 }}>T-002 assigned to Tier-2</div>
                  <div style={{ fontSize: 12, color: '#8aa0b8' }}>12m</div>
                </div>
              </div>
            </div>
          </div>

          <aside>
            <div style={{ ...styles.panel, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>AI Assistant</div>
                <div style={{ color: '#9fb4d4', fontSize: 12 }}>Context-aware</div>
              </div>

              <div style={{ height: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ background: '#06121a', padding: 8, borderRadius: 8 }}>
                  <div style={{ fontSize: 13, color: '#cfe7ff' }}>User: Why did T-001 trigger?</div>
                  <div style={{ fontSize: 13, color: '#9fb4d4' }}>Assistant: Suspicious authentication pattern from an unusual IP range. Related logs show failed logins followed by successful access.</div>
                </div>

                <div style={{ background: '#06121a', padding: 8, borderRadius: 8 }}>
                  <div style={{ fontSize: 13, color: '#cfe7ff' }}>User: Generate quick report</div>
                  <div style={{ fontSize: 13, color: '#9fb4d4' }}>Assistant: Generating PDF — 2 pages. Include T-001 details, timeline, indicators of compromise.</div>
                </div>

                <div style={{ marginTop: 6 }}>
                  <button style={{ ...styles.button, background: '#0ea5a4', color: '#041014', width: '100%' }}>Open Chat</button>
                </div>
              </div>
            </div>

            <div style={styles.panel}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Quick Actions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button style={{ ...styles.button, background: '#12232a', color: '#9fb4d4' }}>Contain Threat</button>
                <button style={{ ...styles.button, background: '#12232a', color: '#9fb4d4' }}>Export Logs</button>
                <button style={{ ...styles.button, background: '#12232a', color: '#9fb4d4' }}>Create Report</button>
              </div>
            </div>

          </aside>
        </section>

        <footer style={{ marginTop: 18, color: '#718096', fontSize: 13 }}>
          Demo • Conversational SIEM Assistant • Smart India Hackathon (ISRO)
        </footer>
      </main>
    </div>
  );
}
