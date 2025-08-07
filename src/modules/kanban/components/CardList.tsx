import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/modules/kanban/interfaces";
import { Card } from "@/modules/kanban/components/Card";

interface CardListProps {
  cards: CardType[];
  onCardClick?: (cardId: string) => void;
  columnId: string;
}

export const CardList = ({ cards, onCardClick, columnId }: CardListProps) => {
  const isEmpty = cards.length === 0;

  const { setNodeRef, transform, transition } = useSortable({
    id: `empty-${columnId}`,
    disabled: !isEmpty,
    data: {
      type: "empty-placeholder",
      columnId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="flex flex-col gap-2 px-2 py-3 overflow-y-auto flex-grow custom-scroll min-h-[40px]">
      {isEmpty ? (
        <div
          ref={setNodeRef}
          style={style}
          className="h-16 flex items-center justify-center rounded-lg border-2 border-white/10 text-white/40 text-sm text-center px-2"
        >
          Drop a card here or create a new one
        </div>
      ) : (
        cards.map((card) => (
          <Card
            key={card._id}
            id={card._id}
            title={card.title}
            columnId={columnId}
            onClick={() => onCardClick?.(card._id)}
          />
        ))
      )}
    </div>
  );
};
