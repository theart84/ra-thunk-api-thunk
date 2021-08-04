export interface ITask {
  id: string
  name: string;
  price: string;
  content?: string;
}

export interface IInitialStateTask {
  tasks: ITask[];
  loader: boolean,
  error: {
    message: string;
    status: boolean;
  }
}
