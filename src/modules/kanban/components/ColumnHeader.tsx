import { GripVertical } from "lucide-react";
import { ColumnDropdownMenu } from "@/modules/kanban/components/ColumnDropdownMenu";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";


interface ColumnHeaderProps {
  title: string;
  isEditing: boolean;
  onStartEditing: () => void;
  onChangeTitle: (value: string) => void;
  onSaveTitle: () => void;
  onDeleteClick: () => void;
  listeners?: SyntheticListenerMap;
  attributes: DraggableAttributes;
}

export const ColumnHeader = ({
  title,
  isEditing,
  onStartEditing,
  onChangeTitle,
  onSaveTitle,
  onDeleteClick,
  listeners,
  attributes,
}: ColumnHeaderProps) => {
  return (
    <div className="px-4 py-3 border-b border-white/10 flex flex-row items-center justify-between gap-2">
      <div {...listeners} {...attributes}>
        <GripVertical className="size-4 text-white cursor-grab active:cursor-grabbing" />
      </div>

      {isEditing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          onBlur={onSaveTitle}
          onKeyDown={(e) => e.key === "Enter" && onSaveTitle()}
          className="w-full bg-transparent border border-white/20 rounded px-2 py-1 text-white text-base outline-none focus:border-emerald-500"
        />
      ) : (
        <h2
          className="text-white font-semibold text-base w-full cursor-pointer border border-transparent py-1"
          onClick={onStartEditing}
        >
          {title}
        </h2>
      )}

      <ColumnDropdownMenu onDeleteClick={onDeleteClick} />

      <p></p>
    </div>
  );
};
