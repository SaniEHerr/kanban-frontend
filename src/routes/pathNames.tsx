const AuthPaths = {
  logIn: '/log-in',
  signUp: '/sign-up',
} as const

const KanbanPaths = {
  index: '/',
} as const

export const Pathnames = {
  auth: AuthPaths,
  kanban: KanbanPaths,
} as const
