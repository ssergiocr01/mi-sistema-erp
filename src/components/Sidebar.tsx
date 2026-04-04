"use client" // <--- Importante para detectar la ruta actual

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook de Next.js
import { LayoutDashboard, Package, Tags, History } from "lucide-react";
import { cn } from "@/lib/utils"; // La utilidad de shadcn que ya tienes

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Package, label: "Inventario", href: "/inventory" },
  { icon: Tags, label: "Categorías", href: "/inventory/categories" },
  { icon: History, label: "Movimientos", href: "/movements" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white h-[calc(100vh-64px)] fixed left-0 top-16 hidden md:flex flex-col">
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          // Verificamos si esta es la página activa
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-blue-50 text-blue-600 shadow-sm" // Estilo activo
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900" // Estilo inactivo
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-slate-400")} />
              <span className={cn("font-medium", isActive && "font-semibold")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
