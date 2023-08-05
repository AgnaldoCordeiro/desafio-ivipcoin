import { Request, Response } from "express";
import db from "../config/dbConfig";
import { DataSnapshot } from "acebase";

export class FindUserTasksController {
  async handle(request: Request, response: Response) {
    const userId: string = request.params.id;
    try {
      const { title, description } = request.query;

      const tasks = await findUserTasks(userId, { title: title as string, description: description as string });

      response.json(tasks);
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "Ocorreu um erro ao buscar as tarefas do usuário." });
    }
  }
}

async function findUserTasks(userId: string, filters: { title?: string, description?: string }) {
  const taskSnapshot = (await db
    .ref(`tasks/`)
    .once("value")) as DataSnapshot;
  const tasksData = taskSnapshot.val();

  
  if (!tasksData) {
    return [];
  } 
 
  const tasks: any[] = [];

  for (const taskId in tasksData) {
    const task = tasksData[taskId];
    if (task.user_id === userId && 
        (!filters.title || task.title.includes(filters.title)) &&
        (!filters.description || task.description.includes(filters.description))
    ) {
      tasks.push({ ...task, id: taskId });
    }
  }
 
  return tasks;
}
