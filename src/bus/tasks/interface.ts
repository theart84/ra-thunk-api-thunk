export interface ITask {
  id: string
  name: string;
  price: number;
  content?: string;
}

export interface IInitialStateTask {
  tasks: ITask[];
}
