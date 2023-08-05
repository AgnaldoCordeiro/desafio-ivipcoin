import { Request, Response } from "express";
import db from "../config/dbConfig";
import { DataSnapshot } from "acebase";

export class FindUserIdController {
  async handle(request: Request, response: Response) {
    const userId: string = request.params.id;
    try {  
      const tasks = await findUserById(userId);

      response.json(tasks);
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "Ocorreu um erro ao buscar as tarefas do usuário." });
    }
  }
}
async function findUserById(userId: string) {
  const userSnapshot = (await db
    .ref(`users/${userId}`)
    .once("value")) as DataSnapshot;
  const userData = userSnapshot.val();

  return userData;
}
