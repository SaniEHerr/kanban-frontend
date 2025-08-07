import { Column } from "@/modules/kanban/components/Column";
import type { Column as ColumnType } from "../interfaces";

interface ColumnListProps {
  columns: ColumnType[];
  activeColumnId: string | null;
  onCardClick: (cardId: string) => void;
  addingCardColumnId: string | null;
  setAddingCardColumnId: (id: string | null) => void;
  children?: React.ReactNode;
}

export const ColumnList = ({
  columns,
  activeColumnId,
  onCardClick,
  children,
  addingCardColumnId,
  setAddingCardColumnId,
}: ColumnListProps) => {
  return (
    <div className="flex flex-row gap-3 overflow-x-auto overflow-y-hidden p-4 h-full custom-scroll">
      {columns.map((col) => (
        <Column
          key={col._id}
          id={col._id}
          title={col.title}
          cards={col.cards}
          activeColumnId={activeColumnId}
          onCardClick={onCardClick}
          addingCardColumnId={addingCardColumnId}
          setAddingCardColumnId={setAddingCardColumnId}
        />
      ))}

      {children}
    </div>
  );
};
