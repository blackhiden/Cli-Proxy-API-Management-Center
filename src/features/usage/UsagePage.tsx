import { useState, useMemo } from 'react';
import { FlowTopology } from './components/FlowTopology';
import { useHeaderRefresh } from '@/hooks/useHeaderRefresh';
import './UsagePage.scss';

// Mock data - replace with actual API calls
const mockProviders = [
  { id: 'kiro', name: 'Kiro AI', icon: '/providers/kiro.png', color: '#ff6b35', isActive: true, requestCount: 42 },
  { id: 'github', name: 'GitHub Copilot', icon: '/providers/github.png', color: '#333333', requestCount: 15 },
  { id: 'cline', name: 'Cline', icon: '/providers/cline.png', color: '#5b9bd5', requestCount: 8 },
  { id: 'opencode', name: 'OpenCode Free', icon: '/providers/opencode.png', color: '#e87040', requestCount: 5 },
  { id: 'codebuddy-intl', name: 'CodeBuddy', icon: '/providers/codebuddy-intl.png', color: '#006eff', requestCount: 3 },
  { id: 'gemini', name: 'Gemini', icon: '/providers/gemini.png', color: '#4285f4', requestCount: 12 },
  { id: 'cloudflare-ai', name: 'Cloudflare', icon: '/providers/cloudflare-ai.png', color: '#f38020', requestCount: 7 },
  { id: 'ollama', name: 'Ollama Cloud', icon: '/providers/ollama.png', requestCount: 6 },
  { id: 'grok-cli', name: 'Grok CLI (Grok Build)', icon: '/providers/grok-cli.png', color: '#1da1f2', requestCount: 4 },
  { id: 'codebuddy-cn', name: 'CodeBuddy CN', icon: '/providers/codebuddy-cn.png', color: '#006eff', requestCount: 2 },
];

export function UsagePage() {
  const [activeProvider] = useState<string>('kiro');

  useHeaderRefresh(() => {
    // Implement refresh logic here
  }, true);

  const filteredProviders = useMemo(() => {
    return mockProviders.filter(p => (p.requestCount ?? 0) > 0);
  }, []);

  return (
    <div className="usage-page">
      <header className="usage-header">
        <div className="usage-title-group">
          <h1 className="usage-title">
            <span className="usage-icon">📊</span>
            Usage & Analytics
          </h1>
          <p className="usage-subtitle">
            Monitor your API usage, token consumption, and request logs
          </p>
        </div>
      </header>

      <div className="usage-content">
        {/* Stats Overview */}
        <section className="stats-overview">
          <div className="stat-card">
            <span className="stat-label">Total Requests</span>
            <span className="stat-value">44</span>
          </div>
          <div className="stat-card stat-primary">
            <span className="stat-label">Total Input Tokens</span>
            <span className="stat-value">2,279,760</span>
          </div>
          <div className="stat-card stat-info">
            <span className="stat-label">Cached Tokens</span>
            <span className="stat-value">73,088</span>
          </div>
          <div className="stat-card stat-success">
            <span className="stat-label">Output Tokens</span>
            <span className="stat-value">12,710</span>
          </div>
          <div className="stat-card stat-warning">
            <span className="stat-label">Est. Cost</span>
            <span className="stat-value">~$6.77</span>
            <span className="stat-hint">Estimated, not actual billing</span>
          </div>
        </section>

        {/* Flow Topology */}
        <section className="topology-section">
          <div className="topology-container">
            <FlowTopology 
              providers={filteredProviders}
              activeProvider={activeProvider}
            />
          </div>
        </section>

        {/* Recent Requests */}
        <section className="recent-requests">
          <div className="section-card">
            <div className="section-header">
              <span className="section-label">Recent Requests</span>
            </div>
            <div className="requests-table-wrapper">
              <table className="requests-table">
                <thead>
                  <tr>
                    <th style={{ width: '8px' }}></th>
                    <th>Model</th>
                    <th className="text-right">In / Out</th>
                    <th className="text-right">When</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="status-dot status-success"></span></td>
                    <td className="model-cell">claude-sonnet-4.5</td>
                    <td className="text-right tokens-cell">
                      <span className="token-in">121,863↑</span>{' '}
                      <span className="token-out">43↓</span>
                    </td>
                    <td className="text-right time-cell">15s ago</td>
                  </tr>
                  <tr>
                    <td><span className="status-dot status-success"></span></td>
                    <td className="model-cell">claude-sonnet-4.5</td>
                    <td className="text-right tokens-cell">
                      <span className="token-in">121,638↑</span>{' '}
                      <span className="token-out">2,349↓</span>
                    </td>
                    <td className="text-right time-cell">47s ago</td>
                  </tr>
                  <tr>
                    <td><span className="status-dot status-success"></span></td>
                    <td className="model-cell">claude-sonnet-4.5</td>
                    <td className="text-right tokens-cell">
                      <span className="token-in">117,875↑</span>{' '}
                      <span className="token-out">35↓</span>
                    </td>
                    <td className="text-right time-cell">1m ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
