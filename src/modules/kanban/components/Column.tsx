import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import { ConfirmDeleteColumnModal } from "@/modules/kanban/components/modals/ConfirmDeleteColumnModal";
import { AddCardButton } from "@/modules/kanban/components/AddCardButton";
import { AddCardForm } from "@/modules/kanban/components/AddCard";
import { CardList } from "@/modules/kanban/components/CardList";
import { ColumnHeader } from "@/modules/kanban/components/ColumnHeader";
import type { Card } from "@/modules/kanban/interfaces";
import { emitWithErrorHandling } from "@/socket";
import { toast } from "sonner";

interface ColumnProps {
  id: string;
  title: string;
  cards?: Card[];
  activeColumnId: string | null;
  onCardClick?: (cardId: string) => void;
  addingCardColumnId: string | null;
  setAddingCardColumnId: (id: string | null) => void;
}

export const Column = ({ id, title, cards, onCardClick, addingCardColumnId, setAddingCardColumnId }: ColumnProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  useEffect(() => {
    setTempTitle(title);
  }, [title]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform ? "transform 250ms ease" : undefined,
    width: "272px",
    opacity: isDragging ? 0.5 : 1,
  };

  const isAddingCard = addingCardColumnId === id;

  const handleAddCard = (title: string) => {
    if (!title.trim()) return;
    
    emitWithErrorHandling(
      "createCard", 
      { title, columnId: id },
      () => {
        toast.success(`Card "${title}" created`);
      },
      (error) => {
        toast.error(`Error creating card: ${error.message}`);
      }
    );
  };

  const handleConfirmDelete = () => {
    emitWithErrorHandling(
      "deleteColumn", 
      { id },
      () => {
        toast.success(`Column "${title}" deleted`);
        setIsAlertOpen(false);
      },
      (error) => {
        toast.error(`Error deleting column: ${error.message}`);
      }
    );
  };

  const handleTitleSave = () => {
    const trimmed = tempTitle.trim();
    setIsEditingTitle(false);

    if (!trimmed || trimmed === title) return;

    emitWithErrorHandling(
      "updateColumnTitle", 
      { id, title: trimmed },
      () => {
        toast.success(`Column title updated to "${trimmed}"`);
      },
      (error) => {
        toast.error(`Error updating column title: ${error.message}`);
        setTempTitle(title);
      }
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col bg-[#2f272a]/95 rounded-xl shadow-lg border border-white/10 hover:shadow-xl max-h-full xl:max-h-[75vh] min-w-[272px] h-fit"
    >
      <ColumnHeader
        title={tempTitle}
        isEditing={isEditingTitle}
        onStartEditing={() => {
          setIsEditingTitle(true);
        }}
        onChangeTitle={setTempTitle}
        onSaveTitle={handleTitleSave}
        onDeleteClick={() => setIsAlertOpen(true)}
        listeners={listeners}
        attributes={attributes}
      />

      <SortableContext items={cards?.map(card => card._id) || []} strategy={verticalListSortingStrategy}>
        <CardList cards={cards || []} onCardClick={onCardClick} columnId={id} />
      </SortableContext>

      {isAddingCard ? (
        <AddCardForm 
          onAdd={handleAddCard} 
          onCancel={() => setAddingCardColumnId(null)} 
        />
      ) : (
        <AddCardButton onAddCardClick={() => setAddingCardColumnId(id)} />
      )}

      <ConfirmDeleteColumnModal
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
