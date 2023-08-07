import { Api } from "../axios-config";

interface IDetalheUser {
  id: string,
  email: string,
  password: string,
  user: string
}

const getById = async (id: string): Promise<IDetalheUser | Error> => {
   try {
   
    const { data } = await Api.get(`/users/${id}`)

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o usuário.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao consultar o usuário.")

  }
 };

const create = async (dados: Omit<IDetalheUser, 'id'>): Promise<string | Error> => { 
  try {
   
    const { data } = await Api.post<IDetalheUser>('/users', dados)

    if (data) {
      return data.id;
    }

    return new Error("Erro ao cadastrar o usuário.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao cadastrar o usuário.")

  }
};

const updateById = async (dados: IDetalheUser): Promise<void | Error> => { 
  try {
   
     await Api.put('/users/',dados);    
   

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao editar o usuário.")

  }
};



export const UserService = {
  getById,
  create,
  updateById,
}