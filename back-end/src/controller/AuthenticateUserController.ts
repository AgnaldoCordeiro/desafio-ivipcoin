import { Request, Response } from "express";

import { CreateSessionDTO } from "../types/types";
import { AuthenticateUserCase } from "../use-cases/auth/authenticateUser";
import { AceBaseUserRepositories } from "../repositories/acebase/acebase-users-repository";



class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user, password } = request.body as CreateSessionDTO;
  
    const aceBaseUserRepositories = new AceBaseUserRepositories()
    const authenticateUserCase = new AuthenticateUserCase(aceBaseUserRepositories)
    
    const token = await authenticateUserCase.execute({ user, password })
    
    return response.json(token)
  }
}

export {AuthenticateUserController}