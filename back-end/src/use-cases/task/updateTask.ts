import { AppError } from "../../errors/AppError";
import { TaskRepository } from "../../repositories";



interface UpdateTaskDataRequest {
  id: string,
  title: string,
  description: string,
  update_at: Date
 
}
 
export class UpdateTaskData{
  constructor(
    private taskRepository: TaskRepository,
  ) { }
  
  async execute(request: UpdateTaskDataRequest) {
    const { id, title, description, update_at } = request;

    if (!id) {
      throw new AppError('user is required.')
    }
    if (!title) {
      throw new AppError('email is required.')
    }
    if (!description) {
      throw new AppError('password is required.')    }    

    const dataAtualizada = new Date()
   
    await this.taskRepository.update({
      id,      
      title,
      description,     
      update_at: dataAtualizada
    })
  }
}