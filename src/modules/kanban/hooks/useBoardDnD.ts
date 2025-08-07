import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { toast } from "sonner";
import { emitWithErrorHandling } from "@/socket";
import type { Column } from "@/modules/kanban/interfaces";
import { QueryClient } from "@tanstack/react-query";

interface UseBoardDnDProps {
  columns: Column[];
  queryClient: QueryClient;
}

export const useBoardDnD = ({ columns, queryClient }: UseBoardDnDProps) => {
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [activeCardColumnId, setActiveCardColumnId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (active.data?.current?.type === "card") {
      setActiveCardId(active.id as string);
      setActiveCardColumnId(active.data.current.columnId);
    } else {
      setActiveColumnId(active.id as string);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveColumnId(null);
    setActiveCardId(null);
    setActiveCardColumnId(null);

    if (!over) return;

    if (active.data?.current?.type === "card") {
      const sourceColumnId = active.data.current.columnId;
      const targetColumnId = over.data?.current?.columnId;
      if (!sourceColumnId || !targetColumnId) return;

      if (sourceColumnId === targetColumnId) {
        const column = columns.find((c) => c._id === sourceColumnId);
        if (!column) return;

        const oldIndex = column.cards.findIndex((c) => c._id === active.id);
        const newIndex = column.cards.findIndex((c) => c._id === over.id);

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

        const reordered = arrayMove(column.cards, oldIndex, newIndex);

        queryClient.setQueryData(["board"], (prev: Column[] | undefined) =>
          prev
            ? prev.map((c) => (c._id === column._id ? { ...c, cards: reordered } : c))
            : prev
        );

        emitWithErrorHandling(
          "reorderCardsInColumn",
          {
            columnId: sourceColumnId,
            cards: reordered.map((c, idx) => ({ id: c._id, order: idx })),
          },
          () => toast.success("Cards reordered"),
          (error) => toast.error(`Error reordering cards: ${error.message}`)
        );

        return;
      }

      const sourceColumn = columns.find((c) => c._id === sourceColumnId);
      const targetColumn = columns.find((c) => c._id === targetColumnId);
      if (!sourceColumn || !targetColumn) return;

      const sourceCards = sourceColumn.cards.filter((c) => c._id !== active.id);
      const targetCards = [...targetColumn.cards];
      const targetIndex = targetCards.findIndex((c) => c._id === over.id);
      const insertIndex = targetIndex === -1 ? targetCards.length : targetIndex;

      const movedCard = sourceColumn.cards.find((c) => c._id === active.id);
      if (!movedCard) return;

      targetCards.splice(insertIndex, 0, movedCard);

      queryClient.setQueryData(["board"], (prev: Column[] | undefined) =>
        prev
          ? prev.map((c) => {
              if (c._id === sourceColumnId) return { ...c, cards: sourceCards };
              if (c._id === targetColumnId) return { ...c, cards: targetCards };
              return c;
            })
          : prev
      );

      emitWithErrorHandling(
        "moveCard",
        {
          cardId: active.id,
          sourceColumnId,
          targetColumnId,
          targetIndex: insertIndex,
        },
        () => toast.success("Card moved successfully"),
        (error) => toast.error(`Error moving card: ${error.message}`)
      );

      return;
    }

    if (active.id === over.id) return;

    const oldIndex = columns.findIndex((c) => c._id === active.id);
    const newIndex = columns.findIndex((c) => c._id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(columns, oldIndex, newIndex);
    queryClient.setQueryData(["board"], reordered);

    emitWithErrorHandling(
      "reorderColumns",
      reordered.map((col, idx) => ({ id: col._id, order: idx })),
      () => toast.success("Columns reordered successfully"),
      (error) => {
        toast.error(`Error reordering columns: ${error.message}`);
        queryClient.setQueryData(["board"], columns);
      }
    );
  };

  return {
    activeColumnId,
    activeCardId,
    activeCardColumnId,
    handleDragStart,
    handleDragEnd,
  };
};
