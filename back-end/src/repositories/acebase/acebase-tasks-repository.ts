import { DataSnapshot } from "acebase";
import db from "../../config/dbConfig";

import { v4 as uuidv4 } from "uuid";
import { TaskCreateData, TaskRepository, TaskUpdateData } from "../tasks-repositories";

export class AceBaseTaskRepositories implements TaskRepository {
  async create({
    user_id,
    created_at,
    description,
    title
   }: TaskCreateData) {
    const uniqueId = uuidv4();
    await db.ref(`tasks/${uniqueId}`).set({
      user_id,
      created_at,
      description,
      title
    });
  }

  async update({ id, description, title, update_at }: TaskUpdateData) {
    await db.ref(`tasks/${id}`).update({     
      description, 
      title,
      update_at,
    });
  } 
  async getFindByID(id: string): Promise<TaskUpdateData> {
    const taskSnapshot = (await db
      .ref(`tasks/${id}`)
      .once("value")) as DataSnapshot;
    const taskData = taskSnapshot.val();

    if (taskData) {
      return { ...taskData, id };
    }
    return taskData!;
  }
}
