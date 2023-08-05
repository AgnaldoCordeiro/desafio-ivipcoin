import { sign } from "jsonwebtoken";
import { auth } from "../config/authConfig";


class GenerateTokenProvider{
  async execute(user_id: string){
    const token = sign({}, auth.secret,{
      subject: user_id,
      expiresIn: 60*15, // 15 minutes
 
    });

    return token;
  }
}
export {GenerateTokenProvider}