import { auth } from "@/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Card, Text, Metric, Flex, Grid } from "@tremor/react";
import { Package, AlertTriangle, DollarSign, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  // 1. Verificación de seguridad de primer nivel (Server Side)
  const session = await auth();
  
  // Si no hay sesión, lo mandamos al login ANTES de que cargue el HTML
  if (!session) {
    redirect("/login");
  }

  // 2. Si hay sesión, cargamos los datos de SQL Server
  const totalProducts = await db.product.count();
  const lowStock = await db.product.count({ where: { stock: { lt: 5 } } });
  const inventoryValue = await db.product.aggregate({ _sum: { price: true } });

  const kpis = [
    { title: "Total Productos", metric: totalProducts.toString(), icon: Package, color: "blue" },
    { title: "Stock Bajo", metric: lowStock.toString(), icon: AlertTriangle, color: "red" },
    { title: "Valor Inventario", metric: `$${inventoryValue._sum.price || 0}`, icon: DollarSign, color: "emerald" },
    { title: "Movimientos Hoy", metric: "0", icon: TrendingUp, color: "amber" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Panel de Control</h1>
        <p className="text-slate-500">Bienvenido de nuevo, {session.user?.name}</p>
      </div>

      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {kpis.map((item) => (
          <Card key={item.title} decoration="top" decorationColor={item.color} className="bg-white shadow-sm border-none">
            <Flex justifyContent="start" className="gap-4">
              <div className={`p-3 rounded-xl bg-${item.color}-50 text-${item.color}-600`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <Text className="text-slate-500 font-medium">{item.title}</Text>
                <Metric className="text-2xl font-bold text-slate-900">{item.metric}</Metric>
              </div>
            </Flex>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
