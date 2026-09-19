export const INITIAL_AGENTS = [
  {
    id: 'claude-3-5-sonnet-agent',
    name: 'Claude 3.5 Sonnet Agent',
    provider: 'Anthropic',
    elo: 1312,
    votes: 4520,
    winRate: '68.4%',
    codingScore: 94.2,
    reasoningScore: 92.8,
    toolUseScore: 95.1,
    badge: 'Top Coding',
    description: 'Autonomous software engineering agent with advanced code editing, repository navigation, and tool execution capabilities.'
  },
  {
    id: 'gpt-4o-agent',
    name: 'GPT-4o Agent',
    provider: 'OpenAI',
    elo: 1298,
    votes: 5120,
    winRate: '66.1%',
    codingScore: 91.5,
    reasoningScore: 93.4,
    toolUseScore: 92.0,
    badge: 'Popular',
    description: 'Multimodal agent excel in fast tool invocation, bash automation, and general instruction following.'
  },
  {
    id: 'deepseek-r1-agent',
    name: 'DeepSeek-R1 Agent',
    provider: 'DeepSeek',
    elo: 1305,
    votes: 3890,
    winRate: '67.2%',
    codingScore: 93.8,
    reasoningScore: 96.5,
    toolUseScore: 90.4,
    badge: 'Top Reasoning',
    description: 'Reasoning-heavy agent with extended chain-of-thought process for complex algorithmic and architecture problems.'
  },
  {
    id: 'llama-3-3-70b-agent',
    name: 'Llama 3.3 70B Agent',
    provider: 'Meta (Open Source)',
    elo: 1245,
    votes: 2840,
    winRate: '59.8%',
    codingScore: 88.0,
    reasoningScore: 87.2,
    toolUseScore: 86.5,
    badge: 'Open Source',
    description: 'High-performance open weights model fine-tuned for code synthesis and step-by-step terminal action execution.'
  },
  {
    id: 'qwen-2-5-coder-agent',
    name: 'Qwen 2.5 Coder 32B Agent',
    provider: 'Alibaba',
    elo: 1260,
    votes: 2110,
    winRate: '61.5%',
    codingScore: 92.1,
    reasoningScore: 86.0,
    toolUseScore: 89.2,
    badge: 'Efficient Code',
    description: 'Specialized code agent trained on massive open source repositories and agentic repair datasets.'
  },
  {
    id: 'gemini-1-5-pro-agent',
    name: 'Gemini 1.5 Pro Agent',
    provider: 'Google',
    elo: 1282,
    votes: 3410,
    winRate: '64.0%',
    codingScore: 90.1,
    reasoningScore: 91.0,
    toolUseScore: 93.5,
    badge: 'Long Context',
    description: 'Agent built for huge context windows, capable of processing entire codebases in single context passes.'
  }
];

export const MOCK_PRESET_BATTLES = [
  {
    id: 'battle-1',
    prompt: 'Refactor a React useEffect data fetching hook into a custom React Query / SWR clean abstraction with error boundaries and caching.',
    category: 'React / Frontend',
    agentA: {
      id: 'claude-3-5-sonnet-agent',
      name: 'Claude 3.5 Sonnet Agent',
      steps: [
        {
          type: 'thought',
          content: 'Analyzing existing React data-fetching patterns. We need to create a reusable `useUserData` hook using `@tanstack/react-query` with proper type definitions and an Error Boundary fallback.'
        },
        {
          type: 'tool',
          toolName: 'bash',
          command: 'npm list @tanstack/react-query',
          output: '├── @tanstack/react-query@5.28.4\n'
        },
        {
          type: 'thought',
          content: 'Writing the custom hook in `src/hooks/useUserData.ts` with strict TypeScript generics and loading state handling.'
        },
        {
          type: 'code',
          language: 'typescript',
          filename: 'src/hooks/useUserData.ts',
          content: `import { useQuery } from '@tanstack/react-query';\n\ninterface UserProfile {\n  id: string;\n  name: string;\n  email: string;\n}\n\nasync function fetchUserProfile(userId: string): Promise<UserProfile> {\n  const res = await fetch(\`/api/users/\${userId}\`);\n  if (!res.ok) throw new Error('Failed to load user profile');\n  return res.json();\n}\n\nexport function useUserData(userId: string) {\n  return useQuery({\n    queryKey: ['user', userId],\n    queryFn: () => fetchUserProfile(userId),\n    staleTime: 5 * 60 * 1000,\n    retry: 2,\n  });\n}`
        },
        {
          type: 'text',
          content: 'Created the optimized `useUserData` custom hook with automatic caching (5 min stale time), auto retries, and strongly-typed API response.'
        }
      ]
    },
    agentB: {
      id: 'gpt-4o-agent',
      name: 'GPT-4o Agent',
      steps: [
        {
          type: 'thought',
          content: 'Let us implement a custom hook abstraction using SWR for clean data fetching and mutate capabilities.'
        },
        {
          type: 'tool',
          toolName: 'python',
          command: 'python3 -c "import json; print(\'Hook structure verified\')"',
          output: 'Hook structure verified'
        },
        {
          type: 'code',
          language: 'javascript',
          filename: 'src/hooks/useUser.js',
          content: `import useSWR from 'swr';\n\nconst fetcher = (url) => fetch(url).then((res) => res.json());\n\nexport function useUser(id) {\n  const { data, error, isLoading } = useSWR(id ? \`/api/user/\${id}\` : null, fetcher);\n  return { user: data, isLoading, error };\n}`
        },
        {
          type: 'text',
          content: 'Here is the SWR implementation for clean reactive data fetching with automatic refetching on focus.'
        }
      ]
    }
  },
  {
    id: 'battle-2',
    prompt: 'Implement a thread-safe rate limiter class in Python using sliding window log algorithm with Redis background backend.',
    category: 'Backend / Algorithms',
    agentA: {
      id: 'deepseek-r1-agent',
      name: 'DeepSeek-R1 Agent',
      steps: [
        {
          type: 'thought',
          content: 'For sliding window rate limiting in Redis, atomic execution is critical to avoid race conditions. A Redis Lua script or pipeline using Sorted Sets (ZSET) timestamp scoring is the gold standard.'
        },
        {
          type: 'tool',
          toolName: 'python',
          command: 'cat << "EOF" > rate_limiter.py\nimport time\nimport redis\nEOF',
          output: 'File created.'
        },
        {
          type: 'code',
          language: 'python',
          filename: 'rate_limiter.py',
          content: `import time\nimport redis\n\nclass SlidingWindowRateLimiter:\n    def __init__(self, redis_client, max_requests: int, window_seconds: int):\n        self.r = redis_client\n        self.max_requests = max_requests\n        self.window = window_seconds\n\n    def is_allowed(self, user_id: str) -> bool:\n        key = f"rate_limit:{user_id}"\n        now = time.time()\n        clear_before = now - self.window\n        pipe = self.r.pipeline()\n        pipe.zremrangebyscore(key, 0, clear_before)\n        pipe.zcard(key)\n        pipe.zadd(key, {str(now): now})\n        pipe.expire(key, self.window + 1)\n        res = pipe.execute()\n        current_count = res[1]\n        return current_count < self.max_requests`
        },
        {
          type: 'text',
          content: 'Implemented thread-safe Redis sliding window rate limiter using Redis pipelines and ZSETs.'
        }
      ]
    },
    agentB: {
      id: 'llama-3-3-70b-agent',
      name: 'Llama 3.3 70B Agent',
      steps: [
        {
          type: 'thought',
          content: 'I will write an in-memory sliding window rate limiter first using Python threading Lock, then show Redis implementation.'
        },
        {
          type: 'code',
          language: 'python',
          filename: 'limiter.py',
          content: `import time\nfrom collections import deque\nfrom threading import Lock\n\nclass LocalRateLimiter:\n    def __init__(self, limit, window):\n        self.limit = limit\n        self.window = window\n        self.requests = deque()\n        self.lock = Lock()\n\n    def allow(self):\n        with self.lock:\n            now = time.time()\n            while self.requests and self.requests[0] <= now - self.window:\n                self.requests.popleft()\n            if len(self.requests) < self.limit:\n                self.requests.append(now)\n                return True\n            return False`
        },
        {
          type: 'text',
          content: 'Thread-safe in-memory rate limiter with lock protection.'
        }
      ]
    }
  }
];

export const MOCK_HISTORY = [
  {
    id: 'hist-1',
    prompt: 'Fix TypeScript strict null check error in recursive tree traversal helper',
    category: 'TypeScript',
    winner: 'Claude 3.5 Sonnet Agent',
    loser: 'GPT-4o Agent',
    timestamp: '10 minutes ago',
    votesCount: 142
  },
  {
    id: 'hist-2',
    prompt: 'Optimize PostgreSQL query execution plan with composite GIN index on JSONB field',
    category: 'Database',
    winner: 'DeepSeek-R1 Agent',
    loser: 'Gemini 1.5 Pro Agent',
    timestamp: '42 minutes ago',
    votesCount: 89
  },
  {
    id: 'hist-3',
    prompt: 'Build a full stack FastAPI authentication service with JWT and refresh token rotation',
    category: 'Fullstack',
    winner: 'GPT-4o Agent',
    loser: 'Llama 3.3 70B Agent',
    timestamp: '2 hours ago',
    votesCount: 310
  }
];
