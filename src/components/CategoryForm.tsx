"use client"

import { createCategory } from "@/actions/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import { useRef } from "react";

export function CategoryForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const res = await createCategory(formData);
    
    if (res?.error) {
      Swal.fire("Error", res.error, "error");
    } else {
      Swal.fire({
        title: "¡Guardado!",
        text: "Categoría creada correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      formRef.current?.reset();
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="flex gap-3 mb-8 bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex-1">
        <Input name="name" placeholder="Nombre de la categoría (ej: Periféricos)" required />
      </div>
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" /> Agregar
      </Button>
    </form>
  );
}
