export interface Tasks {
  id: number;
  title: string;
}

export interface TaskResponse {
  tasks: Tasks[];
  count: number;
}
export interface Task {
    id: BigInteger;
    title: string;
    description: string;
    dateOfCreation: Date;
    dateOfCompletion?: Date;
    deadLine: Date;
    isImportant: boolean;
    isDone: boolean;
}

  export interface UpdateTask {
      title: string;
      description: string;
      deadLine: string;
      isImportant: boolean;
   }

  export interface CreateTask {
    title: string;
    description: string;
    deadLine: string;
    isImportant: boolean;
    organization: number;
 }
