interface IResponseWithData<T> {
  data: T;
  error?: never;
}

interface IResponseWithError<E> {
  data?: never;
  error: E;
}

export type IResponse<T, E = unknown> = IResponseWithData<T> | IResponseWithError<E>;
