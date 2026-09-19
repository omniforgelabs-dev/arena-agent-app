import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ArenaChat } from './ArenaChat';
import { INITIAL_AGENTS, MOCK_PRESET_BATTLES } from '../data/mockData';

describe('ArenaChat Component', () => {
  it('renders blind battle view and reveals identities on vote', () => {
    const setAgentsMock = vi.fn();

    render(
      <ArenaChat
        mode="battle"
        agents={INITIAL_AGENTS}
        setAgents={setAgentsMock}
        presetBattles={MOCK_PRESET_BATTLES}
        connectedRepo={null}
      />
    );

    // Initial state should say Agent A and Agent B
    expect(screen.getByText('Agent A')).toBeInTheDocument();
    expect(screen.getByText('Agent B')).toBeInTheDocument();

    // Click vote A button
    const voteBtn = screen.getByText('👈 Agent A is Better');
    fireEvent.click(voteBtn);

    // Elo update function should have been called
    expect(setAgentsMock).toHaveBeenCalled();

    // Revealed identity message should appear
    expect(screen.getByText('Identity Revealed & ELO Updated')).toBeInTheDocument();
  });
});
