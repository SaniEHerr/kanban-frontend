import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface CardProps {
  id: string;
  title: string;
  columnId: string;
  onClick: () => void;
}

export const Card = ({ id, title, onClick, columnId }: CardProps) => {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    attributes,
    listeners,
  } = useSortable({ 
    id, 
    data: { type: "card", columnId }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 150ms ease",
    opacity: isDragging ? 0.2 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[#2f3136] p-3 rounded-lg border border-white/10 text-white text-sm shadow-sm hover:shadow-md hover:border-white/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer flex justify-between items-start gap-2"
      onClick={onClick}
    >
      <div className="flex-1">{title}</div>

      <div
        {...listeners}
        {...attributes}
        onClick={(e) => e.stopPropagation()}
        className="text-white/60 hover:text-white cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="size-4" />
      </div>
    </div>
  );
};
