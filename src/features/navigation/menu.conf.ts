export const menu = [
  { key: 'navigation.fleet', to: '/fleet', icon: 'fleet', auth: true },
  { key: 'navigation.systems', to: '/systems', icon: 'systems', auth: false },
  { key: 'navigation.contracts', to: '/contracts', icon: 'contracts', auth: true },
  { key: 'navigation.surveys', to: '/surveys', icon: 'surveys', auth: true },
  { key: 'divider', divider: true },
  { key: 'navigation.leaderboard', to: '/leaderboard', icon: 'leaderboard', auth: false },
  { key: 'navigation.agents', to: '/agents', icon: 'agents', auth: false },
] as const
