import express, { Request, Response } from "express";

import {
  FindUserIdController,
} from "../controller";
import { AceBaseUserRepositories } from "../repositories";
import { CreateUserUseCase, UserUpdateData } from "../use-cases";

export const user = express.Router();

const findUserIdController = new FindUserIdController();



user.post('/user', async (req:Request, res:Response) => {

   const {    
    email,
    user,
    password,
    created_at   
   } = req.body; 

  
    const aceBaseUserRepositories = new AceBaseUserRepositories()
    const createUserUseCase = new CreateUserUseCase(aceBaseUserRepositories)

     createUserUseCase.execute({
    email,
    user,
    password,
    created_at
  }) 
  
  return res.status(201).send()
})

user.put('/user', async (req:Request, res:Response) => {

  const {    
    id,
   email,
   user,
   password,
   update_at  
  } = req.body; 

 
   const aceBaseUserRepositories = new AceBaseUserRepositories()
   const userUpdateData = new UserUpdateData(aceBaseUserRepositories)

   userUpdateData.execute({
    id,
    email,
    user,
    password,
    update_at 
 }) 
 
 return res.status(201).send()
})


user.get("/users/:id", findUserIdController.handle);




