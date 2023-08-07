import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemTasks {
  id: string,
  title: string,
  description: string,
  user_id: string
}
interface IDetalheTask {
  id: string,
  title: string,
  description: string,
  user_id: string
}
type ITasksComTotalCount = {
  data: IListagemTasks[];
  totalCount: number;
}

const getAll = async (skip = 1, search='', id?: string): Promise<ITasksComTotalCount | Error> => {
  try {
    const urlRelativa = `/tasks/${id}?skip=${skip}&take=${Environment.LIMITE_DE_LINHAS}&search=${search}`
    const { data, headers } = await Api.get(urlRelativa)

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error("Erro ao listar as tarefas.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao listar as tarefas.")

  }
 };

const getById = async (id: string): Promise<IDetalheTask | Error> => {
   try {
   
    const { data } = await Api.get(`/tasks/${id}`)

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar a tarefa.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao consultar a tarefa.")

  }
 };

const create = async (dados: Omit<IDetalheTask, 'id'>): Promise<string | Error> => { 
  try {
   
    const { data } = await Api.post<IDetalheTask>('/tasks', dados)

    if (data) {
      return data.id;
    }

    return new Error("Erro ao cadastrar tarefa.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao cadastrar tarefa.")

  }
};

const updateById = async (dados: IDetalheTask): Promise<void | Error> => { 
  try {
   
     await Api.put('/tasks/',dados);    
   

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao editar o tarefa.")

  }
};

const deleteById = async (id: string): Promise<void | Error> => {
   try {
   
   await Api.delete('/tasks/', { data: { id } });     
     
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao deletar o tarefa.")

  }
};

export const TaskService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}