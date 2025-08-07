import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/modules/core/ui/alert-dialog";

interface ConfirmDeleteColumnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmDeleteColumnModal = ({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDeleteColumnModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#2f272a]/95 text-white border border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar esta columna?</AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            Esta acción no se puede deshacer. Todos los cards dentro de esta columna también se eliminarán.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600/70 hover:bg-red-700/70 text-white cursor-pointer"
            onClick={onConfirm}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
