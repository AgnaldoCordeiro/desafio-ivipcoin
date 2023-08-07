import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { AuthService } from "../services/api/auth/AuthService";


interface IDadosUserProps {
  id?: string | undefined;
  user?: string | undefined;
}

interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (user: string, password: string) => Promise<string | void>;
  dadosUser: IDadosUserProps | undefined
}
const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';
const LOCAL_STORAGE_KEY__ACCESS_USER = 'APP_ACCESS_USER';

interface IAuthProviderProps {
  children: React.ReactNode;
}


export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>()
  const [dadosUser, setDadosUser] = useState<IDadosUserProps>()

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    const dadosUser = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_USER);

    if (token && dadosUser) {
      setToken(JSON.parse(token))
      setDadosUser(JSON.parse(dadosUser))
    } else {
      setToken(undefined)
      setDadosUser(undefined)
    }
  }, [])

  const handleLogin = useCallback(async (user: string, password: string) => {
    const result = await AuthService.auth(user, password)

    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.token))
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_USER, JSON.stringify(result.user))
      setToken(result.token)
      setDadosUser(result.user)
    }
  }, [])
  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_USER)
    setToken(undefined)
    setDadosUser(undefined)

  }, [])

  const isAuthenticated = useMemo(() => !!token, [token])
  return (
    <AuthContext.Provider value={{ dadosUser, isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>

  );
}

export const useAuthContext = () => useContext(AuthContext)