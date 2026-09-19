import React from 'react';
import { Bot, Trophy, Search, MessageSquarePlus, GitBranch, Sparkles } from 'lucide-react';

export function Header({ activeTab, setActiveTab, connectedRepo, onOpenGithubModal, mode, setMode }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('chat')}>
            <div className="p-2 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">Arena.ai</span>
                <span className="text-xs bg-indigo-500/20 text-indigo-400 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30">
                  AGENT
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">EXPERIENCE THE FRONTIER</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="hidden md:flex bg-slate-900 border border-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setMode('battle')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                mode === 'battle'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Arena Battle (Blind)
            </button>
            <button
              onClick={() => setMode('single')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                mode === 'single'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Direct Agent Chat
            </button>
          </div>
        </div>

        {/* Center Nav Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'chat'
                ? 'bg-slate-800 text-white border border-slate-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <MessageSquarePlus className="w-4 h-4 text-indigo-400" />
            <span>New Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-slate-800 text-white border border-slate-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'search'
                ? 'bg-slate-800 text-white border border-slate-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Search</span>
          </button>
        </nav>

        {/* Right Action Button: GitHub Connect */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGithubModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              connectedRepo
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>{connectedRepo ? connectedRepo : 'Connect GitHub'}</span>
            {!connectedRepo && (
              <span className="bg-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                NEW
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
