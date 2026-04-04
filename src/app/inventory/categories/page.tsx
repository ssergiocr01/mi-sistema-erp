import db from "@/lib/db";
import { CategoryForm } from "@/components/CategoryForm";
import { DeleteCategoryBtn } from "@/components/DeleteCategoryBtn"; // Lo crearemos ahora
import { EditCategoryBtn } from "@/components/EditCategoryBtn";

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestión de Categorías</h1>

      <CategoryForm />

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Nombre</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Productos</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium">{cat.name}</td>
                <td className="px-6 py-4 text-slate-500">{cat._count.products} artículos</td>
                <td className="px-6 py-4 text-right">
                  <EditCategoryBtn id={cat.id} currentName={cat.name} />
                  <DeleteCategoryBtn id={cat.id} name={cat.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
