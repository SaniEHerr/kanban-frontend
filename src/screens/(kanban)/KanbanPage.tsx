import { BoardTitle } from "@/modules/kanban/components/BoardTitle"
import { Board } from "@/modules/kanban/components/Board"

export const KanbanPage = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <BoardTitle />

      <div className="flex items-center justify-start overflow-x-auto">
        <Board />
      </div>
    </div>
  )
}

export const Component = KanbanPage