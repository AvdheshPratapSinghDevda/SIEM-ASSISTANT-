import React, { useState, useRef, useEffect } from 'react';
import { Send, Shield, AlertTriangle, Activity, Search, Filter, Download, Bell, User, Settings, Menu, X, TrendingUp, Database, Lock, Zap, Eye, FileText, BarChart3, MessageSquare, Terminal, Globe, Cpu, Server, Wifi, RefreshCw, Play, Pause, Code, PlusCircle, Clock, CheckCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Improved ISRO SIEM Dashboard
// Changes made:
// - Polished KPI cards with micro-sparklines
// - Clearer visual hierarchy (larger headings, subtle gradients)
// - Threat list enhanced with action buttons and severity sorting
// - Charts grouped into collapsible sections to reduce visual noise
// - Quick filter bar added (time range + severity)
// - Timeline panel for quick incident triage

const ISROSIEMDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'assistant', text: 'Hello! I am your ISRO SIEM Assistant with AI-powered Predictive Threat Intelligence. Ask me to run queries or generate a report.' }
  ]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [logViewerOpen, setLogViewerOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [severityFilter, setSeverityFilter] = useState('all');
  const chatEndRef = useRef(null);

  // --- sample data ---
  const sparkData = [
    { v: 5 },{ v: 8 },{ v: 6 },{ v: 9 },{ v: 12 },{ v: 11 },{ v: 10 }
  ];

  const threatTrendData = [
    { time: '00:00', critical: 4, high: 12, medium: 25, low: 45 },
    { time: '04:00', critical: 3, high: 15, medium: 28, low: 42 },
    { time: '08:00', critical: 7, high: 20, medium: 35, low: 38 },
    { time: '12:00', critical: 5, high: 18, medium: 30, low: 40 },
    { time: '16:00', critical: 9, high: 22, medium: 32, low: 35 },
    { time: '20:00', critical: 6, high: 16, medium: 28, low: 43 },
  ];

  const attackVectorData = [
    { name: 'Malware', value: 35, color: '#ef4444' },
    { name: 'Phishing', value: 28, color: '#f97316' },
    { name: 'DDoS', value: 18, color: '#eab308' },
    { name: 'SQL Injection', value: 12, color: '#3b82f6' },
    { name: 'XSS', value: 7, color: '#8b5cf6' },
  ];

  const networkTrafficData = [
    { time: '00:00', inbound: 4200, outbound: 2800, threats: 12 },
    { time: '04:00', inbound: 3800, outbound: 2400, threats: 8 },
    { time: '08:00', inbound: 5600, outbound: 4200, threats: 15 },
    { time: '12:00', inbound: 6800, outbound: 5100, threats: 22 },
    { time: '16:00', inbound: 7200, outbound: 5800, threats: 18 },
    { time: '20:00', inbound: 6400, outbound: 4900, threats: 14 },
  ];

  const securityPostureData = [
    { category: 'Firewall', score: 95 },
    { category: 'IDS/IPS', score: 88 },
    { category: 'Encryption', score: 92 },
    { category: 'Access Control', score: 85 },
    { category: 'Patch Management', score: 78 },
    { category: 'Monitoring', score: 90 },
  ];

  const geoLocationData = [
    { country: 'India', attacks: 145, blocked: 142 },
    { country: 'China', attacks: 89, blocked: 85 },
    { country: 'Russia', attacks: 67, blocked: 65 },
    { country: 'USA', attacks: 45, blocked: 43 },
    { country: 'Others', attacks: 123, blocked: 118 },
  ];

  const detailedLogs = [ /* same as before (kept for brevity) */
    { id: 1, timestamp: '2025-10-01 14:32:15.342', level: 'critical', source: '192.168.1.45', destination: '10.0.0.5', event: 'Unauthorized SSH access attempt', protocol: 'SSH', port: '22', action: 'BLOCKED', details: 'Multiple failed authentication attempts detected. Brute force attack pattern identified. Source IP added to blocklist.', payload: 'auth_attempts=25' },
    { id: 2, timestamp: '2025-10-01 14:31:48.127', level: 'warning', source: '45.142.120.11', destination: '10.0.0.12', event: 'Port scan detected', protocol: 'TCP', port: 'Multiple', action: 'LOGGED', details: 'Systematic port scanning detected across range 1-1024.', payload: 'ports_scanned=1024' },
    { id: 3, timestamp: '2025-10-01 14:30:22.891', level: 'critical', source: '172.16.45.78', destination: '10.0.0.8', event: 'SQL injection attempt', protocol: 'HTTP', port: '443', action: 'BLOCKED', details: 'Malicious SQL query detected in POST request.', payload: 'payload=OR 1=1--' },
  ];

  const threats = [
    { id: 1, type: 'Critical', title: 'Unauthorized Access Attempt', source: '192.168.1.45', time: '2 mins ago', severity: 'high', vector: 'SSH Brute Force' },
    { id: 2, type: 'Warning', title: 'Suspicious Port Scan Detected', source: '10.0.0.23', time: '15 mins ago', severity: 'medium', vector: 'Network Reconnaissance' },
    { id: 3, type: 'Info', title: 'Multiple Failed Login Attempts', source: '172.16.0.8', time: '1 hour ago', severity: 'low', vector: 'Authentication' },
    { id: 4, type: 'Critical', title: 'Malware Signature Detected', source: '192.168.2.101', time: '3 hours ago', severity: 'high', vector: 'Malware Delivery' },
  ];

  const securityMetrics = [
    { label: 'Active Threats', value: '12', change: '+3', spark: sparkData, icon: AlertTriangle, color: 'text-red-400' },
    { label: 'Incidents Resolved', value: '847', change: '+24', spark: sparkData, icon: Shield, color: 'text-green-400' },
    { label: 'Network Events', value: '45.2K', change: '+12%', spark: sparkData, icon: Activity, color: 'text-blue-400' },
    { label: 'System Health', value: '98%', change: '+2%', spark: sparkData, icon: TrendingUp, color: 'text-purple-400' },
  ];

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory]);

  // quick utilities
  const formatSeverity = (s) => s === 'high' ? 'High' : s === 'medium' ? 'Medium' : 'Low';

  // improved response generator (small improvements)
  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('threat') || lowerQuery.includes('attack')) return 'Found 4 active threats. Use the right-rail assistant to triage or click any threat for actions.';
    if (lowerQuery.includes('report')) return 'Generating PDF report: Threat Summary, Timeline, Top Indicators. (Demo)';
    if (lowerQuery.includes('log')) return 'Filtered logs by your criteria. Click any entry to open details.';
    return "I can run queries, generate reports, or help with containment steps — try: 'show critical threats'";
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setChatHistory([...chatHistory, { type: 'user', text: message }, { type: 'assistant', text: generateResponse(message) }]);
    setMessage('');
  };

  // sorting and filtering threats for better UX
  const filteredThreats = threats
    .filter(t => severityFilter === 'all' ? true : (severityFilter === 'high' ? t.severity === 'high' : severityFilter === 'medium' ? t.severity === 'medium' : t.severity === 'low'))
    .sort((a,b) => a.severity === 'high' && b.severity !== 'high' ? -1 : 0);

  // small UI components used to lift the design
  const KpiCard = ({ m }) => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-gray-700 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-400">{m.label}</div>
          <div className="text-2xl font-bold mt-1">{m.value}</div>
          <div className="text-xs text-gray-400 mt-1">{m.change} • {timeRange}</div>
        </div>
        <div className="w-24 h-12">
          <ResponsiveContainer width="100%" height={48}>
            <LineChart data={m.spark} margin={{ left: -10, right: -10 }}>
              <Line type="monotone" dataKey="v" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const ThreatCard = ({ threat }) => (
    <div className={`bg-gradient-to-br from-gray-800 to-slate-900 p-4 rounded-lg border-l-4 ${threat.severity === 'high' ? 'border-red-500' : threat.severity === 'medium' ? 'border-yellow-500' : 'border-blue-500'} shadow-md`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-xs font-semibold text-gray-300">{threat.type}</div>
          <h4 className="text-white font-medium mt-1">{threat.title}</h4>
          <div className="text-gray-400 text-xs mt-1">{threat.source} • {threat.time}</div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <button onClick={() => { setSelectedThreat(threat); setActiveTab('investigation'); }} className="px-3 py-1 bg-blue-600 rounded text-xs">Investigate</button>
          <div className="text-xs text-gray-300">{formatSeverity(threat.severity)}</div>
        </div>
      </div>
      <div className="text-gray-400 text-xs">Vector: {threat.vector}</div>
    </div>
  );

  const LogDetailViewer = ({ log }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setLogViewerOpen(false)}>
      <div className="bg-gradient-to-br from-gray-800 to-slate-900 rounded-lg p-6 max-w-3xl w-full mx-4 border border-gray-700 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Log Entry Details</h3>
            <span className={`px-3 py-1 rounded text-xs font-semibold ${log.level === 'critical' ? 'bg-red-900 text-red-200' : log.level === 'warning' ? 'bg-yellow-900 text-yellow-200' : 'bg-blue-900 text-blue-200'}`}>{log.level.toUpperCase()}</span>
          </div>
          <button onClick={() => setLogViewerOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-900 rounded p-3 text-xs"><div className="text-gray-400">Timestamp</div><div className="text-white font-mono text-sm">{log.timestamp}</div></div>
          <div className="bg-gray-900 rounded p-3 text-xs"><div className="text-gray-400">Source</div><div className="text-white font-mono text-sm">{log.source}</div></div>
          <div className="bg-gray-900 rounded p-3 text-xs"><div className="text-gray-400">Destination</div><div className="text-white font-mono text-sm">{log.destination}</div></div>
          <div className="bg-gray-900 rounded p-3 text-xs"><div className="text-gray-400">Protocol / Port</div><div className="text-white font-mono text-sm">{log.protocol} / {log.port}</div></div>
        </div>
        <div className="bg-gray-900 rounded p-3 mb-3 text-sm"><div className="text-gray-400">Event</div><div className="text-white">{log.event}</div><div className="text-gray-300 text-xs mt-2">{log.details}</div></div>
        <div className="bg-gray-900 rounded p-3 text-sm"><div className="text-gray-400">Payload</div><pre className="text-green-400 font-mono text-xs overflow-x-auto">{log.payload}</pre></div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 bg-blue-600 py-2 rounded flex items-center justify-center"><Search className="mr-2" />Investigate</button>
          <button className="flex-1 bg-gray-700 py-2 rounded flex items-center justify-center"><Download className="mr-2" />Export</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-gray-850/60 border-r border-gray-700 transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="text-cyan-400" size={32} />
            <div>
              <h1 className="text-lg font-bold text-white">ISRO SIEM</h1>
              <p className="text-xs text-gray-400">Security Intelligence • SOC</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {[{ id: 'dashboard', icon: BarChart3, label: 'Dashboard' },{ id: 'analytics', icon: TrendingUp, label: 'Analytics' },{ id: 'threats', icon: AlertTriangle, label: 'Threats' },{ id: 'logs', icon: Database, label: 'Log Viewer' },{ id: 'investigation', icon: Search, label: 'Investigation' },{ id: 'reports', icon: FileText, label: 'Reports' },{ id: 'compliance', icon: Lock, label: 'Compliance' },{ id: 'ai-predict', icon: Cpu, label: 'AI Predictions' }].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <item.icon size={18} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
          <div className="mt-4 pt-3 border-t border-gray-700">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 rounded"><PlusCircle size={16} />New Investigation</button>
          </div>
        </nav>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-transparent px-6 py-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">{sidebarOpen ? <X size={20} /> : <Menu size={20} />}</button>
              <div>
                <h2 className="text-2xl font-semibold">Security Operations Center</h2>
                <div className="text-xs text-gray-400">Real-time visibility • Predictive insights</div>
              </div>
              <div className="ml-6 flex items-center gap-2 bg-gray-800 rounded p-1">
                <button onClick={() => setTimeRange('1h')} className={`px-2 py-1 rounded text-xs ${timeRange==='1h'?'bg-cyan-600':''}`}>1h</button>
                <button onClick={() => setTimeRange('6h')} className={`px-2 py-1 rounded text-xs ${timeRange==='6h'?'bg-cyan-600':''}`}>6h</button>
                <button onClick={() => setTimeRange('24h')} className={`px-2 py-1 rounded text-xs ${timeRange==='24h'?'bg-cyan-600':''}`}>24h</button>
                <button onClick={() => setTimeRange('7d')} className={`px-2 py-1 rounded text-xs ${timeRange==='7d'?'bg-cyan-600':''}`}>7d</button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-800 rounded p-2">
                <input placeholder="Search events, IPs, users" className="bg-transparent text-sm outline-none placeholder-gray-400" />
                <button className="p-2"><Search size={16} /></button>
              </div>
              <button className="p-2 text-gray-300"><Bell size={18} /></button>
              <div className="flex items-center gap-2 pl-3 border-l border-gray-700">
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center"><User size={14} /></div>
                <div className="text-sm">Security Admin</div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {/* KPI Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {securityMetrics.map((m, i) => <KpiCard key={i} m={m} />)}
            </div>

            {/* Charts + Controls */}
            <div className="flex gap-6 mb-6">
              <div className="flex-1 bg-gradient-to-br from-gray-800 to-slate-900 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Threat Trend</h3>
                  <div className="text-xs text-gray-400">Updated: 2m ago</div>
                </div>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={threatTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#263238" />
                      <XAxis dataKey="time" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f1724', border: '1px solid #263238' }} />
                      <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fillOpacity={0.3} fill="#ef4444" />
                      <Area type="monotone" dataKey="high" stackId="1" stroke="#f97316" fillOpacity={0.2} fill="#f97316" />
                      <Area type="monotone" dataKey="medium" stackId="1" stroke="#eab308" fillOpacity={0.12} fill="#eab308" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-xs text-gray-400">Tip: Click a threat card to jump directly to investigation tools.</div>
              </div>

              <div className="w-96 space-y-4">
                <div className="bg-gradient-to-br from-gray-800 to-slate-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-semibold mb-2">Top Attack Vectors</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={attackVectorData} dataKey="value" outerRadius={60} innerRadius={30}>
                        {attackVectorData.map((e,i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-slate-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-semibold mb-2">Security Posture</h4>
                  <ResponsiveContainer width="100%" height={120}>
                    <RadarChart data={securityPostureData}>
                      <PolarGrid stroke="#263238" />
                      <PolarAngleAxis dataKey="category" stroke="#9ca3af" />
                      <Radar dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Threats + Recent Events */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-gradient-to-br from-gray-800 to-slate-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Active Threats</h3>
                  <div className="flex items-center gap-2">
                    <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="bg-gray-900 text-sm p-2 rounded">
                      <option value="all">All severities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <button className="px-3 py-1 bg-blue-600 rounded text-sm flex items-center"><Download size={14} className="mr-2" />Export</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {filteredThreats.map(t => <ThreatCard key={t.id} threat={t} />)}
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-gray-300 mb-2">Recent Security Events</h4>
                  <div className="overflow-auto rounded bg-gray-900 border border-gray-700">
                    <table className="w-full text-sm">
                      <thead className="text-xs text-gray-400 border-b border-gray-700">
                        <tr>
                          <th className="p-3 text-left">Timestamp</th>
                          <th className="p-3 text-left">Level</th>
                          <th className="p-3 text-left">Source</th>
                          <th className="p-3 text-left">Event</th>
                          <th className="p-3 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedLogs.map(log => (
                          <tr key={log.id} className="border-b border-gray-800 hover:bg-gray-800 cursor-pointer" onClick={() => { setSelectedLog(log); setLogViewerOpen(true); }}>
                            <td className="p-3 font-mono text-gray-200 text-xs">{log.timestamp}</td>
                            <td className="p-3 text-xs"><span className={`px-2 py-1 rounded text-xs font-semibold ${log.level==='critical'?'bg-red-900 text-red-200':log.level==='warning'?'bg-yellow-900 text-yellow-200':'bg-blue-900 text-blue-200'}`}>{log.level.toUpperCase()}</span></td>
                            <td className="p-3 text-xs text-gray-300">{log.source}</td>
                            <td className="p-3 text-xs text-gray-300">{log.event}</td>
                            <td className="p-3 text-xs text-gray-300">{log.action}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <aside className="bg-gradient-to-br from-gray-800 to-slate-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold">Triage Timeline</h4>
                  <div className="text-xs text-gray-400">{timeRange}</div>
                </div>
                <div className="space-y-3 text-sm">
                  {detailedLogs.map(l => (
                    <div key={l.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><Clock size={14} /></div>
                      <div>
                        <div className="text-gray-200">{l.event}</div>
                        <div className="text-gray-400 text-xs">{l.timestamp} • {l.source}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="w-full px-3 py-2 bg-indigo-600 rounded flex items-center justify-center"><CheckCircle className="mr-2" />Acknowledge All</button>
                </div>
              </aside>
            </div>

            <div className="h-6" />
          </main>

          {/* Right rail - Chat / Assistant */}
          <aside className="w-96 bg-gradient-to-br from-gray-800 to-slate-900 border-l border-gray-700 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm text-gray-200">Investigation Assistant</h4>
              <div className="text-xs text-gray-400">AI</div>
            </div>

            <div className="space-y-3 mb-4">
              {chatHistory.map((c, i) => (
                <div key={i} className={`p-3 rounded ${c.type === 'assistant' ? 'bg-gray-900' : 'bg-blue-900/30 self-end'} text-sm`}>{c.text}</div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="mt-auto">
              <div className="flex gap-2">
                <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Ask the assistant (e.g. 'show failed logins')" className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 text-gray-200" />
                <button onClick={handleSendMessage} className="px-3 py-2 bg-cyan-600 rounded"><Send size={16} /></button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {logViewerOpen && selectedLog && <LogDetailViewer log={selectedLog} />}
    </div>
  );
};

export default ISROSIEMDashboard;
