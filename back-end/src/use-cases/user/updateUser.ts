import { hash } from 'bcrypt';
import { AppError } from "../../errors/AppError";
import { UserRepository } from '../../repositories';



interface UserUpdateDataRequest {
  id: string,
  email: string,
  password: string,
  user: string,
  update_at: Date
 
}
 
export class UserUpdateData{
  constructor(
    private userRepository: UserRepository,
  ) { }
  
  async execute(request: UserUpdateDataRequest) {
    const { id, email, password, user, update_at } = request;

    if (!user) {
      throw new AppError('user is required.')
    }
    if (!email) {
      throw new AppError('email is required.')
    }
    if (!password) {
      throw new AppError('password is required.')    }    
   
    
    const passwordHash = await hash(password, 8)
    const dataAtualizada = new Date()
   
    await this.userRepository.update({
      id,
      user,
      email,
      password: passwordHash,     
      update_at: dataAtualizada
    })
  }
}