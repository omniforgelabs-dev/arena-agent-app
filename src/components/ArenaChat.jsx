import React, { useState } from 'react';
import {
  Send,
  Terminal,
  Code2,
  Brain,
  ThumbsUp,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Bot,
  Play,
  Cpu,
  Layers
} from 'lucide-react';
import { calculateElo } from '../utils/elo';

export function ArenaChat({ mode, agents, setAgents, presetBattles, connectedRepo }) {
  const [prompt, setPrompt] = useState('');
  const [activeBattleIndex, setActiveBattleIndex] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voteResult, setVoteResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSingleAgent, setSelectedSingleAgent] = useState(agents[0].id);

  // Tools toggle state for Direct Single Agent Chat
  const [toolsEnabled, setToolsEnabled] = useState({
    bash: true,
    python: true,
    github: true,
    search: true
  });

  const currentPreset = presetBattles[activeBattleIndex];

  const handleSendPrompt = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setVoted(false);
      setVoteResult(null);
    }, 1200);
  };

  const handleVote = (outcome) => {
    if (voted) return;

    const agentAObj = agents.find((a) => a.id === currentPreset.agentA.id) || agents[0];
    const agentBObj = agents.find((a) => a.id === currentPreset.agentB.id) || agents[1];

    const { newRatingA, newRatingB, changeA, changeB } = calculateElo(
      agentAObj.elo,
      agentBObj.elo,
      outcome
    );

    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === agentAObj.id) return { ...a, elo: newRatingA, votes: a.votes + 1 };
        if (a.id === agentBObj.id) return { ...a, elo: newRatingB, votes: a.votes + 1 };
        return a;
      })
    );

    setVoted(true);
    setVoteResult({
      outcome,
      agentA: agentAObj,
      agentB: agentBObj,
      changeA,
      changeB,
      newRatingA,
      newRatingB
    });
  };

  const handleNextBattle = () => {
    setVoted(false);
    setVoteResult(null);
    setActiveBattleIndex((prev) => (prev + 1) % presetBattles.length);
    setPrompt('');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls / Quick Preset Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            {mode === 'battle' ? 'Side-by-Side Blind Agent Battle' : 'Direct Agent Workbench'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {mode === 'battle'
              ? 'Evaluate agent reasoning, tool invocation steps, and code output side-by-side without bias.'
              : 'Interact directly with a specific agent, enable/disable tools, and execute codebase commands.'}
          </p>
        </div>

        {mode === 'battle' ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Battle Preset:</span>
            <button
              onClick={handleNextBattle}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Next Scenario ({activeBattleIndex + 1}/{presetBattles.length})
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-400 font-medium">Select Agent:</label>
            <select
              value={selectedSingleAgent}
              onChange={(e) => setSelectedSingleAgent(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs font-medium text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500"
            >
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} (Elo: {agent.elo})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Connected Repo Alert Banner */}
      {connectedRepo && (
        <div className="bg-indigo-950/40 border border-indigo-800/60 rounded-xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-indigo-200">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>
              Active Repo Context: <strong className="font-mono text-white">{connectedRepo}</strong>
            </span>
          </div>
          <span className="bg-indigo-900/80 text-indigo-300 px-2 py-0.5 rounded font-mono text-[10px]">
            SANDBOX MOUNTED
          </span>
        </div>
      )}

      {/* Main Prompt Input Box */}
      <form onSubmit={handleSendPrompt} className="relative">
        <div className="relative bg-slate-900 border border-slate-800 focus-within:border-indigo-500/80 rounded-2xl shadow-xl overflow-hidden transition-all">
          <textarea
            value={prompt || currentPreset.prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask the Agent to write code, debug an issue, or refactor a component..."
            className="w-full bg-transparent px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none min-h-[90px]"
          />

          {mode === 'single' && (
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/50 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-400 font-medium">Tools Enabled:</span>
              <div className="flex items-center gap-2">
                {Object.keys(toolsEnabled).map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() =>
                      setToolsEnabled((prev) => ({ ...prev, [tool]: !prev[tool] }))
                    }
                    className={`px-2 py-1 rounded font-mono text-[11px] transition-colors border ${
                      toolsEnabled[tool]
                        ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700/80'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                  >
                    {toolsEnabled[tool] ? '✓' : '✗'} {tool}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Multi-step Agent Execution Environment</span>
            </div>
            <button
              type="submit"
              disabled={isGenerating}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-md"
            >
              {isGenerating ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" />
                  Agents Thinking...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Run Agent Battle
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* BATTLE MODE DISPLAY */}
      {mode === 'battle' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agent A Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-950 text-indigo-400 rounded-lg">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-white text-sm">
                      {voted ? currentPreset.agentA.name : 'Agent A'}
                    </span>
                  </div>
                  {voted && (
                    <span className="text-xs bg-indigo-950 text-indigo-300 font-mono px-2 py-0.5 rounded border border-indigo-800">
                      Elo: {voteResult.newRatingA} ({voteResult.changeA})
                    </span>
                  )}
                </div>

                {/* Steps Trace */}
                <div className="py-4 space-y-3">
                  {currentPreset.agentA.steps.map((step, i) => (
                    <RenderStep key={i} step={step} />
                  ))}
                </div>
              </div>
            </div>

            {/* Agent B Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-950 text-purple-400 rounded-lg">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-white text-sm">
                      {voted ? currentPreset.agentB.name : 'Agent B'}
                    </span>
                  </div>
                  {voted && (
                    <span className="text-xs bg-purple-950 text-purple-300 font-mono px-2 py-0.5 rounded border border-purple-800">
                      Elo: {voteResult.newRatingB} ({voteResult.changeB})
                    </span>
                  )}
                </div>

                {/* Steps Trace */}
                <div className="py-4 space-y-3">
                  {currentPreset.agentB.steps.map((step, i) => (
                    <RenderStep key={i} step={step} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Voting Action Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <h3 className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {voted ? 'Identity Revealed & ELO Updated' : 'Vote to Reveal Model Identities'}
            </h3>

            {!voted ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handleVote('A')}
                  className="py-2.5 px-4 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800 text-indigo-200 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow"
                >
                  <ThumbsUp className="w-4 h-4 text-indigo-400" />
                  👈 Agent A is Better
                </button>
                <button
                  onClick={() => handleVote('B')}
                  className="py-2.5 px-4 bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-200 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow"
                >
                  <ThumbsUp className="w-4 h-4 text-purple-400" />
                  👉 Agent B is Better
                </button>
                <button
                  onClick={() => handleVote('tie')}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all"
                >
                  🤝 Tie / Equal
                </button>
                <button
                  onClick={() => handleVote('both_bad')}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all"
                >
                  👎 Both Bad
                </button>
              </div>
            ) : (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-2">
                <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span>Vote Registered! Ratings recalculated using standard Elo algorithm.</span>
                </div>
                <div className="flex justify-center gap-6 text-xs text-slate-300 font-mono pt-1">
                  <p>
                    Agent A ({voteResult.agentA.name}):{' '}
                    <span className="text-emerald-400">{voteResult.newRatingA}</span> ({voteResult.changeA})
                  </p>
                  <p>
                    Agent B ({voteResult.agentB.name}):{' '}
                    <span className="text-emerald-400">{voteResult.newRatingB}</span> ({voteResult.changeB})
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleNextBattle}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition-colors"
                  >
                    Try Next Battle Scenario
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DIRECT SINGLE AGENT MODE DISPLAY */}
      {mode === 'single' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-white text-base">
                {agents.find((a) => a.id === selectedSingleAgent)?.name}
              </span>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
              Active Agent Mode
            </span>
          </div>

          <div className="space-y-3">
            {currentPreset.agentA.steps.map((step, i) => (
              <RenderStep key={i} step={step} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Step Renderer Helper
function RenderStep({ step }) {
  if (step.type === 'thought') {
    return (
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 space-y-1">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <Brain className="w-3.5 h-3.5" />
          <span>Thought Process</span>
        </div>
        <p className="italic text-slate-400 pl-2 border-l-2 border-amber-500/40">{step.content}</p>
      </div>
    );
  }

  if (step.type === 'tool') {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden text-xs">
        <div className="bg-slate-900/90 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-indigo-300">
            <Terminal className="w-3.5 h-3.5" />
            <span>Tool Invocation: [{step.toolName}]</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">EXIT CODE 0</span>
        </div>
        <div className="p-2.5 font-mono text-[11px]">
          <div className="text-slate-200 font-bold">$ {step.command}</div>
          <pre className="text-slate-400 mt-1 whitespace-pre-wrap">{step.output}</pre>
        </div>
      </div>
    );
  }

  if (step.type === 'code') {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden text-xs">
        <div className="bg-slate-900/90 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-white font-medium">{step.filename || 'snippet'}</span>
          </div>
          <span className="text-[10px] uppercase">{step.language}</span>
        </div>
        <pre className="p-3 font-mono text-[11px] text-slate-200 overflow-x-auto bg-slate-950">
          <code>{step.content}</code>
        </pre>
      </div>
    );
  }

  if (step.type === 'text') {
    return (
      <div className="p-3 text-xs text-slate-200 bg-slate-900/50 rounded-xl border border-slate-800/50">
        {step.content}
      </div>
    );
  }

  return null;
}
