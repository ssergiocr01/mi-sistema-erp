import { auth } from "@/auth";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css"; // <--- ASEGÚRATE DE QUE ESTO ESTÉ ARRIBA
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // SIEMPRE retornamos la misma estructura básica de HTML para que el CSS cargue
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 antialiased`}>
        {!session ? (
          // ESTRUCTURA PARA LOGIN / REGISTRO (Sin Navbar ni Sidebar)
          <div className="flex items-center justify-center min-h-screen p-4">
            {children}
          </div>
        ) : (
          // ESTRUCTURA PARA EL ERP (Con todo el menú)
          <>
            <Navbar />
            <div className="flex pt-16">
              <Sidebar />
              <main className="flex-1 md:ml-64 min-h-[calc(100vh-64px)] p-8">
                {children}
              </main>
            </div>
          </>
        )}
      </body>
    </html>
  );
}
