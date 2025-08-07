import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/core/ui/dropdown-menu";

interface ColumnDropdownMenuProps {
  onDeleteClick: () => void;
}

export const ColumnDropdownMenu = ({ onDeleteClick }: ColumnDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center hover:bg-white/20 rounded-full p-0.5 transition-all duration-150 cursor-pointer">
          <Ellipsis className="size-4 text-white" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit bg-[#2f272a]/95 text-white border border-white/10">
        <DropdownMenuItem
          className="focus:bg-red-600/70 cursor-pointer focus:text-white transition-all duration-150"
          onClick={onDeleteClick}
        >
          Delete column
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
