"use server"

import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { signIn } from "@/auth"; // Asegúrate de importar el signIn de TU archivo auth.ts
import { AuthError } from "next-auth";
import { signOut } from "@/auth";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string || "USER";

  if (!email || !password) return { error: "Email y contraseña son obligatorios" };

  try {
    // 1. Verificar si el usuario ya existe
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) return { error: "El correo ya está registrado" };

    // 2. Encriptar la contraseña (Hash)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear el usuario en SQL Server
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role,
      },
    });

    revalidatePath("/users"); // Si tuvieras una lista de usuarios
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear el usuario en el servidor" };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // Llamamos a la función de Auth.js
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/", // Si tiene éxito, te manda al Dashboard
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas. Revisa tu correo o contraseña." };
        default:
          return { error: "Ocurrió un error inesperado en el inicio de sesión." };
      }
    }
    // IMPORTANTE: Debes lanzar el error si no es AuthError para que el redirect funcione
    throw error;
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/login" });
}