
import { AppError } from '../../errors/AppError';
import { TaskRepository } from '../../repositories';



interface CreateTaskUseCaseRequest {
  title: string,
  description: string,
  user_id: string, 
  created_at: Date,
}
 
export class CreateTaskUseCase{
  constructor(
    private taskRepository: TaskRepository,
  ) { }
  
  async execute(request: CreateTaskUseCaseRequest) {
    const { title, description, user_id, created_at } = request;

    if (!user_id) {
      throw new AppError('user_id is required.')
    }
    if (!title) {
      throw new AppError('title is required.')
    }
    if (!description) {
      throw new AppError('description is required.')
    }        
   
    const dataAtualizada = new Date()
   
    await this.taskRepository.create({    
      title, 
      description, 
      user_id, 
      created_at: dataAtualizada 
     
    })
  }
}