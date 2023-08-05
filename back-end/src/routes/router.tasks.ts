import express, { Request, Response } from "express";

import {
  FindUserTasksController,
} from "../controller";
import { AceBaseTaskRepositories } from "../repositories";
import { CreateTaskUseCase, UpdateTaskData } from "../use-cases";


export const tasks = express.Router();

const findUserTasksController = new FindUserTasksController();


tasks.post('/tasks', async (req:Request, res:Response) => {

   const {    
    title,
   description,
   user_id,
   created_at  
   } = req.body; 
  
    const aceBaseTaskRepositories = new AceBaseTaskRepositories()
    const createTaskUseCase = new CreateTaskUseCase(aceBaseTaskRepositories)

    createTaskUseCase.execute({
      title,
      description,
      user_id,
      created_at 
  }) 
  
  return res.status(201).send()
})

tasks.put('/tasks', async (req:Request, res:Response) => {

  const {    
    id, 
    title,
    description,
     update_at 
  } = req.body; 
 
   const aceBaseTaskRepositories = new AceBaseTaskRepositories()
   const updateTaskData = new UpdateTaskData(aceBaseTaskRepositories)

   updateTaskData.execute({
    id, 
    title,
    description,
     update_at
 }) 
 
 return res.status(201).send()
})

tasks.get("/tasks/:id", findUserTasksController.handle);



