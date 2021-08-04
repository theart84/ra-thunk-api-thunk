export interface IForm {
  name: string;
  price: string;
  content: string;
  loader: boolean,
  error: {
    message: string;
    status: boolean;
  }
}

export interface IPayloadForm {
  name: string;
  price: string;
  content: string;
}
