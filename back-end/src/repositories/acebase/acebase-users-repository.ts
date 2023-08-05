import { DataSnapshot } from "acebase";
import db from "../../config/dbConfig";
import {
  User,
  UserCreateData,
  UserEmail,
  UserName,
  UserRepository,
  UserUpdateData,
} from "../users-repositories";
import { v4 as uuidv4 } from "uuid";


export class AceBaseUserRepositories implements UserRepository {
  async create({ email, password, user, created_at }: UserCreateData) {
    const uniqueId = uuidv4();
    await db.ref(`users/${uniqueId}`).set({
      user,
      email,
      password,
      created_at,
    });
  }

  async update({ id, email, password, user, update_at }: UserUpdateData) {
    await db.ref(`users/${id}`).update({
      email,
      password,
      user,
      update_at,
    });
  }

  async findByEmail(email: string | null): Promise<UserEmail | null> {
    const userSnapshot = (await db
      .ref('users')
      .once('value')) as DataSnapshot;
    const usersData = userSnapshot.val();
  
    for (const userId in usersData) {
      if (usersData[userId].email === email) {
        return { ...usersData[userId], id: userId } as UserEmail;
      }
    }
  
    return null;
  }
  async findByUserExist(user: string | null): Promise<UserName | null> {
    
    const userSnapshot = (await db
      .ref('users')  
      .once('value')) as DataSnapshot;
    
    const usersData = userSnapshot.val();
    for (const userId in usersData) {
      if (usersData[userId].user === user) {
        return { ...usersData[userId], id: userId } as UserName;
      }
    }
  
    return null;
  }

  async findByUser(): Promise<User> {
    
    const userSnapshot = (await db
      .ref('users')  
      .once('value')) as DataSnapshot;
    
    const usersData = userSnapshot.val();
    if (!usersData) {
      usersData;
        }    
    return usersData;  
  }
  
  async getFindByID(id: string): Promise<UserUpdateData> {
    const userSnapshot = (await db
      .ref(`users/${id}`)
      .once("value")) as DataSnapshot;
    const userData = userSnapshot.val();

    if (userData) {
      return { ...userData, id };
    }
    return userData!;
  }
}
