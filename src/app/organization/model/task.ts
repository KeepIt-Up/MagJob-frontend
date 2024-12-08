export interface Tasks {
  id: number;
  title: string;
}

export interface TaskResponse {
  tasks: Tasks[];
  count: number;
}
export interface Task {
  id: number;
  title: string;
  description: string;
  dateOfCreation: Date;
  dateOfCompletion?: Date;
  deadLine: Date;
  priority: string;
  status: string;
}

export interface UpdateTask {
  title: string;
  description: string;
  priority?: string;
  status?: string;
  deadLine?: string;
}


export interface CreateTask {
  title: string;
  description: string;
  priority: string;
  status: string;
  deadLine: string;
  organization: number;
  creator: number;
}

