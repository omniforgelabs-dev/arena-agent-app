import React, { useState } from 'react';
import { Trophy, Award, Flame, Code, Brain, Wrench, Search, X, CheckCircle } from 'lucide-react';

export function Leaderboard({ agents }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalAgent, setActiveModalAgent] = useState(null);

  // Filter and sort agents by ELO
  const filteredAgents = agents
    .filter((agent) => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => b.elo - a.elo);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Agent Leaderboard & Benchmarks</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Crowdsourced Elo benchmark ranking autonomous LLM agents across code generation, tool usage, terminal execution, and multi-step reasoning tasks.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1.5 rounded-xl">
            <span className="text-xs font-mono text-slate-400 px-2">Total Votes:</span>
            <span className="text-sm font-bold font-mono text-indigo-400">21,890+</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'Overall Elo', icon: Trophy },
            { id: 'coding', label: 'Coding', icon: Code },
            { id: 'reasoning', label: 'Reasoning', icon: Brain },
            { id: 'tool', label: 'Tool Execution', icon: Wrench },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agent model..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 text-center w-12">Rank</th>
                <th className="py-3.5 px-4">Agent Model</th>
                <th className="py-3.5 px-4">Provider</th>
                <th className="py-3.5 px-4 text-center">Elo Score</th>
                <th className="py-3.5 px-4 text-center">Win Rate</th>
                <th className="py-3.5 px-4 text-center">Coding</th>
                <th className="py-3.5 px-4 text-center">Reasoning</th>
                <th className="py-3.5 px-4 text-center">Tool Use</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAgents.map((agent, idx) => (
                <tr key={agent.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 text-center font-bold font-mono">
                    {idx === 0 && <span className="text-amber-400 text-base">🥇 1</span>}
                    {idx === 1 && <span className="text-slate-300 text-base">🥈 2</span>}
                    {idx === 2 && <span className="text-amber-600 text-base">🥉 3</span>}
                    {idx > 2 && <span className="text-slate-500">#{idx + 1}</span>}
                  </td>

                  <td className="py-4 px-4 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span>{agent.name}</span>
                      {agent.badge && (
                        <span className="bg-indigo-950 text-indigo-400 border border-indigo-800 px-2 py-0.5 rounded-full text-[10px] font-mono">
                          {agent.badge}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-slate-400 font-medium">{agent.provider}</td>

                  <td className="py-4 px-4 text-center font-bold font-mono text-indigo-400 text-sm">
                    {agent.elo}
                  </td>

                  <td className="py-4 px-4 text-center font-mono text-slate-200">
                    {agent.winRate}
                  </td>

                  <td className="py-4 px-4 text-center font-mono text-slate-300">
                    {agent.codingScore}
                  </td>

                  <td className="py-4 px-4 text-center font-mono text-slate-300">
                    {agent.reasoningScore}
                  </td>

                  <td className="py-4 px-4 text-center font-mono text-slate-300">
                    {agent.toolUseScore}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setActiveModalAgent(agent)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium text-[11px] transition-colors"
                    >
                      View Specs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent Spec Modal */}
      {activeModalAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setActiveModalAgent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{activeModalAgent.name}</h3>
                <p className="text-xs text-slate-400">Provider: {activeModalAgent.provider}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4 leading-relaxed">
              {activeModalAgent.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400">Elo Score</p>
                <p className="text-lg font-bold font-mono text-indigo-400">{activeModalAgent.elo}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400">Total Battles</p>
                <p className="text-lg font-bold font-mono text-emerald-400">{activeModalAgent.votes}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-semibold text-slate-300">Benchmark Breakdown:</h4>
              <div className="space-y-1.5 font-mono">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Coding Capabilities</span>
                    <span>{activeModalAgent.codingScore}/100</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${activeModalAgent.codingScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Multi-step Reasoning</span>
                    <span>{activeModalAgent.reasoningScore}/100</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${activeModalAgent.reasoningScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Terminal / Tool Execution</span>
                    <span>{activeModalAgent.toolUseScore}/100</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${activeModalAgent.toolUseScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalAgent(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
