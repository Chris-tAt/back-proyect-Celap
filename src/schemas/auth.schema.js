import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Nombre es Requerido",
  }),
  email: z
    .string({
      required_error: "Correo es Requerido",
    })
    .email({
      message: "Correo es invalido",
    }),
  password: z
    .string({
      required_error: "contraseña es Requerida",
    })
    .min(6, {
      message: "La contraseña debe ser mayor a 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "correo es Requerido",
    })
    .email({
      message: "Correo es invalido",
    }),
  password: z
    .string({
      required_error: "Contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe ser mayor a 6 caracteres",
    }),
});