import { Request, Response } from "express";
import db from "../config/dbConfig";
import { DataSnapshot } from "acebase";

export class FindTaskByIdController {
  async handle(request: Request, response: Response) {
    const id: string = request.params.id;
    try {
      const task = await findTask(id);

      response.json(task);
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "Ocorreu um erro ao buscar tarefa." });
    }
  }
}

async function findTask(id: string) {
  const taskSnapshot = (await db
    .ref(`tasks/`)
    .once("value")) as DataSnapshot;
  const tasksData = taskSnapshot.val();

  if (!tasksData) {
    return null; 
  }

  for (const taskId in tasksData) {
    const task = tasksData[taskId];
    if (taskId === id) {
      return { ...task, id: taskId }; 
    }
  }

  return null; 
}
