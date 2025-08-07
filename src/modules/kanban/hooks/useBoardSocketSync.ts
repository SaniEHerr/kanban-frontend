import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { kanbanSocket } from "@/socket";

const BOARD_QUERY_KEY = ["board"];

export const useBoardSocketSync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const invalidate = () => {
      console.log("Evento socket recibido, invalidando board...");
      queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
    };

    const events = [
      "columnCreated",
      "columnUpdated",
      "columnDeleted",
      "cardCreated",
      "cardUpdated",
      "cardDeleted",
      "cardMoved",
      "cardsReorderedInColumn",
      "columnsReordered",
    ];

    events.forEach((event) => {
      kanbanSocket.on(event, (payload) => {
        console.log(`[Socket] Evento recibido: ${event}`, payload);
        invalidate();
      });
    });

    return () => {
      events.forEach((event) => kanbanSocket.off(event));
    };
  }, [queryClient]);
};
