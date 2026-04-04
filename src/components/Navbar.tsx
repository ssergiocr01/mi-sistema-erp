import { logoutUser } from "@/actions/auth";
import { Package, User, LogOut } from "lucide-react";

export function Navbar() {
  return (
    <header className="h-16 border-b bg-white fixed top-0 w-full z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Package className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">
          Nexus<span className="text-blue-600">ERP</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <form action={logoutUser}>
            <button type="submit" className="text-xs text-red-500 hover:underline flex items-center gap-1">
              <LogOut className="w-3 h-3" /> Cerrar sesión
            </button>
          </form>
        </div>
        <div className="h-10 w-10 rounded-full bg-slate-100 border flex items-center justify-center text-slate-600">
          <User className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
}
