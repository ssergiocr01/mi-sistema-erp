"use server"

import db from "@/lib/db";
import { CategorySchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;

  // Validamos con Zod
  const result = CategorySchema.safeParse({ name });
  if (!result.success) {
    // .flatten() organiza los errores por campo
    const errorMsg = result.error.flatten().fieldErrors.name?.[0];
    return { error: errorMsg || "Nombre de categoría inválido" };
  }

  try {
    await db.category.create({ data: { name: result.data.name } });
    revalidatePath("/inventory/categories");
    return { success: true };
  } catch (e) {
    return { error: "Esa categoría ya existe en SQL Server" };
  }
}

export async function deleteCategory(id: string) {
  try {
    // Verificamos si tiene productos antes de borrar (Integridad Referencial)
    const count = await db.product.count({ where: { categoryId: id } });
    if (count > 0) return { error: "No puedes eliminar una categoría con productos asociados" };

    await db.category.delete({ where: { id } });
    revalidatePath("/inventory/categories");
    return { success: true };
  } catch (e) {
    return { error: "Error al eliminar la categoría" };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  
  const result = CategorySchema.safeParse({ name });
  if (!result.success) return { error: "Nombre inválido" };

  try {
    await db.category.update({
      where: { id },
      data: { name: result.data.name },
    });
    revalidatePath("/inventory/categories");
    return { success: true };
  } catch (e) {
    return { error: "Error al actualizar en SQL Server" };
  }
}

