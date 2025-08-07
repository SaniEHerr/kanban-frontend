import { useState } from "react";
import { Button } from "@/modules/core/ui/button";
import { PlusIcon } from "lucide-react";

interface AddColumnProps {
  onAdd: (title: string) => void;
}

export const AddColumn = ({ onAdd }: AddColumnProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
    setIsAdding(false);
  };

  return isAdding ? (
    <div className="flex flex-col gap-2 bg-[#2f272a]/95 p-3 rounded-xl border border-white/10 min-w-[272px] h-fit">
      <input
        type="text"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="px-3 py-2 rounded-md bg-[#2f3136] text-white text-sm outline-none hover:shadow-[0_0_0_1.5px_#ffffff] placeholder:text-white/40 transition-all duration-150"
        placeholder="Enter a column name"
      />
      <div className="flex gap-2">
        <Button
          className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer"
          size="sm"
          onClick={handleAdd}
        >
          Add column
        </Button>
        <Button
          className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm font-medium rounded-md shadow-sm transition-all duration-150 cursor-pointer"
          size="sm"
          onClick={() => setIsAdding(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  ) : (
    <Button
      onClick={() => setIsAdding(true)}
      className="flex items-center justify-center gap-2 w-[272px] h-fit px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white hover:text-white border border-white/10 transition-all duration-200 cursor-pointer"
    >
      <PlusIcon className="size-4" />
      Add another column
    </Button>
  );
};
