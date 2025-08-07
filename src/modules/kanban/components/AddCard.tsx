import { useState } from "react";
import { Button } from "@/modules/core/ui/button";

interface AddCardFormProps {
  onAdd: (title: string) => void;
  onCancel: () => void;
}

export const AddCardForm = ({ onAdd, onCancel }: AddCardFormProps) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <div className="flex flex-col gap-2 bg-white/5 p-2 rounded-md border border-white/10">
      <input
        type="text"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="px-3 py-2 rounded-md bg-[#2f3136] text-white text-sm outline-none hover:shadow-[0_0_0_1.5px_#ffffff] placeholder:text-white/40 transition-all duration-150"
        placeholder="Enter a title for this card"
      />
      <div className="flex gap-2">
        <Button
          className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer"
          size="sm"
          onClick={handleAdd}
        >
          Add card
        </Button>
        <Button
          className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm font-medium rounded-md shadow-sm transition-all duration-150 cursor-pointer"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
