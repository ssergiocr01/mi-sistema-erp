# 📦 Sistema ERP de Gestión de Inventarios

Un sistema de gestión empresarial (ERP Lite) profesional construido con el stack moderno de **Next.js**, enfocado en el manejo eficiente de inventarios, movimientos de stock y análisis de datos en tiempo real.

## 🚀 Tecnologías Principales

*   **Framework:** [Next.js 15+](https://nextjs.org) (App Router)
*   **Lenguaje:** [TypeScript](https://typescriptlang.org)
*   **Base de Datos:** [Microsoft SQL Server](https://microsoft.com) (LocalDB)
*   **ORM:** [Prisma 5.21.0](https://prisma.io)
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://shadcn.com)
*   **Validación:** [Zod](https://zod.dev)

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
*   [Node.js 18+](https://nodejs.org)
*   [SQL Server Management Studio (SSMS)](https://microsoft.com) o Azure Data Studio.
*   Una instancia de SQL Server LocalDB corriendo.

## ⚙️ Configuración del Proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com
    cd mi-sistema-erp
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz basado en `.env.example`:
    ```env
    DATABASE_URL="sqlserver://localhost;instanceName=MSSQLLocalDB;database=MiSistemaERP;integratedSecurity=true;trustServerCertificate=true;"
    ```

4.  **Sincronizar la base de datos con Prisma:**
    ```bash
    npx prisma db push
    ```

5.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## 📂 Estructura del Proyecto

*   `/src/app`: Rutas y páginas del sistema.
*   `/src/components`: Componentes de UI reutilizables y lógica de negocio.
*   `/src/lib`: Configuraciones de clientes (Prisma, Auth, etc.).
*   `/src/actions`: Funciones del lado del servidor (Server Actions) para mutaciones de datos.
*   `/prisma`: Esquema de la base de datos y migraciones.

## 📝 Roadmap (Próximos Pasos)
- [ ] Implementar Dashboard de Stock Crítico.
- [ ] Creación de productos y categorías.
- [ ] Historial de movimientos de inventario (Entradas/Salidas).
- [ ] Autenticación con roles (Admin/Operador).
