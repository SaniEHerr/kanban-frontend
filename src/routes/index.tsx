import { createBrowserRouter } from 'react-router-dom'

import AuthLayout from '@/layout/auth.layout'
import KanbanLayout from '@/layout/kanban.layout'

import { AuthRoutes } from '@/routes/auth/auth.routes'
import { KanbanRoutes } from '@/routes/auth/kanban.routes'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: AuthRoutes,
  },
  {
    element: <KanbanLayout />,
    children: KanbanRoutes,
  },
  {
    path: '*',
    lazy: () => import('@/screens/404'),
  },
])
