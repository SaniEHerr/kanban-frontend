import { Pathnames } from '@/routes/pathNames'
import type { RouteObject } from 'react-router-dom'

export const AuthRoutes = [
  {
    path: Pathnames.auth.logIn,
    lazy: () => import('@/screens/(auth)/LogInPage'),
  },

  {
    path: Pathnames.auth.signUp,
    lazy: () => import('@/screens/(auth)/SignUpPage'),
  },
] as RouteObject[]
