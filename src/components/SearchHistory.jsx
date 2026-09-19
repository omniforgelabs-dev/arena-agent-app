import React, { useState } from 'react';
import { Search, Filter, History, Clock, CheckCircle, ExternalLink, MessageSquare } from 'lucide-react';

export function SearchHistory({ history }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'TypeScript', 'Database', 'Fullstack'];

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.winner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.loser.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Arena Battle Search & History</h2>
            <p className="text-xs text-slate-400">
              Browse public agent battles, inspect tool call trajectories, and inspect community vote outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar & Category Chips */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter past battles by task prompt or agent..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-mono text-[10px]">
                  {item.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> {item.timestamp}
                </span>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                {item.votesCount} votes recorded
              </div>
            </div>

            <div className="py-3">
              <p className="text-sm font-medium text-slate-100 flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{item.prompt}</span>
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 font-mono">
                <div>
                  <span className="text-slate-500">Winner: </span>
                  <span className="text-emerald-400 font-bold">{item.winner}</span>
                </div>
                <div>
                  <span className="text-slate-500">Runner-up: </span>
                  <span className="text-slate-400">{item.loser}</span>
                </div>
              </div>

              <button className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                <span>View Full Trajectory Log</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
            No past arena battles match your search query.
          </div>
        )}
      </div>
    </div>
  );
}
