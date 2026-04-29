import axiosClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { fetchData } from "@/lib/fetchData";
import z from "zod";

export const SigninFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(6, { error: "Name must be at least 2 characters long." })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
  confirm_password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirm_password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function signIn(state: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // TODO check login with api
  try {
    const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      username: formData.get("email"),
      password: formData.get("password"),
    });
    if (!response || !response.data || response.data.status === 401) {
      console.log("login api response", response);
      return {
        status: 401,
        results: [],
        message: "Username or password is incorrect!",
      };
    } else {
      console.log("login api response data", response.data);
      return response.data;
    }
  } catch (error) {
    console.log("login error ", error);
    return {
      status: 401,
      results: [],
      message: "Username or password is incorrect!",
    };
  }
}
