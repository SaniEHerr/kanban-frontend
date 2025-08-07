import { useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, rectIntersection } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { DetailCardModal } from "@/modules/kanban/components/modals/DetailCardModal";
import { ConfirmDeleteCardModal } from "@/modules/kanban/components/modals/ConfirmDeleteCardModal";
import { AddColumn } from "@/modules/kanban/components/AddColumn";
import { KanbanDragOverlay } from "@/modules/kanban/components/KanbanDragOverlay";
import { ColumnList } from "@/modules/kanban/components/ColumnList";
import { SocketStatus } from "@/modules/kanban/components/SocketStatus";
import { emitWithErrorHandling } from "@/socket";
import { useQueryClient } from "@tanstack/react-query";
import type { Column } from "@/modules/kanban/interfaces";
import { toast } from "sonner";
import { useBoardSocketSync } from "@/modules/kanban/hooks/useBoardSocketSync";
import { useBoardDnD } from "@/modules/kanban/hooks/useBoardDnd";
import { useBoardData } from "../hooks/useBoardData";

export const Board = () => {
  const queryClient = useQueryClient();
  const sensors = useSensors(useSensor(PointerSensor));

  // UI states
  const [addingCardColumnId, setAddingCardColumnId] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  // Board Data
  const { columns, isLoading, error, allCards, selectedCard } = useBoardData(selectedCardId);

  // Drag and drop
  const { activeColumnId, activeCardId, handleDragStart, handleDragEnd } = useBoardDnD({ columns, queryClient });

  // Socket sync - Socket listener
  useBoardSocketSync();
  
  const handleAddColumn = (title: string) => {
    emitWithErrorHandling(
      "createColumn", 
      { title },
      () => {
        toast.success(`Column "${title}" created`);
      },
      (error) => {
        toast.error(`Error creating column: ${error.message}`);
      }
    );
  };

  const handleSaveCard = (title: string, description: string) => {
    if (!selectedCard) return;
  
    emitWithErrorHandling(
      "updateCard",
      { cardId: selectedCard._id, title, description },
      () => {
        queryClient.setQueryData(["board"], (prev: Column[] | undefined) =>
          prev?.map((col) => ({
            ...col,
            cards: col.cards.map((c) =>
              c._id === selectedCard._id ? { ...c, title, description } : c
            ),
          }))
        );
  
        toast.success("Card updated successfully");
        setIsDialogOpen(false);
      },
      (error) => {
        toast.error(`Error updating card: ${error.message}`);
      }
    );
  };

  const handleDeleteCard = () => {
    if (!selectedCard) return;
  
    emitWithErrorHandling(
      "deleteCard",
      { cardId: selectedCard._id },
      () => {
        toast.success("Card deleted successfully");
        setIsDeleteAlertOpen(false);
        setIsDialogOpen(false);
        setSelectedCardId(null);
      },
      (error) => {
        toast.error(`Error deleting card: ${error.message}`);
      }
    );
  };

  // Open card modal
  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
    setIsDialogOpen(true);
  };
  
  if (isLoading) {
    return <div className="text-white p-4">Loading board...</div>;
  }
  
  if (error) {
    return (
      <div className="text-white p-4 bg-red-500/20 rounded-lg">
        Error cargando el tablero: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="absolute bottom-4 left-4 z-50">
        <SocketStatus />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns.map((col: Column) => col._id)}
          strategy={horizontalListSortingStrategy}
        >
          <ColumnList
            columns={columns}
            activeColumnId={activeColumnId}
            addingCardColumnId={addingCardColumnId}
            setAddingCardColumnId={setAddingCardColumnId}
            onCardClick={handleCardClick}
          >
            <AddColumn onAdd={handleAddColumn} />
          </ColumnList>
        </SortableContext>

        <KanbanDragOverlay
          activeColumn={activeColumnId}
          activeCard={allCards.find((c) => c._id === activeCardId) || null}
          columns={columns}
        />
      </DndContext>

      <DetailCardModal
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        card={selectedCard}
        onSave={handleSaveCard}
        onRequestDelete={() => setIsDeleteAlertOpen(true)}
      />

      <ConfirmDeleteCardModal
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={handleDeleteCard}
      />
    </>
  );
};
