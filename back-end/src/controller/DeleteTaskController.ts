import { Request, Response } from "express";
import db from "../config/dbConfig";
import { DataSnapshot } from "acebase";

export class DeleteTaskController {
  async handle(request: Request, response: Response) {
    const id: string = request.body.id;

    console.log(id)
    try {
      const taskDeleted = await deleteTask(id);

      if (taskDeleted) {
        response.json({ message: "Tarefa deletada com sucesso." });
      } else {
        response.status(404).json({ error: "Tarefa não encontrada." });
      }
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "Ocorreu um erro ao deletar a tarefa." });
    }
  }
}

async function deleteTask(id: string) {
  const taskSnapshot = (await db
    .ref(`tasks/`)
    .once("value")) as DataSnapshot;
  const tasksData = taskSnapshot.val();

  if (!tasksData) {
    return false; 
  }

  for (const taskId in tasksData) {
    if (taskId === id) {
      await db.ref(`tasks/${taskId}`).remove();
      return true; 
    }
  }

  return false;
}
