import { Outlet } from 'react-router-dom'
import kanbanBg from '@/assets/kanban-bg.jpg'

export default function KanbanLayout() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${kanbanBg})` }}
      >
        <div className="absolute inset-0"></div>
      </div>

      <Outlet />
    </div>
  )
}
