import { Button } from "@/modules/core/ui/button";
import { PlusIcon } from "lucide-react";

interface AddCardButtonProps {
  onAddCardClick: () => void;
}

export const AddCardButton = ({ onAddCardClick }: AddCardButtonProps) => {
  return (
    <div className="px-2 py-2 border-t border-white/10 flex-shrink-0">
      <Button
        onClick={onAddCardClick}
        className="flex items-center justify-center gap-2 w-full rounded-md bg-white/5 hover:bg-white/10 text-white hover:text-white transition-all duration-200 cursor-pointer"
      >
        <PlusIcon className="size-4" />
        Add a card
      </Button>
    </div>
  );
};
