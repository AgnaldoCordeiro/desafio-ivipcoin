
import { hash } from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { UserRepository } from '../../repositories';


interface CreateUserUseCaseRequest {
  email: string,
  password: string,
  user: string,
  created_at: Date
}
 
export class CreateUserUseCase{
  constructor(
    private userRepository: UserRepository,
  ) { }
  
  async execute(request: CreateUserUseCaseRequest) {
    const { email, password, user, created_at } = request;

   
    if (!user) {
      throw new AppError('Usuario is required.')
    }
    if (!email) {
      throw new AppError('email is required.')
    }
    if (!password) {
      throw new AppError('password is required.')
    }      
   
   
    const passwordHash = await hash(password, 8)
    const emailAlreadyExists = await this.userRepository.findByEmail(email)   
 
   

    if (emailAlreadyExists) {
    
      throw new AppError('Email already exists')
    }
    const userAlreadyExists = await this.userRepository.findByUserExist(user)   

    if (userAlreadyExists) {
      console.log("caiu aqui ") 
      throw new AppError('Usuario already exists')
    }   

    const dataAtualizada = new Date()
    await this.userRepository.create({    
      user,
      email,
      password: passwordHash,     
      created_at: dataAtualizada
     
    })
  }
}