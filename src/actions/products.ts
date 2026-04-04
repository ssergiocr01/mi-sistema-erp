"use server"

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

// Agregamos formData como argumento, aunque no lo usemos todavía
export async function createTestProduct(formData: FormData) {
  try {
    const product = await db.product.create({
      data: {
        name: "Producto de Prueba " + Math.floor(Math.random() * 1000),
        sku: "TEST-" + Math.floor(Math.random() * 1000),
        price: 99.99,
        stock: 10,
        category: {
            create: { name: "General" }
        }
      },
    });

    console.log("✅ Producto creado en SQL Server:", product);
    revalidatePath("/"); 
    // Las Server Actions en 'action' no suelen retornar objetos directamente al cliente 
    // de esta forma, pero para la prueba está bien.
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
  }
}
