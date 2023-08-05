export interface UserCreateData{
  email: string,
  password: string,
  user: string,
  created_at: Date
}

export interface UserUpdateData {
  id: string,
  email: string,
  password: string,
  user: string,
  update_at: Date
  
}

export interface User { 
  id: string,
  email: string,
  password: string,
  user: string,
}

export interface UserEmail {
  id: string;
  email: string;
}
export interface UserName {
  id: string;
  user: string;
}

export interface UserRepository{
  create: (data: UserCreateData) => Promise<void>
  update: (data: UserUpdateData) => Promise<void>
  findByEmail: (email: string | null) => Promise<UserEmail | null>
  findByUserExist: (user: string | null) => Promise<UserName | null>
  findByUser: () => Promise<User>
  getFindByID: (id: string) => Promise<UserUpdateData>
}