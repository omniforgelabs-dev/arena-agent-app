import React from 'react';
import { GitBranch, CheckCircle2, ShieldAlert } from 'lucide-react';

export function GitHubModal({ isOpen, onClose, connectedRepo, setConnectedRepo }) {
  if (!isOpen) return null;

  const handleConnect = (e) => {
    e.preventDefault();
    const repoInput = e.target.elements.repo.value.trim();
    if (repoInput) {
      setConnectedRepo(repoInput);
      onClose();
    }
  };

  const handleDisconnect = () => {
    setConnectedRepo(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-slate-800 rounded-lg text-indigo-400">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Connect GitHub Repository</h3>
            <p className="text-xs text-slate-400">Allow Agent to read issues, run PR workflows, and edit code</p>
          </div>
        </div>

        {connectedRepo ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-emerald-200">Currently Connected</p>
                <p className="text-xs text-emerald-400 font-mono">{connectedRepo}</p>
              </div>
            </div>

            <div className="text-xs text-slate-400 space-y-1 bg-slate-950 p-3 rounded border border-slate-800">
              <p>• Agent active permissions: read, branch creation, commit & PR.</p>
              <p>• Security sandbox: Isolated container runtimes.</p>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={handleDisconnect}
                className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg text-sm transition-colors border border-rose-800"
              >
                Disconnect
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConnect} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Repository Name (e.g., owner/repo)
              </label>
              <input
                type="text"
                name="repo"
                defaultValue="lmsys/arena-agent-bench"
                placeholder="org/repo-name"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>

            <div className="p-3 bg-indigo-950/30 border border-indigo-900/50 rounded-lg flex gap-2 items-start">
              <ShieldAlert className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-200">
                Arena Agent connects with OAuth fine-grained token permissions. No keys are persisted locally.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <GitBranch className="w-4 h-4" />
                Connect GitHub
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
