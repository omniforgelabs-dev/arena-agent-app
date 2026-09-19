import React, { useState } from 'react';
import { Header } from './components/Header';
import { GitHubModal } from './components/GitHubModal';
import { ArenaChat } from './components/ArenaChat';
import { Leaderboard } from './components/Leaderboard';
import { SearchHistory } from './components/SearchHistory';
import { INITIAL_AGENTS, MOCK_PRESET_BATTLES, MOCK_HISTORY } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'leaderboard' | 'search'
  const [mode, setMode] = useState('battle'); // 'battle' | 'single'
  const [connectedRepo, setConnectedRepo] = useState(null);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [history, setHistory] = useState(MOCK_HISTORY);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        connectedRepo={connectedRepo}
        onOpenGithubModal={() => setIsGithubModalOpen(true)}
        mode={mode}
        setMode={setMode}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col">
        {activeTab === 'chat' && (
          <ArenaChat
            mode={mode}
            agents={agents}
            setAgents={setAgents}
            presetBattles={MOCK_PRESET_BATTLES}
            connectedRepo={connectedRepo}
          />
        )}

        {activeTab === 'leaderboard' && <Leaderboard agents={agents} />}

        {activeTab === 'search' && <SearchHistory history={history} />}
      </main>

      <GitHubModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
        connectedRepo={connectedRepo}
        setConnectedRepo={setConnectedRepo}
      />
    </div>
  );
}
