import { AceBase } from "acebase";

const options = { 
  storage: { path: './src/config' } 
}; 
const db = new AceBase('my_tasks', options);

export default db;