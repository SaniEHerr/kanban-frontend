import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-[1240px] mx-auto">
      <Outlet />
    </div>
  )
}
