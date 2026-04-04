"use client"

import { loginUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";
import Swal from "sweetalert2";

export default function LoginPage() {
  const handleSubmit = async (formData: FormData) => {
    const res = await loginUser(formData);
    if (res?.error) {
      Swal.fire("Error", res.error, "error");
    }
  };

  return (
    <div className="w-full max-w-[400px] space-y-6 flex flex-col items-center">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200 mb-2">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bienvenido</h1>
        <p className="text-slate-500">Inicia sesión en tu NexusERP</p>
      </div>

      <Card className="w-full border-none shadow-2xl bg-white">
        <CardContent className="pt-6">
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold ml-1">Email</Label>
              <Input name="email" type="email" placeholder="admin@empresa.com" className="h-11 border-slate-200" required />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold ml-1">Contraseña</Label>
              <Input name="password" type="password" className="h-11 border-slate-200" required />
            </div>
            
            <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200">
              Entrar al Sistema
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <p className="text-center text-sm text-slate-500">
        ¿No tienes cuenta? <a href="/register" className="text-blue-600 font-semibold hover:underline">Regístrate gratis</a>
      </p>
    </div>
  );
}
