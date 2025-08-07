import { Dialog, DialogContent } from "@/modules/core/ui/dialog";
import { Button } from "@/modules/core/ui/button";
import { useState } from "react";
import type { Card } from "@/modules/kanban/interfaces";

interface DetailCardModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  card: Card | null;
  onSave: (title: string, description: string) => void;
  onRequestDelete: () => void;
}

export const DetailCardModal = ({
  isOpen,
  onOpenChange,
  card,
  onSave,
  onRequestDelete,
}: DetailCardModalProps) => {
  const title = card?.title ?? "";
  const description = card?.description ?? "";

  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);

  if (!isOpen && (localTitle || localDescription)) {
    setLocalTitle("");
    setLocalDescription("");
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2f3136] text-white border border-white/10 lg:max-w-2xl w-full rounded-xl shadow-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <input
                className="w-full text-lg sm:text-xl font-semibold bg-transparent border-b border-white/20 focus:border-emerald-500 outline-none px-1 py-1 transition-colors"
                value={localTitle || title}
                onChange={(e) => setLocalTitle(e.target.value)}
                placeholder="Título de la card"
              />
              <p className="text-xs text-white/40 mt-1">Tocá para editar el título</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Descripción</h3>
              <textarea
                className="w-full min-h-[100px] sm:min-h-[120px] px-3 py-2 rounded-md bg-[#2f3136] border border-white/20 text-white placeholder:text-white/40 resize-none focus:outline-none focus:border-emerald-500 transition-colors"
                value={localDescription || description}
                onChange={(e) => setLocalDescription(e.target.value)}
                placeholder="Agrega una descripción detallada..."
              />
            </div>

            <div className="flex justify-start">
              <Button
                onClick={() => onSave(localTitle || title, localDescription || description)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-150"
              >
                Guardar cambios
              </Button>
            </div>
          </div>

          <div className="w-full sm:w-48 flex flex-col gap-3 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-4">
            <h4 className="text-sm font-semibold text-white/70 mb-1">Acciones</h4>
            <Button
              onClick={onRequestDelete}
              className="w-full px-3 py-2 bg-red-600/70 hover:bg-red-700/80 text-white text-sm rounded-md transition-all duration-150"
            >
              Eliminar card
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

