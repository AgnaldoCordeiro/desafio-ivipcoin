import { compare } from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';
import { UserRepository } from '../../repositories/users-repositories';

interface IResponse {
  user: {
    user: string;
    email: string;
    id: string;
  };
  token: string;
}

interface UserData {
  id: string;
  email: string;
  password: string;
  user: string;
}

type User = { [key: string]: UserData };

interface AuthenticateUserCaseRequest {
  user: string;
  password: string;
}

export class AuthenticateUserCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: AuthenticateUserCaseRequest): Promise<IResponse> {
    const { user, password } = request;

    //@ts-ignore
    const allUsers: User = await this.userRepository.findByUser(); 

    const usuario = Object.values(allUsers).find((userData) => userData.user === user);

    if (!usuario) {
      throw new AppError('Usuário ou senha incorretos.');
    }

    const usuarioId = Object.keys(allUsers).find((key) => allUsers[key].user === user);
    const usuarioData: UserData = usuario;

    const passwordMatch = await compare(password, usuarioData.password);

    if (!passwordMatch) {
      throw new AppError('Usuário ou senha incorretos.');
    }

    const generateTokenProvider = new GenerateTokenProvider();
  

      const token = await generateTokenProvider.execute(usuarioId!);
  

    const tokenReturn: IResponse = {
      token,
      user: {
        user: usuarioData.user,
        email: usuarioData.email,
        id: usuarioId!,
      },
    };

    return tokenReturn;

  }
}
