import { useApi } from "../../hooks/useApi";
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u");

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);
  return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
  try {
    const data = await useApi().signin(email, password);
    return data;
  } catch (error) {
    return console.log("deu erro no loginRequest: ", error);
  }
}

export async function RegisterRequest(email: string, password: string, name: string, cpf: string) {
  try {
    const data = await useApi().register(name, email, password, cpf);
    return data
  } catch (error) {
    return console.log('Deu errado no registerRequest', error)
  }
}
