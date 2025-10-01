import React, { useState, useRef, useEffect } from 'react';
import { Send, Shield, AlertTriangle, Activity, Search, Filter, Download, Bell, User, Settings, Menu, X, TrendingUp, Database, Lock, Zap, Eye, FileText, BarChart3, MessageSquare } from 'lucide-react';

const ISROSIEMDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'assistant', text: 'Hello! I\'m your ISRO SIEM Assistant. I can help you investigate security threats, analyze logs, and generate automated reports. How can I assist you today?' }
  ]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const chatEndRef = useRef(null);

  const threats = [
    { id: 1, type: 'Critical', title: 'Unauthorized Access Attempt', source: '192.168.1.45', time: '2 mins ago', severity: 'high' },
    { id: 2, type: 'Warning', title: 'Suspicious Port Scan Detected', source: '10.0.0.23', time: '15 mins ago', severity: 'medium' },
    { id: 3, type: 'Info', title: 'Multiple Failed Login Attempts', source: '172.16.0.8', time: '1 hour ago', severity: 'low' },
    { id: 4, type: 'Critical', title: 'Malware Signature Detected', source: '192.168.2.101', time: '3 hours ago', severity: 'high' },
  ];

  const securityMetrics = [
    { label: 'Active Threats', value: '12', change: '+3', icon: AlertTriangle, color: 'text-red-500' },
    { label: 'Incidents Resolved', value: '847', change: '+24', icon: Shield, color: 'text-green-500' },
    { label: 'Network Events', value: '45.2K', change: '+12%', icon: Activity, color: 'text-blue-500' },
    { label: 'System Health', value: '98%', change: '+2%', icon: TrendingUp, color: 'text-purple-500' },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatHistory([...chatHistory, 
      { type: 'user', text: message },
      { type: 'assistant', text: generateResponse(message) }
    ]);
    setMessage('');
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('threat') || lowerQuery.includes('attack')) {
      return 'I\'ve detected 4 active threats in the system. The most critical is an unauthorized access attempt from IP 192.168.1.45. Would you like me to generate a detailed report or initiate containment protocols?';
    } else if (lowerQuery.includes('report')) {
      return 'I can generate comprehensive security reports including: Threat Analysis, Incident Timeline, Network Activity Summary, and Compliance Status. Which report would you like me to prepare?';
    } else if (lowerQuery.includes('log')) {
      return 'I\'m analyzing system logs across all ISRO network segments. I can filter by: Source IP, Event Type, Time Range, or Severity Level. What specific logs are you looking for?';
    } else if (lowerQuery.includes('help')) {
      return 'I can assist with: 🔍 Threat Investigation, 📊 Security Analytics, 📝 Automated Reporting, 🛡️ Incident Response, 🔐 Access Control Analysis, and 📈 Compliance Monitoring. What would you like to explore?';
    }
    return 'I understand your query. Let me analyze the security data and provide you with relevant insights. Could you provide more specific details about what you\'d like to investigate?';
  };

  const ThreatCard = ({ threat }) => (
    <div 
      className={`bg-gray-800 rounded-lg p-4 border-l-4 ${
        threat.severity === 'high' ? 'border-red-500' : 
        threat.severity === 'medium' ? 'border-yellow-500' : 'border-blue-500'
      } hover:bg-gray-750 cursor-pointer transition-all`}
      onClick={() => setSelectedThreat(threat)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          threat.severity === 'high' ? 'bg-red-900 text-red-200' : 
          threat.severity === 'medium' ? 'bg-yellow-900 text-yellow-200' : 'bg-blue-900 text-blue-200'
        }`}>
          {threat.type}
        </span>
        <span className="text-gray-400 text-xs">{threat.time}</span>
      </div>
      <h3 className="text-white font-medium mb-1">{threat.title}</h3>
      <p className="text-gray-400 text-sm">Source: {threat.source}</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-800 border-r border-gray-700 transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="text-blue-500" size={32} />
            <div>
              <h1 className="text-xl font-bold text-white">ISRO SIEM</h1>
              <p className="text-xs text-gray-400">Security Intelligence</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'threats', icon: AlertTriangle, label: 'Threats' },
            { id: 'investigation', icon: Search, label: 'Investigation' },
            { id: 'reports', icon: FileText, label: 'Reports' },
            { id: 'logs', icon: Database, label: 'Logs' },
            { id: 'compliance', icon: Lock, label: 'Compliance' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-semibold text-white">Security Operations Center</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-2 pl-4 border-l border-gray-700">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm text-gray-300">Security Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Dashboard/Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Security Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {securityMetrics.map((metric, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <metric.icon className={metric.color} size={24} />
                    <span className="text-green-400 text-xs">{metric.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* Active Threats */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <AlertTriangle className="mr-2 text-red-500" size={20} />
                  Active Threats
                </h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600 transition-all">
                    <Filter size={16} className="inline mr-1" />
                    Filter
                  </button>
                  <button className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700 transition-all">
                    <Download size={16} className="inline mr-1" />
                    Export
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {threats.map(threat => (
                  <ThreatCard key={threat.id} threat={threat} />
                ))}
              </div>
            </div>

            {/* Real-time Activity Monitor */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity className="mr-2 text-blue-500" size={20} />
                Real-time Network Activity
              </h3>
              <div className="space-y-2">
                {[
                  { time: '14:32:15', event: 'Port scan detected from 45.142.120.11', level: 'warning' },
                  { time: '14:31:48', event: 'Firewall blocked incoming connection', level: 'info' },
                  { time: '14:30:22', event: 'Failed authentication attempt - User: admin', level: 'critical' },
                  { time: '14:29:55', event: 'SSL certificate validated successfully', level: 'success' },
                  { time: '14:28:10', event: 'Database query anomaly detected', level: 'warning' },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-750 rounded hover:bg-gray-700 transition-all">
                    <span className="text-gray-400 text-xs w-20">{log.time}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      log.level === 'critical' ? 'bg-red-500' :
                      log.level === 'warning' ? 'bg-yellow-500' :
                      log.level === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></span>
                    <span className="text-gray-300 text-sm flex-1">{log.event}</span>
                    <Eye size={16} className="text-gray-500 hover:text-white cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - AI Assistant Chat */}
          <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <MessageSquare className="mr-2 text-blue-500" size={20} />
                AI Security Assistant
              </h3>
              <p className="text-xs text-gray-400 mt-1">Powered by NLP for threat investigation</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-2">Quick Actions:</p>
              <div className="flex flex-wrap gap-2">
                {['Show Active Threats', 'Generate Report', 'Analyze Logs', 'Check Compliance'].map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(action)}
                    className="px-3 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600 transition-all"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about threats, generate reports..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Detail Modal */}
      {selectedThreat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedThreat(null)}>
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 border border-gray-700" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{selectedThreat.title}</h3>
              <button onClick={() => setSelectedThreat(null)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Severity:</span>
                <span className={`font-semibold ${
                  selectedThreat.severity === 'high' ? 'text-red-500' : 
                  selectedThreat.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                }`}>{selectedThreat.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Source IP:</span>
                <span className="text-white">{selectedThreat.source}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Detected:</span>
                <span className="text-white">{selectedThreat.time}</span>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                Investigate Further
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all">
                Contain Threat
              </button>
              <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-all">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default ISROSIEMDashboard;

