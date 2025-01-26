export interface Task {
    taskId: number;
    userId: number;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
  }

  export interface NewTask {
    title: string;
    description: string;
    dueDate: string;
  }