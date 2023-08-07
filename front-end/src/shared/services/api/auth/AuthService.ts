import { Api } from "../axios-config";

interface IAuth {
  token: string;
  user: {
    user: string;
    email: string;
    role: string;
  }
}

const auth = async (user:string, password:string): Promise<IAuth | Error > => {
   try {
   
    const {data}  = await Api.post<IAuth>('/sessions', {user, password})

     if (data) {
       return data;
     }
    return new Error("Erro ao user and password")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao user and password")

  }
}

export const AuthService = {
  auth,
};