"use client"

import { useState } from "react";
import { Pencil, PencilLine } from "lucide-react";
import { updateCategory } from "@/actions/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import Swal from "sweetalert2";

export function EditCategoryBtn({ id, currentName }: { id: string, currentName: string }) {
    const [open, setOpen] = useState(false);

    const handleEdit = async (formData: FormData) => {
        const res = await updateCategory(id, formData);

        if (res?.error) {
            Swal.fire("Error", res.error, "error");
        } else {
            setOpen(false); // Cerramos el modal
            Swal.fire({
                title: "Actualizado",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="text-blue-500 hover:text-blue-700 p-2">
                    <Pencil className="w-5 h-5" />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex flex-col items-center gap-4 pb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <PencilLine className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-center">
                        <DialogTitle className="text-xl font-bold text-slate-900">Editar Categoría</DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Cambia el nombre para organizar mejor tu inventario.
                        </DialogDescription>
                    </div>
                </DialogHeader >

                <form action={handleEdit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Nombre de la Categoría</label>
                        <Input
                            name="name"
                            defaultValue={currentName}
                            className="h-12 text-base border-slate-200 focus:ring-blue-500 transition-all shadow-sm"
                            placeholder="Ej: Electrónica"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-95">
                        Guardar Cambios
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
