import { z } from "zod";

// Este esquema define qué reglas debe cumplir una Categoría
export const CategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre es demasiado largo" }),
});

// También podemos dejar listo el de Producto para después
export const ProductSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  sku: z.string().min(3, "SKU requerido"),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  stock: z.coerce.number().int().nonnegative("El stock no puede ser negativo"),
  categoryId: z.string().min(1, "Selecciona una categoría"),
});
