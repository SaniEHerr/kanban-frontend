import { useQuery } from "@tanstack/react-query";
import { getBoard } from "@/modules/kanban/services";
import type { Column } from "@/modules/kanban/interfaces";

export const useBoardData = (selectedCardId: string | null) => {
  const { data: columns = [], isLoading, error } = useQuery<Column[]>({
    queryKey: ["board"],
    queryFn: getBoard,
    staleTime: 30000,
    retry: 3,
  });

  const allCards = columns.flatMap((c) => c.cards || []);
  const selectedCard = allCards.find((c) => c._id === selectedCardId) || null;

  return {
    columns,
    isLoading,
    error,
    allCards,
    selectedCard,
  };
};
