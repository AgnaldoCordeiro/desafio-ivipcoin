export interface TaskCreateData{
  title: string,
  description: string,
  user_id: string, 
  created_at: Date,
  
}

export interface TaskUpdateData {
  id: string,
  title: string,
  description: string,
  update_at: Date
}


export interface TaskRepository{
  create: (data: TaskCreateData) => Promise<void>
  update: (data: TaskUpdateData) => Promise<void>
  getFindByID: (id: string) => Promise<TaskUpdateData>
  

}