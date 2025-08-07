import { Column } from "@/modules/kanban/components/Column";
import { DragOverlay } from "@dnd-kit/core";
import type { Card, Column as ColumnType } from "@/modules/kanban/interfaces";

interface KanbanDragOverlayProps {
  activeColumn: string | null;
  activeCard: Card | null;
  columns: ColumnType[];
}

export const KanbanDragOverlay = ({
  activeColumn,
  activeCard,
  columns,
}: KanbanDragOverlayProps) => {
  if (!activeColumn && !activeCard) return null;

  return (
    <DragOverlay>
      {activeColumn ? (
        <Column
          addingCardColumnId={null}
          setAddingCardColumnId={() => {}}
          id={activeColumn}
          title={columns.find((c) => c._id === activeColumn)?.title || ""}
          cards={columns.find((c) => c._id === activeColumn)?.cards || []}
          activeColumnId={null}
        />
      ) : activeCard ? (
        <div
          className="bg-[#2f3136] p-3 rounded-xl text-white shadow-2xl border border-white/10 transform scale-105 rotate-1 transition-transform duration-150 ease-out pointer-events-none"
          style={{ boxShadow: "0 12px 28px rgba(0,0,0,0.6)" }}
        >
          {activeCard.title}
        </div>
      ) : null}
    </DragOverlay>
  );
};
