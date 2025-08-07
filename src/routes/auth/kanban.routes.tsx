import { Pathnames } from '@/routes/pathNames'
import type { RouteObject } from 'react-router-dom'

export const KanbanRoutes = [
  {
    path: Pathnames.kanban.index,
    lazy: () => import('@/screens/(kanban)/KanbanPage'),
  },
] as RouteObject[]
