import React, { useState, useRef, useEffect } from 'react';
import { Send, Shield, AlertTriangle, Activity, Search, Filter, Download, Bell, User, Settings, Menu, X, TrendingUp, Database, Lock, Zap, Eye, FileText, BarChart3, MessageSquare, Terminal, Globe, Cpu, Play, Pause, Brain, Network, Crosshair, Target, GitBranch, Radio, Skull, CheckCircle, Layers, AlertCircle, Code2, Workflow, Box, Flame, CloudLightning, Server, Wifi } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ISROSIEMDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'assistant', text: 'Hello! I am your ISRO SIEM Assistant with AI-powered Predictive Threat Intelligence. I can help you investigate threats, analyze patterns, predict future attacks, execute playbooks, and provide threat hunting recommendations. How can I assist you today?' }
  ]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [logViewerOpen, setLogViewerOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [threatHuntMode, setThreatHuntMode] = useState(false);
  const [selectedMitreNode, setSelectedMitreNode] = useState(null);
  const [redTeamSimActive, setRedTeamSimActive] = useState(false);
  const [playbookExecuting, setPlaybookExecuting] = useState(false);
  const chatEndRef = useRef(null);

  // --- (data arrays omitted for brevity in code comments) ---
  const threatTrendData = [
    { time: '00:00', critical: 4, high: 12, medium: 25, low: 45 },
    { time: '04:00', critical: 3, high: 15, medium: 28, low: 42 },
    { time: '08:00', critical: 7, high: 20, medium: 35, low: 38 },
    { time: '12:00', critical: 5, high: 18, medium: 30, low: 40 },
    { time: '16:00', critical: 9, high: 22, medium: 32, low: 35 },
    { time: '20:00', critical: 6, high: 16, medium: 28, low: 43 },
  ];

  const attackVectorData = [
    { name: 'Malware', value: 35, color: '#dc2626' },
    { name: 'Phishing', value: 28, color: '#ea580c' },
    { name: 'DDoS', value: 18, color: '#ca8a04' },
    { name: 'SQL Injection', value: 12, color: '#2563eb' },
    { name: 'XSS', value: 7, color: '#7c3aed' },
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
    { category: 'Patch Mgmt', score: 78 },
    { category: 'Monitoring', score: 90 },
  ];

  const geoLocationData = [
    { country: 'India', attacks: 145, blocked: 142 },
    { country: 'China', attacks: 89, blocked: 85 },
    { country: 'Russia', attacks: 67, blocked: 65 },
    { country: 'USA', attacks: 45, blocked: 43 },
    { country: 'Others', attacks: 123, blocked: 118 },
  ];

  const behavioralAnomalyData = [
    { time: '00:00', normal: 95, anomalous: 5 },
    { time: '04:00', normal: 97, anomalous: 3 },
    { time: '08:00', normal: 88, anomalous: 12 },
    { time: '12:00', normal: 82, anomalous: 18 },
    { time: '16:00', normal: 90, anomalous: 10 },
    { time: '20:00', normal: 93, anomalous: 7 },
  ];

  const complianceScores = [
    { framework: 'ISO 27001', score: 92, status: 'compliant' },
    { framework: 'NIST CSF', score: 88, status: 'compliant' },
    { framework: 'PCI DSS', score: 85, status: 'compliant' },
    { framework: 'GDPR', score: 78, status: 'partial' },
    { framework: 'HIPAA', score: 95, status: 'compliant' },
  ];

  const mitreAttackChain = [
    { phase: 'Reconnaissance', detected: 8, techniques: ['T1595', 'T1592'] },
    { phase: 'Initial Access', detected: 12, techniques: ['T1566', 'T1190'] },
    { phase: 'Execution', detected: 5, techniques: ['T1059', 'T1203'] },
    { phase: 'Persistence', detected: 3, techniques: ['T1547', 'T1053'] },
    { phase: 'Privilege Escalation', detected: 2, techniques: ['T1068', 'T1078'] },
    { phase: 'Defense Evasion', detected: 7, techniques: ['T1070', 'T1027'] },
    { phase: 'Credential Access', detected: 4, techniques: ['T1110', 'T1003'] },
    { phase: 'Discovery', detected: 6, techniques: ['T1083', 'T1046'] },
    { phase: 'Lateral Movement', detected: 3, techniques: ['T1021', 'T1550'] },
    { phase: 'Collection', detected: 2, techniques: ['T1005', 'T1560'] },
    { phase: 'Exfiltration', detected: 1, techniques: ['T1041', 'T1048'] },
    { phase: 'Impact', detected: 1, techniques: ['T1486', 'T1490'] },
  ];

  const threatIntelFeeds = [
    { source: 'AlienVault OTX', iocs: 1245, lastUpdate: '2 mins ago', status: 'active' },
    { source: 'MISP', iocs: 892, lastUpdate: '5 mins ago', status: 'active' },
    { source: 'VirusTotal', iocs: 2341, lastUpdate: '1 min ago', status: 'active' },
    { source: 'Abuse.ch', iocs: 567, lastUpdate: '8 mins ago', status: 'active' },
    { source: 'Dark Web Monitor', iocs: 34, lastUpdate: '15 mins ago', status: 'active' },
  ];

  const automatedPlaybooks = [
    { id: 1, name: 'Ransomware Response', status: 'ready', executions: 0, success: 100 },
    { id: 2, name: 'DDoS Mitigation', status: 'ready', executions: 15, success: 98 },
    { id: 3, name: 'Data Breach Protocol', status: 'ready', executions: 3, success: 100 },
    { id: 4, name: 'Malware Containment', status: 'ready', executions: 28, success: 96 },
    { id: 5, name: 'Phishing Investigation', status: 'ready', executions: 45, success: 94 },
  ];

  const networkTopologyNodes = [
    { id: 1, name: 'Firewall-01', type: 'firewall', status: 'healthy', x: 150, y: 100, threats: 0 },
    { id: 2, name: 'Web-Server-01', type: 'server', status: 'healthy', x: 250, y: 150, threats: 0 },
    { id: 3, name: 'DB-Server-01', type: 'database', status: 'warning', x: 350, y: 100, threats: 2 },
    { id: 4, name: 'App-Server-01', type: 'server', status: 'healthy', x: 250, y: 50, threats: 0 },
    { id: 5, name: 'Router-Core', type: 'router', status: 'critical', x: 50, y: 100, threats: 5 },
  ];

  const detailedLogs = [
    { 
      id: 1, 
      timestamp: '2025-10-02 14:32:15', 
      level: 'critical', 
      source: '192.168.1.45', 
      destination: '10.0.0.5', 
      event: 'Unauthorized SSH access attempt',
      protocol: 'SSH',
      port: '22',
      action: 'BLOCKED',
      details: 'Multiple failed authentication attempts detected. Brute force attack pattern identified.',
      payload: 'auth_attempts=25, method=password, user=root',
      mitre: 'T1110 - Brute Force'
    },
    { 
      id: 2, 
      timestamp: '2025-10-02 14:31:48', 
      level: 'warning', 
      source: '45.142.120.11', 
      destination: '10.0.0.12', 
      event: 'Port scan detected',
      protocol: 'TCP',
      port: 'Multiple',
      action: 'LOGGED',
      details: 'Systematic port scanning detected across range 1-1024.',
      payload: 'ports_scanned=1024, scan_rate=high',
      mitre: 'T1046 - Network Service Discovery'
    },
    { 
      id: 3, 
      timestamp: '2025-10-02 14:30:22', 
      level: 'critical', 
      source: '172.16.45.78', 
      destination: '10.0.0.8', 
      event: 'SQL injection attempt',
      protocol: 'HTTP',
      port: '443',
      action: 'BLOCKED',
      details: 'Malicious SQL query detected in POST request.',
      payload: 'endpoint=/api/users, method=POST',
      mitre: 'T1190 - Exploit Public-Facing Application'
    },
    { 
      id: 4, 
      timestamp: '2025-10-02 14:29:55', 
      level: 'info', 
      source: '10.0.0.45', 
      destination: '10.0.0.1', 
      event: 'SSL certificate validated',
      protocol: 'HTTPS',
      port: '443',
      action: 'ALLOWED',
      details: 'Certificate chain verified successfully.',
      payload: 'issuer=DigiCert, validity=valid',
      mitre: 'N/A'
    },
    { 
      id: 5, 
      timestamp: '2025-10-02 14:28:10', 
      level: 'warning', 
      source: '192.168.2.101', 
      destination: '10.0.0.15', 
      event: 'Malware signature detected',
      protocol: 'HTTP',
      port: '80',
      action: 'QUARANTINED',
      details: 'Known malware hash detected in file.',
      payload: 'signature=Trojan.Win32.Generic',
      mitre: 'T1204 - User Execution'
    },
  ];

  const threats = [
    { id: 1, type: 'Critical', title: 'Unauthorized SSH Access', source: '192.168.1.45', time: '2 mins ago', severity: 'high', vector: 'Brute Force' },
    { id: 2, type: 'Warning', title: 'Port Scan Detected', source: '10.0.0.23', time: '15 mins ago', severity: 'medium', vector: 'Reconnaissance' },
    { id: 3, type: 'Info', title: 'Failed Login Attempts', source: '172.16.0.8', time: '1 hour ago', severity: 'low', vector: 'Authentication' },
    { id: 4, type: 'Critical', title: 'Malware Detected', source: '192.168.2.101', time: '3 hours ago', severity: 'high', vector: 'Malware' },
  ];

  const securityMetrics = [
    { label: 'Active Threats', value: '12', change: '+3', icon: AlertTriangle, color: 'text-red-400' },
    { label: 'Incidents Resolved', value: '847', change: '+24', icon: Shield, color: 'text-emerald-400' },
    { label: 'Network Events', value: '45.2K', change: '+12%', icon: Activity, color: 'text-blue-400' },
    { label: 'System Health', value: '98%', change: '+2%', icon: TrendingUp, color: 'text-purple-400' },
  ];

  const aiPredictions = [
    { threat: 'DDoS Attack', probability: 78, timeframe: '6 hours', target: 'Satellite Comms' },
    { threat: 'Credential Stuffing', probability: 65, timeframe: '12 hours', target: 'Admin Portal' },
    { threat: 'APT Activity', probability: 52, timeframe: '24 hours', target: 'External APIs' },
    { threat: 'Data Exfiltration', probability: 41, timeframe: '48 hours', target: 'Database Servers' },
  ];

  const darkWebAlerts = [
    { id: 1, type: 'Credentials', content: 'ISRO admin credentials found on paste site', severity: 'critical', time: '1 hour ago' },
    { id: 2, type: 'Brand Mention', content: 'Threat actor discussing ISRO infrastructure', severity: 'high', time: '3 hours ago' },
    { id: 3, type: 'Data Leak', content: 'Potential employee data on dark web forum', severity: 'critical', time: '5 hours ago' },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    // simple auto-refresh simulation
    if (!autoRefresh) return;
    const tid = setInterval(() => {
      // placeholder for polling logic
      // could refresh feeds, logs, etc.
    }, 60000);
    return () => clearInterval(tid);
  }, [autoRefresh]);

  const predictThreatPattern = () => {
    const predictions = [
      'Based on ML analysis, 78% probability of DDoS targeting satellite endpoints in 6 hours. Recommend preemptive rate limiting and CDN activation.',
      'Anomalous login patterns detected across 15 accounts. Credential stuffing attack likely. Enable 2FA immediately for admin accounts.',
      'Threat intel shows APT36 targeting aerospace sector. Increase monitoring on external APIs and deploy honeypots on DMZ.',
      'Pattern correlation: Weekend deployments correlate with 34% higher incident rate. Schedule mandatory security reviews before releases.',
      'Behavioral analytics detected privilege escalation attempts from internal subnet. Recommend immediate investigation and access audit.'
    ];
    return predictions[Math.floor(Math.random() * predictions.length)];
  };

  const executePlaybook = (playbookName) => {
    setPlaybookExecuting(true);
    setChatHistory(prev => ([...prev, 
      { type: 'assistant', text: `Executing playbook: ${playbookName}... Step 1: Isolating affected systems. Step 2: Collecting forensics. Step 3: Threat containment in progress. Playbook execution successful. All affected systems secured.` }
    ]));
    setTimeout(() => setPlaybookExecuting(false), 3000);
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('threat') || lowerQuery.includes('attack')) {
      return 'Detected 4 active threats. Critical: SSH brute force from 192.168.1.45. Initiating automated containment via playbook. Do you want detailed forensics or threat hunting queries?';
    } else if (lowerQuery.includes('hunt')) {
      return 'Threat Hunting Mode: I can generate YARA rules, create correlation queries, analyze IOCs, map to MITRE ATT&CK, and suggest proactive searches. What would you like to hunt for?';
    } else if (lowerQuery.includes('mitre') || lowerQuery.includes('attack chain')) {
      return 'MITRE ATT&CK mapping active. Detected techniques across 12 phases. Most active: Initial Access (T1566 - Phishing), Execution (T1059 - Command Shell). View full kill chain?';
    } else if (lowerQuery.includes('compliance')) {
      return 'Compliance status: ISO 27001 (92%), NIST CSF (88%), PCI DSS (85%), GDPR (78% - partial), HIPAA (95%). GDPR requires attention on data retention policies.';
    } else if (lowerQuery.includes('dark web')) {
      return 'Dark web monitoring detected 3 critical alerts: ISRO credentials on paste site, threat actor discussion, potential employee data leak. Recommend immediate investigation.';
    } else if (lowerQuery.includes('network') || lowerQuery.includes('topology')) {
      return 'Network topology shows 5 critical nodes. Router-Core has 5 active threats. DB-Server-01 showing 2 warnings. Recommend immediate inspection of core infrastructure.';
    } else if (lowerQuery.includes('report')) {
      return 'Available reports: Executive Summary, Technical Deep-Dive, Compliance Audit, Incident Timeline, Threat Intelligence Brief, MITRE ATT&CK Mapping. Which format?';
    } else if (lowerQuery.includes('log')) {
      return 'Analyzing logs across 15 segments. Available filters: IP ranges, event signatures, temporal patterns, MITRE techniques, anomaly scoring. Specific query?';
    } else if (lowerQuery.includes('analytics')) {
      return 'Real-time analytics available: Threat trends, attack vectors, network correlation, security posture, geo-distribution, behavioral anomalies, compliance scoring. Select view?';
    }
    return 'Query understood. Analyzing security telemetry across all systems. For advanced features try: threat hunting, predictive analysis, playbook execution, MITRE mapping, or behavioral profiling.';
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    let response = generateResponse(message);
    if (message.toLowerCase().includes('predict') || message.toLowerCase().includes('forecast')) {
      response = predictThreatPattern();
    } else if (message.toLowerCase().includes('execute') || message.toLowerCase().includes('playbook')) {
      response = 'Available playbooks: Ransomware Response, DDoS Mitigation, Data Breach Protocol, Malware Containment, Phishing Investigation. Which playbook would you like to execute?';
    }
    setChatHistory(prev => ([...prev, { type: 'user', text: message }, { type: 'assistant', text: response }]));
    setMessage('');
  };

  const ThreatCard = ({ threat }) => (
    <div 
      className={`bg-gray-800 rounded-lg p-4 border-l-4 ${
        threat.severity === 'high' ? 'border-red-500' : 
        threat.severity === 'medium' ? 'border-yellow-500' : 'border-blue-500'
      } hover:bg-gray-750 cursor-pointer transition-all shadow-lg hover:shadow-xl`}
      onClick={() => setSelectedThreat(threat)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          threat.severity === 'high' ? 'bg-red-900 text-red-200' : 
          threat.severity === 'medium' ? 'bg-yellow-900 text-yellow-200' : 'bg-blue-900 text-blue-200'
        }`}>
          {threat.type}
        </span>
        <span className="text-gray-400 text-xs">{threat.time}</span>
      </div>
      <h3 className="text-white font-semibold mb-1">{threat.title}</h3>
      <p className="text-gray-400 text-sm mb-2">Source: {threat.source}</p>
      <p className="text-gray-500 text-xs">Vector: {threat.vector}</p>
    </div>
  );

  const LogDetailViewer = ({ log }) => (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => { setLogViewerOpen(false); setSelectedLog(null); }}>
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 border border-gray-700 max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Log Entry Details</h3>
            <span className={`px-3 py-1 rounded text-xs font-bold ${
              log.level === 'critical' ? 'bg-red-900 text-red-200' : 
              log.level === 'warning' ? 'bg-yellow-900 text-yellow-200' : 'bg-blue-900 text-blue-200'
            }`}>
              {log.level.toUpperCase()}
            </span>
          </div>
          <button onClick={() => { setLogViewerOpen(false); setSelectedLog(null); }} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 rounded p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Timestamp</p>
            <p className="text-white font-mono text-sm">{log.timestamp}</p>
          </div>
          <div className="bg-gray-900 rounded p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Event ID</p>
            <p className="text-white font-mono text-sm">EVT-{log.id.toString().padStart(6, '0')}</p>
          </div>
          <div className="bg-gray-900 rounded p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Source IP</p>
            <p className="text-white font-mono text-sm">{log.source}</p>
          </div>
          <div className="bg-gray-900 rounded p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Destination IP</p>
            <p className="text-white font-mono text-sm">{log.destination}</p>
          </div>
          <div className="bg-gray-900 rounded p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Protocol</p>
            <p className="text-white font-mono text-sm">{log.protocol}</p>
          </div>
          <div className="bg-gray-900 rounded p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Port</p>
            <p className="text-white font-mono text-sm">{log.port}</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded p-4 mb-4 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">MITRE ATT&CK Technique</p>
          <p className="text-cyan-400 font-semibold">{log.mitre}</p>
        </div>

        <div className="bg-gray-900 rounded p-4 mb-4 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Event Description</p>
          <p className="text-white mb-3">{log.event}</p>
          <p className="text-gray-300 text-sm">{log.details}</p>
        </div>

        <div className="bg-gray-900 rounded p-4 mb-4 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Action Taken</p>
          <span className={`px-3 py-1 rounded text-sm font-bold ${
            log.action === 'BLOCKED' ? 'bg-red-900 text-red-200' : 
            log.action === 'QUARANTINED' ? 'bg-yellow-900 text-yellow-200' : 
            log.action === 'ALLOWED' ? 'bg-green-900 text-green-200' : 'bg-blue-900 text-blue-200'
          }`}>
            {log.action}
          </span>
        </div>

        <div className="bg-gray-900 rounded p-4 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Payload Data</p>
          <pre className="text-emerald-400 font-mono text-xs overflow-x-auto">{log.payload}</pre>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center">
            <Search className="mr-2" size={16} />
            Investigate
          </button>
          <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center">
            <Terminal className="mr-2" size={16} />
            Query Similar
          </button>
          <button className="flex-1 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-all flex items-center justify-center" onClick={() => executePlaybook('Malware Containment')}>
            <Workflow className="mr-2" size={16} />
            Execute Playbook
          </button>
          <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center">
            <Download className="mr-2" size={16} />
            Export
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-gray-100">
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 border-r border-gray-800 transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <Shield className="text-cyan-500" size={32} />
            <div>
              <h1 className="text-xl font-bold text-white">ISRO SIEM</h1>
              <p className="text-xs text-gray-500">AI-Powered Security</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
            { id: 'threats', icon: AlertTriangle, label: 'Threats' },
            { id: 'mitre', icon: GitBranch, label: 'MITRE ATT&CK' },
            { id: 'logs', icon: Database, label: 'Log Viewer' },
            { id: 'ai-predict', icon: Brain, label: 'AI Predictions' },
            { id: 'threat-hunt', icon: Crosshair, label: 'Threat Hunting' },
            { id: 'playbooks', icon: Workflow, label: 'Playbooks' },
            { id: 'network', icon: Network, label: 'Network Map' },
            { id: 'compliance', icon: CheckCircle, label: 'Compliance' },
            { id: 'threat-intel', icon: Radio, label: 'Threat Intel' },
            { id: 'dark-web', icon: Skull, label: 'Dark Web' },
            { id: 'red-team', icon: Target, label: 'Red Team Sim' },
            { id: 'reports', icon: FileText, label: 'Reports' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-cyan-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}>
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-bold text-white">Security Operations Center</h2>
              <button 
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-3 py-1 rounded ${autoRefresh ? 'bg-emerald-600' : 'bg-gray-800'} transition-all`}
              >
                {autoRefresh ? <Play size={16} /> : <Pause size={16} />}
                <span className="text-xs">Live</span>
              </button>
              {threatHuntMode && (
                <span className="px-3 py-1 bg-red-900 text-red-200 rounded text-xs font-bold animate-pulse">
                  THREAT HUNT ACTIVE
                </span>
              )}
              {redTeamSimActive && (
                <span className="px-3 py-1 bg-orange-900 text-orange-200 rounded text-xs font-bold animate-pulse">
                  RED TEAM SIMULATION
                </span>
              )}
              {playbookExecuting && (
                <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded text-xs font-bold animate-pulse">
                  PLAYBOOK EXECUTING
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-2 pl-4 border-l border-gray-800">
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm text-gray-300">Security Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-black via-gray-950 to-gray-900">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {securityMetrics.map((metric, idx) => (
                <div key={idx} className="bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-lg hover:shadow-cyan-500/20 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <metric.icon className={metric.color} size={24} />
                    <span className="text-emerald-400 text-xs font-bold">{metric.change}</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                </div>
              ))}
            </div>

            {(activeTab === 'dashboard' || activeTab === 'analytics') && (
              <>
                <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <TrendingUp className="mr-2 text-cyan-500" size={20} />
                    24-Hour Threat Trend Analysis
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={threatTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="time" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="critical" stackId="1" stroke="#dc2626" fill="#dc2626" />
                      <Area type="monotone" dataKey="high" stackId="1" stroke="#ea580c" fill="#ea580c" />
                      <Area type="monotone" dataKey="medium" stackId="1" stroke="#ca8a04" fill="#ca8a04" />
                      <Area type="monotone" dataKey="low" stackId="1" stroke="#2563eb" fill="#2563eb" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Zap className="mr-2 text-yellow-500" size={20} />
                      Attack Vector Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={attackVectorData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {attackVectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Shield className="mr-2 text-emerald-500" size={20} />
                      Security Posture Score
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={securityPostureData}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="category" stroke="#6b7280" />
                        <PolarRadiusAxis stroke="#6b7280" />
                        <Radar name="Score" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Activity className="mr-2 text-purple-500" size={20} />
                    Network Traffic & Threat Correlation
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={networkTrafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="time" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="inbound" stroke="#2563eb" strokeWidth={2} />
                      <Line type="monotone" dataKey="outbound" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="threats" stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Globe className="mr-2 text-cyan-500" size={20} />
                      Geographic Attack Sources
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={geoLocationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis dataKey="country" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Bar dataKey="attacks" fill="#dc2626" />
                        <Bar dataKey="blocked" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Eye className="mr-2 text-purple-500" size={20} />
                      Behavioral Anomaly Detection
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={behavioralAnomalyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis dataKey="time" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="normal" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="anomalous" stroke="#dc2626" fill="#dc2626" fillOpacity={0.8} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}

            {/* MITRE, AI, Playbooks, Network, Compliance, Threat Intel, Dark Web, Red Team handled earlier (kept above) */}

            {activeTab === 'threat-hunt' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <Crosshair className="mr-2 text-red-500" size={20} />
                      Threat Hunting Console
                    </h3>
                    <button 
                      onClick={() => setThreatHuntMode(!threatHuntMode)}
                      className={`px-4 py-2 rounded font-bold transition-all ${
                        threatHuntMode ? 'bg-red-600 hover:bg-red-700' : 'bg-cyan-600 hover:bg-cyan-700'
                      }`}
                    >
                      {threatHuntMode ? 'Stop Hunt' : 'Start Hunt'}
                    </button>
                  </div>
                  <div className="bg-gray-800 rounded p-4 border border-gray-700 mb-4">
                    <p className="text-gray-300 text-sm mb-2">Active Hunting Queries:</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-900 rounded">
                        <span className="text-emerald-400 font-mono text-xs">SELECT * FROM logs WHERE anomaly_score &gt; 0.8</span>
                        <span className="text-gray-500 text-xs">15 matches</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-900 rounded">
                        <span className="text-emerald-400 font-mono text-xs">IOC_CHECK: MD5 hashes against threat intel feeds</span>
                        <span className="text-gray-500 text-xs">3 matches</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="bg-gray-800 border border-gray-700 p-4 rounded hover:bg-gray-700 transition-all" onClick={() => { /* placeholder */ }}>
                      <Network className="mx-auto mb-2 text-cyan-500" size={24} />
                      <p className="text-white text-sm font-semibold">Lateral Movement</p>
                    </button>
                    <button className="bg-gray-800 border border-gray-700 p-4 rounded hover:bg-gray-700 transition-all" onClick={() => { /* placeholder */ }}>
                      <Database className="mx-auto mb-2 text-purple-500" size={24} />
                      <p className="text-white text-sm font-semibold">Data Exfiltration</p>
                    </button>
                    <button className="bg-gray-800 border border-gray-700 p-4 rounded hover:bg-gray-700 transition-all" onClick={() => { /* placeholder */ }}>
                      <Zap className="mx-auto mb-2 text-yellow-500" size={24} />
                      <p className="text-white text-sm font-semibold">Suspicious Scripts</p>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-lg">
                  <h4 className="text-white font-semibold mb-3">Hunt Results</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {detailedLogs.slice(0,3).map(log => (
                      <div key={log.id} className={`p-4 rounded bg-gray-800 border-l-4 ${log.level === 'critical' ? 'border-red-500' : log.level === 'warning' ? 'border-yellow-500' : 'border-blue-500'}`}>
                        <p className="text-sm text-gray-400 mb-1">{log.timestamp}</p>
                        <p className="text-white font-semibold mb-1">{log.event}</p>
                        <p className="text-gray-400 text-xs">{log.source} → {log.destination}</p>
                        <div className="mt-3 flex space-x-2">
                          <button onClick={() => { setSelectedLog(log); setLogViewerOpen(true); }} className="px-2 py-1 text-xs bg-cyan-600 rounded">View</button>
                          <button className="px-2 py-1 text-xs bg-gray-700 rounded">Investigate</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Threats List */}
            {activeTab === 'threats' && (
              <div className="grid grid-cols-3 gap-4">
                {threats.map(t => (
                  <ThreatCard key={t.id} threat={t} />
                ))}
              </div>
            )}

            {/* Logs Viewer summary */}
            {activeTab === 'logs' && (
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center"><Database className="mr-2 text-cyan-500" size={20} />Log Stream</h3>
                <div className="space-y-3">
                  {detailedLogs.map(log => (
                    <div key={log.id} className="bg-gray-800 rounded p-3 border border-gray-700 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-400">{log.timestamp} • <span className="text-white font-semibold">{log.event}</span></p>
                        <p className="text-xs text-gray-500">{log.source} → {log.destination} • {log.protocol}/{log.port}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => { setSelectedLog(log); setLogViewerOpen(true); }} className="px-3 py-1 bg-cyan-600 rounded text-sm">Details</button>
                        <button className="px-3 py-1 bg-gray-700 rounded text-sm">Copy</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right rail: Chat + Quick Threats */}
          <aside className="w-96 bg-gray-900 border-l border-gray-800 p-4 overflow-y-auto">
            <h4 className="text-white font-bold mb-3 flex items-center"><MessageSquare className="mr-2 text-cyan-400" size={18} /> SOC Assistant</h4>
            <div className="space-y-3 mb-4">
              {chatHistory.map((m, i) => (
                <div key={i} className={`p-3 rounded ${m.type === 'assistant' ? 'bg-gray-800 text-gray-200' : 'bg-cyan-600 text-white'}`}>
                  <p className="text-sm">{m.text}</p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="flex items-center space-x-2">
              <input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }} placeholder="Ask the SOC assistant..." className="flex-1 bg-gray-800 rounded px-3 py-2 text-sm outline-none" />
              <button onClick={handleSendMessage} className="bg-cyan-600 p-2 rounded hover:bg-cyan-700"><Send size={16} /></button>
            </div>

            <div className="mt-6">
              <h5 className="text-sm text-gray-300 mb-2">Active Threats</h5>
              <div className="space-y-2">
                {threats.map(t => (
                  <div key={t.id} className="flex items-center justify-between bg-gray-800 rounded p-2">
                    <div>
                      <p className="text-sm text-white font-semibold">{t.title}</p>
                      <p className="text-xs text-gray-400">{t.source} • {t.time}</p>
                    </div>
                    <div className="text-xs px-2 py-1 rounded font-bold" style={{ background: t.severity === 'high' ? '#7f1d1d' : t.severity === 'medium' ? '#854d0e' : '#1e3a8a' }}>{t.severity.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>

        {/* Log detail modal */}
        {logViewerOpen && selectedLog && <LogDetailViewer log={selectedLog} />}

      </div>
    </div>
  );
};

export default ISROSIEMDashboard;
