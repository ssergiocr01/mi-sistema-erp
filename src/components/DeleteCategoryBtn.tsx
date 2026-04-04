"use client"

import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/actions/categories";
import Swal from "sweetalert2";

export function DeleteCategoryBtn({ id, name }: { id: string, name: string }) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: `¿Eliminar ${name}?`,
      text: "No podrás deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const res = await deleteCategory(id);
      if (res?.error) {
        Swal.fire("Error", res.error, "error");
      } else {
        Swal.fire("Eliminado", "La categoría ha sido borrada", "success");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 p-2">
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
